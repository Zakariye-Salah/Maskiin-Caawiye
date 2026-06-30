"use strict";

/*=========================================================
    MASKIIN CAAWIYE
    PREMIUM HEADER v2
=========================================================*/

/*=========================================================
LOCAL STORAGE KEYS
=========================================================*/

const STORAGE = {

    theme: "mc_theme",

    language: "mc_lang",

    notifications: "mc_notifications",

    user: "mc_user",

    backup: "mc_last_backup",

    reminder: "mc_last_reminder"

};

/*=========================================================
GLOBAL VARIABLES
=========================================================*/

let notificationModal = null;

let notificationList = [];

let currentLanguage = "en";

let currentTheme = "light";

/*=========================================================
BOOT
=========================================================*/

document.addEventListener("DOMContentLoaded", async () => {

    await loadHeader();

    initializeHeader();

});

/*=========================================================
INITIALIZE
=========================================================*/

function initializeHeader(){

    notificationModal = new bootstrap.Modal(

        document.getElementById("notificationModal")

    );

    currentTheme = getTheme();

    currentLanguage = getLanguage();

    loadNotifications();

    if(notificationList.length===0){

        addNotification({
    
            title:"Welcome",
    
            message:"Welcome to Maskiin Caawiye.",
    
            type:"success"
    
        });
    
        addNotification({
    
            title:"Backup Reminder",
    
            message:"Remember to backup today's data.",
    
            type:"warning"
    
        });
    
        addNotification({
    
            title:"Pending Families",
    
            message:"Review pending beneficiary approvals.",
    
            type:"info"
    
        });
    
    }


    applyTheme(currentTheme,false);

    applyLanguage(currentLanguage,false);

    updateDate();

    updateAdmin();

    updateNotificationBadge();

    startClock();

    startAutoRefresh();

    initializeStorageSync();

    showWelcomeMessage();

    checkDailyReminder();

    startSystemMessages();

}

/*=========================================================
LOAD HEADER
=========================================================*/

async function loadHeader(){

    const container = document.getElementById("headerContainer");

    if(!container) return;

    const response = await fetch("components/header.html");

    container.innerHTML = await response.text();

}

/*=========================================================
THEME
=========================================================*/

function getTheme(){

    return localStorage.getItem(STORAGE.theme) || "light";

}

function saveTheme(theme){

    localStorage.setItem(

        STORAGE.theme,

        theme

    );

}

function toggleTheme(){

    const next =

        currentTheme === "dark"

        ? "light"

        : "dark";

    applyTheme(next,true);

}

function applyTheme(theme,showToast=true){

    currentTheme = theme;

    saveTheme(theme);

    document.documentElement

        .setAttribute(

            "data-bs-theme",

            theme

        );

    document.body

        .classList

        .toggle(

            "dark-mode",

            theme==="dark"

        );

    const icon =

        document.getElementById("themeIcon");

    if(icon){

        icon.classList.add("theme-rotate");

        setTimeout(()=>{

            icon.classList.remove("theme-rotate");

        },400);

        icon.className =

            theme==="dark"

            ? "bi bi-sun-fill"

            : "bi bi-moon-stars-fill";

    }

    if(showToast){

        showToastMessage(

            "success",

            theme==="dark"

            ? "Dark mode enabled"

            : "Light mode enabled"

        );

    }

}

/*=========================================================
LANGUAGE
=========================================================*/

function getLanguage(){

    return localStorage.getItem(

        STORAGE.language

    ) || "en";

}

function setLanguage(lang){

    applyLanguage(lang,true);

}

function applyLanguage(

    lang,

    showToast=true

){

    currentLanguage = lang;

    localStorage.setItem(

        STORAGE.language,

        lang

    );

    document

        .querySelectorAll(".language-item")

        .forEach(item=>{

            item.classList.remove("active");

        });

    const active =

        document.getElementById(

            "lang-"+lang

        );

    if(active){

        active.classList.add("active");

    }

    window.dispatchEvent(

        new CustomEvent(

            "applyLanguage",

            {

                detail:lang

            }

        )

    );

    if(showToast){

        showToastMessage(

            "success",

            lang==="so"

            ? "Luqadda waa la beddelay"

            : "Language changed"

        );

    }

}

/*=========================================================
DATE
=========================================================*/

