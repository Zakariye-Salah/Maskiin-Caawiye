/*=========================================================
    PREMIUM LOADER
=========================================================*/

function startDashboardLoader() {

    const loader =
        document.getElementById("dashboardLoader");

    const bar =
        document.getElementById("dashboardLoaderBar");

    if (!loader || !bar) return;

    let progress = 0;

    const timer = setInterval(() => {

        progress += 4;

        if (progress > 90)
            progress = 90;

        bar.style.width = progress + "%";

    }, 40);

    window.dashboardLoaderTimer = timer;

}

function finishDashboardLoader() {

    const loader =
        document.getElementById("dashboardLoader");

    const bar =
        document.getElementById("dashboardLoaderBar");

    if (!loader || !bar) return;

    clearInterval(window.dashboardLoaderTimer);

    bar.style.width = "100%";

    setTimeout(() => {

        loader.classList.add("hide");

        document
            .querySelector(".page-content")
            ?.classList.add("loaded");

    }, 400);

}

// --- Maskiin Caawiye: Core Localization & Configuration Engine ---
const translations = {
    en: {
        app_title: "Maskiin Caawiye - Operational Dashboard",
        greeting: "Assalamu Alaikum, Administrator",
        sub_greeting: "Here is your live cross-sectional humanitarian assistance performance report.",
        card_disbursed_funds: "Disbursed Funds",
        card_total_register: "Total Register",
        card_family_baselines: "Family Baselines",
        card_children_scope: "Children/Extra Scope",
        card_active_profiles: "Active target profiles",
        card_extended_allocations: "Extended baseline allocations",
        operator_distribution: "Network Operator Distribution",
        scope_distribution: "Evaluation Scope Distribution",
        recent_activities: "Recent Activity Logs",
        view_all: "View All \u2192",
        nav_dashboard: "Dashboard",
        nav_transactions: "Transactions",
        nav_people: "People",
        nav_reports: "Reports",
        nav_settings: "Settings",
        // Dynamic string mappings
        settlements_suffix: "active settlements recorded",
        coverage_suffix: "database coverage ratio",
        no_metrics_found: "No active financial tracking metrics generated yet.",
        no_logs_found: "No transaction allocations logged.",
        no_stream_found: "No recent transaction updates found inside local arrays.",
        sent_label: "Sent",
        to_label: "to",
        routing_line: "Routing Line Engine"
    },
    so: {
        app_title: "Maskiin Caawiye - Dashboard-ka Hawlgalka",
        greeting: "Assalamu Alaikum, Maamule",
        sub_greeting: "Halkan ka eeg warbixinta tooska ah ee gargaarka bini'aadantinimo.",
        card_disbursed_funds: "Lacagaha la Bixiyey",
        card_total_register: "Diiwaanka Guud",
        card_family_baselines: "Xogta Qoysaska",
        card_children_scope: "Baaxadda Carruurta/Dheeraadka",
        card_active_profiles: "Xogta qoysaska firfircoon",
        card_extended_allocations: "Albaabada qoondaynta dheeraadka ah",
        operator_distribution: "Seerayaasha Shirkadaha Isgaarsiinta",
        scope_distribution: "Qaybinta Baaxadda Qiimaynta",
        recent_activities: "Diiwaanka Hawlihii U Dambeeyey",
        view_all: "Eeg Dhammaan \u2192",
        nav_dashboard: "Dashboard",
        nav_transactions: "Lacagaha",
        nav_people: "Dadka",
        nav_reports: "Warbixinada",
        nav_settings: "Habeeyaha",
        // Dynamic string mappings
        settlements_suffix: "shixnadood oo la xaqiijiyey",
        coverage_suffix: "saamiga daboolidda xogta",
        no_metrics_found: "Ma jiraan xog lacageed oo firfircoon weli.",
        no_logs_found: "Ma jiraan qoondayn lacageed oo la kaydiyey.",
        no_stream_found: "Wax isbedel ah lagama helin xogta dhowaan halkan.",
        sent_label: "Loo diray",
        to_label: "ku socota",
        routing_line: "Khadka Marinka"
    }
};

// Global state context storage tracker pointers
let currentLang = localStorage.getItem("maskiin_lang") || "en";

/*=========================================================
    APPLICATION STARTUP
=========================================================*/

let dashboardInitialized = false;

