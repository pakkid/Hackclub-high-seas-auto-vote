# Hackclub-high-seas-auto-vote
 Auto votes for projects on Hack Club using Llama 3.2
## Bugs:
 everything. 
 this project was made in 50 minutes, don't expect too much
## How Work?
 it works with janky communication to the Ollama port
 proxy_sever.py is used to avoid CORS

## Installation

1. Clone or download this repository to your local machine.
2. Download Llama 3.2. (You need Ollama for this) [2.0GB]
   ```bash or cmd
   ollama run llama3.2
3. Open Chrome and navigate to `chrome://extensions/`.
4. Enable "Developer mode" by toggling the switch in the top right corner.
5. Click on the "Load unpacked" button and select the directory containing the extension files.
6. Install Flask and Flask-CORS:
   ```bash or cmd
   pip install flask flask-cors requests
7. Run start.bat to run the proxy server
8. Pray to the Chrome gods that it will work.
9. Open the Wonderdome and make sure the voting text section is open, then click on the extension and select the project and magik will happen.

## Files

- `manifest.json`: The extension's manifest file.
- `popup.html`: The HTML file for the extension's popup.
- `popup.js`: The JavaScript file for the extension's popup logic.
- `content.js`: The content script that interacts with the Hack Club High Seas voting page.
- `proxy_server.py`: A proxy server to handle CORS issues 