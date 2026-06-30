// Maskiin Caawiye - People Interface Core Controller Engine

const peopleDictionary = {
  en: {
      navTitle: "Maskiin Caawiye", btnAddNewFamily: "+ Add New Family", globalSearchPlh: "Search by name or phone...",
      optGenAll: "All Genders", optGenMale: "Male", optGenFemale: "Female", optRegAll: "All Regions",
      optDistAll: "All Districts", optSortNameAsc: "Name (A-Z)", optSortNameDesc: "Name (Z-A)",
      optSortNewest: "Newest Added", optSortMoneyDesc: "Highest Allocation", lblDirectoryHeading: "Beneficiary Directory Registry Ledger",
      thName: "Name", thPhone: "Phone", thLocation: "Location Details", thStatus: "Status", thTotalAward: "Total Award", thAction: "Action Framework",
      emptyRecords: "No records found.", formTitleAdd: "Add New Family Profile", formTitleEdit: "Edit Beneficiary File",
      formLblFullName: "Full Name *", formLblPhone: "Phone Number *", formLblRegion: "Region", formLblDistrict: "District",
      formLblNeighborhood: "Neighborhood", formLblAge: "Age", formLblGender: "Gender", formLblMarital: "Marital Status",
      optMarSingle: "Single / Unmarried", optMarMarried: "Married", optMarDivorced: "Divorced", optMarWidowed: "Widowed",
      formHeadingSpouse: "Spouse & Marriage Details", formLblSpouseName: "Spouse Name", formLblSpousePhone: "Spouse Phone",
      formLblSpouseAlive: "Is the Spouse Still Alive?", optSpouseYes: "Yes, Alive", optSpouseNo: "Deceased",
      formLblChildrenCount: "How many children do you have?", btnToggleExtra: "+ Add Extra Program Allowance",
      formLblExtraTitle: "Extra Title", formLblExtraAmount: "Extra Amount ($)", formLblBaseMoney: "Base Family Financial Stipend ($)",
      btnSubmitForm: "Save Beneficiary Record", labelBtnEdit: "Edit", labelBtnSend: "Send", labelBtnDel: "Del",
      labelBtnMore: "View More", labelBtnLess: "Hide Info", confirmDel: "Move this record item to recycling ledger archive?",
      lblChild: "Child", lblChildren: "Children Breakdown", lblSpouse: "Spouse Details", lblExtraInfo: "Extra Allowance Details",
      childLabelName: "Name", childLabelAge: "Age", childLabelGender: "Gender", childLabelSchool: "In School", childLabelStipend: "Stipend",
      spouseStatusAlive: "Alive", spouseStatusDeceased: "Deceased"
  },
  so: {
      navTitle: "Maskiin Caawiye", btnAddNewFamily: "+ Ku Dar Qoys Cusub", globalSearchPlh: "Ku raadi magac ama taleefon...",
      optGenAll: "Dhammaan Lab iyo Dheddig", optGenMale: "Lab", optGenFemale: "Dheddig", optRegAll: "Dhammaan Gobollada",
      optDistAll: "Dhammaan Degmooyinka", optSortNameAsc: "Magaca (A-Z)", optSortNameDesc: "Magaca (Z-A)",
      optSortNewest: "Ugu Dambeeyay ee La Ku Daray", optSortMoneyDesc: "Lacagta Ugu Badan", lblDirectoryHeading: "Diiwaanka Guud ee Dadka Kaafiska Ah",
      thName: "Magaca", thPhone: "Taleefonka", thLocation: "Faahfaahinta Goobta", thStatus: "Xaaladda", thTotalAward: "Wadarta Lacagta", thAction: "Qaabdhismeedka Waxqabadka",
      emptyRecords: "Wax xog ah lagama helin diiwaanka.", formTitleAdd: "Ku Dar Qoys Cusub", formTitleEdit: "Wax ka Beddel Faylka Qofka",
      formLblFullName: "Magaca Oo Buuxa *", formLblPhone: "Lambarka Taleefonka *", formLblRegion: "Gobolka", formLblDistrict: "Degmada",
      formLblNeighborhood: "Xaafadda", formLblAge: "Da'da", formLblGender: "Lab/Dheddig", formLblMarital: "Xaaladda Guurka",
      optMarSingle: "Doob / Keligii Noole", optMarMarried: "Guursaday", optMarDivorced: "Furiin", optMarWidowed: "Agoon / Carmal",
      formHeadingSpouse: "Faahfaahinta Sayga / Afada", formLblSpouseName: "Magaca Lamaanaha", formLblSpousePhone: "Taleefonka Lamaanaha",
      formLblSpouseAlive: "Lamaanuhu Ma Noolyahay?", optSpouseYes: "Haa, Waa Noolyahay", optSpouseNo: "Waa Geeriyooday",
      formLblChildrenCount: "Immisa carruur ah ayaad leedahay?", btnToggleExtra: "+ Ku dar Lacag Gunno Dheeraad ah",
      formLblExtraTitle: "Cinwaanka Gunnada", formLblExtraAmount: "Cadadka Lacagta ($)", formLblBaseMoney: "Lacagta Qoyska ee Asaasiga ah ($)",
      btnSubmitForm: "Keydi Xogta Qofka", labelBtnEdit: "Beddel", labelBtnSend: "Diri", labelBtnDel: "Tirtir",
      labelBtnMore: "Eeg Inta Badan", labelBtnLess: "Qari Xogta", confirmDel: "Ma hubtaa inaad kaydka tirtirto oo aad u raddo meesha wasakhda?",
      lblChild: "Ilmaha", lblChildren: "Faahfaahinta Carruurta", lblSpouse: "Xogta Lamaanaha", lblExtraInfo: "Xogta Gunnada Dheeraadka Ah",
      childLabelName: "Magaca", childLabelAge: "Da'da", childLabelGender: "Jinsiga", childLabelSchool: "Dugsiga", childLabelStipend: "Gunnada",
      spouseStatusAlive: "Noolyahay", spouseStatusDeceased: "Geeriyooday"
  }
};

/* ==========================================================
PAYMENT ENGINE
========================================================== */

const PAYMENT_STORAGE_KEY = "mc_transactions";

let currentPaymentPerson = null;

let paymentSelections={};

let paymentExtras=[];

let currentPaymentTotal=0;


let continuePaymentAfterWarning = false;

