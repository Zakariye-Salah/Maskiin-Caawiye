// Maskiin Caawiye - Transactions Ledger Processing Control Engine
let bsEditModalInstance = null;

const txDictionary = {
    en: {
        navTitle: "Maskiin Caawiye", navSub: "NGO Financial History Portal",
        totalMoneyAll: "Total Funds Disbursed (All)", totalMoneyTarget: "Total for this Target Person",
        totalCountSaved: "Total Transactions Saved", totalCountTarget: "Total Transactions for Target",
        lblFiltered: "Filtered Window View", lblSearch: "Search Name or Phone",
        lblSorting: "Value Sorting", lblTimeline: "Timeline Constraint",
        lblLimit: "Row Limit Display", btnReset: "Reset Filters",
        headingDefault: "Settled Mobile Money Transfer (MMT) Records", headingSearch: "Complete Historical Ledger for Target Match: ",
        optSortNew: "Newest Logs First", optSortBig: "Biggest Payouts First", optSortSmall: "Smallest Payouts First",
        optTimeLife: "Lifetime Records", optTimeToday: "Today", optTimeWeek: "Past 7 Days", optTimeMonth: "Current Month",
        optLimitAll: "All Rows", showing: "Showing", of: "of", entries: "Entries", emptyMsg: "No financial ledger lines match selected criteria.",
        lblModalTitle: "Modify Settled Transaction Record", lblModalName: "Beneficiary Name", lblModalPhone: "Mobile Line Phone Target",
        lblModalGate: "Payment Gateway", lblModalAmt: "Amount Sent ($)", lblModalScope: "Scope of Evaluation Override", btnModalSubmit: "Apply Parameter Adjustments",
        thTxId: "Transaction ID", thTime: "Timestamp", thProfile: "Beneficiary Profile Target", thMobile: "Target Mobile Line", thGateway: "Network Gate", thScope: "Scope of Evaluation", thAmt: "Transfer Amount", thActions: "Record Actions",
        btnEdit: "Edit", btnDelete: "Delete", labelId: "ID", labelScope: "Scope of Evaluation", labelStatus: "Status", alertConfirmDelete: "Flag this transaction allocation receipt as soft-deleted?"
    },
    so: {
        navTitle: "Maskiin Caawiye", navSub: "Xogta Taariikhda Lacag bixinta NGO",
        totalMoneyAll: "Lacagta Guud Ee La Bixiyay", totalMoneyTarget: "Wadarta Qofkan Kaliya",
        totalCountSaved: "Tiro Koobka Xogta Lacagaha", totalCountTarget: "Wadarta Lacagaha Qofkan",
        lblFiltered: "Muuqaalka Shaandhada", lblSearch: "Raadi Magac ama Taleefon",
        lblSorting: "Habaynta Qiimaha", lblTimeline: "Xaddidaadda Wakhtiga",
        lblLimit: "Xaddid Row-yada", btnReset: "Dib u Bilow Shaandhada",
        headingDefault: "Diiwaanka Lacagaha Lagu Shubay Mobilada (MMT)", headingSearch: "Taariikhda Diiwaanka Xogta Qofka: ",
        optSortNew: "Kuwii ugu Dambeeyay Horey", optSortBig: "Kuwa ugu Lacag Badan Horey", optSortSmall: "Kuwa ugu Lacag Yar Horey",
        optTimeLife: "Xogta Abid", optTimeToday: "Maanta", optTimeWeek: "7-dii Maalmood ee La Soo Dhaafay", optTimeMonth: "Bishan Gudaheeda",
        optLimitAll: "Dhammaan Safafka", showing: "Haddada Waxaa Muuqda", of: "oo ka mid ah", entries: "Xogood", emptyMsg: "Ma jiraan wax xog ah oo waafaqay shuruudahan.",
        lblModalTitle: "Wax ka Beddel Diiwaanka Lacagta", lblModalName: "Magaca Qofka", lblModalPhone: "Lambarka Taleefonka",
        lblModalGate: "Shabakadda Operator-ka", lblModalAmt: "Lacagta la Diray ($)", lblModalScope: "Beddel Nooca Qiimaynta", btnModalSubmit: "Keydi Isbeddelada",
        thTxId: "Aqoonsiga Dirista", thTime: "Wakhtiga la Diray", thProfile: "Magaca Mudnaanta Leh", thMobile: "Lambarka Taleefonka", thGateway: "Shabakadda", thScope: "Nooca Qiimaynta", thAmt: "Qiimaha Lacagta", thActions: "Waxqabadka",
        btnEdit: "Wax ka beddel", btnDelete: "Tirtir", labelId: "Aqoonsiga", labelScope: "Nooca Qiimaynta", labelStatus: "Xaaladda", alertConfirmDelete: "Ma hubtaa inaad tirtirto kaydkan xogta lacagta ah?"
    }
};

