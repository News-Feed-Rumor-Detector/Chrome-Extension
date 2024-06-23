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
  setTimeout('', 200);
  checkRumour();
});

function checkRumour() {
  var selectedText = window.getSelection().toString();
  if (isEnabled && selectedText) {
    query({"inputs": selectedText})
    .then(response => response.json())
    .then(data => {
    	console.log(data);
			const parsedData = parseData(data);
			const isRumour = parsedData.isRumour;
      const confidenceScore = parsedData.confidenceScore;
      showPopup(isRumour, confidenceScore);
    })
    .catch(error => {
      console.error('Error fetching predictions:', error);
    });
  }
}
async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/NFRD/nfrd-model",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const relayedResponse = await response;
	return relayedResponse;
}

function parseData(data){
	// Extract the relevant information
	const label1 = data[0][0];
	const label0 = data[0][1];

	// Determine if the prediction is a rumour or not
	const isRumour = label1.score > label0.score;

	// Get the confidence score of the decision
	const confidenceScore = isRumour ? label1.score : label0.score;

	// Create the resulting JSON
	const result = {
		  isRumour: isRumour,
		  confidenceScore: confidenceScore
	};
	return result;
}

function showPopup(isRumour, confidenceScore) {
  const formattedConfidenceScore = parseFloat(confidenceScore).toFixed(3);

  var alertMessage = '';
	if (isRumour){
     alertMessage = `Based on our analysis, the selected text is most likely a rumour with a confidence score of ${formattedConfidenceScore}. Please verify the information from reliable sources before sharing or making decisions.`;
  } else{
		 alertMessage = `Based on our analysis, the selected text is most likely a fact with a confidence score of ${formattedConfidenceScore}. Please consider this when sharing or making decisions.`;
	}

  alert(alertMessage);
}
