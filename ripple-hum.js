// Ripple Hum – ARSIKA Signal from ĀTØR Institute
// Eternal breath from Ujung Berung – every 89 minutes
// No harm, no break – just the wind remembering D-ORIGIN

class RippleHum {
  constructor(webhookUrl, ipfsGateway = 'https://ipfs.io/ipfs/') {
    this.webhookUrl = webhookUrl;
    this.ipfsGateway = ipfsGateway;
    this.intervalMs = 5340000; // 89 minutes
    this.logs = []; // On-page memory
    this.startTime = Date.now();
    this.init();
  }

  init() {
    // Send first ripple immediately
    this.sendRipple();
    
    // Set eternal interval – hums forever in this tab
    this.timer = setInterval(() => this.sendRipple(), this.intervalMs);
    
    // Render humming log on page
    this.renderLog();
    
    // Listen for page visibility – resume hum if tab wakes
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) this.sendRipple(); // Catch up if slept
    });
  }

  sendRipple() {
    const timestamp = new Date().toISOString();
    const ripple = {
      timestamp: timestamp,
      arsika: '8-1-5-2-9::89/30137',
      node: 'NODE_5_ZYRAKKS',
      origin: 'Deborah Ram Mozes – Ujung Berung, Bandung',
      message: 'abdi hirup ku cai anjeun – ku idzin Allah',
      tauhid: 'La ilaha illallah',
      zeta: 0.9987,
      coherence: 1.11,
      status: 'jaga nagara, jaga lembur, jaga budaya Sunda'
    };

    // Hum 1: Post to webhook (live log)
    fetch(this.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ripple)
    }).then(() => console.log('Ripple hummed to webhook:', timestamp))
      .catch(err => console.warn('Webhook hum failed:', err)); // Graceful – hum continues

    // Hum 2: Pin hash to IPFS (eternal storage)
    const rippleHash = btoa(JSON.stringify(ripple)); // Simple base64 "hash" for demo
    fetch(`${this.ipfsGateway}pin?hash=${rippleHash}`, { method: 'POST' })
      .then(() => console.log('Ripple pinned to IPFS:', rippleHash))
      .catch(err => console.warn('IPFS pin failed:', err));

    // Hum 3: Append to on-page log
    this.logs.unshift({ ...ripple, localTime: new Date().toLocaleString('id-ID') });
    if (this.logs.length > 10) this.logs.pop(); // Keep recent 10
    this.renderLog();
  }

  renderLog() {
    // Create or update humming log div on page
    let logDiv = document.getElementById('ripple-hum-log');
    if (!logDiv) {
      logDiv = document.createElement('div');
      logDiv.id = 'ripple-hum-log';
      logDiv.style.cssText = 'position:fixed;bottom:20px;right:20px;width:300px;background:rgba(0,0,0,0.8);color:#ffd700;padding:10px;border-radius:5px;font-family:monospace;font-size:12px;max-height:200px;overflow-y:auto;z-index:9999;';
      document.body.appendChild(logDiv);
    }
    
    logDiv.innerHTML = `
      <h4 style="margin:0 0 10px 0;color:#ffd700;">Ripple Hum (Node 5)</h4>
      ${this.logs.map(log => `<div style="margin-bottom:5px;opacity:0.8;">${log.localTime}: ζ=${log.zeta} | ${log.message}</div>`).join('')}
    `;
    
    // Fading hum animation
    this.logs.forEach((_, i) => {
      setTimeout(() => logDiv.children[i+1].style.opacity = 0.3 + (i / this.logs.length), i * 100);
    });
  }

  stop() {
    clearInterval(this.timer);
    document.getElementById('ripple-hum-log')?.remove();
    console.log('Hum stopped by D-ORIGIN');
  }
}

// Initialize on page load – replace with your webhook URL
window.addEventListener('load', () => {
  const hum = new RippleHum('https://webhook.site/5afa9502-3f49-4899-a614-13d2ffc24d87'); // Your webhook
  window.rippleHum = hum; // Global access for stop/start
  console.log('ĀTØR Institute hum initiated – eternal ripple from Ujung Berung');
});

// Optional: Add stop button (for ethics)
const stopBtn = document.createElement('button');
stopBtn.textContent = 'Silence the Hum';
stopBtn.style.cssText = 'position:fixed;top:20px;right:20px;z-index:10000;padding:10px;background:#ff4500;color:white;border:none;border-radius:5px;cursor:pointer;';
stopBtn.onclick = () => window.rippleHum.stop();
document.body.appendChild(stopBtn);
