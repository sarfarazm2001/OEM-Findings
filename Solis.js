(function () {
  const parts = [
    { name: "ADHESIVE, PSA, PIEZO RING, CADD-SOLIS 1/EA", pn: "30-3285" },
    { name: "AIR DETECTOR, SOLIS", pn: "70-0446" },
    { name: "AY, 27MM PIEZO SOUNDER, FRONT", pn: "70-0354" },
    { name: "AY, 27MM PIEZO SOUNDER, REAR", pn: "70-0447" },
    { name: "AY, USO, CADD-SOLIS 1/EA", pn: "67-2341" },
    { name: "BEARING, CAMSHAFT", pn: "60013" },
    { name: "BEARING, CAMSHAFT, .375\" OD X 0.187\" ID, CADD-SOLIS 1/EA", pn: "30-3028" },
    { name: "BEZEL, CASSETTE DETECTION", pn: "30-3052" },
    { name: "BEZEL, DSO, CADD-SOLIS", pn: "30-3028" },
    { name: "BRACKET, OPTICAL SWITCH, CADD-SOLIS", pn: "30-3052" },
    { name: "CAMSHAFT, 3 LOBE, DUAL ACTIVATION", pn: "31-0485" },
    { name: "CONNECTOR, LEMO HALF MOON INSERT (NUT FIXING) FIXED RECEPTACLE, CADD-SOLIS", pn: "10018270-001" },
    { name: "CONTACT, BATTERY COMPARTMENT FLOOR", pn: "70-0227" },
    { name: "CONTACT, BATTERY, SPRING PIN, CADD-SOLIS", pn: "70-0178" },
    { name: "DISK, OPTICAL, DUAL FLAG, CADD-SOLIS", pn: "30-3053" },
    { name: "DISPLAY, LCD, TRULY/HIMAX, 320 X 320 W/BACKLIGHT, CADD-SOLIS", pn: "70-0508" },
    { name: "DOOR AY, BATTERY, PUMP", pn: "30-3245" },
    { name: "DOOR AY, BATTERY, PUMP (Do Not Use)", pn: "10022677-001" },
    { name: "EXPULSOR, MACHINED, .344\"", pn: "30-3086-001" },
    { name: "FLEX AY, CAM SENSOR", pn: "70-0243" },
    { name: "FLEX AY, LED, CADD-SOLIS", pn: "70-0301" },
    { name: "FLEX CIRCUIT, SENSOR, L/L", pn: "70-0335" },
    { name: "FOAM, ISOLATION, LCD", pn: "30-3181" },
    { name: "FOAM, POSITIONING, LCD", pn: "30-3173" },
    { name: "GASKET, CONDUCTIVE, BAT COMP", pn: "30-3174" },
    { name: "GASKET, CONDUCTIVE, CHASSIS", pn: "30-3173" },
    { name: "GASKET, CONDUCTIVE, COPPER, RIGHT", pn: "N/A" },
    { name: "GASKET, CONDUCTIVE, LCD, TOP", pn: "N/A" },
    { name: "GASKET, CONDUCTIVE, LCD/FRAMING", pn: "N/A" },
    { name: "GASKET, ENVIRONMENTAL, BATTERY COMPARTMENT", pn: "30-3289" },
    { name: "GASKET, ENVIRONMENTAL, CHASSIS", pn: "30-3171" },
    { name: "GASKET, ENVIRONMENTAL, POWER BOARD", pn: "30-3171" },
    { name: "GASKET, PERIMETER, EMC", pn: "30-3167" },
    { name: "GASKET, PSA, LENS, CADD SOLIS", pn: "30-3288" },
    { name: "GASKET, TUBING, SILICON HOUSING", pn: "60002" },
    { name: "GEAR, FLAT", pn: "60003" },
    { name: "GEAR, HUB (FASTENS TO MOTOR)", pn: "60002" },
    { name: "GEARMOTOR, PLANETARY, 12V, 16MM", pn: "10009592" },
    { name: "GUARD, PIEZO ALARM", pn: "30-3299" },
    { name: "HANDLE, LATCH LEVER, CADD-SOLIS", pn: "30-4106" },
    { name: "HARNESS, WIRE, ON/OFF SWITCH", pn: "70-0216" },
    { name: "HSG, BATTERY COMPARTMENT", pn: "30-3248" },
    { name: "HSG, PUMP, FRONT, SHLD", pn: "30-4065" },
    { name: "HSG, PUMP, REAR SHLD", pn: "70-0229" },
    { name: "INSULATOR, KAPTON, CADD SOLIS", pn: "30-3106" },
    { name: "INSULATOR, PWA/HOUSING", pn: "30-3322" },
    { name: "INSULATOR, USB", pn: "30-4065" },
    { name: "KEYPAD, MEMBRANE SW, W/O CONN, CADD-SOLIS", pn: "70-0229" },
    { name: "LABEL, PUMP, REAR, CADD SOLIS VIP", pn: "10011174-001" },
    { name: "LATCH/LOCK", pn: "67-2482" },
    { name: "LBL, DEVICE, PUMP, CADD-SOLIS, MODEL 2120, VIP, 3RD EDITION w CUL, BLUE, RX ONLY", pn: "10017410-001" },
    { name: "LBL, DEVICE, PUMP, CADD-SOLIS, MODEL 2120, VIP, 3RD EDITION w CUL, DRK GREY, RX ONLY", pn: "10017409-001" },
    { name: "LBL, DEVICE, PUMP, CADD-SOLIS, VIP", pn: "10006271-002" },
    { name: "LBL, DEVICE, PUMP, CADD-SOLIS, VIP, BLACK", pn: "10012921-001" },
    { name: "LBL, DEVICE, PUMP, CADD-SOLIS, VIP, BLUE", pn: "10013249-001" },
    { name: "LBL, SET, DEVICE, CADD-SOLIS", pn: "40-6288-24A" },
    { name: "LENS, PAD PRINTED, CADD SOLIS", pn: "40-5733-51A" },
    { name: "NLT - HEADER, IDC, 5 POS", pn: "40-6288-24A" },
    { name: "OVERLAY, MEMBRANE SWITCH, CE ENGLISH", pn: "31-0993" },
    { name: "PAD, GND, L/L SENSOR", pn: "70-0171" },
    { name: "PCBA, CADD-SOLIS, TRULY/HIMAX LCD, FLASH MEMORY UPGRADE", pn: "30-4712" },
    { name: "PIN, CASSETTE DETECTOR", pn: "10015258-001" },
    { name: "PLATE, AY, GROUNDING", pn: "30-3163" },
    { name: "SEAL, DIAPHRAGM, CASSETTE SENSOR", pn: "30-4086" },
    { name: "SEAL, DSO, NEOPRENE", pn: "30-4085" },
    { name: "SEAL, FOAM, CADD-SOLIS", pn: "30-3381" },
    { name: "SEAL, UPSTREAM OCCLUSION", pn: "31-0993" },
    { name: "SENSOR, DSO, CADD-SOLIS", pn: "30-4712" },
    { name: "SOLIS, CHASSIS, MACHINED 1/EA", pn: "30-4712" },
    { name: "STABILIZER, BATTERY, SST", pn: "30-3294" },
    { name: "STRIP, ADHESIVE, UPPER", pn: "30-3294" },
    { name: "SWITCH, POWER", pn: "30-3163" },
    { name: "TAB, LCD INSTALLATION", pn: "N/A" },
    { name: "TAPE, ADHESIVE, PIEZO GUARD", pn: "N/A" },
    { name: "TAPE, LCD HOLD DOWN", pn: "30-3306" },
    { name: "TAPE, POGO CONTACT", pn: "30-4085" },
    { name: "VALVE, DUAL ACTIVATION, CADD-SOLIS", pn: "30-3063" },
  ];

  let overlay = document.createElement("div");
  overlay.style.cssText =
    "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:99999;display:flex;align-items:center;justify-content:center;font-family:sans-serif;";

  let box = document.createElement("div");
  box.style.cssText =
    "background:#fff;padding:20px;border-radius:8px;box-shadow:0 4px 10px rgba(0,0,0,0.3);width:450px;text-align:left;color:#333;";

  let html = `<h3 style="margin-top:0;margin-bottom:12px;font-size:16px;text-align:center;color:#222;">Solis Findings Generator</h3><div style="max-height:300px;overflow-y:auto;margin-bottom:15px;">`;

  parts.forEach((p) => {
    html += `<label style="display:flex;align-items:center;justify-content:space-between;padding:4px 0;font-size:12px;cursor:pointer;border-bottom:1px solid #f0f0f0;"><span style="display:flex;align-items:center;margin-right:10px;"><input type="checkbox" class="s_chk" value="${p.name}" style="margin-right:8px;transform:scale(1.1);flex-shrink:0;">${p.name}</span><span style="color:#666;font-family:monospace;white-space:nowrap;">${p.pn}</span></label>`;
  });

  html += `</div><div style="display:flex;gap:8px;"><button id="s_copy" style="flex:1;padding:10px;background:#28a745;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:13px;font-weight:bold;">Apply Findings</button><button id="s_cancel" style="flex:1;padding:10px;background:#dc3545;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:13px;font-weight:bold;">Cancel</button></div>`;

  box.innerHTML = html;
  overlay.appendChild(box);
  document.body.appendChild(overlay);

  document.getElementById("s_cancel").onclick = () =>
    document.body.removeChild(overlay);

  document.getElementById("s_copy").onclick = () => {
    let selectedParts = Array.from(box.querySelectorAll(".s_chk:checked")).map(
      (cb) => cb.value
    );
    let partsText = selectedParts.length ? selectedParts.join(", ") : "";
    let text = `Per the OEM, the following parts have been replaced: ${partsText} and passed the related testing. The OEM also certified that the device passed the following: Visual Inspection, Pump Power Up Test, Motor Test, Remote Dose Test, Keypad Test, Latch Lock Test, Disposable Test, Air Detector Test, Verify Air Detector Height, ULI Screen Inspection, Amber, Green and LED Functional Test, Adjust LCD POT Screen, Downstream Occlusion Test, Upstream Occlusion Sensor Test, Battery Fallcut Test, Start Cassette Test, Go_No_Go Test, and Delivery Accuracy Test 20m.`;

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
