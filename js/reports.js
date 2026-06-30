// Maskiin Caawiye - Reports Analytics & Metric Core Engine Matrix

const reportDictionary = {
    en: {
        navTitle: "Maskiin Caawiye", navSub: "NGO Financial History Portal",
        lblReportGateway: "Target Gateway Isolation Filter", optGateAll: "All Gateways & Wallets Combined",
        btnRefreshReport: "Refresh Dynamic Calculations", lblVolumeHeading: "Total Ledger Evaluation Volume",
        lblCountHeading: "Processed Disbursed Count", lblTableHeading: "Beneficiary Distribution & Performance Metrics Summary",
        thName: "Beneficiary Name", thPhone: "Registered Phone Target", thTxCount: "Transaction Run Count",
        thTotalSent: "Total Funds Transferred", thAvgPayout: "Average Payout Margin", thLastDate: "Last Activity Entry Date",
        emptyMsg: "No analytics ledger entries map to isolated configurations.",
        mobileLabelPhone: "Phone", mobileLabelCount: "Total Records", mobileLabelSum: "Total Disbursed",
        mobileLabelAvg: "Average Payout", mobileLabelLast: "Last Disbursed Date",
        lblPipelineTitle: "Compile Custom Export Pipeline", lblPipelineRegion: "Isolate Region Profile",
        optRegionAll: "All Regions Across Somalia", lblPipelineTime: "Time Isolation Window",
        optTimeAll: "All Lifetime History Data", optTimeToday: "Today's Disbursements", optTimeMonth: "Current Calendar Month",
        btnExportExcel: "Export Excel (.xls)", btnDownloadPDF: "Download PDF Report"
    },
    so: {
        navTitle: "Maskiin Caawiye", navSub: "Xogta Taariikhda Lacag bixinta NGO",
        lblReportGateway: "Shaandhada Kala Soocida Shabakadaha", optGateAll: "Dhammaan Shabakadaha Isku Darkooda",
        btnRefreshReport: "Dib u Cusbooneysii Xogta Analytics-ka", lblVolumeHeading: "Wadarta Guud Ee Lacagaha La Qiimeeyay",
        lblCountHeading: "Tirada Diiwaanka Lacagaha La Bixiyay", lblTableHeading: "Soo Koobidda Qaybinta Lacagaha iyo Waxqabadka Dadka",
        thName: "Magaca Qofka", thPhone: "Lambarka Taleefonka Ee Diwaangashan", thTxCount: "Tirada Jeer ee Lacagta Loo Diray",
        thTotalSent: "Wadarta Lacagta La Diray", thAvgPayout: "Celceliska Qiimaha Lacag kasta", thLastDate: "Taariikhda Ugu Dambeysay Xogta",
        emptyMsg: "Ma jiraan wax xog analytics ah oo waafaqay shuruudahan.",
        mobileLabelPhone: "Taleefonka", mobileLabelCount: "Tirada Diiwaanka", mobileLabelSum: "Wadarta La Diray",
        mobileLabelAvg: "Celceliska Payout-ka", mobileLabelLast: "Taariikhdii Ugu Dambeysay",
        lblPipelineTitle: "Ururi Shuruudaha Dhoofinta Warbixinta", lblPipelineRegion: "Goatami gobolka qofka",
        optRegionAll: "Dhammaan Gobollada Soomaaliya", lblPipelineTime: "Xaddid daaqadda Wakhtiga",
        optTimeAll: "Xogta Abid oo Dhammaystiran", optTimeToday: "Lacag bixintii Maanta", optTimeMonth: "Bishan Gudaheeda Taariikheed",
        btnExportExcel: "Dhoofi Excel (.xls)", btnDownloadPDF: "La soo deg PDF Warbixin"
    }
};

