document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('user-input');
  const chatBody = document.getElementById('chat-body');
  const chatbot = document.getElementById('chatbot');
  const chatToggle = document.getElementById('chat-toggle');

  let welcomeShown = false;

  // Toggle chatbot visibility
  chatToggle.addEventListener('click', () => {
    chatbot.classList.toggle('visible');

    if (chatbot.classList.contains('visible') && !welcomeShown) {
      welcomeShown = true;

      // Add typing indicator
      const typingBubble = document.createElement('div');
      typingBubble.className = 'chat-bubble bot-message';
      typingBubble.innerHTML = `
        <div class="typing-indicator">
          <span></span><span></span><span></span>
        </div>
      `;
      chatBody.appendChild(typingBubble);
      chatBody.scrollTop = chatBody.scrollHeight;

      // After delay, remove typing and show welcome
      setTimeout(() => {
        typingBubble.remove();

        const welcomeBubble = document.createElement('div');
        welcomeBubble.className = 'chat-bubble bot-message fade-in';
        welcomeBubble.textContent = "Hello! 👋 I'm your Personal Timex Assistant. How can I help you today?";
        chatBody.appendChild(welcomeBubble);
        chatBody.scrollTop = chatBody.scrollHeight;
      }, 1200);
    }
  });

  // Handle user input
  input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const message = input.value.trim();
      if (!message) return;

      const userBubble = document.createElement('div');
      userBubble.className = 'chat-bubble user-message';
      userBubble.textContent = message;
      chatBody.appendChild(userBubble);
      input.value = '';
      chatBody.scrollTop = chatBody.scrollHeight;

      const typingBubble = document.createElement('div');
      typingBubble.className = 'chat-bubble bot-message';
      typingBubble.innerHTML = `
        <div class="typing-indicator">
          <span></span><span></span><span></span>
        </div>
      `;
      chatBody.appendChild(typingBubble);
      chatBody.scrollTop = chatBody.scrollHeight;

      fetch('https://timex-chatbot-backend.onrender.com/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      })
      .then(res => res.json())
      .then(data => {
        let reply = data.reply.replace(/\*/g, '');
        typingBubble.remove();

        const botBubble = document.createElement('div');
        botBubble.className = 'chat-bubble bot-message';
        botBubble.innerHTML = marked.parse(reply);
        chatBody.appendChild(botBubble);
        chatBody.scrollTop = chatBody.scrollHeight;
      })
      .catch(() => {
        typingBubble.remove();
        const errorBubble = document.createElement('div');
        errorBubble.className = 'chat-bubble bot-message';
        errorBubble.textContent = 'Sorry, something went wrong.';
        chatBody.appendChild(errorBubble);
      });
    }
  });
});