document.addEventListener("DOMContentLoaded", () => {
    applyActiveThemeState();
    applyActiveLanguageTranslations();
    bsEditModalInstance = new bootstrap.Modal(document.getElementById('editTxModal'));
    renderTransactionLedger();

    document.getElementById("txSearch").addEventListener("input", renderTransactionLedger);
    document.getElementById("txFilterScope").addEventListener("change", renderTransactionLedger);
    document.getElementById("txDateScope").addEventListener("change", renderTransactionLedger);
    document.getElementById("txRowLimit").addEventListener("change", renderTransactionLedger);
    document.getElementById("editTxForm").addEventListener("submit", processRecordModificationUpdate);
});

function applyActiveThemeState() {
    const savedTheme = localStorage.getItem("mc_theme") || "light";
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
}

function applyActiveLanguageTranslations() {
    const lang = localStorage.getItem("mc_lang") || "en";
    const dict = txDictionary[lang] || txDictionary.en;

    const safeSetText = (id, text) => {
        const element = document.getElementById(id);
        if (element) element.innerText = text;
    };

    safeSetText("navTitle", dict.navTitle);
    safeSetText("navSubtitle", dict.navSub);
    safeSetText("lblFilteredWindow", dict.lblFiltered);
    safeSetText("lblSearch", dict.lblSearch);
    safeSetText("lblSorting", dict.lblSorting);
    safeSetText("lblTimeline", dict.lblTimeline);
    safeSetText("lblLimit", dict.lblLimit);
    safeSetText("btnReset", dict.btnReset);

    safeSetText("optSortNew", dict.optSortNew);
    safeSetText("optSortBig", dict.optSortBig);
    safeSetText("optSortSmall", dict.optSortSmall);
    safeSetText("optTimeLife", dict.optTimeLife);
    safeSetText("optTimeToday", dict.optTimeToday);
    safeSetText("optTimeWeek", dict.optTimeWeek);
    safeSetText("optTimeMonth", dict.optTimeMonth);
    safeSetText("optLimitAll", dict.optLimitAll);

    // Table Column Headers Translations
    safeSetText("thTxId", dict.thTxId);
    safeSetText("thTime", dict.thTime);
    safeSetText("thProfile", dict.thProfile);
    safeSetText("thMobile", dict.thMobile);
    safeSetText("thGateway", dict.thGateway);
    safeSetText("thScope", dict.thScope);
    safeSetText("thAmt", dict.thAmt);
    safeSetText("thActions", dict.thActions);

    // Modal elements translations
    safeSetText("lblModalTitle", dict.lblModalTitle);
    safeSetText("lblModalName", dict.lblModalName);
    safeSetText("lblModalPhone", dict.lblModalPhone);
    safeSetText("lblModalGate", dict.lblModalGate);
    safeSetText("lblModalAmt", dict.lblModalAmt);
    safeSetText("lblModalScope", dict.lblModalScope);
    safeSetText("btnModalSubmit", dict.btnModalSubmit);
}

