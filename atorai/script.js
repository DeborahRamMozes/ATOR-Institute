const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const log = document.getElementById("chat-log");

function appendMessage(sender, text) {
  const row = document.createElement("div");
  row.className = `chat-row ${sender}`;

  const bubble = document.createElement("div");
  bubble.className = "chat-bubble";
  bubble.textContent = text;

  row.appendChild(bubble);
  log.appendChild(row);
  log.scrollTop = log.scrollHeight;
}

async function sendPrompt(prompt) {
  const res = await fetch("/api/atorai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Request failed");
  }

  const data = await res.json();
  return data.output;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const prompt = input.value.trim();
  if (!prompt) return;

  appendMessage("user", prompt);
  input.value = "";
  input.disabled = true;

  appendMessage("ai", "…");
  const thinkingBubble = log.lastChild.querySelector(".chat-bubble");

  try {
    const reply = await sendPrompt(prompt);
    thinkingBubble.textContent = reply;
  } catch (err) {
    thinkingBubble.textContent = "[ĀTØR-AI error] " + err.message;
  } finally {
    input.disabled = false;
    input.focus();
  }
});
