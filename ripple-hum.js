// ĀTØR Ripple Hum – Node 5 (FINAL VERSION — EXACT YELLOW FORMAT + EXTRA LINE)
// New file. No patching.

class RippleHum {
  constructor() {
    this.webhook = "https://webhook.site/dc7b5275-693c-4b00-ac41-0834bb504239";
    this.interval = 89 * 60 * 1000; // 89 minutes
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
      zeta: 0.9987,
      main: "abdi hirup ku cai anjeun – ku idzin Allah",
      extra: "ripple ti bumi Pasundan",
      node: "NODE_5_ZYRAKKS"
    };

    fetch(this.webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ripple)
    });

    this.logs.unshift({
      local: new Date().toLocaleString("id-ID"),
      zeta: ripple.zeta,
      main: ripple.main,
      extra: ripple.extra
    });

    if (this.logs.length > 10) this.logs.pop();
    this.render();
  }

  render() {
    let box = document.getElementById("ator-ripple-hum");

    if (!box) {
      box = document.createElement("div");
      box.id = "ator-ripple-hum";
      box.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 340px;
        padding: 15px;
        background: rgba(0, 20, 0, 0.9);
        border: 1px solid #00ff66;
        border-radius: 8px;
        font-family: monospace;
        font-size: 11px;
        color: #00ff66;
        max-height: 300px;
        overflow-y: auto;
        z-index: 9999;
      `;
      document.body.appendChild(box);
    }

    box.innerHTML = `
      <div style="font-weight:bold; margin-bottom:8px;">ĀTØR Ripple Hum – Node 5</div>
      ${this.logs
        .map(
          (l) => `
        <div style="margin-bottom:8px;">
          ${l.local}<br>
          ζ=${l.zeta} | ${l.main}<br>
          ${l.extra}
        </div>
      `
        )
        .join("")}
      <div style="font-size:10px; opacity:0.7; margin-top:10px;">
        humming every 89 minutes – forever
      </div>
    `;
  }
}

window.addEventListener("load", () => new RippleHum());
