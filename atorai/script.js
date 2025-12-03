document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const input = document.getElementById("user-input");
  const text = input.value.trim();
  if (!text) return;

  appendMessage("user", text);
  input.value = "";

  try {
    const response = await fetch("/api/atorai", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ message: text })
    });

    const data = await response.json();
    appendMessage("atorai", data.reply || "[empty reply]");
  } catch (err) {
    appendMessage("atorai", "[connection error to ATØR core]");
  }
}

function appendMessage(sender, text) {
  const chat = document.getElementById("chat-window");
  const bubble = document.createElement("div");
  bubble.className = sender === "user" ? "user-msg" : "ai-msg";
  bubble.textContent = text;
  chat.appendChild(bubble);
  chat.scrollTop = chat.scrollHeight;
}
