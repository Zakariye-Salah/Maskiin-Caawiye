/*=========================================================
    MASKIIN CAAWIYE
    Premium Navbar
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

        container.innerHTML =
        `
        <div class="text-center text-danger p-3">
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
        .replace(".html","");

    document
        .querySelectorAll(".mc-nav-link")
        .forEach(link=>{

            if(link.dataset.page===page){

                link.classList.add("active");

            }

            else{

                link.classList.remove("active");

            }

        });

}

/*=========================================================
    NAVIGATION
=========================================================*/

function initializeNavigation(){

    document
        .querySelectorAll(".mc-nav-link")
        .forEach(link=>{

            link.addEventListener("click",function(){

                this.classList.add("clicked");

            });

        });

}

/*=========================================================
    THEME
=========================================================*/

function updateTheme(){

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

function translateNavbar(){

    if(typeof translations==="undefined") return;

    const lang =
        localStorage.getItem("mc_language") || "en";

    document
        .querySelectorAll("#navbarContainer [data-i18n]")
        .forEach(item=>{

            const key=item.dataset.i18n;

            if(
                translations[lang] &&
                translations[lang][key]
            ){

                item.textContent=
                translations[lang][key];

            }

        });

}

/*=========================================================
    PUBLIC FUNCTIONS
=========================================================*/

window.refreshNavbar=function(){

    highlightCurrentPage();

    updateTheme();

    translateNavbar();

};

window.clearNavbarCache=function(){

    sessionStorage.removeItem(
        NAVBAR_CACHE_KEY
    );

};

window.addEventListener("pageshow",()=>{

    refreshNavbar();

});