let sendMoneyModal = null;
let alreadyPaidModal = null;
let paymentReceiptModal = null;


document.addEventListener("DOMContentLoaded", () => {
  applyThemeEngineState();
  setupFilterDropdowns();
  setupFormRegionDropdowns();
  applyLanguageTranslations();
  renderPeopleTable();


  
  document.getElementById("maritalStatus").addEventListener("change", toggleMaritalFields);
  document.getElementById("childrenCount").addEventListener("input", generateChildrenForms);
  document.getElementById("addFamilyForm").addEventListener("submit", handleFormSubmit);

  document.getElementById("globalSearch").addEventListener("input", renderPeopleTable);
  document.getElementById("filterGender").addEventListener("change", renderPeopleTable);
  document.getElementById("filterRegion").addEventListener("change", handleFilterRegionChange);
  document.getElementById("filterDistrict").addEventListener("change", renderPeopleTable);
  document.getElementById("sortOrder").addEventListener("change", renderPeopleTable);


  /* ==========================
Payment Modals
========================== */

const sendModalElement =
document.getElementById("sendMoneyModal");

if(sendModalElement){

    sendMoneyModal =
    new bootstrap.Modal(sendModalElement);

}

const warningElement =
document.getElementById("alreadyPaidModal");

if(warningElement){

    alreadyPaidModal =
    new bootstrap.Modal(warningElement);

}

const receiptElement =
document.getElementById("paymentReceiptModal");

if(receiptElement){

    paymentReceiptModal =
    new bootstrap.Modal(receiptElement);

}

/* ==========================
Confirm Payment Button
========================== */

const confirmButton =
document.getElementById("btnConfirmSend");

if(confirmButton){

    confirmButton.addEventListener(
        "click",
        saveFamilyPayment
    );

}

const gatewaySelect =
document.getElementById("paymentGateway");

if(gatewaySelect){

    gatewaySelect.addEventListener(
        "change",
        refreshUSSDPreview
    );

}

const amountInput =
document.getElementById("paymentAmount");

if(amountInput){

    amountInput.addEventListener(
        "input",
        refreshUSSDPreview
    );

}
/* ==========================
Continue Anyway
========================== */

const continueButton =
document.getElementById("btnContinuePayment");

if(continueButton){

    continueButton.addEventListener(
        "click",
        continueDuplicatePayment
    );

}
});

function applyThemeEngineState() {
  const theme = localStorage.getItem("mc_theme") || "light";
  if (theme === "dark") document.body.classList.add("dark-mode");
  else document.body.classList.remove("dark-mode");
}

function applyLanguageTranslations() {
  const lang = localStorage.getItem("mc_lang") || "en";
  const dict = peopleDictionary[lang] || peopleDictionary.en;

  const safeSetText = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.innerText = text;
  };

  safeSetText("navTitle", dict.navTitle);
  safeSetText("btnAddNewFamily", dict.btnAddNewFamily);
  safeSetText("optGenAll", dict.optGenAll);
  safeSetText("optGenMale", dict.optGenMale);
  safeSetText("optGenFemale", dict.optGenFemale);
  safeSetText("optRegAll", dict.optRegAll);
  safeSetText("optDistAll", dict.optDistAll);
  safeSetText("optSortNameAsc", dict.optSortNameAsc);
  safeSetText("optSortNameDesc", dict.optSortNameDesc);
  safeSetText("optSortNewest", dict.optSortNewest);
  safeSetText("optSortMoneyDesc", dict.optSortMoneyDesc);
  safeSetText("lblDirectoryHeading", dict.lblDirectoryHeading);
  
  safeSetText("thName", dict.thName);
  safeSetText("thPhone", dict.thPhone);
  safeSetText("thLocation", dict.thLocation);
  safeSetText("thStatus", dict.thStatus);
  safeSetText("thTotalAward", dict.thTotalAward);
  safeSetText("thAction", dict.thAction);

  safeSetText("formLblFullName", dict.formLblFullName);
  safeSetText("formLblPhone", dict.formLblPhone);
  safeSetText("formLblRegion", dict.formLblRegion);
  safeSetText("formLblDistrict", dict.formLblDistrict);
  safeSetText("formLblNeighborhood", dict.formLblNeighborhood);
  safeSetText("formLblAge", dict.formLblAge);
  safeSetText("formLblGender", dict.formLblGender);
  safeSetText("formLblMarital", dict.formLblMarital);
  
  safeSetText("optMarSingle", dict.optMarSingle);
  safeSetText("optMarMarried", dict.optMarMarried);
  safeSetText("optMarDivorced", dict.optMarDivorced);
  safeSetText("optMarWidowed", dict.optMarWidowed);
  
  safeSetText("formHeadingSpouse", dict.formHeadingSpouse);
  safeSetText("formLblSpouseName", dict.formLblSpouseName);
  safeSetText("formLblSpousePhone", dict.formLblSpousePhone);
  safeSetText("formLblSpouseAlive", dict.formLblSpouseAlive);
  safeSetText("optSpouseYes", dict.optSpouseYes);
  safeSetText("optSpouseNo", dict.optSpouseNo);
  safeSetText("formLblChildrenCount", dict.formLblChildrenCount);
  
  safeSetText("btnToggleExtra", dict.btnToggleExtra);
  safeSetText("formLblExtraTitle", dict.formLblExtraTitle);
  safeSetText("formLblExtraAmount", dict.formLblExtraAmount);
  safeSetText("formLblBaseMoney", dict.formLblBaseMoney);
  safeSetText("btnSubmitForm", dict.btnSubmitForm);

  /* ---------- placeholders ---------- */
  
  const searchInput = document.getElementById("globalSearch");
  if (searchInput) {
      searchInput.placeholder = dict.globalSearchPlh;
  }
  
  const fullName = document.getElementById("fullName");
  if (fullName) {
      fullName.placeholder =
          lang === "so"
              ? "Tusaale: Axmed Cali"
              : "Ex: Axmed Cali";
  }
  
  const phone = document.getElementById("phone");
  if (phone) {
      phone.placeholder =
          lang === "so"
              ? "Tusaale: 617125558"
              : "Ex: 617125558";
  }
  
  const neighborhood = document.getElementById("neighborhood");
  if (neighborhood) {
      neighborhood.placeholder =
          lang === "so"
              ? "Tusaale: Hodan"
              : "Ex: Hodan";
  }
}

