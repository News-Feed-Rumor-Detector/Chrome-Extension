let isContentScriptInjected = false;

async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

async function injectContentScript(tab) {
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['content.js']
    });
    isContentScriptInjected = true;
}

chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
    let tab = await getCurrentTab();

    if (isContentScriptInjected === false) {
        await injectContentScript(tab);
    }

    if (request.action == 'toggle') {
        // Relay the message to the active tab's content script
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, request);
        });
    }
  });
