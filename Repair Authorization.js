(function(){
  // Gather text from main body and all accessible iframes
  function getAllText() {
    let text = document.body ? (document.body.innerText || "") : "";
    const iframes = document.querySelectorAll("iframe, frame");
    iframes.forEach(f => {
      try {
        const doc = f.contentDocument || (f.contentWindow && f.contentWindow.document);
        if (doc && doc.body) {
          text += "\n" + doc.body.innerText;
        }
      } catch(e) {
        // cross-origin iframe security block
      }
    });
    return text;
  }

  const bodyText = getAllText();

  // 1. Company Map
  const companyMap = [
    { pattern: /New England Life Care|NELC/i, name: "NELC" },
    { pattern: /Accredo/i, name: "Accredo" },
    { pattern: /Amerita/i, name: "Amerita" },
    { pattern: /CVS/i, name: "CVS" },
    { pattern: /Coram/i, name: "Coram" },
    { pattern: /Diplomat|Optum/i, name: "Optum" },
    { pattern: /OmniCare/i, name: "OmniCare" },
    { pattern: /Option\s*Care/i, name: "Option Care" }
  ];

  // 2. Device Map
  const deviceMap = [
    { pattern: /Infinity|Infinitys/i, name: "Infinity" },
    { pattern: /Omni|Omnis/i, name: "Omni" },
    { pattern: /Solis/i, name: "Solis" },
    { pattern: /Joey|Joeys/i, name: "Joey" },
    { pattern: /Curlin|Curlins/i, name: "Curlin" },
    { pattern: /Freedom|Freedoms/i, name: "Freedom" },
    { pattern: /Vista|Vistas/i, name: "Vista" },
    { pattern: /Legacy|Legacys/i, name: "Legacy" }
  ];

  // Serial Number: check text, then common 9-digit Infinity / pump patterns
  let sn = "";
  const snMatch = bodyText.match(/Serial\s*(?:Number|#)?\s*[:#-]?\s*([A-Za-z0-9]+)/i);
  if (snMatch) {
    sn = snMatch[1].trim();
  } else {
    const rawSnMatch = bodyText.match(/\b([569]\d{8})\b/) || bodyText.match(/\b([A-Z]\d{6,8})\b/i);
    sn = rawSnMatch ? rawSnMatch[1].trim() : "UNKNOWN_SN";
  }

  // Device Detection
  let detectedDevice = "";
  for (const d of deviceMap) {
    if (d.pattern.test(bodyText)) {
      detectedDevice = d.name;
      break;
    }
  }
  if (!detectedDevice) {
    const modelMatch = bodyText.match(/(?:Model|Device)\s*[:/]\s*([^\n\r]+)/i);
    detectedDevice = modelMatch ? modelMatch[1].trim().split("/")[0].trim() : "Device";
  }

  // Company Detection
  let detectedCompany = "";
  for (const c of companyMap) {
    if (c.pattern.test(bodyText)) {
      detectedCompany = c.name;
      break;
    }
  }
  if (!detectedCompany) {
    const ownerMatch = bodyText.match(/Owner\s*:\s*([^\n\r]+)/i);
    if (ownerMatch) {
      detectedCompany = ownerMatch[1].split(/[-–,]/)[0].trim();
    } else {
      detectedCompany = "Company";
    }
  }

  // Sanitize Windows invalid filename characters
  const clean = str => str.replace(/[\\/:*?"<>|]/g, "").trim();

  // If text failed to parse (PDF viewer sandbox block), prompt user for quick input
  let finalCompany = clean(detectedCompany);
  let finalDevice = clean(detectedDevice);
  let finalSn = clean(sn);

  if (finalSn === "UNKNOWN_SN" || finalCompany === "Company") {
    // If the browser blocked PDF scraping, ask once with best-effort defaults
    const manualSn = prompt("Serial Number not detected automatically. Enter Serial #:", finalSn === "UNKNOWN_SN" ? "" : finalSn);
    if (manualSn) finalSn = clean(manualSn);

    if (finalCompany === "Company") {
      const manualCo = prompt("Enter Company Name (NELC, Coram, Option Care, etc.):", "NELC");
      if (manualCo) finalCompany = clean(manualCo);
    }
    if (finalDevice === "Device") {
      const manualDev = prompt("Enter Device Name (Infinity, Solis, Joey, etc.):", "Infinity");
      if (manualDev) finalDevice = clean(manualDev);
    }
  }

  const fileName = `${finalCompany} ${finalDevice} SN${finalSn} Repair Authorization Report.pdf`;

  // Clipboard Execution
  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise((resolve, reject) => {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try {
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        ok ? resolve() : reject();
      } catch (e) {
        document.body.removeChild(ta);
        reject(e);
      }
    });
  }

  copyText(fileName).then(() => {
    const toast = document.createElement("div");
    toast.style.cssText = "position:fixed;bottom:24px;right:24px;background:#1a1d1f;color:#4ade80;border:1px solid #2d3238;padding:14px 20px;border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.6);z-index:9999999;font-family:sans-serif;font-size:13px;max-width:420px;line-height:1.5;";
    toast.innerHTML = `
      <div style="font-weight:bold;color:#fff;margin-bottom:4px;">Copied to Clipboard!</div>
      <div style="color:#cbd2d9;font-family:monospace;font-size:12px;word-break:break-all;">${fileName}</div>
      <div style="color:#9aa0a6;font-size:11px;margin-top:6px;">Press <b>Ctrl + V</b> in the Save dialog.</div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  }).catch(() => {
    prompt("Copy filename manually (Ctrl+C):", fileName);
  });
})();