function openFormModal() {
  const lang = localStorage.getItem("mc_lang") || "en";
  document.getElementById("formTitle").innerText = peopleDictionary[lang].formTitleAdd;
  document.getElementById("formModalOverlay").classList.add("active");
}

function closeFormModal() {
  document.getElementById("formModalOverlay").classList.remove("active");
  resetFormState();
}

function toggleExtraPackageFields() {
  const wrapper = document.getElementById("extraFieldsPipelineWrapper");
  if (wrapper.style.display === "none") {
      wrapper.style.display = "block";
  } else {
      wrapper.style.display = "none";
      document.getElementById("extraTitle").value = "";
      document.getElementById("extraAmount").value = "0";
  }
}

function setupFilterDropdowns() {
  const fReg = document.getElementById("filterRegion");
  if (!fReg) return;
  const lang = localStorage.getItem("mc_lang") || "en";
  fReg.innerHTML = `<option value="">${peopleDictionary[lang].optRegAll}</option>` + 
      Object.keys(somaliaRegionsData).map(r => `<option value="${r}">${r}</option>`).join('');
}

function handleFilterRegionChange(e) {
  const reg = e.target.value;
  const fDist = document.getElementById("filterDistrict");
  if (!fDist) return;
  const lang = localStorage.getItem("mc_lang") || "en";

  if (!reg) {
      fDist.innerHTML = `<option value="">${peopleDictionary[lang].optDistAll}</option>`;
  } else {
      fDist.innerHTML = `<option value="">${peopleDictionary[lang].optDistAll}</option>` + 
          somaliaRegionsData[reg].map(d => `<option value="${d}">${d}</option>`).join('');
  }
  renderPeopleTable();
}

function setupFormRegionDropdowns() {
  const rSelect = document.getElementById("regionSelect");
  const dSelect = document.getElementById("districtSelect");
  if (!rSelect || !dSelect) return;

  rSelect.innerHTML = Object.keys(somaliaRegionsData).map(r => `<option value="${r}">${r}</option>`).join('');
  rSelect.value = "Banaadir"; 
  
  const updateDistricts = (reg) => {
      dSelect.innerHTML = somaliaRegionsData[reg].map(d => `<option value="${d}">${d}</option>`).join('');
  };
  
  updateDistricts("Banaadir");
  rSelect.addEventListener("change", (e) => updateDistricts(e.target.value));
}

function toggleMaritalFields(e) {
  const status = e.target.value;
  const container = document.getElementById("conditionalMaritalFields");
  if (!container) return;
  
  if (status === "married" || status === "divorced" || status === "widowed") {
      container.style.display = "block";
  } else {
      container.style.display = "none";
      document.getElementById("childrenCount").value = "";
      document.getElementById("childrenFormContainer").innerHTML = "";
  }
}

function generateChildrenForms(e) {
  const count = parseInt(e.target.value) || 0;
  const container = document.getElementById("childrenFormContainer");
  if (!container) return;
  container.innerHTML = "";

  if (count <= 0 || count >= 100) return;
  const lang = localStorage.getItem("mc_lang") || "en";
  const dict = peopleDictionary[lang] || peopleDictionary.en;

  for (let i = 0; i < count; i++) {
      const div = document.createElement("div");
      div.className = "p-2 border rounded my-2 bg-white text-dark";
      div.innerHTML = `
          <span class="badge bg-primary mb-1">${dict.lblChild} ${i + 1}</span>
          <div class="row g-1">
              <div class="col-6"><input type="text" placeholder="${dict.childLabelName}" class="form-control form-control-sm child-name" required></div>
              <div class="col-3"><input type="number" placeholder="${dict.childLabelAge}" class="form-control form-control-sm child-age" min="0" max="18" required></div>
              <div class="col-3">
                  <select class="form-select form-select-sm child-gender">
                      <option value="boy">${lang === 'so' ? 'Wiil' : 'Boy'}</option>
                      <option value="girl">${lang === 'so' ? 'Gabar' : 'Girl'}</option>
                  </select>
              </div>
          </div>
          <div class="row g-1 mt-1">
              <div class="col-6">
                  <select class="form-select form-select-sm child-school">
                      <option value="yes">${dict.childLabelSchool}: ${lang === 'so' ? 'Haa' : 'Yes'}</option>
                      <option value="no">${lang === 'so' ? 'Maya' : 'No'}</option>
                  </select>
              </div>
              <div class="col-6"><input type="number" placeholder="${dict.childLabelStipend} ($)" class="form-control form-control-sm child-money" min="0" value="0"></div>
          </div>`;
      container.appendChild(div);
  }
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  const children = [];
  document.querySelectorAll("#childrenFormContainer > div").forEach(row => {
      children.push({
          name: row.querySelector(".child-name").value,
          gender: row.querySelector(".child-gender").value,
          age: parseInt(row.querySelector(".child-age").value) || 0,
          school: row.querySelector(".child-school").value,
          money: parseFloat(row.querySelector(".child-money").value) || 0
      });
  });

  const totalChildrenMoney = children.reduce((sum, c) => sum + c.money, 0);
  const baseFamilyMoney = parseFloat(document.getElementById("baseFamilyMoney").value) || 0;
  
  const extraTitle = document.getElementById("extraTitle").value || "";
  const extraAmount = parseFloat(document.getElementById("extraAmount").value) || 0;

  const personPayload = {
      id: document.getElementById("personId").value || undefined,
      fullName: document.getElementById("fullName").value,
      phone: document.getElementById("phone").value,
      region: document.getElementById("regionSelect").value,
      district: document.getElementById("districtSelect").value,
      neighborhood: document.getElementById("neighborhood").value,
      age: parseInt(document.getElementById("age").value) || 30,
      gender: document.getElementById("gender").value,
      maritalStatus: document.getElementById("maritalStatus").value,
      spouseName: document.getElementById("spouseName")?.value || '',
      spousePhone: document.getElementById("spousePhone")?.value || '',
      isSpouseAlive: document.getElementById("spouseAlive")?.value === 'yes',
      children: children,
      extraTitle: extraTitle,
      extraAmount: extraAmount,
      baseMoney: baseFamilyMoney,
      totalCombinedAward: baseFamilyMoney + totalChildrenMoney + extraAmount
  };

  StorageEngine.savePerson(personPayload);
  closeFormModal();
  renderPeopleTable();
}

