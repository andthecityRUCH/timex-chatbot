document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('user-input');
    const chatBody = document.getElementById('chat-body');
    const chatbot = document.getElementById('chatbot');
    const chatToggle = document.getElementById('chat-toggle');
  
    // Animate toggle visibility
    chatToggle.addEventListener('click', () => {
      if (chatbot.classList.contains('visible')) {
        chatbot.classList.remove('visible');
      } else {
        chatbot.classList.add('visible');
      }
    });
  
    // Handle input
    input.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
  
        const message = input.value.trim();
        if (!message) return;
  
        chatBody.innerHTML += `<div><b>You:</b> ${message}</div>`;
        input.value = '';
        chatBody.scrollTop = chatBody.scrollHeight;
  
        fetch('https://timex-chatbot-backend.onrender.com/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
         })

          .then(res => res.json())
          .then(data => {
            // Clean the response (remove * and limit to 2 sentences max)
            let reply = data.reply.replace(/\*/g, '');
            chatBody.innerHTML += `<div><b>Timex Bot:</b> ${reply}</div>`;
            chatBody.scrollTop = chatBody.scrollHeight;
          })
          .catch(() => {
            chatBody.innerHTML += `<div><b>Timex Bot:</b> Sorry, something went wrong.</div>`;
          });
      }
    });
  });
  