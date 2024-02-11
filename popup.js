document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.getElementById('toggle');

  // Initialize the state from storage
  chrome.storage.sync.get(['isToggleEnabled'], function(result) {
    let isToggleEnabled = result.isToggleEnabled || false;
    updateToggleSwitch(isToggleEnabled);

    toggleButton.addEventListener('click', function() {
      isToggleEnabled = !isToggleEnabled;
      updateToggleSwitch(isToggleEnabled);

      // Save the state to storage
      chrome.storage.sync.set({ isToggleEnabled: isToggleEnabled });
      // Send a message to the background script
      chrome.runtime.sendMessage({ action: 'toggle', isEnabled: isToggleEnabled });

    });
  });

  function updateToggleSwitch(isEnabled) {
    toggleButton.checked = isEnabled;
  }
});
