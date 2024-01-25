chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == 'toggle') {
        console.log('Toggle message received');
        // Relay the message to the active tab's content script
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, request);
        });
    }
  });