document.addEventListener("DOMContentLoaded", () => {

    startDashboardLoader();

    initAppTheme();

    try {

        switchDashboardLanguage(currentLang, false);

    } catch (e) {

        console.error(e);

    }

    requestAnimationFrame(() => {

        initializeDashboardCounters(true);

        dashboardInitialized = true;

    });

    // Refresh data every 5 seconds WITHOUT animation
    setInterval(() => {

        initializeDashboardCounters(false);

    }, 5000);

    setTimeout(() => {

        finishDashboardLoader();

    }, 900);

});



/*=========================================================
    PREMIUM NUMBER ANIMATION V4.0
=========================================================*/

function animateNumber(element, endValue, options = {}) {

    if (!element) return;

    const {
        prefix = "",
        suffix = "",
        decimals = 0,
        duration = 1500,
        delay = 0,
        easing = "easeOut"
    } = options;

    // Stop previous animation if one is running
    if (element._animationFrame) {
        cancelAnimationFrame(element._animationFrame);
    }

    clearTimeout(element._animationDelay);

    element._animationDelay = setTimeout(() => {

        const startTime = performance.now();
        const startValue = 0;

        function frame(now) {

            let progress = (now - startTime) / duration;

            if (progress > 1) progress = 1;

            let eased;

            switch (easing) {

                case "linear":
                    eased = progress;
                    break;

                case "easeIn":
                    eased = progress * progress;
                    break;

                case "easeInOut":
                    eased =
                        progress < 0.5
                            ? 2 * progress * progress
                            : 1 - Math.pow(-2 * progress + 2, 2) / 2;
                    break;

                default:
                    eased = 1 - Math.pow(1 - progress, 3);
            }

            let value = startValue + (endValue - startValue) * eased;

            // Whole numbers for counters
            if (decimals === 0) {
                value = Math.round(value);
            }

            element.textContent =
                prefix +
                value.toLocaleString(undefined, {
                    minimumFractionDigits: decimals,
                    maximumFractionDigits: decimals
                }) +
                suffix;

            if (progress < 1) {

                element._animationFrame =
                    requestAnimationFrame(frame);

            } else {

                element.textContent =
                    prefix +
                    endValue.toLocaleString(undefined, {
                        minimumFractionDigits: decimals,
                        maximumFractionDigits: decimals
                    }) +
                    suffix;

                element._animationFrame = null;
            }

        }

        element._animationFrame =
            requestAnimationFrame(frame);

    }, delay);

}

/*=========================================================
    PREMIUM PERCENTAGE ANIMATION V3.0
=========================================================*/

function animatePercentageLabel(

    percentage,

    text,

    options = {}

) {

    const element =

        document.getElementById(

            "dashFundedRatioLabel"

        );

    if (!element) return;

    const {

        duration = 1500,

        delay = 0,

        decimals = 1,

        suffix = "%"

    } = options;

    setTimeout(() => {

        const startTime = performance.now();

        function frame(now) {

            const progress = Math.min(

                (now - startTime) / duration,

                1

            );

            const eased =

                1 - Math.pow(1 - progress, 3);

            const value =

                percentage * eased;

            element.textContent =

                value.toFixed(decimals)

                + suffix

                + " "

                + text;

            if (progress < 1) {

                requestAnimationFrame(frame);

            }

            else {

                element.textContent =

                    percentage.toFixed(decimals)

                    + suffix

                    + " "

                    + text;

            }

        }

        requestAnimationFrame(frame);

    }, delay);

}

