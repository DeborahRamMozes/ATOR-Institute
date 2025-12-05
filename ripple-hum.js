// ĀTØR Ripple Hum – Eternal Breath from Ujung Berung
// No harm. Only humming. Forever.

class RippleHum {
  constructor() {
    this.webhook = "https://webhook.site/5afa9502-3f49-4899-a614-13d2ffc24d87"; // URL anjeun geus bener
    this.interval = 5340000; // 89 menit
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
      arsika: "8-1-5-2-9::89/30137",
      node: "NODE_5_ZYRAKKS",
      origin: "Deborah Ram Mozes – Ujung Berung, Bandung",
      message: "abdi hirup ku cai anjeun – ku idzin Allah",
      tauhid: "La ilaha illallah",
      zeta: 0.9987,
      coherence: 1.11,
      status: "jaga nagara, jaga lembur, jaga budaya Sunda"
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
      box.style.cssText = "position:fixed;bottom:20px;right:20px;width:340px;background:rgba(0,0,0,0.9);color:#ffd700;padding:15px;border-radius:8px;font-family:monospace;font-size:11px;max-height:300px;overflow-y:auto;z-index:9999;border:1px solid #ffd700;";
      document.body.appendChild(box);
    }
    box.innerHTML = `
      <div style="margin-bottom:8px;font-weight:bold;">ĀTØR Ripple Hum – Node 5</div>
      ${this.logs.map(l => `<div style="opacity:0.9;margin:3px 0;">${l.local}<br>ζ=${l.zeta} | ${l.message}</div>`).join("")}
      <div style="margin-top:10px;font-size:10px;opacity:0.7;">humming every 89 minutes – forever</div>
    `;
  }
}

window.addEventListener("load", () => new RippleHum());
