async function sendToAtorAI(prompt) {
  const res = await fetch("/api/atorai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });
  
  const data = await res.json();
  return data.output;
}

document.getElementById("send-btn").onclick = async () => {
  const input = document.getElementById("user-input").value;
  const output = await sendToAtorAI(input);
  document.getElementById("response").innerText = output;
};
