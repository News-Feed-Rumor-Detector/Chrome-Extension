let isEnabled = false;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == 'toggle') {
    isEnabled = request.isEnabled;
  }
});

document.addEventListener('select', function() {
  checkRumour();
});

function checkRumour() {
  if (isEnabled) {
    // TODO: Integrate with the NFRD Server
    const isRumour = /* Make your API call and get the boolean response */ true;
    showPopup(window.getSelection().toString(), isRumour);
  }
}

function showPopup(selectedText, isRumour) {
  const popup = document.createElement('div');
  popup.className = isRumour?'rumor-popup' : 'fact-popup';
  popup.textContent = `${isRumour? `Rumor Alert:` : `Fact Alert` }${selectedText}`;

  // Add styles to the popup
  const popupStyles = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${isRumour? '#ff0000' : '#00ff00'}
    color: #ffffff; /* White text color */
    padding: 10px;
    border-radius: 5px;
    z-index: 1000000; /* Higher z-index to make sure it's on top */
  `;

  popup.style.cssText = popupStyles;

  // Append the popup to the body
  document.body.appendChild(popup);

  // Remove the popup after a certain duration (e.g., 3 seconds)
  setTimeout(() => {
    document.body.removeChild(popup);
  }, 5000);
}