function renderPeopleTable() {
  const listBody = document.getElementById("peopleListBody");
  const mobileBody = document.getElementById("mobilePeopleWrapper");
  if (!listBody || !mobileBody) return;
  
  const lang = localStorage.getItem("mc_lang") || "en";
  const dict = peopleDictionary[lang] || peopleDictionary.en;

  let dataset = StorageEngine.getPeople() || [];
  const query = document.getElementById("globalSearch").value.toLowerCase();
  const filterGen = document.getElementById("filterGender").value;
  const filterReg = document.getElementById("filterRegion").value;
  const filterDist = document.getElementById("filterDistrict").value;
  const sorting = document.getElementById("sortOrder").value;

  if (query) dataset = dataset.filter(p => p.fullName.toLowerCase().includes(query) || p.phone.includes(query));
  if (filterGen) dataset = dataset.filter(p => p.gender === filterGen);
  if (filterReg) dataset = dataset.filter(p => p.region === filterReg);
  if (filterDist) dataset = dataset.filter(p => p.district === filterDist);

  if (sorting === "name-asc") dataset.sort((a, b) => a.fullName.localeCompare(b.fullName));
  if (sorting === "name-desc") dataset.sort((a, b) => b.fullName.localeCompare(a.fullName));
  if (sorting === "money-desc") dataset.sort((a, b) => b.totalCombinedAward - a.totalCombinedAward);
  if (sorting === "date-desc") dataset.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if(dataset.length === 0) {
      listBody.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-4">${dict.emptyRecords}</td></tr>`;
      mobileBody.innerHTML = `<div class="text-center text-muted py-4">${dict.emptyRecords}</div>`;
      return;
  }

  let desktopHTML = "";
  let mobileHTML = "";

  dataset.forEach(p => {
      const trId = `expanded-row-${p.id}`;
      const mobId = `expanded-mob-${p.id}`;
      
      // Build Action Framework Layout Controls
      const frameworkButtons = `
      <div class="d-flex gap-1 justify-content-center flex-wrap">
      
          <button
              class="btn btn-sm btn-primary"
              onclick="toggleExpandableDetails('${p.id}')"
              id="btnMore-${p.id}">
              ${dict.labelBtnMore}
          </button>
      
          <button
              class="btn btn-sm btn-outline-secondary"
              onclick="loadPersonToEdit('${p.id}')">
              <i class="bi bi-pencil"></i>
              ${dict.labelBtnEdit}
          </button>
      
          <button
              class="btn btn-sm btn-success text-white"
              onclick="openSendMoneyModal('${p.id}')">
              <i class="bi bi-send-fill"></i>
              ${dict.labelBtnSend}
          </button>
      
          <button
              class="btn btn-sm btn-outline-danger"
              onclick="softDeletePerson('${p.id}')">
              <i class="bi bi-trash"></i>
              ${dict.labelBtnDel}
          </button>
      
      </div>
      `;

      
      // DESKTOP LAYOUT INJECTION ROW MATRIX
      desktopHTML += `
          <tr>
              <td><strong>${p.fullName}</strong></td>
              <td><span class="badge bg-light text-dark font-monospace-custom">${p.phone}</span></td>
              <td><small class="text-muted">${p.region} - ${p.district}</small></td>
              <td><span class="text-capitalize badge bg-secondary bg-opacity-10 text-secondary">${lang === 'so' ? (peopleDictionary.so.optMaritalStatuses?.[p.maritalStatus] || p.maritalStatus) : p.maritalStatus}</span></td>
              <td class="text-success fw-bold">$${p.totalCombinedAward.toFixed(2)}</td>
              <td>${frameworkButtons}</td>
          </tr>
          <tr id="${trId}" style="display:none;"><td colspan="6"><div class="family-expanded-details" id="canvas-${p.id}"></div></td></tr>
      `;

      // MOBILE LAYOUT STACK CARD RENDER 
      mobileHTML += `
          <div class="mobile-person-card">
              <div class="mobile-person-row">
                  <strong class="text-dark text-capitalize">${p.fullName}</strong>
                  <span class="text-success fw-bold font-monospace-custom">$${p.totalCombinedAward.toFixed(2)}</span>
              </div>
              <div class="mobile-person-row">
                  <span class="small text-muted"><strong>${dict.thPhone}:</strong></span>
                  <span class="badge bg-light text-dark font-monospace-custom">${p.phone}</span>
              </div>
              <div class="mobile-person-row">
                  <span class="small text-muted"><strong>${dict.thLocation}:</strong></span>
                  <small class="text-muted">${p.region} - ${p.district}</small>
              </div>
              <div class="pt-2">${frameworkButtons}</div>
              <div id="${mobId}" class="mt-2 family-expanded-details" style="display:none;"></div>
          </div>
      `;
  });

  listBody.innerHTML = desktopHTML;
  mobileBody.innerHTML = mobileHTML;
}

