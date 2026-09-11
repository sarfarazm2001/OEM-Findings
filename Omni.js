(function () {
  const parts = [
    { name: "BLANK LABEL, UNREPAIRED, 1.4 X 0.625 INCHES", pn: "PT00031722" },
    { name: "KANGAROO OMNI BACK CASE ASSEMBLY", pn: "PT00080641" },
    { name: "KANGAROO OMNI REAR LABEL, WIRELESS CONNECT, CLEAR LENS", pn: "PT00100425" },
    { name: "KANGAROO OMNI SPEAKER ASSEMBLY", pn: "PT00096890" },
    { name: "KANGAROO PUMP COMBO SENSOR", pn: "PT00102970" },
    { name: "KANGAROO PUMP LCD/PCBA SUB-ASSEMBLY", pn: "PT00095863" },
    { name: "KANGAROO PUMP LATCH PLATE", pn: "PT00080643" },
    { name: "KANGAROO PUMP OVERLAY", pn: "PT00031552" },
    { name: "KANGAROO PUMP SPEAKER COVER", pn: "PT00106015" },
    { name: "KANGAROO PUMP VALVE GEARBOX", pn: "PT00093436" },
    { name: "KANGAROO PUMP 6-ROLLER ROTOR ASSY", pn: "PT00093668" },
  ];

  let overlay = document.createElement("div");
  overlay.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:99999;display:flex;align-items:center;justify-content:center;font-family:sans-serif;";

  let box = document.createElement("div");
  box.style.cssText = "background:#fff;padding:20px;border-radius:8px;box-shadow:0 4px 10px rgba(0,0,0,0.3);width:550px;text-align:left;color:#333;";

  let html = `<h3 style="margin-top:0;margin-bottom:12px;font-size:16px;text-align:center;color:#222;">Omni Findings Generator</h3><div style="display:flex;gap:6px;margin-bottom:10px;"><input type="text" id="o_custom_desc" placeholder="Part Description" style="flex:2;padding:6px 8px;border:1px solid #ccc;border-radius:4px;font-size:12px;"><input type="text" id="o_custom_pn" placeholder="Part #" style="flex:1;padding:6px 8px;border:1px solid #ccc;border-radius:4px;font-size:12px;"><button id="o_add_btn" style="padding:6px 12px;background:#007bff;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:12px;font-weight:bold;">+ Add</button></div><div id="o_parts_list" style="max-height:240px;overflow-y:auto;margin-bottom:12px;">`;

  parts.forEach((p) => {
    html += `<div class="part_row" style="display:flex;align-items:center;justify-content:space-between;padding:4px 0;font-size:12px;border-bottom:1px solid #f0f0f0;"><label style="display:flex;align-items:center;cursor:pointer;flex:1;margin-right:10px;"><input type="checkbox" class="o_chk" value="${p.name}" style="margin-right:8px;transform:scale(1.1);flex-shrink:0;"><span class="desc_txt">${p.name}</span></label><div style="display:flex;align-items:center;gap:6px;"><span class="pn_txt" style="color:#666;font-family:monospace;white-space:nowrap;margin-right:4px;">${p.pn}</span><button class="o_edit_btn" style="padding:2px 6px;font-size:10px;background:#ffc107;color:#000;border:none;border-radius:3px;cursor:pointer;">Edit</button><button class="o_del_btn" style="padding:2px 6px;font-size:10px;background:#dc3545;color:#fff;border:none;border-radius:3px;cursor:pointer;">Delete</button></div></div>`;
  });

  html += `</div><div style="margin-bottom:12px;text-align:center;"><button id="o_oem_only" style="width:100%;padding:8px;background:#6c757d;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:12px;font-weight:bold;">Set to "Returned from OEM after required repairs"</button></div><div style="display:flex;gap:8px;"><button id="o_back" style="flex:1;padding:10px;background:#6c757d;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:13px;font-weight:bold;">← Back</button><button id="o_copy" style="flex:1.2;padding:10px;background:#28a745;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:13px;font-weight:bold;">Apply</button><button id="o_cancel" style="flex:1;padding:10px;background:#dc3545;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:13px;font-weight:bold;">Cancel</button></div>`;

  box.innerHTML = html;
  overlay.appendChild(box);
  document.body.appendChild(overlay);

  const attachRowEvents = (row) => {
    row.querySelector(".o_edit_btn").onclick = () => {
      let newDesc = prompt("Edit Part Description:", row.querySelector(".desc_txt").innerText);
      if (newDesc !== null && newDesc.trim() !== "") {
        let newPn = prompt("Edit Part Number:", row.querySelector(".pn_txt").innerText);
        if (newPn !== null && newPn.trim() != "") {
          row.querySelector(".desc_txt").innerText = newDesc.trim();
          row.querySelector(".o_chk").value = newDesc.trim();
          row.querySelector(".pn_txt").innerText = newPn.trim();
        } else {
          alert("Part Number cannot be blank.");
        }
      }
    };
    row.querySelector(".o_del_btn").onclick = () => { row.remove(); };
  };

  box.querySelectorAll(".part_row").forEach(attachRowEvents);

  const applyText = (text) => {
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

  document.getElementById("o_add_btn").onclick = () => {
    let desc = document.getElementById("o_custom_desc").value.trim();
    let pn = document.getElementById("o_custom_pn").value.trim();
    if (!desc || !pn) { alert("Both Part Description and Part # are required."); return; }
    let list = document.getElementById("o_parts_list");
    let row = document.createElement("div");
    row.className = "part_row";
    row.style.cssText = "display:flex;align-items:center;justify-content:space-between;padding:4px 0;font-size:12px;border-bottom:1px solid #f0f0f0;background:#eef6ff;";
    row.innerHTML = `<label style="display:flex;align-items:center;cursor:pointer;flex:1;margin-right:10px;"><input type="checkbox" class="o_chk" value="${desc}" checked style="margin-right:8px;transform:scale(1.1);flex-shrink:0;"><span class="desc_txt">${desc}</span></label><div style="display:flex;align-items:center;gap:6px;"><span class="pn_txt" style="color:#666;font-family:monospace;white-space:nowrap;margin-right:4px;">${pn}</span><button class="o_edit_btn" style="padding:2px 6px;font-size:10px;background:#ffc107;color:#000;border:none;border-radius:3px;cursor:pointer;">Edit</button><button class="o_del_btn" style="padding:2px 6px;font-size:10px;background:#dc3545;color:#fff;border:none;border-radius:3px;cursor:pointer;">Delete</button></div>`;
    list.insertBefore(row, list.firstChild);
    attachRowEvents(row);
    document.getElementById("o_custom_desc").value = "";
    document.getElementById("o_custom_pn").value = "";
  };

  document.getElementById("o_oem_only").onclick = () => applyText("Returned from OEM after required repairs.");
  document.getElementById("o_cancel").onclick = () => document.body.removeChild(overlay);
  document.getElementById("o_back").onclick = () => {
    document.body.removeChild(overlay);
    if (window.reopenOEMLauncher) window.reopenOEMLauncher();
  };

  document.getElementById("o_copy").onclick = () => {
    let selectedParts = Array.from(box.querySelectorAll(".o_chk:checked")).map((cb) => cb.value);
    let text = selectedParts.length ? `Per the OEM, the following parts have been replaced: ${selectedParts.join(", ")} and passed the related testing.` : "Returned from OEM after required repairs.";
    applyText(text);
  };
})();
