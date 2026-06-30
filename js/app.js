/*=========================================================
    MASKIIN CAAWIYE
    app.js
=========================================================*/

"use strict";

/*=========================================================
    APPLICATION
=========================================================*/

const APP = {

    name: "Maskiin Caawiye",

    version: "1.0.0",

    language: "en",

    theme: "light"

};

/*=========================================================
    DEFAULT LOGIN
=========================================================*/

const DEFAULT_USER = {

    username: "admin",

    password: "admin123",

    fullName: "Administrator"

};

/*=========================================================
    INITIALIZE
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeTheme();

    initializeLanguage();

    initializeLogin();

});

/*=========================================================
    LOGIN
=========================================================*/

function initializeLogin() {

    const form = document.getElementById("loginForm");

    if (!form) return;

    form.addEventListener("submit", login);

}

/*=========================================================
    LOGIN FUNCTION
=========================================================*/

function login(e) {

    e.preventDefault();

    const username = document
        .getElementById("username")
        .value
        .trim();

    const password = document
        .getElementById("password")
        .value
        .trim();

    if (username === "") {

        alert("Please enter username");

        return;

    }

    if (password === "") {

        alert("Please enter password");

        return;

    }

    if (
        username === DEFAULT_USER.username &&
        password === DEFAULT_USER.password
    ) {

        localStorage.setItem("mc_logged_in", "true");

        localStorage.setItem(
            "mc_user",
            JSON.stringify(DEFAULT_USER)
        );

        window.location.href = "dashboard.html";

        return;

    }

    alert("Incorrect username or password.");

}

/*=========================================================
    LOGOUT
=========================================================*/

function logout() {

    if (!confirm("Logout now?")) return;

    localStorage.removeItem("mc_logged_in");

    localStorage.removeItem("mc_user");

    window.location.href = "index.html";

}

/*=========================================================
    AUTH CHECK
=========================================================*/

function requireLogin() {

    if (window.location.pathname.includes("index.html"))
        return;

    const logged =
        localStorage.getItem("mc_logged_in");

    if (!logged) {

        window.location.href = "index.html";

    }

}

/*=========================================================
    THEME
=========================================================*/

function initializeTheme() {

    const savedTheme =
        localStorage.getItem("mc_theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        APP.theme = "dark";

    }

}

function toggleTheme() {

    document.body.classList.toggle("dark");

    APP.theme =
        document.body.classList.contains("dark")
            ? "dark"
            : "light";

    localStorage.setItem(
        "mc_theme",
        APP.theme
    );

}

/*=========================================================
    LANGUAGE
=========================================================*/

function initializeLanguage() {

    const lang =
        localStorage.getItem("mc_language");

    if (lang) {

        APP.language = lang;

    }

}

function setLanguage(language) {

    APP.language = language;

    localStorage.setItem(
        "mc_language",
        language
    );

}

/*=========================================================
    GREETING
=========================================================*/

function getGreeting() {

    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";

    if (hour < 18) return "Good Afternoon";

    return "Good Evening";

}

/*=========================================================
    DATE
=========================================================*/

function formatToday() {

    const today = new Date();

    return today.toLocaleDateString("en-US", {

        weekday: "long",

        year: "numeric",

        month: "long",

        day: "numeric"

    });

}

/*=========================================================
    TOAST
=========================================================*/

function showToast(message, type = "success") {

    const toast = document.createElement("div");

    toast.className = `toast ${type}`;

    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("show");

    }, 50);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 3000);

}

/*=========================================================
    LOADING
=========================================================*/

function showLoading(button) {

    if (!button) return;

    button.disabled = true;

    button.dataset.original = button.innerHTML;

    button.innerHTML = "Loading...";

}

function hideLoading(button) {

    if (!button) return;

    button.disabled = false;

    button.innerHTML = button.dataset.original;

}

/*=========================================================
    RANDOM ID
=========================================================*/

function generateID() {

    return Date.now() +
        Math.floor(Math.random() * 9999);

}

/*=========================================================
    CURRENCY
=========================================================*/

function money(value) {

    return "$" + Number(value).toLocaleString();

}

/*=========================================================
    PHONE
=========================================================*/

function cleanPhone(phone) {

    return phone.replace(/\D/g, "");

}

/*=========================================================
    PAGE TITLE
=========================================================*/

function setPageTitle(title) {

    document.title =
        `${title} | ${APP.name}`;

}

/*=========================================================
    START
=========================================================*/

requireLogin();