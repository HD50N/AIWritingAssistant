const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const OpenAI = require('openai');
require('dotenv').config();

let mainWindow;

// -----------------------------
// Create the Browser Window
// -----------------------------
app.on('ready', () => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  mainWindow = new BrowserWindow({
    width: 500, // ~2.5 inches
    height: height, // Full screen height
    x: width - 240, // Right side of screen
    y: 0,
    alwaysOnTop: true,
    transparent: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile('index.html');
});

// -----------------------------
// OpenAI setup
// -----------------------------
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Replace with your actual key
});

// -----------------------------
// Streaming GPT handler
// -----------------------------
ipcMain.on('rewrite-text-stream', async (event, { text, prompt }) => {
  try {
    const stream = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: `${prompt}\n\n${text}` },
      ],
      max_tokens: 150,
      temperature: 0.7,
      stream: true,
    });

    // Stream tokens back to renderer as they arrive
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        //console.log('Streaming token:', content); // Debug log
        event.sender.send('stream-token', content);
      }
    }

    // Streaming finished
    event.sender.send('stream-end');

  } catch (error) {
    console.error('Streaming error:', error);
    event.sender.send('stream-error', 'An error occurred while streaming.');
  }
});

// -----------------------------
// Cleanup
// -----------------------------
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