function toggleExpandableDetails(id) {
  const desktopRow = document.getElementById(`expanded-row-${id}`);
  const mobileBox = document.getElementById(`expanded-mob-${id}`);
  const btn = document.getElementById(`btnMore-${id}`);
  
  const lang = localStorage.getItem("mc_lang") || "en";
  const dict = peopleDictionary[lang] || peopleDictionary.en;

  const person = StorageEngine.getPeople().find(p => p.id === id);
  if (!person) return;

  let targetContainer = null;
  let isCurrentlyVisible = false;

  if (window.innerWidth < 992 && mobileBox) {
      targetContainer = mobileBox;
      isCurrentlyVisible = mobileBox.style.display === "block";
  } else if (desktopRow) {
      targetContainer = document.getElementById(`canvas-${id}`);
      isCurrentlyVisible = desktopRow.style.display === "table-row";
  }

  if (isCurrentlyVisible) {
      if (desktopRow) desktopRow.style.display = "none";
      if (mobileBox) mobileBox.style.display = "none";
      if (btn) btn.innerText = dict.labelBtnMore;
  } else {
      // Build Action Framework HTML Canvas Data Layout
      let detailsHTML = `<div class="row g-3">`;
      
      // Spouse Segment
      if (person.maritalStatus !== "single") {
          detailsHTML += `
              <div class="col-md-6">
                  <h6 class="fw-bold text-primary border-bottom pb-1">${dict.lblSpouse}</h6>
                  <p class="m-0 small"><strong>${dict.formLblSpouseName}:</strong> ${person.spouseName || 'N/A'}</p>
                  <p class="m-0 small"><strong>${dict.formLblSpousePhone}:</strong> ${person.spousePhone || 'N/A'}</p>
                  <p class="m-0 small"><strong>Status:</strong> <span class="badge ${person.isSpouseAlive ? 'bg-success':'bg-danger'}">${person.isSpouseAlive ? dict.spouseStatusAlive : dict.spouseStatusDeceased}</span></p>
              </div>
          `;
      }

      // Extra allowance pipeline segment
      if (person.extraTitle) {
          detailsHTML += `
              <div class="col-md-6">
                  <h6 class="fw-bold text-warning border-bottom pb-1">${dict.lblExtraInfo}</h6>
                  <p class="m-0 small"><strong>${dict.formLblExtraTitle}:</strong> ${person.extraTitle}</p>
                  <p class="m-0 small"><strong>${dict.formLblExtraAmount}:</strong> <span class="text-success fw-bold font-monospace-custom">$${person.extraAmount}</span></p>
              </div>
          `;
      }

      // Children details loop array segment
      detailsHTML += `<div class="col-12 mt-2">
          <h6 class="fw-bold text-success border-bottom pb-1">${dict.lblChildren} (${person.children ? person.children.length : 0})</h6>`;
          
      if (person.children && person.children.length > 0) {
          detailsHTML += `<div class="row g-2">`;
          person.children.forEach((c, idx) => {
              detailsHTML += `
                  <div class="col-md-4 col-sm-6">
                      <div class="p-2 border rounded bg-white text-dark shadow-sm">
                          <span class="badge bg-secondary mb-1">${dict.lblChild} #${idx+1}: ${c.name}</span>
                          <div class="small"><strong>${dict.childLabelAge}:</strong> ${c.age} | <strong>${dict.childLabelGender}:</strong> ${c.gender}</div>
                          <div class="small"><strong>${dict.childLabelSchool}:</strong> ${c.school}</div>
                          <div class="small text-success fw-bold"><strong>${dict.childLabelStipend}:</strong> $${c.money}</div>
                      </div>
                  </div>
              `;
          });
          detailsHTML += `</div>`;
      } else {
          detailsHTML += `<p class="text-muted small m-0">No children metadata registered.</p>`;
      }
      
/* =====================================
PAYMENT HISTORY
===================================== */

const history =
StorageEngine.getTransactionsByPerson(person.id);

detailsHTML += `

<div class="col-12 mt-4">

<h6 class="fw-bold text-primary border-bottom pb-2">

<i class="bi bi-clock-history"></i>

Payment History

</h6>

`;

if(history.length===0){

detailsHTML+=`

<div class="alert alert-light border">

No payments have been made yet.

</div>

`;

}else{

detailsHTML+=`

<div class="table-responsive">

<table class="table table-sm table-striped">

<thead>

<tr>

<th>Date</th>

<th>Gateway</th>

<th>Amount</th>

<th>Reference</th>

</tr>

</thead>

<tbody>

`;

history.forEach(tx=>{

detailsHTML+=`

<tr>

<td>

${formatDate(tx.date)}

</td>

<td>

${tx.gateway}

</td>

<td class="text-success fw-bold">

${formatMoney(tx.amount)}

</td>

<td>

${tx.reference}

</td>

</tr>

`;

});

detailsHTML+=`

</tbody>

</table>

</div>

`;

}

detailsHTML += `</div></div>`;
      if (targetContainer) targetContainer.innerHTML = detailsHTML;
      if (window.innerWidth < 992 && mobileBox) mobileBox.style.display = "block";
      else if (desktopRow) desktopRow.style.display = "table-row";
      if (btn) btn.innerText = dict.labelBtnLess;
  }
}

function loadPersonToEdit(id) {
  const person = StorageEngine.getPeople().find(p => p.id === id);
  if (!person) return;

  const lang = localStorage.getItem("mc_lang") || "en";
  document.getElementById("formTitle").innerText = peopleDictionary[lang].formTitleEdit;

  document.getElementById("personId").value = person.id;
  document.getElementById("fullName").value = person.fullName;
  document.getElementById("phone").value = person.phone;
  document.getElementById("regionSelect").value = person.region;
  
  const dSelect = document.getElementById("districtSelect");
  dSelect.innerHTML = somaliaRegionsData[person.region].map(d => `<option value="${d}">${d}</option>`).join('');
  dSelect.value = person.district;

  document.getElementById("neighborhood").value = person.neighborhood;
  document.getElementById("age").value = person.age;
  document.getElementById("gender").value = person.gender;
  document.getElementById("maritalStatus").value = person.maritalStatus;
  document.getElementById("baseFamilyMoney").value = person.baseMoney;

  // Load extra values if they exist
  if (person.extraTitle) {
      document.getElementById("extraFieldsPipelineWrapper").style.display = "block";
      document.getElementById("extraTitle").value = person.extraTitle;
      document.getElementById("extraAmount").value = person.extraAmount;
  }

  const marContainer = document.getElementById("conditionalMaritalFields");
  if(person.maritalStatus !== 'single') {
      marContainer.style.display = "block";
      document.getElementById("spouseName").value = person.spouseName || '';
      document.getElementById("spousePhone").value = person.spousePhone || '';
      document.getElementById("spouseAlive").value = person.isSpouseAlive ? 'yes' : 'no';
      document.getElementById("childrenCount").value = person.children ? person.children.length : 0;
      
      const childCountInput = document.getElementById("childrenCount");
      childCountInput.dispatchEvent(new Event('input'));

      const rows = document.querySelectorAll("#childrenFormContainer > div");
      if(person.children) {
          person.children.forEach((child, i) => {
              if(rows[i]) {
                  rows[i].querySelector(".child-name").value = child.name;
                  rows[i].querySelector(".child-gender").value = child.gender;
                  rows[i].querySelector(".child-age").value = child.age;
                  rows[i].querySelector(".child-school").value = child.school;
                  rows[i].querySelector(".child-money").value = child.money;
              }
          });
      }
  } else {
      marContainer.style.display = "none";
  }

  document.getElementById("formModalOverlay").classList.add("active");
}