// --- CORE ANALYTICS AND METRIC CALCULATION LOGICS ---
function initializeDashboardCounters() {

    /*=========================================================
        LIVE DATE
    =========================================================*/

    const calendarBadge = document.getElementById("liveCalendarBadge");

    if (calendarBadge) {
        calendarBadge.innerText = new Date().toLocaleDateString(
            currentLang === "en" ? "en-US" : "so-SO",
            {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric"
            }
        );
    }

    /*=========================================================
        LOAD DATA
    =========================================================*/

    const transactions =
        (typeof StorageEngine !== "undefined" && StorageEngine.getTransactions)
            ? StorageEngine.getTransactions()
            : [];

    const people =
        (typeof StorageEngine !== "undefined" && StorageEngine.getPeople)
            ? StorageEngine.getPeople()
            : [];

    const globalTotalSum = transactions.reduce(
        (sum, tx) => sum + (parseFloat(tx.amount) || 0),
        0
    );

    const uniqueFundedPhones = [
        ...new Set(
            transactions
                .map(t => String(t.phone || "").trim())
                .filter(Boolean)
        )
    ];

    const registrationCount = people.length;

    const coverageRatio =
        registrationCount === 0
            ? 0
            : (uniqueFundedPhones.length / registrationCount) * 100;

    /*=========================================================
        FAMILY COUNTS
    =========================================================*/

    let familyCount = 0;
    let extraScopeCount = 0;

    transactions.forEach(tx => {

        const scope =
            tx.scopeEvaluation ||
            tx.paymentScope ||
            "Family Only";

        if (
            scope.includes("Children") ||
            scope.includes("Extra") ||
            scope.includes("child")
        ) {
            extraScopeCount++;
        } else {
            familyCount++;
        }

    });

    /*=========================================================
        CACHE ELEMENTS
    =========================================================*/

    const dashTotalDisbursed = document.getElementById("dashTotalDisbursed");
    const dashTotalPeople = document.getElementById("dashTotalPeople");
    const dashFamilyCount = document.getElementById("dashFamilyCount");
    const dashChildrenCount = document.getElementById("dashChildrenCount");
    const dashTxCountLabel = document.getElementById("dashTxCountLabel");

    if (
        !dashTotalDisbursed ||
        !dashTotalPeople ||
        !dashFamilyCount ||
        !dashChildrenCount
    ) {
        console.error("Dashboard elements not found.");
        return;
    }

    /*=========================================================
        LABEL
    =========================================================*/

    if (dashTxCountLabel) {
        dashTxCountLabel.innerText =
            `${transactions.length} ${translations[currentLang].settlements_suffix}`;
    }

    /*=========================================================
        RESET
    =========================================================*/

    dashTotalDisbursed.textContent = "$0.00";
    dashTotalPeople.textContent = "0";
    dashFamilyCount.textContent = "0";
    dashChildrenCount.textContent = "0";

    /*=========================================================
        ANIMATE
    =========================================================*/

    animateNumber(
        dashTotalDisbursed,
        globalTotalSum,
        {
            prefix: "$",
            decimals: 2,
            duration: 1800
        }
    );

    animateNumber(
        dashTotalPeople,
        registrationCount,
        {
            duration: 1500,
            delay: 200
        }
    );

    animateNumber(
        dashFamilyCount,
        familyCount,
        {
            duration: 1500,
            delay: 400
        }
    );

    animateNumber(
        dashChildrenCount,
        extraScopeCount,
        {
            duration: 1500,
            delay: 600
        }
    );

    animatePercentageLabel(
        coverageRatio,
        translations[currentLang].coverage_suffix,
        {
            duration: 1500,
            delay: 800
        }
    );

    /*=========================================================
        COMPONENTS
    =========================================================*/

    renderOperatorDistribution(transactions);
    renderScopeDistribution(transactions);
    renderRecentActivities(transactions);

}

function renderOperatorDistribution(transactions) {
    const container = document.getElementById("operatorBreakdownContainer");
    if (!container) return;

    const gatewaySums = { "EVCPlus": 0, "eDahab": 0, "SomNet": 0 };
    let runningTotalSum = 0;

    transactions.forEach(t => {
        const gw = t.gateway || "EVCPlus";
        const amt = parseFloat(t.amount) || 0;
        if (gatewaySums.hasOwnProperty(gw)) {
            gatewaySums[gw] += amt;
        } else {
            gatewaySums["EVCPlus"] += amt;
        }
        runningTotalSum += amt;
    });

    const gateways = [
        { key: "EVCPlus", label: "EVC Plus (Hormuud)", color: "bg-primary" },
        { key: "eDahab", label: "eDahab (Somtel)", color: "bg-success" },
        { key: "SomNet", label: "SomNet Mobile Money", color: "bg-info" }
    ];

    if (runningTotalSum === 0) {
        container.innerHTML = `<p class="text-muted small my-2">${translations[currentLang].no_metrics_found}</p>`;
        return;
    }

    container.innerHTML = gateways.map(g => {
        const sumVal = gatewaySums[g.key];
        const percentage = runningTotalSum > 0 ? ((sumVal / runningTotalSum) * 100) : 0;
        return `
            <div class="mb-3">
                <div class="d-flex justify-content-between align-items-center small mb-1">
                    <span class="fw-semibold text-secondary">${g.label}</span>
                    <span class="text-body-emphasis fw-bold">$${sumVal.toFixed(2)} (${percentage.toFixed(1)}%)</span>
                </div>
                <div class="progress-bar-custom">
                    <div class="progress-bar h-100 ${g.color}" style="width: ${percentage}%"></div>
                </div>
            </div>
        `;
    }).join('');
}