function renderTransactionLedger() {
    const desktopTableBody = document.getElementById("transactionTableBody");
    const mobileListBody = document.getElementById("mobileListLayout");
    if (!desktopTableBody || !mobileListBody) return;

    const lang = localStorage.getItem("mc_lang") || "en";
    const dict = txDictionary[lang] || txDictionary.en;

    let dataset = StorageEngine.getTransactions() || []; 
    const peopleList = StorageEngine.getPeople() || [];
    
    const searchStr = document.getElementById("txSearch").value.trim().toLowerCase();
    const valueSort = document.getElementById("txFilterScope").value;
    const dateScope = document.getElementById("txDateScope").value;
    const rowLimit = document.getElementById("txRowLimit").value;

    if (searchStr) {
        dataset = dataset.filter(t => {
            const txName =
    t.familyName ||
    t.name ||
    "";

        const nameMatch =
            txName
            .toLowerCase()
            .includes(searchStr);
            const phoneMatch = t && t.phone ? String(t.phone).includes(searchStr) : false;
            return nameMatch || phoneMatch;
        });
        document.getElementById("tableHeaderTitle").innerText = `${dict.headingSearch} "${searchStr}"`;
        document.getElementById("totalMoneyCardLabel").innerText = dict.totalMoneyTarget;
        document.getElementById("totalCountCardLabel").innerText = dict.totalCountTarget;
    } else {
        document.getElementById("tableHeaderTitle").innerText = dict.headingDefault;
        document.getElementById("totalMoneyCardLabel").innerText = dict.totalMoneyAll;
        document.getElementById("totalCountCardLabel").innerText = dict.totalCountSaved;
    }

    const now = new Date();
    if (dateScope === "today") {
        const todayStr = now.toISOString().split('T')[0];
        dataset = dataset.filter(t => t && t.date && String(t.date).split('T')[0] === todayStr);
    } else if (dateScope === "week") {
        const sevenDaysAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
        dataset = dataset.filter(t => t && t.date && new Date(t.date) >= sevenDaysAgo);
    } else if (dateScope === "month") {
        dataset = dataset.filter(t => {
            if (!t || !t.date) return false;
            const d = new Date(t.date);
            return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        });
    }

    const totalSum = dataset.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0);
    document.getElementById("sumTotalDisbursed").innerText = `$${totalSum.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    document.getElementById("countSettledTx").innerText = `${dataset.length} ${dict.entries}`;

    if (valueSort === "all") {
        dataset.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    } else if (valueSort === "biggest") {
        dataset.sort((a, b) => (b.amount || 0) - (a.amount || 0));
    } else if (valueSort === "smallest") {
        dataset.sort((a, b) => (a.amount || 0) - (b.amount || 0));
    }

    const totalMatchingCount = dataset.length;
    if (rowLimit !== "all") {
        const limitNum = parseInt(rowLimit) || 50;
        dataset = dataset.slice(0, limitNum);
    }

    document.getElementById("scopeTxCount").innerText = `${dict.showing} ${dataset.length} ${dict.of} ${totalMatchingCount}`;

    if (dataset.length === 0) {
        desktopTableBody.innerHTML = `<tr><td colspan="8" class="text-center text-muted py-4 small">${dict.emptyMsg}</td></tr>`;
        mobileListBody.innerHTML = `<div class="text-center text-muted py-4 small">${dict.emptyMsg}</div>`;
        return;
    }

    let desktopHTML = "";
    let mobileHTML = "";

    dataset.forEach(t => {
        const rawDate = t.date ? new Date(t.date) : new Date();
        const formattedDateDesktop = rawDate.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        const formattedDateMobile = rawDate.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        
        const scopeText = t.scopeEvaluation || t.paymentScope || "Family Only";
        let badgeClass = "badge-scope-family";
        if(scopeText.includes("Children") || scopeText.includes("child")) badgeClass = "badge-scope-children";
        if(scopeText.includes("Extra") || scopeText.includes("Holiday")) badgeClass = "badge-scope-extra";

        const printName =
        t.familyName ||
        t.name ||
        "Unknown Beneficiary";        
        const printPhone = t.phone || "N/A";
        const printGateway = t.gateway || "EVCPlus";
        const printAmount = parseFloat(t.amount) || 0.00;

        const matchedPerson =
        peopleList.find(p=>
            p.phone.replace(/\s/g,"")
            ===
            printPhone.replace(/\s/g,"")
        );        
        const gender = matchedPerson && matchedPerson.gender ? matchedPerson.gender.toLowerCase() : 'male';
        const honorific = (gender === 'female' || gender === 'marwo') ? 'Marwo' : 'Mudane';

        const smsMessageBody = `Kudama: ${honorific} ${printName}, waxaaa laguu soo diray lacag dhan $${printAmount.toFixed(2)} USD oo gargaar bini'aadanimo ah. Waxaa laguugu shubay xisaabtaada ${printGateway}. Mahadsanid.`;
        const encodedSms = encodeURIComponent(smsMessageBody);

        // A. BUILD DESKTOP TABLE ROW
        desktopHTML += `
            <tr>
                <td><small class="font-monospace text-secondary">${t.id || 'N/A'}</small></td>
                <td><small>${formattedDateDesktop}</small></td>
                <td><strong>${printName}</strong></td>
                <td><span class="badge bg-light text-dark font-monospace-custom">${printPhone}</span></td>
                <td><span class="badge bg-secondary bg-opacity-10 text-dark">${printGateway}</span></td>
                <td><span class="badge ${badgeClass} px-2.5 py-1.5 font-monospace-custom">${scopeText}</span></td>
                <td class="text-success fw-bold font-monospace-custom">$${printAmount.toFixed(2)}</td>
                <td>
                    <div class="d-flex gap-1 justify-content-center">
                        <a href="sms:${printPhone}?body=${encodedSms}" class="btn btn-sm btn-success text-white fw-bold px-2 py-0.5">SMS</a>
                        <button class="btn btn-sm btn-outline-primary px-2 py-0.5" onclick="openModifyRecordModal('${t.id}')">${dict.btnEdit}</button>
                        <button class="btn btn-sm btn-outline-danger px-2 py-0.5" onclick="triggerSoftDeleteTx('${t.id}')">${dict.btnDelete}</button>
                    </div>
                </td>
            </tr>
        `;

        // B. BUILD MOBILE LAYER STACK COMPONENT
        mobileHTML += `
            <div class="mobile-tx-card">
                <div class="mobile-stack-row">
                    <span class="text-secondary small"><strong>${dict.labelId}:</strong> <code class="text-muted">${t.id || 'N/A'}</code></span>
                    <span class="text-muted small">${formattedDateMobile}</span>
                </div>
                <div class="mobile-stack-row">
                    <div class="d-flex flex-column">
                        <strong class="text-dark text-capitalize text-truncate" style="max-width:200px;">${printName}</strong>
                        <small class="text-secondary font-monospace-custom">${printPhone}</small>
                    </div>
                </div>
                <div class="mobile-stack-row">
                    <span class="small text-muted"><strong>${dict.labelScope}:</strong></span>
                    <span class="badge ${badgeClass}">${scopeText}</span>
                </div>
                <div class="mobile-stack-row">
                    <span class="small text-muted"><strong>${dict.labelStatus}:</strong></span>
                    <span class="badge bg-light text-dark border">${printGateway}</span>
                </div>
                <div class="mobile-stack-row">
                    <span class="text-success fw-bold font-monospace-custom fs-5">$${printAmount.toFixed(2)}</span>
                    <a href="sms:${printPhone}?body=${encodedSms}" class="btn btn-sm btn-success text-white fw-bold px-3">SMS</a>
                </div>
                <div class="d-flex gap-2 mt-1">
                    <button class="btn btn-sm btn-outline-primary w-50 py-1" onclick="openModifyRecordModal('${t.id}')">${dict.btnEdit}</button>
                    <button class="btn btn-sm btn-outline-danger w-50 py-1" onclick="triggerSoftDeleteTx('${t.id}')">${dict.btnDelete}</button>
                </div>
            </div>
        `;
    });

    desktopTableBody.innerHTML = desktopHTML;
    mobileListBody.innerHTML = mobileHTML;
}