function resetFormState() {
  document.getElementById("addFamilyForm").reset();
  document.getElementById("personId").value = "";
  document.getElementById("childrenFormContainer").innerHTML = "";
  document.getElementById("conditionalMaritalFields").style.display = "none";
  document.getElementById("extraFieldsPipelineWrapper").style.display = "none";
  setupFormRegionDropdowns();
}

function softDeletePerson(id) {
  const lang = localStorage.getItem("mc_lang") || "en";
  if(confirm(peopleDictionary[lang].confirmDel)) {
      StorageEngine.deletePerson(id);
      renderPeopleTable();
  }
}

function generatePaymentReference(){

    return "TX-"

    + Date.now()

    + "-"

    + Math.floor(Math.random()*9999);

}



// function getLastTransaction(personId){

//     const list = StorageEngine
//         .getTransactions()
//         .filter(t => t.personId === personId)
//         .sort((a,b)=>
//             new Date(b.date)-new Date(a.date)
//         );

//     return list[0] || null;

// }


function getLastTransaction(personId){

    return StorageEngine
        .getTransactionsByPerson(personId)[0] || null;

}
function getCurrentMonthPayments(personId){

    const today = new Date();

    return StorageEngine
        .getTransactions()
        .filter(t=>{

            if(t.personId !== personId)
                return false;

            const d = new Date(t.date);

            return d.getMonth()===today.getMonth()

            &&

            d.getFullYear()===today.getFullYear();

        });

}

function formatDate(value){

    if(!value)

        return "--";

    return new Date(value)

    .toLocaleDateString(

        "en-US",

        {

            weekday:"short",

            month:"short",

            day:"numeric",

            year:"numeric"

        }

    );

}

function formatMoney(value){

    return "$"

    +

    Number(value || 0)

    .toFixed(2);

}


function buildPaymentBreakdown(person){



    const wrapper =
        document.getElementById("paymentBreakdown");

    if(!wrapper) return;

    let html = "";

    /* ------------------------
       BASE PAYMENT
    ------------------------- */

    paymentSelections = {
        base: true,
        extra: true
    };
    
    html += `
    <div class="form-check">
    
    <input
    type="checkbox"
    checked
    class="form-check-input"
    onchange="toggleBasePayment(this)">
    
    <label class="form-check-label">
    
    Base Family
    
    <span class="float-end">
    
    $${person.baseMoney.toFixed(2)}
    
    </span>
    
    </label>
    
    </div>
    `;

    /* ------------------------
       CHILDREN
    ------------------------- */

    if(person.children && person.children.length){

        person.children.forEach((child,index)=>{
    
            paymentSelections["child"+index]=true;
    
            html += `
            <div class="form-check ms-4">
    
                <input
                    type="checkbox"
                    checked
                    class="form-check-input"
                    onchange="toggleChildPayment(${index},this)">
    
                <label class="form-check-label">
    
                    Child ${index+1} (${child.name})
    
                    <span class="float-end">
    
                        $${Number(child.money).toFixed(2)}
    
                    </span>
    
                </label>
    
            </div>
            `;
    
        });
    
    }

    /* ------------------------
       EXTRA ALLOWANCE
    ------------------------- */
    if(person.extraTitle){

        html += `
        <div class="form-check ms-4">
        
        <input
        type="checkbox"
        checked
        class="form-check-input"
        onchange="toggleExtraAllowance(this)">
        
        <label class="form-check-label">
        
        ${person.extraTitle}
        
        <span class="float-end">
        
        $${Number(person.extraAmount).toFixed(2)}
        
        </span>
        
        </label>
        
        </div>
        `;
        
        }

    // wrapper.innerHTML = html;

    document.getElementById("paymentBreakdown").innerHTML = html;

    recalculatePaymentTotal();

    // paymentSelections = {};

    paymentExtras = [];

    buildExtraPayments();
    recalculatePaymentTotal();

}




function showExtraPaymentForm(){

    document.getElementById(
    
    "extraPaymentForm"
    
    ).style.display="block";
    
    }

    function addExtraPayment(){

        paymentExtras.push({
        
        title:
        
        document.getElementById(
        
        "extraPaymentTitle"
        
        ).value,
        
        amount:Number(
        
        document.getElementById(
        
        "extraPaymentAmount"
        
        ).value
        
        ),
        
        enabled:true
        
        });
        
        document.getElementById("extraPaymentTitle").value = "";
        document.getElementById("extraPaymentAmount").value = "";
        
        buildExtraPayments();
        
        recalculatePaymentTotal();
        
        }
function dialPayment(){

    const phone=
    
    currentPaymentPerson.phone.replace(
    
    /\s+/g,
    
    ""
    
    );
    
    const total=currentPaymentTotal;
    
    const gateway=
    
    document.getElementById(
    
    "paymentGateway"
    
    ).value;
    
    let prefix="712";
    
    if(gateway==="eDahab"){
    
    prefix="812";
    
    }
    
    if(gateway==="SomNet"){
    
    prefix="110";
    
    }
    
    window.location.href=
    
    `tel:*${prefix}*${phone}*${total}#`;
    
    }

    function buildExtraPayments() {

        const container =
            document.getElementById("paymentBreakdown");
    
        if (!container) return;
    
        const old =
            container.querySelector("#extraPaymentsArea");
    
        if (old) old.remove();
    
        const wrapper =
            document.createElement("div");
    
        wrapper.id = "extraPaymentsArea";
    
        paymentExtras.forEach((item, index) => {
    
            wrapper.innerHTML += `
            <div class="form-check ms-4">
    
                <input
                    class="form-check-input"
                    type="checkbox"
                    ${item.enabled ? "checked" : ""}
                    onchange="toggleManualExtra(${index},this)">
    
                <label class="form-check-label">
    
                    ${item.title}
    
                    <span class="float-end">
    
                        $${item.amount.toFixed(2)}
    
                    </span>
    
                </label>
    
            </div>
            `;
    
        });
    
        container.appendChild(wrapper);
    
    }

    function toggleManualExtra(index, checkbox){

        paymentExtras[index].enabled =
            checkbox.checked;
    
        recalculatePaymentTotal();
    
    }

    function recalculatePaymentTotal(){

        let total = 0;
    
        if(paymentSelections.base){
    
            total += currentPaymentPerson.baseMoney;
    
        }
    
        if(currentPaymentPerson.children){
    
            currentPaymentPerson.children.forEach((child,index)=>{
    
                if(paymentSelections["child"+index]){
    
                    total += Number(child.money);
    
                }
    
            });
    
        }
    
        if(paymentSelections.extra){
    
            total += Number(currentPaymentPerson.extraAmount || 0);
    
        }
    
        paymentExtras.forEach(item=>{
    
            if(item.enabled){
    
                total += Number(item.amount);
    
            }
    
        });
    
        currentPaymentTotal = total;
    
        document.getElementById("paymentAmount").value =
            total.toFixed(2);
    
            document.getElementById("paymentSuggestedAmount").innerHTML =
            total.toFixed(2);

            refreshUSSDPreview();

    
    }

    function toggleBasePayment(box){

        paymentSelections.base =
            box.checked;
    
        recalculatePaymentTotal();
    
    }

    function toggleChildPayment(index,box){

        paymentSelections["child"+index] =
            box.checked;
    
        recalculatePaymentTotal();
    
    }

    function toggleExtraAllowance(box){

        paymentSelections.extra =
            box.checked;
    
        recalculatePaymentTotal();
    
    }



   
