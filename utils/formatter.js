/*=========================================================
    MASKIIN CAAWIYE
    FORMATTER
=========================================================*/

"use strict";

/*=========================================================
    CURRENCY FORMAT
=========================================================*/

function formatMoney(amount, currency = "USD"){

    amount = Number(amount || 0);

    if(currency === "SOS"){

        return amount.toLocaleString() + " SOS";

    }

    return "$" + amount.toLocaleString();

}

/*=========================================================
    SHORT MONEY (K format)
=========================================================*/

function formatCompactMoney(amount){

    amount = Number(amount || 0);

    if(amount >= 1000000){

        return (amount / 1000000).toFixed(1) + "M";

    }

    if(amount >= 1000){

        return (amount / 1000).toFixed(1) + "K";

    }

    return amount.toString();

}

/*=========================================================
    DATE FORMAT (FULL)
=========================================================*/

function formatDate(date){

    if(!date) return "";

    const d = new Date(date);

    return d.toLocaleDateString("en-US",{

        weekday:"short",

        year:"numeric",

        month:"short",

        day:"numeric"

    });

}

/*=========================================================
    DATE SIMPLE
=========================================================*/

function formatDateSimple(date){

    if(!date) return "";

    const d = new Date(date);

    return d.toLocaleDateString();

}

/*=========================================================
    TIME FORMAT
=========================================================*/

function formatTime(date){

    if(!date) return "";

    const d = new Date(date);

    return d.toLocaleTimeString([],{

        hour:"2-digit",

        minute:"2-digit"

    });

}

/*=========================================================
    DATE + TIME
=========================================================*/

function formatDateTime(date){

    return `${formatDate(date)} ${formatTime(date)}`;

}

/*=========================================================
    RELATIVE TIME (AGO)
=========================================================*/

function timeAgo(date){

    if(!date) return "";

    const now = new Date();

    const past = new Date(date);

    const diff = Math.floor((now - past)/1000);

    if(diff < 60) return "Just now";

    if(diff < 3600) return Math.floor(diff/60) + " min ago";

    if(diff < 86400) return Math.floor(diff/3600) + " hr ago";

    if(diff < 2592000) return Math.floor(diff/86400) + " days ago";

    return formatDate(date);

}

/*=========================================================
    PHONE FORMAT (Somalia)
=========================================================*/

function formatPhone(phone){

    if(!phone) return "";

    phone = phone.replace(/\D/g,"");

    if(phone.length === 9){

        return "+252 " + phone;

    }

    if(phone.startsWith("252")){

        return "+" + phone;

    }

    return phone;

}

/*=========================================================
    NAME FORMAT
=========================================================*/

function formatName(name){

    if(!name) return "";

    return name

        .trim()

        .split(" ")

        .map(word =>

            word.charAt(0).toUpperCase() +

            word.slice(1).toLowerCase()

        )

        .join(" ");

}

/*=========================================================
    NUMBER FORMAT
=========================================================*/

function formatNumber(num){

    return Number(num || 0).toLocaleString();

}

/*=========================================================
    PERCENTAGE FORMAT
=========================================================*/

function formatPercent(value,total){

    if(!total) return "0%";

    return ((value / total) * 100).toFixed(1) + "%";

}

/*=========================================================
    GENDER LABEL
=========================================================*/

function formatGender(gender){

    if(!gender) return "";

    return gender === "Male" ? "👨 Male" : "👩 Female";

}

/*=========================================================
    MARITAL STATUS LABEL
=========================================================*/

function formatMarital(status){

    const map = {

        "Single":"🟡 Single",

        "Married":"🟢 Married",

        "Widowed":"⚫ Widowed",

        "Divorced":"🔴 Divorced",

        "Separated":"🟣 Separated"

    };

    return map[status] || status;

}

/*=========================================================
    SUPPORT LABEL
=========================================================*/

function formatSupport(amount){

    amount = Number(amount || 0);

    if(amount === 0) return "No Support";

    if(amount < 100) return "Low Support";

    if(amount < 300) return "Medium Support";

    return "High Support";

}

/*=========================================================
    TRUNCATE TEXT
=========================================================*/

function truncate(text,length = 20){

    if(!text) return "";

    if(text.length <= length) return text;

    return text.substring(0,length) + "...";

}

/*=========================================================
    INITIALS (for avatars)
=========================================================*/

function getInitials(name){

    if(!name) return "";

    return name

        .split(" ")

        .map(n => n[0])

        .join("")

        .toUpperCase();

}

/*=========================================================
    FILE SIZE FORMAT
=========================================================*/

function formatFileSize(bytes){

    if(bytes < 1024) return bytes + " B";

    if(bytes < 1048576) return (bytes/1024).toFixed(1) + " KB";

    return (bytes/1048576).toFixed(1) + " MB";

}