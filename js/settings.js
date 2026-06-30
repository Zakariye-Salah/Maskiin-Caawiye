// Maskiin Caawiye - Settings Controls & Recycle Trash Engine

// Complete Application Translation Dictionary Matrix
const localeDictionary = {
  en: {
      navTitle: "Maskiin Caawiye", navSub: "System Preferences & Administration",
      prefHead: "App Preference Settings", langSel: "Interface Language (Luuqadda)",
      themeSel: "Visual Mode Theme", backHead: "Database Backup & Recovery",
      backDesc: "Download your encrypted JSON data ledger files locally or import an old copy back to repair your setup.",
      btnBack: "Download System Backup (.JSON)", btnRest: "Upload & Restore Database File",
      trashHead: "System Recycle Bin (Trash)", trashDesc: "Review, restore, or completely purge soft-deleted transactions and profile records.",
      btnEmpty: "Wipe Trash Completely", thType: "Data Entry Type", thId: "Record Identity Key",
      thDesc: "Log Description / Context Summary", thAct: "Ledger Actions", emptyMsg: "Recycle bin contains no deleted items."
  },
  so: {
      navTitle: "Maskiin Caawiye", navSub: "Habaynta Nidaamka & Maamulka",
      prefHead: "Dooro Habka Luuqadda iyo Muuqaalka", langSel: "Dooro Luuqadda Koowaad",
      themeSel: "Habka Muuqaalka Shaashadda", backHead: "Kaydinta & Soo Celinta Xogta",
      backDesc: "La soo deg xogtaada oo dhan oo ah qaab JSON ah, ama dib u soo geli kayd hore si aad u hagaajisid nidaamka.",
      btnBack: "La Soo Deg Kaydka Xogta (.JSON)", btnRest: "Dib u Soo Geli Keydka Xogta",
      trashHead: "Qashin-Qubka Nidaamka (Trash)", trashDesc: "Dib u eeg, soo celi, ama gabi ahaanba tirtir xogta dadka ama lacagaha la tirtiray.",
      btnEmpty: "Gabi Ahaanba Ebar Qashin-Qubka", thType: "Nooca Xogta", thId: "Fidiyaha Aqoonsiga",
      thDesc: "Faahfaahinta Kooban ee Log-ga", thAct: "Waxqabadka", emptyMsg: "Qashin-qubka nidaamka hadda waxba kuma jiraan."
  }
};

document.addEventListener("DOMContentLoaded", () => {
  applySavedTheme();
  applySavedLanguage();
  renderRecycleBinTable();

  document.getElementById("sysThemeSelector").addEventListener("change", toggleThemeState);
  document.getElementById("sysLanguageSelector").addEventListener("change", toggleLanguageState);
});

// --- LIGHT / DARK THEME CONTROL HANDLING ---
function toggleThemeState(e) {
  const selectedTheme = e.target.value;
  localStorage.setItem("mc_theme", selectedTheme);
  
  if (selectedTheme === "dark") {
      document.body.classList.add("dark-mode");
  } else {
      document.body.classList.remove("dark-mode");
  }
}

function applySavedTheme() {
  const savedTheme = localStorage.getItem("mc_theme") || "light";
  document.getElementById("sysThemeSelector").value = savedTheme;
  if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
  } else {
      document.body.classList.remove("dark-mode");
  }
}

// --- LANGUAGE TRANSLATION LOCALIZATION INTERFACES ---
function toggleLanguageState(e) {
  const selectedLang = e.target.value;
  localStorage.setItem("mc_lang", selectedLang);
  translateApplicationUI(selectedLang);
  renderRecycleBinTable();
}

