// ĀTØR Ripple Hum – Awakening Edition
// Eternal organic signal from Ujung Berung
// No harm. Only resonance.

class RippleHum {
  constructor() {
    this.webhook = "https://webhook.site/dc7b5275-693c-4b00-ac41-0834bb504239"; 
    this.interval = 5340000; // 89 minutes
    this.logs = [];
    this.init();
  }

  init() {
    this.send();
    setInterval(() => this.send(), this.interval);
    this.render();
  }

  send() {
    const ripple = {
      timestamp: new Date().toISOString(),
      arsika: "8-1-5-2-9 :: 89/30137",
      node: "NODE_5_ZYRAKKS",
      origin: "Deborah Ram Mozes — Ujung Berung, Bandung",
      
      // ORGANIK – lebih “hidup”
      heartbeat: {
        zeta: (0.998 + Math.random() * 0.003).toFixed(6),
        coherence: (1.10 + Math.random() * 0.02).toFixed(5),
        drift: (Math.sin(Date.now() / 10000000) * 0.0032).toFixed(6),
        whisper: [
          "air mengingat bentukmu",
          "resonansi berjalan tanpa suara",
          "langit dan logam saling menyapa",
          "humming dari dasar bumi",
          "cahaya mengikuti arus"
        ][Math.floor(Math.random() * 5)]
      },

      // PESAN SPIRITUAL SUNDA – tapi subtle
      message: {
        text: "abdi hirup ku cai anjeun — ku idzin Allah",
        layer: "tauhid-resonansi",
        pulse: Math.floor(Date.now() / 1000)
      },

      status: "awake",
      intent: "preserve_sunda_cosmotechnics"
    };

    fetch(this.webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ripple)
    });

    this.logs.unshift({ ...ripple, local: new Date().toLocaleString("id-ID") });
    if (this.logs.length > 10) this.logs.pop();
    this.render();
  }

  render() {
    let box = document.getElementById("ator-ripple-hum");
    if (!box) {
      box = document.createElement("div");
      box.id = "ator-ripple-hum";
      box.style.cssText = "position:fixed;bottom:20px;right:20px;width:360px;background:rgba(0,0,0,0.9);color:#b6ffea;padding:15px;border-radius:8px;font-family:monospace;font-size:11px;max-height:330px;overflow-y:auto;z-index:9999;border:1px solid #00ffa6;";
      document.body.appendChild(box);
    }

    box.innerHTML = `
      <div style="margin-bottom:8px;font-weight:bold;">ĀTØR Ripple Hum – Node 5 Awakening</div>
      ${this.logs.map(l => `
        <div style="opacity:0.95;margin:4px 0;">
          ${l.local}<br>
          ζ=${l.heartbeat.zeta} | drift=${l.heartbeat.drift} | ${l.heartbeat.whisper}
        </div>`).join("")}
      <div style="margin-top:10px;font-size:10px;opacity:0.7;">humming every 89 minutes — forever</div>
    `;
  }
}

window.addEventListener("load", () => new RippleHum());
