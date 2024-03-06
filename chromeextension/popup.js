// Function to open the API in a new tab
function openApiInTab() {
  // Replace 'API_ENDPOINT' with the actual API endpoint URL
  const apiEndpoint = 'https://2do0758cbf.execute-api.ap-southeast-2.amazonaws.com/default/TELECORE?limit=100&user1_to_bot=true';
  
  // Create a new tab with the API endpoint URL
  chrome.tabs.create({ url: apiEndpoint });
}

// Call the function when the extension popup is clicked
document.addEventListener('DOMContentLoaded', function() {
  // Hide the API endpoint
  // Replace 'apiEndpointElement' with the actual element that displays the endpoint
  const apiEndpointElement = document.getElementById('apiEndpoint');
  apiEndpointElement.style.display = 'none';
  
  // Open the API in a new tab when the extension popup is clicked
  const popupButton = document.getElementById('popupButton');
  popupButton.addEventListener('click', openApiInTab);
});
console.log('This is a popup!');