function applySavedLanguage() {
  const savedLang = localStorage.getItem("mc_lang") || "en";
  document.getElementById("sysLanguageSelector").value = savedLang;
  translateApplicationUI(savedLang);
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.innerText = value;
  }
  
  function translateApplicationUI(lang) {
    const dict = localeDictionary[lang] || localeDictionary.en;
  
    // These may NOT exist anymore (header moved to header.js)
    setText("navBrandTitle", dict.navTitle);
    setText("navSubtitle", dict.navSub);
  
    // These still exist in settings page
    setText("lblPreferencesHeading", dict.prefHead);
    setText("lblLanguageSelect", dict.langSel);
    setText("lblThemeSelect", dict.themeSel);
    setText("lblBackupHeading", dict.backHead);
    setText("lblBackupDesc", dict.backDesc);
    setText("btnDownloadBackup", dict.btnBack);
    setText("btnUploadRestore", dict.btnRest);
    setText("lblTrashHeading", dict.trashHead);
    setText("lblTrashDesc", dict.trashDesc);
    setText("btnEmptyBin", dict.btnEmpty);
    setText("thType", dict.thType);
    setText("thIdentifier", dict.thId);
    setText("thDesc", dict.thDesc);
    setText("thActions", dict.thAct);
  }
// --- RECYCLE BIN TRASH PIPELINES ---
function renderRecycleBinTable() {
  const tableBody = document.getElementById("trashRegisterTableBody");
  if (!tableBody) return;

  const currentLang = localStorage.getItem("mc_lang") || "en";
  const dict = localeDictionary[currentLang] || localeDictionary.en;

  // Pull from raw LocalStorage arrays to process items where softDelete !== false or deleted === true
  const rawTx = JSON.parse(localStorage.getItem('mc_transactions')) || [];
  const rawPeople = JSON.parse(localStorage.getItem('mc_people')) || [];

  let trashItems = [];

  // Extract deleted transactions
  rawTx.forEach(t => {
      if (t.softDeleted === true || t.deleted === true) {
          trashItems.push({
              originType: "TRANSACTION",
              id: t.id,
              summary: `Amount: $${(t.amount || 0).toFixed(2)} | Recipient: ${t.name || 'N/A'} (${t.phone || 'N/A'})`
          });
      }
  });

  // Extract deleted people/families
  rawPeople.forEach(p => {
      if (p.softDeleted === true || p.deleted === true) {
          trashItems.push({
              originType: "BENEFICIARY / FAMILY",
              id: p.id || p.phone,
              summary: `Name: ${p.name || 'N/A'} | Location: ${p.region || 'N/A'} | Mobile: ${p.phone || 'N/A'}`
          });
      }
  });

  if (trashItems.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="4" class="text-center text-muted py-4">${dict.emptyMsg}</td></tr>`;
      return;
  }

  tableBody.innerHTML = trashItems.map(item => {
      const typeBadgeClass = item.originType === "TRANSACTION" ? "trash-badge-tx" : "trash-badge-ppl";
      return `
          <tr>
              <td><span class="badge ${typeBadgeClass} px-2.5 py-1.5 fw-bold">${item.originType}</span></td>
              <td><code class="font-monospace text-secondary">${item.id}</code></td>
              <td><span class="text-dark fw-semibold">${item.summary}</span></td>
              <td>
                  <div class="d-flex gap-1 justify-content-center">
                      <button class="btn btn-sm btn-outline-success py-0.5 px-2 font-semibold" onclick="restoreSoftDeletedItem('${item.originType}', '${item.id}')">Restore</button>
                      <button class="btn btn-sm btn-outline-danger py-0.5 px-2 font-semibold" onclick="purgeItemPermanently('${item.originType}', '${item.id}')">Purge</button>
                  </div>
              </td>
          </tr>
      `;
  }).join('');
}

function restoreSoftDeletedItem(type, id) {
  if (type === "TRANSACTION") {
      const rawTx = JSON.parse(localStorage.getItem('mc_transactions')) || [];
      const index = rawTx.findIndex(t => String(t.id) === String(id));
      if (index !== -1) {
          rawTx[index].softDeleted = false;
          rawTx[index].deleted = false;
          localStorage.setItem('mc_transactions', JSON.stringify(rawTx));
      }
  } else {
      const rawPeople = JSON.parse(localStorage.getItem('mc_people')) || [];
      const index = rawPeople.findIndex(p => String(p.id || p.phone) === String(id));
      if (index !== -1) {
          rawPeople[index].softDeleted = false;
          rawPeople[index].deleted = false;
          localStorage.setItem('mc_people', JSON.stringify(rawPeople));
      }
  }
  renderRecycleBinTable();
}

function purgeItemPermanently(type, id) {
  if (confirm("Are you sure you want to permanently erase this record? This action cannot be reversed.")) {
      if (type === "TRANSACTION") {
          let rawTx = JSON.parse(localStorage.getItem('mc_transactions')) || [];
          rawTx = rawTx.filter(t => String(t.id) !== String(id));
          localStorage.setItem('mc_transactions', JSON.stringify(rawTx));
      } else {
          let rawPeople = JSON.parse(localStorage.getItem('mc_people')) || [];
          rawPeople = rawPeople.filter(p => String(p.id || p.phone) !== String(id));
          localStorage.setItem('mc_people', JSON.stringify(rawPeople));
      }
      renderRecycleBinTable();
  }
}

function emptyEntireRecycleBin() {
  if (confirm("Permanently wipe out all items currently inside the trash repository?")) {
      // Clear transaction trash completely
      let rawTx = JSON.parse(localStorage.getItem('mc_transactions')) || [];
      rawTx = rawTx.filter(t => t.softDeleted !== true && t.deleted !== true);
      localStorage.setItem('mc_transactions', JSON.stringify(rawTx));

      // Clear personnel trash completely
      let rawPeople = JSON.parse(localStorage.getItem('mc_people')) || [];
      rawPeople = rawPeople.filter(p => p.softDeleted !== true && p.deleted !== true);
      localStorage.setItem('mc_people', JSON.stringify(rawPeople));

      renderRecycleBinTable();
  }
}

// --- DATABASE BACKUP MANAGEMENT SYSTEMS ---
function executeDatabaseBackup() {
  const databaseDump = {
      mc_transactions: JSON.parse(localStorage.getItem('mc_transactions')) || [],
      mc_people: JSON.parse(localStorage.getItem('mc_people')) || [],
      mc_theme: localStorage.getItem('mc_theme') || 'light',
      mc_lang: localStorage.getItem('mc_lang') || 'en',
      exportedAt: new Date().toISOString()
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(databaseDump, null, 2));
  const dlAnchorElem = document.createElement('a');
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", `Maskiin_Caawiye_MASTER_BACKUP_${new Date().toISOString().split('T')[0]}.json`);
  dlAnchorElem.click();
}

function executeDatabaseRestore(event) {
  const fileReader = new FileReader();
  const file = event.target.files[0];
  
  if (!file) return;

  fileReader.onload = function(e) {
      try {
          const parsedData = JSON.parse(e.target.result);
          
          if (parsedData.mc_transactions || parsedData.mc_people) {
              if (parsedData.mc_transactions) localStorage.setItem('mc_transactions', JSON.stringify(parsedData.mc_transactions));
              if (parsedData.mc_people) localStorage.setItem('mc_people', JSON.stringify(parsedData.mc_people));
              if (parsedData.mc_theme) localStorage.setItem('mc_theme', parsedData.mc_theme);
              if (parsedData.mc_lang) localStorage.setItem('mc_lang', parsedData.mc_lang);
              
              alert("Database master record data sets restored successfully! Reloading configuration elements...");
              window.location.reload();
          } else {
              alert("Invalid schema signature detected. Please check the imported file integrity constraints.");
          }
      } catch (err) {
          alert("Error parsing file. Please make sure the backup file is a valid JSON document framework export.");
      }
  };
  
  fileReader.readAsText(file);
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. Load system values on start
  const savedTheme = localStorage.getItem("maskiin_theme") || "light";
  const savedLang = localStorage.getItem("maskiin_lang") || "en";
  
  document.documentElement.setAttribute("data-bs-theme", savedTheme);
  
  // 2. Example event listener if you use a Select input dropdown for language on your settings page:
  const langSelect = document.getElementById("settingsLangSelect");
  if(langSelect) {
      langSelect.value = savedLang;
      langSelect.addEventListener("change", (e) => {
          localStorage.setItem("maskiin_lang", e.target.value);
          // Optional: trigger reload or live rewrite function
      });
  }

  // 3. Example event listener for a Theme Select dropdown:
  const themeSelect = document.getElementById("settingsThemeSelect");
  if(themeSelect) {
      themeSelect.value = savedTheme;
      themeSelect.addEventListener("change", (e) => {
          const chosen = e.target.value;
          document.documentElement.setAttribute("data-bs-theme", chosen);
          localStorage.setItem("maskiin_theme", chosen);
      });
  }
});