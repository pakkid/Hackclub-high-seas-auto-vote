document.addEventListener('DOMContentLoaded', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getProjectDetails,
  }, (results) => {
    if (results && results[0] && results[0].result) {
      const { projectLeft, projectRight } = results[0].result;
      document.getElementById('vote-left').innerText = projectLeft;
      document.getElementById('vote-right').innerText = projectRight;
    } else {
      alert('Failed to retrieve project details.');
    }
  });

  document.getElementById('vote-left').addEventListener('click', () => selectProject('left'));
  document.getElementById('vote-right').addEventListener('click', () => selectProject('right'));
});

function selectProject(project) {
  const leftButton = document.getElementById('vote-left');
  const rightButton = document.getElementById('vote-right');

  if (project === 'left') {
    leftButton.classList.add('selected');
    rightButton.classList.remove('selected');
  } else {
    rightButton.classList.add('selected');
    leftButton.classList.remove('selected');
  }
}

document.getElementById('generate').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const voteProject = document.querySelector('.project-button.selected')?.id;
  const projectLeft = document.getElementById('vote-left').innerText;
  const projectRight = document.getElementById('vote-right').innerText;

  if (!voteProject) {
    alert('Please select a project to vote for.');
    return;
  }

  const projectName = voteProject === 'vote-left' ? projectLeft : projectRight;

  if (!projectName) {
    alert('Project name not found.');
    return;
  }

  const data = {
    model: "llama3.2",
    prompt: `In 10 or more words, explain why you would vote for the project: ${projectName}? explain it as if you were writing it on a voting card. for example; "I voted for project X because off its cool features like x, y, z." please keep responses to a maximum of 17 words. when responding, do not use quotation marks. also make sure to use "I" statments at the beginning. and dont cut off your responses, they can be a little over the max word count. just make sure you finish them.`,
    stream: false
  };

  const url = "http://localhost:5000/api/generate";  // Proxy server URL

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    const reason = result.response.trim();
    console.log('Generated Reason:', reason);

    document.getElementById('reason').innerText = reason;

    // Automatically insert the reason into the text box
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: insertReason,
      args: [reason]
    });
  } catch (error) {
    console.error('Error fetching AI response:', error);
    alert(`There was an error generating the reason: ${error.message}`);
  }
});

function getProjectDetails() {
  const cleanProjectName = (name) => {
    if (!name) return '';
    return name.replace('This is a project update', '').replace(/\n/g, '').trim();
  };

  const projectLeft = cleanProjectName(document.querySelector('#voting-project-left h2')?.innerText);
  const projectRight = cleanProjectName(document.querySelector('#voting-project-right h2')?.innerText);
  return { projectLeft, projectRight };
}

function insertReason(reason) {
  const textArea = document.querySelector('#voting-reason-container textarea');
  if (textArea) {
    textArea.value = reason;
  } else {
    console.log("Text area not found.");
  }
}