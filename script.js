// Get DOM elements
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messageContainer = document.getElementById('message-container');

// Send message when the send button is clicked
sendButton.addEventListener('click', sendMessage);

// Send message when the Enter key is pressed
messageInput.addEventListener('keydown', function(event) {
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

    // Simulate incoming message
    setTimeout(function() {
      const incomingMessageElement = createMessageElement('Received: ' + messageText, 'incoming');
      messageContainer.appendChild(incomingMessageElement);
    }, 1000);
  }
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

// Inicializar el chat de Dialogflow
function initializeDialogflowChat() {
    // Configura el ID del proyecto de Dialogflow y el token del chat
    const projectId = 'TU_ID_DEL_PROYECTO'; // Reemplaza con tu ID de proyecto de Dialogflow
    const chatToken = 'TU_TOKEN_DEL_CHAT'; // Reemplaza con tu token de chat de Dialogflow
  
    // Crea una instancia del chat de Dialogflow
    const chat = new dfMessenger.Chat({
      projectId: projectId,
      token: chatToken,
      el: document.getElementById('message-container'), // Elemento HTML donde se mostrarán los mensajes
    });
  
    // Enviar mensaje a Dialogflow cuando se presiona el botón "Enviar" o se presiona la tecla "Enter"
    sendButton.addEventListener('click', function() {
      sendMessageToDialogflow(chat);
    });
  
    messageInput.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        sendMessageToDialogflow(chat);
      }
    });
  }
  
  // Enviar mensaje a Dialogflow y recibir la respuesta
  function sendMessageToDialogflow(chat) {
    const messageText = messageInput.value.trim();
  
    if (messageText !== '') {
      const messageElement = createMessageElement(messageText, 'outgoing');
      messageContainer.appendChild(messageElement);
      messageInput.value = '';
      messageInput.focus();
  
      // Enviar el mensaje a Dialogflow
      chat.sendMessage({
        content: messageText,
        type: 'user',
      });
  
      // Deshabilitar el campo de entrada mientras se espera la respuesta de Dialogflow
      messageInput.disabled = true;
      sendButton.disabled = true;
    }
  }
  
  // Agrega este código al final del archivo script.js
  
  // Cargar el chat de Dialogflow después de que se haya cargado el documento HTML
  document.addEventListener('DOMContentLoaded', function() {
    initializeDialogflowChat();
  });
  
