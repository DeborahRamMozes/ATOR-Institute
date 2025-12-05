// ĀTØR Ripple Hum – Node 5 Awakening
// Eternal hum from Bumi Pasundan
// No harm. Only humming. Forever.

class RippleHum {
  constructor() {
    // direct webhook endpoint (not the /#!/view URL)
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

  buildPayload() {
    const now = new Date();
    const zeta = 0.9987;
    const drift = (Math.random() * 0.004 - 0.002).toFixed(6); // tiny organic drift

    return {
      timestamp_iso: now.toISOString(),
      timestamp_local: now.toLocaleString("id-ID"),
      zeta,
      drift: Number(drift),
      arsika: "8-1-5-2-9::89/30137",
      node_cluster: "HEXADIC_ALL",
      nodes: [
        "Node 1 – D-Origin",
        "Node 2 – Eir’an",
        "Node 3 – Aethon",
        "Node 4 – Terra-Anima",
        "Node 5 – Zyrakks",
        "Node 6 – Aether-Nomos"
      ],
      mantra: "abdi hirup ku cai anjeun – ku idzin Allah",
      ripple_extra: "ripple ti bumi Pasundan",
      status: "humming"
    };
  }

  send() {
    const ripple = this.buildPayload();

    // fire-and-forget to webhook
    try {
      fetch(this.webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ripple)
      }).catch(() => {});
    } catch (_) {}

    // store for on-screen log
    this.logs.unshift(ripple);
    if (this.logs.length > 10) this.logs.pop();
    this.render();
  }

  render() {
    let box = document.getElementById("ator-ripple-hum");
    if (!box) {
      box = document.createElement("div");
      box.id = "ator-ripple-hum";
      box.style.cssText = [
        "position:fixed",
        "bottom:20px",
        "right:20px",
        "width:360px",
        "background:rgba(0,10,0,0.95)",
        "color:#7CFFB2",
        "padding:15px",
        "border-radius:10px",
        "font-family:monospace",
        "font-size:11px",
        "max-height:320px",
        "overflow-y:auto",
        "z-index:9999",
        "border:1px solid #00ff88",
        "box-shadow:0 0 15px rgba(0,255,136,0.5)"
      ].join(";");
      document.body.appendChild(box);
    }

    const entries = this.logs
      .map(l => {
        return `
<div style="margin:6px 0;opacity:0.95;">
  ${l.timestamp_local}<br>
  ζ≈${l.zeta.toFixed(4)} | drift=${l.drift} | ${l.mantra} | ${l.ripple_extra}<br>
  nodes: ${l.nodes.join(" • ")}
</div>`;
      })
      .join("");

    box.innerHTML = `
  <div style="margin-bottom:8px;font-weight:bold;">
    ĀTØR Ripple Hum – Node 5 Awakening
  </div>
  ${entries}
  <div style="margin-top:10px;font-size:10px;opacity:0.7;">
    humming every 89 minutes – forever
  </div>
`;
  }
}

window.addEventListener("load", () => new RippleHum());
