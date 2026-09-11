(function () {
  const parts = [
    { name: "Under Warranty", pn: "N/A", isWarranty: true },
    { name: "IV Labor", pn: "N/A", isEval: true, price: 23.75 },
    { name: "IV PM", pn: "N/A", isEval: true, price: 75.00 },
    { name: "Mech Seal", pn: "340-0049", price: 26.50 },
    { name: "Pump Mechanism Assembly", pn: "340-0055", price: 655.00 },
    { name: "Sub-Assembly w/o Motor", pn: "340-0057", price: 480.00 },
    { name: "Bezel with Overmold", pn: "340-0070", price: 13.00 },
    { name: "Rear Case Assy.", pn: "340-1003", price: 90.00 },
    { name: "Keypad w/o overlay", pn: "350-2011", price: 32.00 },
    { name: "LCD lens", pn: "360-0016", price: 12.50 },
    { name: "Battery Ejector", pn: "360-0022", price: 4.00 },
    { name: "Battery Door", pn: "360-1004/360-0091", price: 27.00 },
    { name: "PCB Assembly", pn: "360-2004-00", price: 655.00 },
    { name: "Keypad overlay", pn: "360-2009", price: 14.00 },
    { name: "Motor & Worm Gear Assy.", pn: "59933", price: 330.00 },
    { name: "Front Case Sub Assembly", pn: "66419", price: 90.00 },
    { name: "BT2", pn: "C12-02001", price: 19.00 },
    { name: "BT3", pn: "C12-04002", price: 16.00 },
    { name: "LCD Module", pn: "C14-05003/58553", price: 58.00 },
    { name: "Misc. Charges and Credits", pn: "N/A", isEval: true, price: 1.00 },
  ];

  let overlay = document.createElement("div");
  overlay.style.cssText =
    "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:99999;display:flex;align-items:center;justify-content:center;font-family:sans-serif;";

  let box = document.createElement("div");
  box.style.cssText =
    "background:#fff;padding:20px;border-radius:8px;box-shadow:0 4px 10px rgba(0,0,0,0.3);width:380px;text-align:left;color:#333;";

  let html = `<h3 style="margin-top:0;margin-bottom:12px;font-size:16px;text-align:center;color:#222;">Curlin Billing Calculator</h3><div style="max-height:280px;overflow-y:auto;margin-bottom:15px;">`;

  parts.forEach((p, i) => {
    let isW = p.isWarranty;
    let rowStyle = isW
      ? "background:#fff3cd;font-weight:bold;padding:6px 4px;margin-bottom:6px;border-radius:4px;border:1px solid #ffeeba;"
      : "padding:4px 0;border-bottom:1px solid #f0f0f0;";
    html += `<label style="display:flex;align-items:center;justify-content:space-between;font-size:12px;cursor:pointer;${rowStyle}"><span style="display:flex;align-items:center;"><input type="checkbox" class="c_chk" data-warranty="${
      isW ? "1" : "0"
    }" data-eval="${p.isEval ? "1" : "0"}" data-price="${
      p.price || 0
    }" value="${p.name}" style="margin-right:8px;transform:scale(1.1);">${
      p.name
    }</span><span style="color:#666;font-family:monospace;">${p.pn}</span></label>`;
  });

  html += `</div><div style="display:flex;gap:8px;"><button id="c_copy" style="flex:1;padding:10px;background:#28a745;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:13px;font-weight:bold;">Apply Findings</button><button id="c_cancel" style="flex:1;padding:10px;background:#dc3545;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:13px;font-weight:bold;">Cancel</button></div>`;

  box.innerHTML = html;
  overlay.appendChild(box);
  document.body.appendChild(overlay);

  document.getElementById("c_cancel").onclick = () =>
    document.body.removeChild(overlay);

  document.getElementById("c_copy").onclick = () => {
    let checkedEls = Array.from(box.querySelectorAll(".c_chk:checked"));
    let isWarranty = box.querySelector('.c_chk[data-warranty="1"]').checked;
    let selectedParts = checkedEls
      .filter(
        (cb) =>
          cb.getAttribute("data-eval") !== "1" &&
          cb.getAttribute("data-warranty") !== "1"
      )
      .map((cb) => cb.value);

    let partsText = selectedParts.length ? selectedParts.join(", ") + ", " : "";
    let costText = isWarranty
      ? "Parts and Labor covered under warranty"
      : `Parts and Labor total of $${checkedEls
          .reduce(
            (sum, cb) => sum + parseFloat(cb.getAttribute("data-price") || 0),
            0
          )
          .toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`;

    let text = `Manufacturer findings, per Moog Medical the following will need replaced: ${partsText}${costText}`;

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
