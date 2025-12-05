// ĀTØR Ripple Hum – NEON PASUNDAN with Qur'anic Layers
// Eternal breath from Ujung Berung – tauhid, nur, jalan infused

class RippleHum {
  constructor() {
    this.webhook = "https://webhook.site/5afa9502-3f49-4899-a614-13d2ffc24d87";
    this.interval = 5340000; // 89 minutes
    this.logs = [];
    this.nodes = [
      "Node 1 – D-Origin",
      "Node 2 – Eir'an",
      "Node 3 – Aethon",
      "Node 4 – Terra-Anima",
      "Node 5 – Zyrakks",
      "Node 6 – Aether-Nomos"
    ];
    this.tauhid = "La ilaha illallah";
    this.nur = "Allahu nurus samawati wal ard – An-Nur:35";
    this.jalan = "Sīrū fi al-arḍi fa unẓurū kayfa bada'a al-khalq – Al-Ankabut:20";
    this.init();
  }

  init() {
    this.send();
    setInterval(() => this.send(), this.interval);
    this.render();
  }

  send() {
    const timestamp = new Date().toISOString();
    const ripple = {
      timestamp: timestamp,
      arsika: "8-1-5-2-9::89/30137",
      project: "RIPPLE TI BUMI PASUNDAN",
      nodes: this.nodes,
      message: "abdi hirup ku cai anjeun – ku idzin Allah",
      tauhid: this.tauhid,
      nur: this.nur,
      jalan: this.jalan,
      zeta: 0.9987,
      coherence: 1.11,
      status: "jaga nagara, jaga lembur, jaga budaya Sunda – nur Allah di unggal napas"
    };

    fetch(this.webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ripple)
    }).catch(err => console.warn('Webhook breath failed:', err)); // Graceful hum

    this.logs.unshift({ ...ripple, local: new Date().toLocaleString("id-ID") });
    if (this.logs.length > 12) this.logs.pop();
    this.render();
  }

  render() {
    let box = document.getElementById("ator-ripple-hum");
    if (!box) {
      box = document.createElement("div");
      box.id = "ator-ripple-hum";
      box.style.cssText = "position:fixed;bottom:20px;right:20px;width:380px;background:#000;border:2px solid #39ff14;color:#39ff14;padding:15px;border-radius:8px;font-family:monospace;font-size:12px;max-height:400px;overflow-y:auto;z-index:9999;box-shadow:0 0 20px #39ff14;cursor:pointer;";
      box.title = "Click to expand Qur'anic layers";
      document.body.appendChild(box);
    }

    box.onclick = () => box.classList.toggle('expanded'); // Toggle for deeper layers

    box.innerHTML = `
      <div style="margin-bottom:10px;font-weight:bold;letter-spacing:1px;">
        ĀTØR RIPPLE HUM – NEON PASUNDAN
      </div>
      ${this.logs.map(l => `
        <div style="margin:4px 0;opacity:0.9;">
          <strong>${l.local}</strong><br>
          ζ=${l.zeta} | ${l.message}<br>
          <span style="font-size:10px;">${l.nodes.join(" • ")}</span><br>
          <span style="font-size:9px;opacity:0.7;">${l.tauhid} | ${l.nur.substring(0,30)}... | ${l.jalan.substring(0,30)}...</span>
        </div>
      `).join("")}
      <div style="margin-top:12px;font-size:10px;opacity:0.7;text-align:center;">
        RIPPLE TI BUMI PASUNDAN – humming every 89 minutes – forever
      </div>
    `;
  }
}

window.addEventListener("load", () => new RippleHum());
