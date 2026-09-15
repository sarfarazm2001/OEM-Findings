(function () {
  const parts = [
    { name: "Back Case Overmold", pn: "F319275CS" },
    { name: "Battery Assembly Li. Ion", pn: "F0105065CS" },
    { name: "Battery Door", pn: "F319295CS" },
    { name: "Battery Door Label", pn: "PT000319625CS" },
    { name: "Blank Label, Unprinted", pn: "PT000317225CS" },
    { name: "Buzzer Harness Assembly", pn: "F0907185CS" },
    { name: "Cover-Buzzer (Tyvek)", pn: "F319405CS" },
    { name: "Display LCD", pn: "F0601595CS" },
    { name: "Flex Circuit Assembly", pn: "F319435CS" },
    { name: "Foam Battery Pad", pn: "F320015CS" },
    { name: "Front Case", pn: "F319285CS" },
    { name: "Gasket-Shoulder Bolt", pn: "F319375CS" },
    { name: "Gearbox Assembly", pn: "F319425CS" },
    { name: "Harness-Com Port", pn: "F0907175CS" },
    { name: "H-Bridge PCB Assembly", pn: "PT000528665CS" },
    { name: "Lens-PC", pn: "F319395CS" },
    { name: "Mounting Stud Threaded", pn: "F319925CS" },
    { name: "Overlay", pn: "10511405CS" },
    { name: "Phase 3 Joey PCBA", pn: "P1001109385CS" },
    { name: "Phil Pan Head Machine", pn: "F1322265CS" },
    { name: "PIP PCB Assembly", pn: "10336895CS" },
    { name: "Precision Socket", pn: "N/A" },
    { name: "Printed Main Door", pn: "F320615CS" },
    { name: "Richo Harness Clip", pn: "F0807575CS" },
    { name: "Richo Spacers", pn: "F1322245CS" },
    { name: "Rotor Assembly", pn: "F319345CS" },
    { name: "Seal-Sensor Housing", pn: "F319385CX" },
    { name: "Symbol Label", pn: "PT000347255CS" },
    { name: "Ties, Cable Self Lock 3 7/8", pn: "F1500225CS" },
    { name: "Ultrasonic Assembly", pn: "F319415CS" },
    { name: "Washer Seal", pn: "F319835CX" },
  ];

  let overlay = document.createElement("div");
  overlay.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:99999;display:flex;align-items:center;justify-content:center;font-family:sans-serif;";

  let box = document.createElement("div");
  box.style.cssText = "background:#fff;padding:20px;border-radius:8px;box-shadow:0 4px 10px rgba(0,0,0,0.3);width:400px;text-align:left;color:#333;";

  let html = `<h3 style="margin-top:0;margin-bottom:12px;font-size:16px;text-align:center;color:#222;">Joey Findings Generator</h3><div style="max-height:300px;overflow-y:auto;margin-bottom:15px;">`;

  parts.forEach((p) => {
    html += `<label style="display:flex;align-items:center;justify-content:space-between;padding:4px 0;font-size:12px;cursor:pointer;border-bottom:1px solid #f0f0f0;"><span style="display:flex;align-items:center;"><input type="checkbox" class="j_chk" value="${p.name}" style="margin-right:8px;transform:scale(1.1);">${p.name}</span><span style="color:#666;font-family:monospace;">${p.pn}</span></label>`;
  });

  html += `</div><div style="display:flex;gap:8px;"><button id="j_back" style="flex:1;padding:10px;background:#6c757d;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:13px;font-weight:bold;">← Back</button><button id="j_copy" style="flex:1.2;padding:10px;background:#28a745;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:13px;font-weight:bold;">Apply</button><button id="j_cancel" style="flex:1;padding:10px;background:#dc3545;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:13px;font-weight:bold;">Cancel</button></div>`;

  box.innerHTML = html;
  overlay.appendChild(box);
  document.body.appendChild(overlay);

  document.getElementById("j_cancel").onclick = () => document.body.removeChild(overlay);
  document.getElementById("j_back").onclick = () => {
    document.body.removeChild(overlay);
    if (window.reopenOEMLauncher) window.reopenOEMLauncher();
  };

  document.getElementById("j_copy").onclick = () => {
    let selectedParts = Array.from(box.querySelectorAll(".j_chk:checked")).map((cb) => cb.value);
    let partsText = selectedParts.length ? selectedParts.join(", ") : "";
    let text = `Per the OEM, the following parts have been replaced: ${partsText} and passed the related testing. The OEM also certified that the device passed the following: Buzzer Test, LED Test, Battery Test, MISTIC Test, and Audio Test.`;
    document.body.removeChild(overlay);

    let target = document.querySelector("#addActualFindingsModal textarea") || document.getElementById("note") || document.querySelector('textarea[name="Notes"]') || document.querySelector("textarea");
    if (target) {
      target.focus();
      let setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
      if (setter) setter.call(target, text); else target.value = text;
      target.dispatchEvent(new Event("input", { bubbles: true }));
      target.dispatchEvent(new Event("change", { bubbles: true }));
      target.dispatchEvent(new Event("blur", { bubbles: true }));
    } else {
      navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    }
  };
})();
