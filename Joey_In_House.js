(function () {
  const highlightParts = [
    { name: "Back Case Over mold (New)", pn: "F31927" },
    { name: "BATTERY DOOR,JOEY", pn: "F31929" },
    { name: "Battery (Covidien) Li-Ion", pn: "F010506" },
    { name: "COVER-BUZZER(TYVEK)", pn: "F31940" },
    { name: "FLEX CIRCUIT ASSEMBLY", pn: "F31943" },
    { name: "FOAM BATTERY PAD", pn: "F32001" },
    { name: "FRONT CASE", pn: "F31928" },
    { name: "MAIN DOOR", pn: "F32061" },
    { name: "MOUNTING STUD THREADED", pn: "F31992" },
    { name: "Overlay (New)", pn: "1051140" },
    { name: "RICHO HARNESS CLIP", pn: "F080757" },
    { name: "ROTOR ASSEMBLY", pn: "F31934" },
    { name: "ULTRASONIC ASSEMBLY", pn: "F31941" },
  ].sort((a, b) => a.name.localeCompare(b.name));

  const standardParts = [
    { name: "3/16 E-STYLE RETAINING CLIP", pn: "F132239" },
    { name: "ALUMINUM SPACER", pn: "F31984" },
    { name: "Back Case Over mold (New)", pn: "F31927" },
    { name: "BATTERY DOOR,JOEY", pn: "F31929" },
    { name: "Battery (Covidien) Li-Ion", pn: "F010506" },
    { name: "Battery (R&D)", pn: "6214" },
    { name: "BATTERY/POWER HARNES,JOEY", pn: "F090716" },
    { name: "BUZZER HARNESS,JOEY", pn: "F090718" },
    { name: "COLLAR,JOEY", pn: "F31993" },
    { name: "COMMUNICATION PORT CONNECTOR", pn: "F132225" },
    { name: "COMMUNICATION PORT HARNESS", pn: "F090717" },
    { name: "COVER-BUZZER(TYVEK)", pn: "F31940" },
    { name: "DISPLAY LCD,JOEY", pn: "F060159" },
    { name: "ELECTRICAL PLUG", pn: "F010376" },
    { name: "FLEX CIRCUIT ASSEMBLY", pn: "F31943" },
    { name: "FOAM BATTERY PAD", pn: "F32001" },
    { name: "FRONT CASE", pn: "F31928" },
    { name: "Fuse", pn: "F010513" },
    { name: "GEARBOX ASSEMBLY, JOEY", pn: "SHF31942" },
    { name: "GEARBOX SPACER,JOEY", pn: "F31984" },
    { name: "HARNESS-COM PORT,JOEY", pn: "F090717" },
    { name: "Joey Power Cord W/Adapter", pn: "383491" },
    { name: "K22X8MM SCREW", pn: "F132193" },
    { name: "K30X8MM SCREW", pn: "F132195" },
    { name: "LENS-PC", pn: "F31939" },
    { name: "MAIN DOOR", pn: "F32061" },
    { name: "MOUNTING STUD THREADED", pn: "F31992" },
    { name: "Overlay (New)", pn: "1051140" },
    { name: "Overlay (Old Part #)", pn: "F132224" },
    { name: "PCB SPACERS", pn: "383493" },
    { name: "Pole Clamp Assembly", pn: "383493" },
    { name: "POLE CLAMP BRACKET", pn: "F31958" },
    { name: "POLE CLAMP COLLAR", pn: "F31993" },
    { name: "POLE CLAMP LEVER,JOEY", pn: "F141931" },
    { name: "Pole Clamp Knob", pn: "F141921" },
    { name: "RICHO HARNESS CLIP", pn: "F080757" },
    { name: "ROTOR ASSEMBLY", pn: "F31934" },
    { name: "ROTOR SHAFT SEAL", pn: "F31938" },
    { name: "SCREW #4, 15/16", pn: "F132236" },
    { name: "SCREW #6, 7/16", pn: "F132227" },
    { name: "SCREW #6,3", pn: "F132226" },
    { name: "SCREW #6,3/4", pn: "F132228" },
    { name: "SEAL-SENSORS,JOEY", pn: "F31938" },
    { name: "SHOULDER BOLT CAP SEAL,JOEY", pn: "F31937" },
    { name: "Shoulder Bolt #4,7/16", pn: "F132223" },
    { name: "ULTRASONIC ASSEMBLY", pn: "F31941" },
    { name: "WASHER SEAL,JOEY", pn: "F31983" },
  ];

  const seen = new Set(highlightParts.map((p) => p.name));
  const unhighlighted = standardParts
    .filter((p) => !seen.has(p.name))
    .sort((a, b) => a.name.localeCompare(b.name));

  let overlay = document.createElement("div");
  overlay.style.cssText =
    "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:99999;display:flex;align-items:center;justify-content:center;font-family:sans-serif;";

  let box = document.createElement("div");
  box.style.cssText =
    "background:#fff;padding:20px;border-radius:8px;box-shadow:0 4px 10px rgba(0,0,0,0.3);width:450px;text-align:left;color:#333;";

  let html = `<h3 style="margin-top:0;margin-bottom:12px;font-size:16px;text-align:center;color:#222;">Joey IN HOUSE Findings Generator</h3><div style="max-height:300px;overflow-y:auto;margin-bottom:15px;">`;

  highlightParts.forEach((p) => {
    html += `<label style="display:flex;align-items:center;justify-content:space-between;padding:4px 6px;font-size:12px;cursor:pointer;border-bottom:1px solid #f0f0f0;background:#fffde7;"><span style="display:flex;align-items:center;margin-right:10px;"><input type="checkbox" class="j_chk" value="${p.name}" style="margin-right:8px;transform:scale(1.1);flex-shrink:0;"><span style="font-weight:bold;color:#333;">${p.name}</span></span><span style="color:#666;font-family:monospace;white-space:nowrap;">${p.pn}</span></label>`;
  });

  unhighlighted.forEach((p) => {
    html += `<label style="display:flex;align-items:center;justify-content:space-between;padding:4px 6px;font-size:12px;cursor:pointer;border-bottom:1px solid #f0f0f0;"><span style="display:flex;align-items:center;margin-right:10px;"><input type="checkbox" class="j_chk" value="${p.name}" style="margin-right:8px;transform:scale(1.1);flex-shrink:0;">${p.name}</span><span style="color:#666;font-family:monospace;white-space:nowrap;">${p.pn}</span></label>`;
  });

  html += `</div><div style="display:flex;gap:8px;"><button id="j_copy" style="flex:1;padding:10px;background:#28a745;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:13px;font-weight:bold;">Apply Findings</button><button id="j_cancel" style="flex:1;padding:10px;background:#dc3545;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:13px;font-weight:bold;">Cancel</button></div>`;

  box.innerHTML = html;
  overlay.appendChild(box);
  document.body.appendChild(overlay);

  document.getElementById("j_cancel").onclick = () =>
    document.body.removeChild(overlay);

  document.getElementById("j_copy").onclick = () => {
    let selectedParts = Array.from(box.querySelectorAll(".j_chk:checked")).map(
      (cb) => cb.value
    );
    let partsText = selectedParts.length ? selectedParts.join(", ") : "None";
    let text = `Parts replaced are as follows:\n${partsText}.`;

    document.body.removeChild(overlay);

    let target =
      document.querySelector("#addActualFindingsModal textarea") ||
      document.getElementById("note") ||
      document.querySelector('textarea[name="Notes"]') ||
      document.querySelector("textarea");

    if (target) {
      target.focus();
      let setter = Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype,
        "value"
      ).set;

      if (setter) {
        setter.call(target, text);
      } else {
        target.value = text;
      }

      target.dispatchEvent(new Event("input", { bubbles: true }));
      target.dispatchEvent(new Event("change", { bubbles: true }));
      target.dispatchEvent(new Event("blur", { bubbles: true }));
    } else {
      navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    }
  };
})();
