var isEnabled = false;

chrome.storage.sync.get(['isToggleEnabled'], function(result) {
  isEnabled = result.isToggleEnabled || false;
});

console.log('Content script is loaded');

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == 'toggle') {
    console.log('Toggle message received');
    isEnabled = request.isEnabled;
  }
});

// Catch text selection using cursor
document.addEventListener("mouseup", function() {
  checkRumour();
});

function checkRumour() {
  var selectedText = window.getSelection().toString();
  if (isEnabled && selectedText) {
    // TODO: Integrate with the NFRD Server
    const isRumour = /* Make your API call and get the boolean response */ true;
    showPopup(selectedText, isRumour);
  }
}

function showPopup(selectedText, isRumour) {
  const alertMessage = ` NFRD Message: "${selectedText}" is ${isRumour ? 'Rumour' : 'Fact'}`;
  alert(alertMessage);
}
