# TextAI Dock

**TextAI Dock** is a sleek, always-on-top AI assistant sidebar for desktop that allows you to rewrite and improve text using GPT-4o.  
It streams AI responses in real-time into a modern, chat-style UI.

---

## ✨ Features

- Floating sidebar (always docked to the right of the screen)
- Modern dark theme
- Chat-style streaming AI responses
- Supports GPT-4o (or any other OpenAI model)
- User prompt + input text
- Always-on-top window
- Uses secure environment variable for the OpenAI API key

---

## 🖥️ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```
### 2️⃣ Install dependencies
```bash
Copy
Edit
npm install
```
### 3️⃣ Set your OpenAI API key
Create a .env file in the root of the project:

plaintext
Copy
Edit
OPENAI_API_KEY=sk-your-real-openai-api-key
✅ Make sure your .env is listed in .gitignore (already configured in this repo).

### 4️⃣ Run the app
``` bash
Copy
Edit
npm start
```
The sidebar will launch, docked to the right side of your screen.

### 📝 Usage
Enter the text you want to modify.

Enter your prompt (example: "Rewrite to sound professional").

Click "Submit".

Watch the response stream into the chat window in real-time!

### 🛡️ Important Notes
Never commit your API key to Git. This project uses a .env file to keep secrets safe.

If you change screens or monitor sizes, restart the app to reposition the sidebar.

Currently tested on macOS and Windows.

### 👨‍💻 Tech Stack
Electron

OpenAI Node SDK (v4) with streaming

HTML / CSS / JavaScript (no frameworks)

dotenv for secure API key management

### 🛠️ Future Improvements (Planned)
Submit on Enter key

Clear chat button

Global hotkey to toggle the sidebar

Minimize to tray option