document.addEventListener("DOMContentLoaded", () => {
    applyActiveThemeState();
    applyActiveLanguageTranslations();
    runRecalculateAnalytics();

    document.getElementById("reportGatewayFilter").addEventListener("change", runRecalculateAnalytics);
    document.getElementById("pipelineRegion").addEventListener("change", runRecalculateAnalytics);
    document.getElementById("pipelineTime").addEventListener("change", runRecalculateAnalytics);
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
    const dict = reportDictionary[lang] || reportDictionary.en;

    const safeSetText = (id, text) => {
        const element = document.getElementById(id);
        if (element) element.innerText = text;
    };

    safeSetText("navTitle", dict.navTitle);
    safeSetText("navSubtitle", dict.navSub);
    safeSetText("lblReportGateway", dict.lblReportGateway);
    safeSetText("optGateAll", dict.optGateAll);
    safeSetText("btnRefreshReport", dict.btnRefreshReport);
    safeSetText("lblVolumeHeading", dict.lblVolumeHeading);
    safeSetText("lblCountHeading", dict.lblCountHeading);
    safeSetText("lblTableHeading", dict.lblTableHeading);
    
    // Custom Pipeline Setup Dictionary Updates
    safeSetText("lblPipelineTitle", dict.lblPipelineTitle);
    safeSetText("lblPipelineRegion", dict.lblPipelineRegion);
    safeSetText("optRegionAll", dict.optRegionAll);
    safeSetText("lblPipelineTime", dict.lblPipelineTime);
    safeSetText("optTimeAll", dict.optTimeAll);
    safeSetText("optTimeToday", dict.optTimeToday);
    safeSetText("optTimeMonth", dict.optTimeMonth);
    safeSetText("btnExportExcel", dict.btnExportExcel);
    safeSetText("btnDownloadPDF", dict.btnDownloadPDF);

    // Header Element Layout Conversions
    safeSetText("thName", dict.thName);
    safeSetText("thPhone", dict.thPhone);
    safeSetText("thTxCount", dict.thTxCount);
    safeSetText("thTotalSent", dict.thTotalSent);
    safeSetText("thAvgPayout", dict.thAvgPayout);
    safeSetText("thLastDate", dict.thLastDate);
}

function runRecalculateAnalytics() {
    const desktopTableBody = document.getElementById("reportTableBody");
    const mobileListBody = document.getElementById("mobileReportLayout");
    if (!desktopTableBody || !mobileListBody) return;

    const lang = localStorage.getItem("mc_lang") || "en";
    const dict = reportDictionary[lang] || reportDictionary.en;

    const gatewayIsolation = document.getElementById("reportGatewayFilter").value;
    const regionIsolation = document.getElementById("pipelineRegion").value;
    const timeIsolation = document.getElementById("pipelineTime").value;

    let transactions = StorageEngine.getTransactions() || [];
    const peopleList = StorageEngine.getPeople() || [];

    // Pipeline Check 1: Target Gateway Filter Isolation
    if (gatewayIsolation !== "all") {
        transactions = transactions.filter(t => t && t.gateway === gatewayIsolation);
    }

    // Pipeline Check 2: Regional Area Cross-Reference Map
    if (regionIsolation !== "all") {
        transactions = transactions.filter(t => {
            const profile = peopleList.find(p => String(p.phone).trim() === String(t.phone).trim());
            if (!profile || !profile.region) return false;
            return String(profile.region).toLowerCase() === regionIsolation;
        });
    }

    // Pipeline Check 3: Advanced Time Boundary Restrictions Filter
    const now = new Date();
    if (timeIsolation === "today") {
        const todayStr = now.toISOString().split('T')[0];
        transactions = transactions.filter(t => t && t.date && String(t.date).split('T')[0] === todayStr);
    } else if (timeIsolation === "month") {
        transactions = transactions.filter(t => {
            if (!t || !t.date) return false;
            const d = new Date(t.date);
            return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        });
    }

    // Process structural totals metrics computations 
    const totalVolume = transactions.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0);
    const totalCount = transactions.length;

    document.getElementById("txtTotalVolume").innerText = `$${totalVolume.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    document.getElementById("txtTotalCount").innerText = `${totalCount} ${lang === "so" ? "Xogood" : "Logs"}`;

    const progressVolumeBar = document.getElementById("progressVolumeBar");
const progressCountBar = document.getElementById("progressCountBar");

if (progressVolumeBar) {
    progressVolumeBar.style.width = totalVolume > 0 ? "100%" : "0%";
}

if (progressCountBar) {
    progressCountBar.style.width = totalCount > 0 ? "100%" : "0%";
}
    if (totalCount === 0) {
        desktopTableBody.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-4 small">${dict.emptyMsg}</td></tr>`;
        mobileListBody.innerHTML = `<div class="text-center text-muted py-4 small">${dict.emptyMsg}</div>`;
        return;
    }

    const userSummaryMap = {};
    transactions.forEach(t => {
        const phoneKey = String(t.phone || "N/A").trim();
        const amt = parseFloat(t.amount) || 0;
        const txDate = t.date ? new Date(t.date) : new Date();

        if (!userSummaryMap[phoneKey]) {
            userSummaryMap[phoneKey] = {
                name: t.name || "Unknown Beneficiary",
                phone: phoneKey,
                count: 0,
                totalAmount: 0,
                lastDate: txDate
            };
        }

        userSummaryMap[phoneKey].count += 1;
        userSummaryMap[phoneKey].totalAmount += amt;
        if (txDate > userSummaryMap[phoneKey].lastDate) {
            userSummaryMap[phoneKey].lastDate = txDate;
        }
    });

    const analysisArray = Object.values(userSummaryMap);
    analysisArray.sort((a, b) => b.totalAmount - a.totalAmount);

    let desktopHTML = "";
    let mobileHTML = "";

    analysisArray.forEach(user => {
        const averagePayout = user.totalAmount / user.count;
        const formattedDate = user.lastDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

        desktopHTML += `
            <tr>
                <td><strong>${user.name}</strong></td>
                <td><span class="badge bg-light text-dark font-monospace-custom">${user.phone}</span></td>
                <td><span class="fw-bold">${user.count}</span></td>
                <td class="text-success fw-bold font-monospace-custom">$${user.totalAmount.toFixed(2)}</td>
                <td class="text-primary font-monospace-custom">$${averagePayout.toFixed(2)}</td>
                <td><small class="text-muted">${formattedDate}</small></td>
            </tr>
        `;

        mobileHTML += `
            <div class="mobile-report-card">
                <div class="mobile-report-row">
                    <strong class="text-dark text-capitalize text-truncate" style="max-width:260px;">${user.name}</strong>
                </div>
                <div class="mobile-report-row">
                    <span class="small text-muted"><strong>${dict.mobileLabelPhone}:</strong></span>
                    <span class="badge bg-light text-dark font-monospace-custom">${user.phone}</span>
                </div>
                <div class="mobile-report-row">
                    <span class="small text-muted"><strong>${dict.mobileLabelCount}:</strong></span>
                    <span class="fw-bold text-dark">${user.count}</span>
                </div>
                <div class="mobile-report-row">
                    <span class="small text-muted"><strong>${dict.mobileLabelSum}:</strong></span>
                    <span class="text-success fw-bold font-monospace-custom">$${user.totalAmount.toFixed(2)}</span>
                </div>
                <div class="mobile-report-row">
                    <span class="small text-muted"><strong>${dict.mobileLabelAvg}:</strong></span>
                    <span class="text-primary font-monospace-custom">$${averagePayout.toFixed(2)}</span>
                </div>
                <div class="mobile-report-row">
                    <span class="small text-muted"><strong>${dict.mobileLabelLast}:</strong></span>
                    <small class="text-muted">${formattedDate}</small>
                </div>
            </div>
        `;
    });

    desktopTableBody.innerHTML = desktopHTML;
    mobileListBody.innerHTML = mobileHTML;
}

// Native Excel Sheet Matrix Generation Stream Implementation
function exportToExcelEngine() {
    const table = document.getElementById("exportTargetTable");
    if (!table) return;
    
    let html = table.outerHTML;
    // Strip styles from outer layout markup inject clean stream URI data
    let url = 'data:application/vnd.ms-excel,' + encodeURIComponent(html);
    let link = document.createElement('a');
    link.href = url;
    link.download = `Maskiin_Caawiye_Report_${new Date().toISOString().split('T')[0]}.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Native PDF Document Render Implementation Engine via Browser Window Print Instance
function triggerPDFDownload() {
    window.print();
}