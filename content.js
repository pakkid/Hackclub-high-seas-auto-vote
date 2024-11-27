chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getProjectDetails") {
    const projectLeft = document.querySelector('#voting-project-left h2')?.innerText;
    const projectRight = document.querySelector('#voting-project-right h2')?.innerText;
    sendResponse({ projectLeft, projectRight });
  }
});