/* ==========================================================
OPEN SEND MONEY MODAL
========================================================== */

function openSendMoneyModal(personId){

    currentPaymentPerson =
    StorageEngine
    .getPeople()
    .find(p=>p.id==personId);

    if(!currentPaymentPerson){

        showToast(
            "Family not found.",
            "danger"
        );

        return;

    }

    document.getElementById("paymentPersonId").value =
    currentPaymentPerson.id;

    document.getElementById("paymentFamilyName").innerHTML =
    currentPaymentPerson.fullName;

    document.getElementById("paymentFamilyPhone").innerHTML =
    currentPaymentPerson.phone;

    document.getElementById("paymentFamilyLocation").innerHTML =

        currentPaymentPerson.region

        + " - "

        + currentPaymentPerson.district;

    document.getElementById("paymentSuggestedAmount").innerHTML =

        currentPaymentPerson.totalCombinedAward.toFixed(2);

        currentPaymentTotal =
        currentPaymentPerson.totalCombinedAward;
        
        document.getElementById("paymentAmount").value =
        currentPaymentTotal;

        buildPaymentBreakdown(currentPaymentPerson);

    document.getElementById("paymentReference").value =

        generatePaymentReference();

        buildPaymentBreakdown(currentPaymentPerson);
        

        renderPaymentHistory(
            currentPaymentPerson.id
        );

    document.getElementById("paymentNotes").value = "";



    /* ======================================
       LAST TRANSACTION
    ======================================= */

    const last =

        getLastTransaction(

            currentPaymentPerson.id

        );

    if(last){

        document.getElementById("lastPaymentDate").innerHTML =

            formatDate(last.date);

        document.getElementById("lastPaymentAmount").innerHTML =

            formatMoney(last.amount);

        document.getElementById("lastPaymentGateway").innerHTML =

            last.gateway;

        document.getElementById("lastPaymentReference").innerHTML =

            last.reference;

    }

    else{

        document.getElementById("lastPaymentDate").innerHTML =
        "Never";

        document.getElementById("lastPaymentAmount").innerHTML =
        "$0.00";

        document.getElementById("lastPaymentGateway").innerHTML =
        "--";

        document.getElementById("lastPaymentReference").innerHTML =
        "--";

    }



    /* ======================================
       CHECK THIS MONTH
    ======================================= */

    const payments =

        getCurrentMonthPayments(

            currentPaymentPerson.id

        );

    if(payments.length>0){

        const lastPayment =

            payments[payments.length-1];

        const total =

            payments.reduce(

                (sum,p)=>sum+p.amount,

                0

            );

        document.getElementById("dupFamilyName").innerHTML =

            currentPaymentPerson.fullName;

        document.getElementById("dupFamilyPhone").innerHTML =

            currentPaymentPerson.phone;

        document.getElementById("dupPaymentDate").innerHTML =

            formatDate(

                lastPayment.date

            );

        document.getElementById("dupPaymentAmount").innerHTML =

            formatMoney(

                lastPayment.amount

            );

        document.getElementById("dupTotalMonth").innerHTML =

            formatMoney(total);

        continuePaymentAfterWarning = true;

        alreadyPaidModal.show();

        return;

    }

    continuePaymentAfterWarning = false;

    refreshUSSDPreview();

    sendMoneyModal.show();
}

/* ==========================================================
CONTINUE PAYMENT AFTER WARNING
========================================================== */

function continueDuplicatePayment(){

    alreadyPaidModal.hide();

    if(continuePaymentAfterWarning){

        sendMoneyModal.show();

    }

}

/* ==========================================================
SAVE PAYMENT
========================================================== */

async function saveFamilyPayment(){

    if(!currentPaymentPerson){

        showToast(
            "No family selected.",
            "danger"
        );

        return;

    }

    const btn =
    document.getElementById("btnConfirmSend");

    const text =
    document.getElementById("sendBtnText");

    btn.disabled = true;

    text.innerHTML =

    `
    <span class="spinner-border spinner-border-sm me-2"></span>

    Sending Assistance...
    `;

    await new Promise(r=>setTimeout(r,900));

    const payment={

        id:Date.now().toString(),

        personId:
        currentPaymentPerson.id,

        familyName:
        currentPaymentPerson.fullName,

        phone:
        currentPaymentPerson.phone,

        amount: currentPaymentTotal,

        gateway:
        document.getElementById(
            "paymentGateway"
        ).value,

        reference:
        document.getElementById(
            "paymentReference"
        ).value,

        notes:
        document.getElementById(
            "paymentNotes"
        ).value,

        date:
        new Date().toISOString()

    };

    StorageEngine.addTransaction(payment);

    renderPaymentHistory(
        currentPaymentPerson.id
    );

btn.disabled = false;

text.innerHTML =

`
<i class="bi bi-send-fill me-1"></i>

Send Assistance
`;

sendMoneyModal.hide();

renderPeopleTable();

showPaymentReceipt(payment);

showToast(

    "Money sent successfully.",

    "success"

);
}


