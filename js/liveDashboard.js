/*=========================================================
    LIVE DASHBOARD - FIXED CLEAN VERSION
=========================================================*/

"use strict";

let DASH_INTERVAL = null;

/*=========================================================
    START LIVE MODE
=========================================================*/

function startLiveDashboard(interval = 5000) {

    stopLiveDashboard();

    DASH_INTERVAL = setInterval(() => {

        try {

            updateDashboardStats();

            updateCharts();

            updateRankings();

            updateAISummary();

        } catch (err) {

            console.error("Live dashboard error:", err);

        }

    }, interval);
}

/*=========================================================
    STOP
=========================================================*/

function stopLiveDashboard() {

    if (DASH_INTERVAL) clearInterval(DASH_INTERVAL);

}

/*=========================================================
    CHART DATA
=========================================================*/

function updateCharts() {

    if (typeof moneyByRegion !== "function") return;

    window.chartData = {

        regions: moneyByRegion(),
        districts: moneyByDistrict(),
        gender: genderDistribution()

    };
}

/*=========================================================
    RANKINGS
=========================================================*/

function getRegionRanking() {

    const data = moneyByRegion();

    return Object.entries(data)
        .sort((a, b) => b[1] - a[1])
        .map(([region, amount], i) => ({
            rank: i + 1,
            region,
            amount
        }));
}

function getDistrictRanking() {

    const data = moneyByDistrict();

    return Object.entries(data)
        .sort((a, b) => b[1] - a[1])
        .map(([district, amount], i) => ({
            rank: i + 1,
            district,
            amount
        }));
}

/*=========================================================
    SAFE SUMMARY
=========================================================*/

function generateAISummary() {

    if (typeof dashboardSummary !== "function") return "";

    const data = dashboardSummary();

    const topRegion = getRegionRanking()[0];
    const topDistrict = getDistrictRanking()[0];

    return `
📊 Families: ${data.totalFamilies}
👨‍👩‍👧 People: ${data.totalPeople}
💰 Money: ${money(data.totalMoney)}
🏆 Top Region: ${topRegion?.region || "-"}
📍 Top District: ${topDistrict?.district || "-"}
`;
}

/*=========================================================
    AI UI
=========================================================*/

function updateAISummary() {

    const el = document.getElementById("aiSummary");

    if (el) {

        el.innerText = generateAISummary();

    }
}