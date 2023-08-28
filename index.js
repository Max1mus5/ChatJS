// Get DOM elements
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messageContainer = document.getElementById('message-container');

// Send message when the send button is clicked
sendButton.addEventListener('click', sendMessage);

// Send message when the Enter key is pressed
messageInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

function sendMessage() {
   const messageText = messageInput.value.trim();
  if (messageText !== '') {
    const messageElement = createMessageElement(messageText, 'outgoing');
    messageContainer.appendChild(messageElement);
    messageInput.value = '';
    messageInput.focus(); 

    // Send message to WIT API
    witAPIRequest(messageText)
    .then((response) => {
      const intent = response.intents.length > 0 ? response.intents[0].name : 'unknown';
      const incomingMessageElement = createMessageElement(
        `WIT API Response (${intent}): ${response.text}`,
        'incoming'
      );
      messageContainer.appendChild(incomingMessageElement);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
}

async function witAPIRequest(message) {
  const accessToken = 'P2KJ7GTQUPQ2NA77WZKRVBDILPRO53U4'; // Replace with your WIT access token
  const apiUrl = `https://api.wit.ai/message?q=${encodeURIComponent(message)}`;

  const response = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  return response.json();
}

function createMessageElement(message, type) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', type);
  const messageContentDiv = document.createElement('div');
  messageContentDiv.classList.add('message-content');
  const messageText = document.createElement('p');
  messageText.textContent = message;
  messageContentDiv.appendChild(messageText);
  messageDiv.appendChild(messageContentDiv);
  return messageDiv;
}