function updateDate(){

    const el =

        document.getElementById(

            "headerDate"

        );

    if(!el) return;

    const now = new Date();

    el.textContent =

        now.toLocaleDateString(

            currentLanguage==="so"

            ? "so-SO"

            : "en-US",

            {

                weekday:"long",

                month:"long",

                day:"numeric",

                year:"numeric"

            }

        );

}

function startClock(){

    updateDate();

    setInterval(

        updateDate,

        60000

    );

}

/*=========================================================
USER
=========================================================*/

function updateAdmin(){

    let name =

        "Administrator";

    const stored =

        localStorage.getItem(

            STORAGE.user

        );

    if(stored){

        try{

            const user =

                JSON.parse(stored);

            name =

                user.fullname ||

                user.name ||

                user.username ||

                "Administrator";

        }

        catch{

            name = stored;

        }

    }

    const avatar =

        document.getElementById(

            "adminAvatar"

        );

    const adminName =

        document.getElementById(

            "adminName"

        );

    if(avatar){

        avatar.textContent =

            name.charAt(0)

            .toUpperCase();

    }

    if(adminName){

        adminName.textContent =

            name;

    }

}


/*=========================================================
AUTO REFRESH
=========================================================*/

function startAutoRefresh(){

    setInterval(()=>{

        updateNotificationBadge();

    },5000);

}



/*=========================================================
NOTIFICATION MANAGER
=========================================================*/

function loadNotifications(){

    notificationList = JSON.parse(

        localStorage.getItem(

            STORAGE.notifications

        )

    ) || [];

}

function saveNotifications(){

    localStorage.setItem(

        STORAGE.notifications,

        JSON.stringify(

            notificationList

        )

    );

}

function addNotification({

    title,

    message,

    type="info"

}){

    notificationList.unshift({

        id:Date.now(),

        title,

        message,

        type,

        read:false,

        created:new Date().toISOString()

    });

    saveNotifications();

    cleanupNotifications();
    updateNotificationBadge();

}

/*=========================================================
BADGE
=========================================================*/

function updateNotificationBadge(){

    const badge =

        document.getElementById(

            "notifCount"

        );

    if(!badge) return;

    const unread =

        notificationList.filter(

            n=>!n.read

        ).length;

    badge.textContent = unread;

    badge.style.display =

        unread

        ? "flex"

        : "none";

    const bell =

        document.querySelector(

            "#notificationBtn i"

        );

    if(bell){

        bell.classList.toggle(

            "mc-bell-ring",

            unread>0

        );

    }

}

/*=========================================================
OPEN MODAL
=========================================================*/

function openNotifications(){

    renderNotifications();

    notificationModal.show();

}

/*=========================================================
RENDER
=========================================================*/

function renderNotifications(){

    const container =

        document.getElementById(

            "notificationList"

        );

    if(!container) return;

    if(notificationList.length===0){

        container.innerHTML=`

        <div class="text-center py-5">

            <i class="bi bi-bell fs-1 text-secondary"></i>

            <h5 class="mt-3">

                No Notifications

            </h5>

            <p class="text-muted">

                You're all caught up.

            </p>

        </div>`;

        return;

    }

    container.innerHTML="";

    notificationList.forEach(

        notification=>{

            container.innerHTML+=`

<div class="mc-notification">

<div class="mc-notification-icon mc-${notification.type}">

<i class="${getNotificationIcon(notification.type)}"></i>

</div>

<div class="mc-notification-body">

<div class="mc-notification-title">

${notification.title}

</div>

<div class="mc-notification-message">

${notification.message}

</div>

<div class="mc-notification-time">

${timeAgo(notification.created)}

</div>

</div>

</div>`;

        }

    );

}


/*=========================================================
ICON
=========================================================*/

function getNotificationIcon(type){

    switch(type){

        case "success":

            return "bi bi-check-circle-fill";

        case "warning":

            return "bi bi-exclamation-triangle-fill";

        case "danger":

            return "bi bi-x-circle-fill";

        default:

            return "bi bi-info-circle-fill";

    }

}


/*=========================================================
TIME AGO
=========================================================*/

function timeAgo(date){

    const seconds =

        Math.floor(

            (new Date()-new Date(date))/1000

        );

    const units=[

        ["year",31536000],

        ["month",2592000],

        ["day",86400],

        ["hour",3600],

        ["minute",60]

    ];

    for(const [name,value] of units){

        const amount=

        Math.floor(seconds/value);

        if(amount>=1){

            return `${amount} ${name}${amount>1?"s":""} ago`;

        }

    }

    return "Just now";

}


