# NFRD Chrome Extension
## Architecture Overview
This Chrome extension consists of three main components: Popup Window, Service Worker, and Content Script. The Popup Window is the front-end interface for user interaction, the Service Worker manages communication between the Popup Window and the Content Script, and the Content Script interacts with the active tab's content.

## Components
1. **Popup Window**
  + The Popup Window provides the user interface for the extension.
  + It contains elements like buttons, input fields, or settings for user interaction.
  + Users can access the Popup Window by clicking on the extension icon in the browser.
2. **Service Worker**
  + The Service Worker is a background script responsible for handling communication between the Popup Window and Content Script.
  + It listens for events and messages and can relay them between the Popup Window and Content Script.
  + It can perform tasks like injecting scripts into web pages.
3. **Content Script**
  + The Content Script runs in the context of a web page when the extension is active on that page.
  + It interacts with the page's DOM, listens for events, and manipulates the page's content.
  + It communicates with the Service Worker to receive instructions from the Popup Window or send data back to the Popup Window.
## Communication Flow
+ Popup Window sends a message to the Service Worker.
+ Service Worker receives the message and relays it to the Content Script.
+ Content Script interacts with the active tab's content based on the message received.
## Setup Instructions
+ Clone this repository to your local machine.
+ Open Google Chrome and navigate to chrome://extensions/.
+ Enable Developer Mode by toggling the switch in the top right corner.
+ Click on Load unpacked and select the folder where you cloned the repository.
+ The extension should now be installed and ready to use.