function clearSearchFilters() {
    document.getElementById("txSearch").value = "";
    document.getElementById("txFilterScope").value = "all";
    document.getElementById("txDateScope").value = "all";
    document.getElementById("txRowLimit").value = "50";
    renderTransactionLedger();
}

function openModifyRecordModal(txId){

    const txLog = StorageEngine.getTransactionById(txId);

    if(!txLog) return;

    document.getElementById("editTxId").value =
        txLog.id;

    document.getElementById("editTxName").value =
        txLog.familyName || txLog.name || "";

    document.getElementById("editTxPhone").value =
        txLog.phone || "";

    document.getElementById("editTxGateway").value =
        txLog.gateway || "EVC Plus";

    document.getElementById("editTxAmount").value =
        txLog.amount || 0;

    document.getElementById("editTxScope").value =
        txLog.scopeEvaluation ||
        txLog.paymentScope ||
        "Family Only";

    bsEditModalInstance.show();

}

function processRecordModificationUpdate(e){

    e.preventDefault();

    const id =
        document.getElementById("editTxId").value;

    const phone =
        document.getElementById("editTxPhone")
        .value
        .trim();

    const amount =
        Number(
            document.getElementById("editTxAmount")
            .value
        );

    StorageEngine.updateTransaction(id,{

        familyName:
            document.getElementById("editTxName").value,

        phone:phone,

        gateway:
            document.getElementById("editTxGateway").value,

        amount:amount,

        scopeEvaluation:
            document.getElementById("editTxScope").value,

        ussdExecuted:
            `*712*${phone}*${amount}#`

    });

    bsEditModalInstance.hide();

    renderTransactionLedger();

}

function triggerSoftDeleteTx(txId) {
    const lang = localStorage.getItem("mc_lang") || "en";
    const dict = txDictionary[lang] || txDictionary.en;

    if (confirm(dict.alertConfirmDelete)) {
        StorageEngine.deleteTransaction(txId);
        renderTransactionLedger();
    }
}