/*=========================================================
MARK READ
=========================================================*/

function markAllNotificationsRead(){

    notificationList.forEach(

        n=>n.read=true

    );

    saveNotifications();

    updateNotificationBadge();

    renderNotifications();

    showToastMessage(

        "success",

        "All notifications marked as read."

    );

}


/*=========================================================
DELETE
=========================================================*/

function deleteNotification(id){

    notificationList=

    notificationList.filter(

        n=>n.id!==id

    );

    saveNotifications();

    renderNotifications();

    updateNotificationBadge();

}

/*=========================================================
TOAST SYSTEM
=========================================================*/

function showToastMessage(type = "info", message = "", title = "") {

    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toastId = "toast_" + Date.now();

    const icons = {
        success: "bi-check-circle-fill",
        warning: "bi-exclamation-triangle-fill",
        danger: "bi-x-circle-fill",
        info: "bi-info-circle-fill"
    };

    const titles = {
        success: "Success",
        warning: "Reminder",
        danger: "Error",
        info: "Information"
    };

    const html = `
        <div id="${toastId}"
             class="toast toast-${type}"
             role="alert"
             data-bs-delay="3500">

            <div class="toast-header">

                <i class="bi ${icons[type]} me-2"></i>

                <strong class="me-auto">
                    ${title || titles[type]}
                </strong>

                <button
                    class="btn-close"
                    data-bs-dismiss="toast">
                </button>

            </div>

            <div class="toast-body">

                ${message}

            </div>

        </div>
    `;

    container.insertAdjacentHTML("beforeend", html);

    const toastElement = document.getElementById(toastId);

    const toast = new bootstrap.Toast(toastElement);

    toast.show();

    toastElement.addEventListener("hidden.bs.toast", () => {

        toastElement.remove();

    });

}


/*=========================================================
DAILY BACKUP REMINDER
=========================================================*/

function checkDailyReminder(){

    const today = new Date().toDateString();

    const last = localStorage.getItem(STORAGE.reminder);

    if(last === today) return;

    localStorage.setItem(STORAGE.reminder, today);

    addNotification({

        title:"Backup Reminder",

        message:"Please backup today's NGO database.",

        type:"warning"

    });

    showToastMessage(

        "warning",

        "Remember to backup today's data."

    );

}



/*=========================================================
BACKUP COMPLETE
=========================================================*/

function completeBackup(){

    localStorage.setItem(

        STORAGE.backup,

        new Date().toISOString()

    );

    addNotification({

        title:"Backup Completed",

        message:"Database backup completed successfully.",

        type:"success"

    });

    showToastMessage(

        "success",

        "Backup completed successfully."

    );

}

/*=========================================================
WELCOME
=========================================================*/

function showWelcomeMessage(){

    const key = "mc_today_login";

    const today = new Date().toDateString();

    if(localStorage.getItem(key) === today) return;

    localStorage.setItem(key, today);

    showToastMessage(

        "success",

        "Welcome back to Maskiin Caawiye."

    );

}


/*=========================================================
STORAGE SYNC
=========================================================*/

function initializeStorageSync(){

    window.addEventListener("storage",(e)=>{

        switch(e.key){

            case STORAGE.theme:

                applyTheme(e.newValue,false);

                break;

            case STORAGE.language:

                applyLanguage(e.newValue,false);

                break;

            case STORAGE.notifications:

                loadNotifications();

                updateNotificationBadge();

                break;

        }

    });

}



/*=========================================================
LIMIT NOTIFICATIONS
=========================================================*/

function cleanupNotifications(){

    if(notificationList.length > 100){

        notificationList = notificationList.slice(0,100);

        saveNotifications();

    }

}


/*=========================================================
SYSTEM REMINDERS
=========================================================*/

function startSystemMessages(){

    setInterval(()=>{

        const hour = new Date().getHours();

        if(hour===18){

            checkDailyReminder();

        }

    },60000);

}


/*=========================================================
LOGOUT
=========================================================*/

function logout(){

    if(!confirm("Are you sure you want to logout?")){

        return;

    }

    localStorage.removeItem("mc_token");

    localStorage.removeItem(STORAGE.user);

    showToastMessage(

        "success",

        "Logging out..."

    );

    setTimeout(()=>{

        window.location.href="login.html";

    },700);

}