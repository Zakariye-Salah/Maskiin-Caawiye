/*=========================================================
    MASKIIN CAAWIYE
    PREMIUM NAVBAR
=========================================================*/

"use strict";

const NAVBAR_CACHE_KEY = "mc_navbar_component";

/*=========================================================
    START
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    loadNavbar();

});

/*=========================================================
    LOAD NAVBAR
=========================================================*/

async function loadNavbar() {

    const container = document.getElementById("navbarContainer");

    if (!container) return;

    try {

        let html = sessionStorage.getItem(NAVBAR_CACHE_KEY);

        if (!html) {

            const response = await fetch("./components/navbar.html", {
                cache: "no-cache"
            });

            if (!response.ok)
                throw new Error("Navbar not found.");

            html = await response.text();

            sessionStorage.setItem(
                NAVBAR_CACHE_KEY,
                html
            );

        }

        container.innerHTML = html;

        initializeNavbar();

    }

    catch (err) {

        console.error(err);

        container.innerHTML = `
            <div class="text-center text-danger p-4">
                Failed to load navigation.
            </div>
        `;

    }

}

/*=========================================================
    INITIALIZE
=========================================================*/

function initializeNavbar() {

    highlightCurrentPage();

    initializeNavigation();

    initializeSidebar();

    updateTheme();

    translateNavbar();

}

/*=========================================================
    ACTIVE PAGE
=========================================================*/

function highlightCurrentPage() {

    const page = location.pathname
        .split("/")
        .pop()
        .replace(".html", "");

    document
        .querySelectorAll(".mc-nav-link,.mc-sidebar-link")
        .forEach(link => {

            if (link.dataset.page === page) {

                link.classList.add("active");

            }

            else {

                link.classList.remove("active");

            }

        });

}

/*=========================================================
    NAVIGATION EFFECT
=========================================================*/

function initializeNavigation() {

    document
        .querySelectorAll(".mc-nav-link,.mc-sidebar-link")
        .forEach(link => {

            link.addEventListener("click", function () {

                this.classList.add("clicked");

            });

        });

}

/*=========================================================
    SIDEBAR
=========================================================*/

function initializeSidebar() {

    const sidebar =
        document.getElementById("mcSidebar");

    const overlay =
        document.getElementById("mcSidebarOverlay");

    const toggle =
        document.getElementById("sidebarToggle");

    const pageContent =
        document.querySelector(".page-content");

    if (!sidebar) return;

    // Restore saved state
    const collapsed =
        localStorage.getItem("mc_sidebar") === "collapsed";

    sidebar.classList.toggle("collapsed", collapsed);

    document.body.classList.toggle(
        "sidebar-collapsed",
        collapsed
    );

    pageContent?.classList.toggle(
        "expanded",
        collapsed
    );

    if (toggle) {

        toggle.onclick = () => {

            // Mobile
            if (window.innerWidth <= 992) {

                sidebar.classList.toggle("show");

                overlay?.classList.toggle("show");

                return;

            }

            // Desktop
            sidebar.classList.toggle("collapsed");

            const isCollapsed =
                sidebar.classList.contains("collapsed");

            document.body.classList.toggle(
                "sidebar-collapsed",
                isCollapsed
            );

            pageContent?.classList.toggle(
                "expanded",
                isCollapsed
            );

            localStorage.setItem(
                "mc_sidebar",
                isCollapsed
                    ? "collapsed"
                    : "expanded"
            );

        };

    }

    overlay?.addEventListener("click", () => {

        sidebar.classList.remove("show");

        overlay?.classList.remove("show");

    });

    window.addEventListener("resize", () => {

        if (window.innerWidth > 992) {

            sidebar.classList.remove("show");

            overlay?.classList.remove("show");

        }

    });

}

/*=========================================================
    THEME
=========================================================*/

function updateTheme() {

    const theme =
        localStorage.getItem("mc_theme") || "light";

    document.documentElement.setAttribute(
        "data-bs-theme",
        theme
    );

}

/*=========================================================
    TRANSLATION
=========================================================*/

function translateNavbar() {

    if (typeof translations === "undefined") return;

    const lang =
        localStorage.getItem("mc_language") || "en";

    document
        .querySelectorAll("#navbarContainer [data-i18n]")
        .forEach(item => {

            const key = item.dataset.i18n;

            if (
                translations[lang] &&
                translations[lang][key]
            ) {

                item.textContent =
                    translations[lang][key];

            }

        });

}

/*=========================================================
    PUBLIC FUNCTIONS
=========================================================*/

window.refreshNavbar = function () {

    highlightCurrentPage();

    updateTheme();

    translateNavbar();

};

window.clearNavbarCache = function () {

    sessionStorage.removeItem(
        NAVBAR_CACHE_KEY
    );

};

window.openSidebar = function () {

    document
        .getElementById("mcSidebar")
        ?.classList.add("show");

    document
        .getElementById("mcSidebarOverlay")
        ?.classList.add("show");

};

window.closeSidebar = function () {

    document
        .getElementById("mcSidebar")
        ?.classList.remove("show");

    document
        .getElementById("mcSidebarOverlay")
        ?.classList.remove("show");

};

window.toggleSidebar = function () {

    document
        .getElementById("sidebarToggle")
        ?.click();

};

window.addEventListener("pageshow", () => {

    refreshNavbar();

});
