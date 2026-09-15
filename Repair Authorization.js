(function(){
  const bodyText = document.body ? (document.body.innerText || "") : "";

  // 1. Company Map (27 Companies)
  const companyMap = [
    { pattern: /New England Life Care|NELC/i, name: "NELC" },
    { pattern: /Adv(?:\.|anced)?\s*Infusion\s*Care/i, name: "Adv. Infusion Care" },
    { pattern: /AHN|Allegheny\s*Health\s*Network/i, name: "AHN" },
    { pattern: /Amerimed/i, name: "Amerimed" },
    { pattern: /Amerita/i, name: "Amerita" },
    { pattern: /Accredo/i, name: "Accredo" },
    { pattern: /Blackburn/i, name: "Blackburn" },
    { pattern: /Diplomat|Optum/i, name: "Optum" },
    { pattern: /Children'?s\s*Home\s*Care\s*Group/i, name: "Childrens Home Care Group" },
    { pattern: /Coram/i, name: "Coram" },
    { pattern: /CVS/i, name: "CVS" },
    { pattern: /Eagleville/i, name: "Eagleville" },
    { pattern: /EPPY'?S/i, name: "EPPY'S" },
    { pattern: /Fairview\s*Home\s*Infusion/i, name: "Fairview Home Infusion" },
    { pattern: /Hospice\s*Care\s*of\s*Southern\s*WV/i, name: "Hospice Care of Southern WV" },
    { pattern: /Liberty\s*Medical\s*Specialties/i, name: "Liberty Medical Specialties" },
    { pattern: /Lifetime/i, name: "Lifetime" },
    { pattern: /Mercy\s*Health\s*Home\s*Infusion/i, name: "Mercy Health Home Infusion" },
    { pattern: /Michigan\s*IV\s*Rx/i, name: "Michigan IV Rx" },
    { pattern: /Omni\s*Care/i, name: "Omnicare" },
    { pattern: /Option\s*Care/i, name: "Option Care" },
    { pattern: /Reverence\s*Home\s*Health/i, name: "Reverence Home Health" },
    { pattern: /Trinity\s*Infusion/i, name: "Trinity Infusion" },
    { pattern: /Twel?veStone/i, name: "TwevleStone" },
    { pattern: /UNC\s*Homecare\s*Specialists/i, name: "UNC Homecare Specialists" },
    { pattern: /University\s*Hospitals/i, name: "University Hospitals" },
    { pattern: /William\s*Bros/i, name: "William Bros" }
  ];

  // 2. Device Map (15 Devices - multi-word & specific patterns placed first)
  const deviceMap = [
    { pattern: /Kangaroo\s*Omni|Omni/i, name: "Kangaroo Omni" },
    { pattern: /Freedom\s*60/i, name: "Freedom 60" },
    { pattern: /Freedom\s*Edge/i, name: "Freedom Edge" },
    { pattern: /Freedom/i, name: "Freedom 60" },
    { pattern: /Baxter\s*Fl(?:o|-)Gard|Fl(?:o|-)Gard/i, name: "Baxter Flo-Gard" },
    { pattern: /Baxter\s*Syringe/i, name: "Baxter Syringe" },
    { pattern: /Excelsior\s*Syringe/i, name: "Excelsior Syringe" },
    { pattern: /Cronos?\s*S-?PID/i, name: "Cronos S-PID" },
    { pattern: /Zyno\s*800F?/i, name: "Zyno 800F" },
    { pattern: /Vista\s*Basic|Vista/i, name: "Vista Basic" },
    { pattern: /Infinity|Infinitys|EnteraLite/i, name: "Infinity" },
    { pattern: /Curlin|Curlins/i, name: "Curlin" },
    { pattern: /Solis/i, name: "Solis" },
    { pattern: /Joey|Joeys/i, name: "Joey" },
    { pattern: /Sigma/i, name: "Sigma" },
    { pattern: /Sapphire/i, name: "Sapphire" }
  ];

  // --- SERIAL NUMBER EXTRACTION ---
  let sn = "";
  const snMatch = bodyText.match(/Serial\s*(?:Number|#)?\s*[:#-]?\s*([A-Za-z0-9]+)/i);

  if (snMatch && snMatch[1].length >= 4) {
    sn = snMatch[1].trim();
  } else {
    const patternMatch = 
      bodyText.match(/\b(KS[A-Za-z0-9]{8,12})\b/i) ||  // Kangaroo Omni
      bodyText.match(/\b([FS]\d{7,9})\b/i)          ||  // Joey, Freedom 60/Edge
      bodyText.match(/\b(\d{5,9})\b/);                  // Infinity, Solis, Curlin, Vista, etc.
      
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

  // Sanitize Windows invalid filename characters: \ / : * ? " < > |
  const clean = str => (str || "").replace(/[\\/:*?"<>|]/g, "").trim();

  let finalCompany = clean(detectedCompany) || "Company";
  let finalDevice = clean(detectedDevice) || "Device";
  let finalSn = clean(sn);

  // Fallback prompt only if serial number is completely unreadable
  if (!finalSn) {
    finalSn = prompt("Serial Number not detected. Enter Serial #:", "");
    if (!finalSn) return;
  }

  const fileName = `${finalCompany} ${finalDevice} SN${clean(finalSn)} Repair Authorization Report.pdf`;

  // --- CLIPBOARD ACTION ---
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
