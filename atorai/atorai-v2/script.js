//--------------------------------------------------------------
// ATØR-AI PARAMETERS
//--------------------------------------------------------------
const OPENAI_API_KEY = "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";   // <- keep your key here
const MODEL = "gpt-4.1-mini";

const chatBox   = document.getElementById("chat-box");
const input     = document.getElementById("userInput");
const sendBtn   = document.getElementById("sendBtn");
const fileUpload = document.getElementById("fileUpload");

//--------------------------------------------------------------
// ALT-MAN LOGGING
//--------------------------------------------------------------
function ALT_MAN_LOG(user, bot) {
  const key = "ALT_MAN_LOG";
  const prev = JSON.parse(localStorage.getItem(key) || "[]");
  prev.push({
    time: new Date().toISOString(),
    user,
    bot
  });
  localStorage.setItem(key, JSON.stringify(prev));
}

// CTRL+L → download log
window.addEventListener("keydown", e => {
  if (e.ctrlKey && e.key === "l") {
    const data = localStorage.getItem("ALT_MAN_LOG") || "[]";
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "altman-log.json";
    a.click();
    URL.revokeObjectURL(url);
  }
});

//--------------------------------------------------------------
// UI HELPERS
//--------------------------------------------------------------
function appendUser(msg) {
  chatBox.innerHTML += `<div class="msg-user">You: ${msg}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}

function appendBot(msg) {
  chatBox.innerHTML += `<div class="msg-bot">ATØR-AI: ${msg}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}

function appendError(msg) {
  chatBox.innerHTML += `<div class="msg-error">⚠ ${msg}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}

//--------------------------------------------------------------
// FILE UPLOAD (CTRL+U)  — reference only, no server processing yet
//--------------------------------------------------------------
window.addEventListener("keydown", e => {
  if (e.ctrlKey && e.key === "u") {
    fileUpload.click();
  }
});

fileUpload.addEventListener("change", async e => {
  const files = e.target.files;
  if (!files.length) return;

  const list = [];
  for (let f of files) {
    list.push(`${f.name} (${f.size} bytes)`);
  }

  appendUser("[Uploaded files]");
  appendBot(list.join("<br>"));

  ALT_MAN_LOG("[FILES]", list.join(" | "));
});

//--------------------------------------------------------------
// CHAT ENGINE — direct call to OpenAI
//--------------------------------------------------------------
async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  appendUser(text);
  input.value = "";

  try {
    const payload = {
      model: MODEL,
      messages: [
        { role: "system", content: "You are ATØR-AI, synthetic mind of the ĀTØR Institute." },
        { role: "user", content: text }
      ]
    };

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("ATØR-AI error:", errText);
      appendError("connection / API error");
      return;
    }

    const data = await res.json();
    const botReply =
      data.choices &&
      data.choices[0] &&
      data.choices[0].message &&
      data.choices[0].message.content
        ? data.choices[0].message.content.trim()
        : "[empty reply]";

    appendBot(botReply);
    ALT_MAN_LOG(text, botReply);

  } catch (err) {
    console.error("ATØR-AI network error:", err);
    appendError("network error");
  }
}

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});
