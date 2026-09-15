(function(){
  const bodyText = document.body ? (document.body.innerText || "") : "";

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
    { pattern: /Infinity|Infinitys|EnteraLite/i, name: "Infinity" },
    { pattern: /Omni|Omnis/i, name: "Omni" },
    { pattern: /Solis/i, name: "Solis" },
    { pattern: /Joey|Joeys/i, name: "Joey" },
    { pattern: /Curlin|Curlins/i, name: "Curlin" },
    { pattern: /Freedom|Freedoms/i, name: "Freedom" },
    { pattern: /Vista|Vistas/i, name: "Vista" },
    { pattern: /Legacy|Legacys/i, name: "Legacy" }
  ];

  // --- SERIAL NUMBER EXTRACTION ---
  let sn = "";
  const snMatch = bodyText.match(/Serial\s*(?:Number|#)?\s*[:#-]?\s*([A-Za-z0-9]+)/i);

  if (snMatch && snMatch[1].length >= 5) {
    sn = snMatch[1].trim();
  } else {
    const patternMatch = 
      bodyText.match(/\b(KS[A-Za-z0-9]{8,12})\b/i) ||  // 2. Omni
      bodyText.match(/\b([FS]\d{7,9})\b/i)          ||  // 4. Joey, 6. Freedom
      bodyText.match(/\b(\d{5,9})\b/);                  // 1. Infinity, 3. Solis, 5. Curlin, 7. Vista, 8. Legacy
      
    sn = patternMatch ? patternMatch[1].trim() : "";
  }

  // --- DEVICE DETECTION ---
  let detectedDevice = "";
  for (const d of deviceMap) {
    if (d.pattern.test(bodyText)) {
      detectedDevice = d.name;
      break;
    }
  }

  // --- COMPANY DETECTION ---
  let detectedCompany = "";
  for (const c of companyMap) {
    if (c.pattern.test(bodyText)) {
      detectedCompany = c.name;
      break;
    }
  }

  const clean = str => (str || "").replace(/[\\/:*?"<>|]/g, "").trim();

  let finalCompany = clean(detectedCompany) || "Company";
  let finalDevice = clean(detectedDevice) || "Device";
  let finalSn = clean(sn);

  // Fallback prompt only if serial number is completely missing
  if (!finalSn) {
    finalSn = prompt("Serial Number not detected. Enter Serial #:", "");
    if (!finalSn) return;
  }

  const fileName = `${finalCompany} ${finalDevice} SN${clean(finalSn)} Repair Authorization Report.pdf`;

  // --- COPY TO CLIPBOARD ---
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
        document.execCommand("copy") ? resolve() : reject();
      } catch(e) { reject(e); }
      document.body.removeChild(ta);
    });
  }

  copyText(fileName).then(() => {
    const toast = document.createElement("div");
    toast.style.cssText = "position:fixed;bottom:24px;right:24px;background:#1a1d1f;color:#4ade80;border:1px solid #2d3238;padding:14px 20px;border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.6);z-index:9999999;font-family:sans-serif;font-size:13px;max-width:420px;line-height:1.5;";
    toast.innerHTML = `
      <div style="font-weight:bold;color:#fff;margin-bottom:4px;">Ready to Paste!</div>
      <div style="color:#cbd2d9;font-family:monospace;font-size:12px;word-break:break-all;">${fileName}</div>
      <div style="color:#9aa0a6;font-size:11px;margin-top:6px;">Press <b>Ctrl + V</b> in the Save dialog.</div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  }).catch(() => {
    prompt("Copy filename manually (Ctrl+C):", fileName);
  });
})();
