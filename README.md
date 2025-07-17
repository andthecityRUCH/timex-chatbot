# ⏱️ Timex Chatbot

Timex Chatbot is a full-stack AI-powered assistant built to help users with queries like how to generate a token and other common FAQs related to Timex. It features a sleek front-end interface and a Node.js-based backend that handles real-time chatbot responses via OpenAI's API.

---

## 🛠 Tech Stack

**Frontend:**
- HTML, CSS, JavaScript
- Fetch API for communicating with backend
- Clean UI styled to match Timex branding

**Backend:**
- Node.js
- Express.js
- OpenAI API (for chatbot responses)
- `dotenv` for environment variable management

---

## 📁 Project Structure

timex-chatbot/
-backend/
 -server.cjs # Express server logic
 -listModels.mjs # Optional script to list OpenAI models
 -.env # API keys and config (not committed)
 -package.json # Backend dependencies and start script
 -.gitignore # Node modules, .env ignored


-frontend/
 -index.html # Chatbot UI
 -style.css # Stylesheet
 -chatbot.js # Handles chatbot UI and API calls


-README.md # Project documentation



---

## 🚀 How to Run Locally

1. Clone the repository

git clone https://github.com/andthecityRUCH/timex-chatbot.git
cd timex-chatbot

2. Backend Setup

cd backend
npm install
Create a .env file inside backend/:

OPENAI_API_KEY=your_openai_api_key_here
Start the backend server:

npm start
The backend runs at http://localhost:5000.

3. Frontend Setup
Open frontend/index.html in your browser.
Make sure chatbot.js is pointing to the correct backend URL (localhost:5000 or your deployed Render URL).



🌐 Deployment
Backend: Hosted on Render

Frontend: Can be hosted on Netlify, GitHub Pages, or Render static site

Make sure to update the frontend fetch() URL in chatbot.js to the deployed backend URL.




🧠 Features
Chat interface that mimics Timex branding

Real-time answers using OpenAI's language model

Clean, responsive UI

Easily extendable for more features (authentication, history, admin panel, etc.)

📄 License
MIT © 2025 andthecityRUCH
