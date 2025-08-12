document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('user-input');
  const chatBody = document.getElementById('chat-body');
  const chatbot = document.getElementById('chatbot');
  const chatToggle = document.getElementById('chat-toggle');

  let welcomeShown = false;

  // Function to create a chat bubble
  function createBubble(message, className) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${className}`;
    bubble.innerHTML = marked.parse(message);
    chatBody.appendChild(bubble);
    chatBody.scrollTop = chatBody.scrollHeight;
    return bubble;
  }

  // Function to show quick reply buttons
  function showQuickReplies(replies) {
    const container = document.createElement('div');
    container.className = 'quick-replies';

    replies.forEach(reply => {
      const button = document.createElement('button');
      button.className = 'quick-reply';
      button.textContent = reply;
      button.addEventListener('click', () => {
        input.value = reply;
        input.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
        container.remove(); // Remove buttons after click
      });
      container.appendChild(button);
    });

    chatBody.appendChild(container);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // Toggle chatbot visibility
  chatToggle.addEventListener('click', () => {
    chatbot.classList.toggle('visible');

    if (chatbot.classList.contains('visible') && !welcomeShown) {
      welcomeShown = true;

      const typingBubble = document.createElement('div');
      typingBubble.className = 'chat-bubble bot-message'; 
      typingBubble.innerHTML = `
        <div class="typing-indicator">
          <span></span><span></span><span></span>
        </div>
      `;
      chatBody.appendChild(typingBubble);
      chatBody.scrollTop = chatBody.scrollHeight;

      setTimeout(() => {
        typingBubble.remove();
        createBubble("Hello! 👋 I'm your Personal Timex Assistant. How can I help you today?", 'bot-message fade-in');
      }, 1200);
    }
  });

  // Handle user input
  input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const message = input.value.trim();
      if (!message) return;

      createBubble(message, 'user-message');
      input.value = '';

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
        typingBubble.remove();
        createBubble(data.reply.replace(/\*/g, ''), 'bot-message');

        if (Array.isArray(data.quickReplies) && data.quickReplies.length > 0) {
          showQuickReplies(data.quickReplies);
        }
      })
      .catch(() => {
        typingBubble.remove();
        createBubble('Sorry, something went wrong.', 'bot-message');
      });
    }
  });
});
