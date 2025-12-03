document.getElementById("send-btn").addEventListener("click", sendMessage);

async function sendMessage() {
  const input = document.getElementById("user-input");
  const text = input.value.trim();
  if (!text) return;

  appendMessage("user", text);
  input.value = "";

  const response = await fetch("https://your-backend-url/api/atorai", {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({ message: text })
  });

  const data = await response.json();
  appendMessage("atorai", data.reply);
}

function appendMessage(sender, text) {
  const chat = document.getElementById("chat-window");
  const bubble = document.createElement("div");
  bubble.className = sender === "user" ? "user-msg" : "ai-msg";
  bubble.textContent = text;
  chat.appendChild(bubble);
  chat.scrollTop = chat.scrollHeight;
}