function refreshUSSDPreview(){

    if(!currentPaymentPerson)
        return;

    const gateway =
        document.getElementById("paymentGateway").value;

    const amount =
        Number(
            document.getElementById("paymentAmount").value
        );

    let prefix="712";

    if(gateway==="eDahab")
        prefix="812";

    if(gateway==="SomNet")
        prefix="110";

    const phone =
        currentPaymentPerson.phone.replace(/\s+/g,"");

    document.getElementById("previewGateway").innerHTML =
        gateway;

    document.getElementById("previewPhone").innerHTML =
        phone;

    document.getElementById("previewAmount").innerHTML =
        "$"+amount.toFixed(2);

    document.getElementById("previewCode").innerHTML =
        `*${prefix}*${phone}*${amount.toFixed(2)}#`;

}

function showPaymentReceipt(payment){

    document.getElementById("receiptReference").innerHTML =
        payment.reference;

    document.getElementById("receiptFamily").innerHTML =
        payment.familyName;

    document.getElementById("receiptPhone").innerHTML =
        payment.phone;

    document.getElementById("receiptGateway").innerHTML =
        payment.gateway;

    document.getElementById("receiptAmount").innerHTML =
        formatMoney(payment.amount);

    document.getElementById("receiptDate").innerHTML =
        formatDate(payment.date);

    document.getElementById("receiptNotes").innerHTML =
        payment.notes || "--";

    paymentReceiptModal.show();

}

function printPaymentReceipt(){

    const receipt = `
    <html>

    <head>

        <title>Payment Receipt</title>

        <style>

            body{

                font-family:Arial,sans-serif;

                padding:40px;

            }

            h2{

                text-align:center;

            }

            table{

                width:100%;

                border-collapse:collapse;

                margin-top:25px;

            }

            th,td{

                border:1px solid #999;

                padding:10px;

                text-align:left;

            }

            th{

                background:#f2f2f2;

                width:35%;

            }

            .footer{

                margin-top:40px;

                text-align:center;

                color:#666;

                font-size:14px;

            }

        </style>

    </head>

    <body>

        <h2>Maskiin Caawiye Payment Receipt</h2>

        <table>

            <tr>

                <th>Reference</th>

                <td>${document.getElementById("receiptReference").innerHTML}</td>

            </tr>

            <tr>

                <th>Family</th>

                <td>${document.getElementById("receiptFamily").innerHTML}</td>

            </tr>

            <tr>

                <th>Phone</th>

                <td>${document.getElementById("receiptPhone").innerHTML}</td>

            </tr>

            <tr>

                <th>Gateway</th>

                <td>${document.getElementById("receiptGateway").innerHTML}</td>

            </tr>

            <tr>

                <th>Amount</th>

                <td>${document.getElementById("receiptAmount").innerHTML}</td>

            </tr>

            <tr>

                <th>Date</th>

                <td>${document.getElementById("receiptDate").innerHTML}</td>

            </tr>

            <tr>

                <th>Notes</th>

                <td>${document.getElementById("receiptNotes").innerHTML}</td>

            </tr>

        </table>

        <div class="footer">

            Generated by Maskiin Caawiye

        </div>

    </body>

    </html>
    `;

    const win = window.open("", "_blank");

    win.document.write(receipt);

    win.document.close();

    win.focus();

    win.print();

    setTimeout(()=>{
    
        win.close();
    
    },500);
}

async function downloadReceiptPDF(){

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF();

    pdf.setFontSize(20);

    pdf.text(
        "Maskiin Caawiye",
        20,
        20
    );

    pdf.setFontSize(15);

    pdf.text(
        "Payment Receipt",
        20,
        32
    );

    pdf.setLineWidth(0.5);

    pdf.line(
        20,
        36,
        190,
        36
    );

    let y = 50;

    const row = (title,value)=>{

        pdf.setFont(undefined,"bold");

        pdf.text(title,20,y);

        pdf.setFont(undefined,"normal");

        pdf.text(String(value),80,y);

        y += 12;

    };

    row(
        "Reference",
        document.getElementById("receiptReference").innerHTML
    );

    row(
        "Family",
        document.getElementById("receiptFamily").innerHTML
    );

    row(
        "Phone",
        document.getElementById("receiptPhone").innerHTML
    );

    row(
        "Gateway",
        document.getElementById("receiptGateway").innerHTML
    );

    row(
        "Amount",
        document.getElementById("receiptAmount").innerHTML
    );

    row(
        "Date",
        document.getElementById("receiptDate").innerHTML
    );

    row(
        "Notes",
        document.getElementById("receiptNotes").innerHTML
    );

    pdf.setFontSize(11);

    pdf.text(
        "Generated by Maskiin Caawiye",
        20,
        270
    );

    const reference =
        document.getElementById("receiptReference").innerHTML;

    pdf.save(
        `Receipt-${reference}.pdf`
    );

}

function renderPaymentHistory(personId){

    const container =
        document.getElementById("paymentHistoryTimeline");

    if(!container) return;

    const list =
        StorageEngine
        .getTransactionsByPerson(personId)
        .slice(0,10);

    if(list.length===0){

        container.innerHTML=`
        <div class="text-muted">

            No payment history.

        </div>
        `;

        return;

    }

    let html="";

    list.forEach(payment=>{

        html+=`

<div class="border rounded p-2 mb-2 bg-light">
            <div class="d-flex justify-content-between">

                <strong class="text-success">

                    ${formatMoney(payment.amount)}

                </strong>

                <small class="text-muted">

                    ${formatDate(payment.date)}

                </small>

            </div>

            <div>

                <span class="badge bg-primary">

                    ${payment.gateway}

                </span>

                <small class="ms-2">

                    ${payment.reference}

                </small>

            </div>

        </div>

        `;

    });

    container.innerHTML=html;

}
/* ==========================================================
TOAST
========================================================== */

function showToast(message,type="success"){

    const container=

    document.getElementById(

        "toastContainer"

    );

    if(!container) return;

    const toast=document.createElement("div");

    toast.className=

    `toast align-items-center
    text-bg-${type}
    border-0 show mb-2`;

    toast.innerHTML=

    `
    <div class="d-flex">

        <div class="toast-body">

            ${message}

        </div>

        <button
        class="btn-close
        btn-close-white
        me-2
        m-auto"
        data-bs-dismiss="toast">
        </button>

    </div>
    `;

    container.appendChild(toast);

    setTimeout(()=>{

        toast.remove();

    },3500);

}

/* ==========================================
Refresh language automatically
========================================== */

window.addEventListener("storage", function (e) {

    if (e.key === "mc_lang") {

        applyLanguageTranslations();

        renderPeopleTable();

    }

});