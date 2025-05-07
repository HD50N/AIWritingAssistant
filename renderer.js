const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
  const textArea = document.getElementById('inputText');
  const promptInput = document.getElementById('promptText');
  const outputDiv = document.getElementById('aiOutput');
  const submitBtn = document.getElementById('submitBtn');

  submitBtn.addEventListener('click', () => {
    const text = textArea.value.trim();
    const prompt = promptInput.value.trim();

    if (!text || !prompt) {
      const warning = document.createElement('div');
      warning.className = 'aiMessage';
      warning.style.color = 'orange';
      warning.textContent = 'Please provide both text and a prompt.';
      outputDiv.appendChild(warning);
      return;
    }

    // Clear previous output and add new chat bubble
    outputDiv.innerHTML = '';
    const messageDiv = document.createElement('div');
    messageDiv.className = 'aiMessage';
    outputDiv.appendChild(messageDiv);

    // Send data to main process to start streaming
    ipcRenderer.send('rewrite-text-stream', { text, prompt });
  });

  // When a streamed token arrives, append it to the latest message bubble
  ipcRenderer.on('stream-token', (event, token) => {
    let lastMessage = outputDiv.querySelector('.aiMessage:last-child');

    if (!lastMessage) {
      // Shouldn't happen, but just in case:
      lastMessage = document.createElement('div');
      lastMessage.className = 'aiMessage';
      outputDiv.appendChild(lastMessage);
    }

    lastMessage.textContent += token;
    outputDiv.scrollTop = outputDiv.scrollHeight; // Auto-scroll to bottom
  });

  ipcRenderer.on('stream-end', () => {
    // Optional: could add "✔ Done" at end
    const doneIndicator = document.createElement('div');
    doneIndicator.className = 'aiMessage';
    doneIndicator.style.fontSize = '11px';
    doneIndicator.style.color = '#6a9955'; // greenish
    doneIndicator.textContent = '✔ Response complete';
    outputDiv.appendChild(doneIndicator);
    outputDiv.scrollTop = outputDiv.scrollHeight;
  });

  ipcRenderer.on('stream-error', (event, errorMsg) => {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'aiMessage';
    errorDiv.style.color = 'red';
    errorDiv.textContent = errorMsg;
    outputDiv.appendChild(errorDiv);
    outputDiv.scrollTop = outputDiv.scrollHeight;
  });
});
