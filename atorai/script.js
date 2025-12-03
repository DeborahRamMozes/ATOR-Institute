// ATØR-AI FRONTEND SCRIPT
// Minimal, stable, no animations, no fancy nonsense.

const form = document.getElementById("ator-form");
const input = document.getElementById("ator-input");
const output = document.getElementById("ator-output");

form.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const userMsg = input.value.trim();
  if (!userMsg) return;

  output.innerHTML += `<div class="msg user">${userMsg}</div>`;
  input.value = "";

  try {
    const response = await fetch("/api/atorai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q: userMsg })
    });

    const data = await response.json();
    const bot = data.reply || "…no response…";

    output.innerHTML += `<div class="msg bot">${bot}</div>`;
    output.scrollTop = output.scrollHeight;

  } catch (err) {
    output.innerHTML += `<div class="msg error">error communicating with ATØR-AI</div>`;
  }
});
