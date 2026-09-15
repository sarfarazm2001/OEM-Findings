(function () {
  const parts = [
    { name: "INF Eval", pn: "INFEVAL", isEval: true },
    { name: "Backlight Difuser", pn: "25771-001" },
    { name: "LCD Display", pn: "25795-001" },
    { name: "Battery Assembly", pn: "26503-001" },
    { name: "Infinity II Pump Cover", pn: "26542-001/80786-001" },
    { name: "Infinity Bottom Housing", pn: "27696-001" },
    { name: "Infinity Motor (Orange)", pn: "28270-001" },
    { name: "Rotor Assembly", pn: "28483-001", customName: "Rotor Housing" },
    { name: "Canon Motor", pn: "42611", customName: "Canon Motor 42611" },
    { name: "Infinity II PCB Assembly", pn: "43763-101" },
    { name: "Top Housing", pn: "56717-001/80782-001" },
  ];

  let overlay = document.createElement("div");
  overlay.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:99999;display:flex;align-items:center;justify-content:center;font-family:sans-serif;";

  let box = document.createElement("div");
  box.style.cssText = "background:#fff;padding:20px;border-radius:8px;box-shadow:0 4px 10px rgba(0,0,0,0.3);width:400px;text-align:left;color:#333;";

  let html = `<h3 style="margin-top:0;margin-bottom:12px;font-size:16px;text-align:center;color:#222;">Infinity Billing Calculator</h3><div style="max-height:280px;overflow-y:auto;margin-bottom:15px;">`;

  parts.forEach((p) => {
    html += `<label style="display:flex;align-items:center;justify-content:space-between;padding:4px 0;font-size:12px;cursor:pointer;"><span style="display:flex;align-items:center;"><input type="checkbox" class="inf_part" data-eval="${p.isEval ? "1" : "0"}" value="${p.customName || p.name}" style="margin-right:8px;transform:scale(1.1);">${p.name}</span><span style="color:#666;font-family:monospace;">${p.pn}</span></label>`;
  });

  html += `</div><div style="display:flex;gap:8px;"><button id="inf_back" style="flex:1;padding:10px;background:#6c757d;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:13px;font-weight:bold;">← Back</button><button id="inf_copy" style="flex:1.2;padding:10px;background:#28a745;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:13px;font-weight:bold;">Apply</button><button id="inf_cancel" style="flex:1;padding:10px;background:#dc3545;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:13px;font-weight:bold;">Cancel</button></div>`;

  box.innerHTML = html;
  overlay.appendChild(box);
  document.body.appendChild(overlay);

  // Explicitly check the INF Eval checkbox in DOM
  const evalInput = box.querySelector('.inf_part[data-eval="1"]');
  if (evalInput) evalInput.checked = true;

  document.getElementById("inf_cancel").onclick = () => document.body.removeChild(overlay);
  document.getElementById("inf_back").onclick = () => {
    document.body.removeChild(overlay);
    if (window.reopenOEMLauncher) window.reopenOEMLauncher();
  };

  document.getElementById("inf_copy").onclick = () => {
    let selected = Array.from(box.querySelectorAll(".inf_part:checked")).filter((cb) => cb.getAttribute("data-eval") !== "1").map((cb) => cb.value);
    let partsText = selected.length ? selected.join(", ") : "";
    let text = `Per Moog Medical the following has been replaced: ${partsText}, and has met the release criteria associated with the inline inspection, testing and final release elements.`;
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