function renderScopeDistribution(transactions) {
    const container = document.getElementById("scopeBreakdownContainer");
    if (!container) return;

    const scopeCounts = { "Family Only": 0, "Family + Children": 0, "Family + Children + Extra": 0 };
    let totalLogsCount = transactions.length;

    transactions.forEach(t => {
        let sc = t.scopeEvaluation || t.paymentScope || "Family Only";
        if (sc === "family" || sc === "Family") sc = "Family Only";
        
        if (scopeCounts.hasOwnProperty(sc)) {
            scopeCounts[sc]++;
        } else {
            scopeCounts["Family Only"]++;
        }
    });

    if (totalLogsCount === 0) {
        container.innerHTML = `<p class="text-muted small my-2">${translations[currentLang].no_logs_found}</p>`;
        return;
    }

    const configurations = [
        { key: "Family Only", color: "bg-secondary" },
        { key: "Family + Children", color: "bg-success" },
        { key: "Family + Children + Extra", color: "bg-warning" }
    ];

    container.innerHTML = configurations.map(c => {
        const logCount = scopeCounts[c.key];
        const percentage = totalLogsCount > 0 ? ((logCount / totalLogsCount) * 100) : 0;
        return `
            <div class="mb-3">
                <div class="d-flex justify-content-between align-items-center small mb-1">
                    <span class="fw-semibold text-secondary">${c.key}</span>
                    <span class="text-body-emphasis fw-bold">${logCount} logs (${percentage.toFixed(0)}%)</span>
                </div>
                <div class="progress-bar-custom">
                    <div class="progress-bar h-100 ${c.color}" style="width: ${percentage}%"></div>
                </div>
            </div>
        `;
    }).join('');
}

function renderRecentActivities(transactions) {
    const container = document.getElementById("recentActivitiesContainer");
    if (!container) return;

    if (transactions.length === 0) {
        container.innerHTML = `<p class="text-muted text-center py-4 my-2 small">${translations[currentLang].no_stream_found}</p>`;
        return;
    }

    const streamFeedList = [...transactions]
        .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
        .slice(0, 5);

    container.innerHTML = streamFeedList.map(t => {
        const dynamicTime = t.date ? new Date(t.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Now';
        const printAmount = parseFloat(t.amount) || 0;
        const name =
        t.familyName ||
        t.name ||
        "Beneficiary";        const gw = t.gateway || 'EVCPlus';
        
        let variant = "primary-variant";
        if (gw === "eDahab") variant = "success-variant";
        if (gw === "SomNet") variant = "warning-variant";

        return `
            <div class="recent-activity-row ${variant}">
                <div class="d-flex justify-content-between align-items-start gap-2">
                    <div class="overflow-hidden">
                        <strong class="d-block text-body-emphasis text-capitalize small text-truncate">
                            ${translations[currentLang].sent_label} $${printAmount.toFixed(2)} ${translations[currentLang].to_label} ${name}
                        </strong>
                        <span class="text-muted d-block text-truncate" style="font-size: 0.8rem;">
                            ${translations[currentLang].routing_line}: ${t.phone || 'N/A'} via ${gw}
                        </span>
                    </div>
                    <span class="badge bg-body-secondary text-secondary border small fw-normal font-monospace flex-shrink-0">${dynamicTime}</span>
                </div>
            </div>
        `;
    }).join('');
}

// --- LIGHT/DARK MODE ENGINE HOOKS ---
function initAppTheme() {
    const savedTheme = localStorage.getItem("maskiin_theme") || "light";
    document.documentElement.setAttribute("data-bs-theme", savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleDashboardTheme() {
    const activeTheme = document.documentElement.getAttribute("data-bs-theme");
    const targetTheme = activeTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-bs-theme", targetTheme);
    localStorage.setItem("maskiin_theme", targetTheme);
    updateThemeIcon(targetTheme);
}

function updateThemeIcon(theme) {
    const icon = document.getElementById("themeToggleIcon");
    if (!icon) return;
    if (theme === "dark") {
        icon.className = "bi bi-sun-fill";
    } else {
        icon.className = "bi bi-moon-stars-fill";
    }
}

// --- MULTI-LANGUAGE TRANSLATION TRANSLATION CONTROLLER ---
function switchDashboardLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem("maskiin_lang", lang);

    // Update labels inside the select element
    const labelEl = document.getElementById("currentLangLabel");
    if (labelEl) labelEl.innerText = lang === 'en' ? 'English' : 'Soomaali';

    // Toggle active dropdown visibility status visually
    document.querySelectorAll(".dropdown-menu-item").forEach(item => {
        if (item.innerText.toLowerCase().includes(lang === 'en' ? 'english' : 'soomaali')) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });

    // Remap descriptive data elements matching target datasets
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });

    // Re-render counters to dynamically alter system values
    initializeDashboardCounters();
} 
