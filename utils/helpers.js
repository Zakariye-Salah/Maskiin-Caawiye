/*=========================================================
    MASKIIN CAAWIYE
    HELPERS
=========================================================*/

"use strict";

/*=========================================================
    QUERY SELECTORS
=========================================================*/

function $(selector){

    return document.querySelector(selector);

}

function $$(selector){

    return document.querySelectorAll(selector);

}

/*=========================================================
    CREATE ELEMENT
=========================================================*/

function createElement(tag,className="",text=""){

    const element=document.createElement(tag);

    if(className){

        element.className=className;

    }

    if(text){

        element.textContent=text;

    }

    return element;

}

/*=========================================================
    RANDOM NUMBER
=========================================================*/

function randomNumber(min,max){

    return Math.floor(

        Math.random()*(max-min+1)

    )+min;

}

/*=========================================================
    RANDOM STRING
=========================================================*/

function randomString(length=10){

    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let result="";

    for(let i=0;i<length;i++){

        result+=chars.charAt(

            Math.floor(Math.random()*chars.length)

        );

    }

    return result;

}

/*=========================================================
    UNIQUE ID
=========================================================*/

function uuid(){

    return "MC-"+Date.now()+"-"+randomNumber(1000,9999);

}

/*=========================================================
    COPY TO CLIPBOARD
=========================================================*/

async function copy(text){

    try{

        await navigator.clipboard.writeText(text);

        if(typeof showToast==="function"){

            showToast("Copied successfully");

        }

    }

    catch(error){

        console.error(error);

    }

}

/*=========================================================
    DOWNLOAD JSON
=========================================================*/

function downloadJSON(filename,data){

    const blob=new Blob(

        [

            JSON.stringify(data,null,2)

        ],

        {

            type:"application/json"

        }

    );

    const url=URL.createObjectURL(blob);

    const link=document.createElement("a");

    link.href=url;

    link.download=filename;

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);

}

/*=========================================================
    DOWNLOAD TEXT
=========================================================*/

function downloadText(filename,text){

    const blob=new Blob(

        [text],

        {

            type:"text/plain"

        }

    );

    const url=URL.createObjectURL(blob);

    const link=document.createElement("a");

    link.href=url;

    link.download=filename;

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);

}

/*=========================================================
    DEBOUNCE
=========================================================*/

function debounce(callback,delay=300){

    let timer;

    return(...args)=>{

        clearTimeout(timer);

        timer=setTimeout(()=>{

            callback(...args);

        },delay);

    };

}

/*=========================================================
    THROTTLE
=========================================================*/

function throttle(callback,limit=300){

    let waiting=false;

    return(...args)=>{

        if(waiting)return;

        callback(...args);

        waiting=true;

        setTimeout(()=>{

            waiting=false;

        },limit);

    };

}

/*=========================================================
    SORT A-Z
=========================================================*/

function sortAZ(array,key){

    return [...array].sort(

        (a,b)=>

        String(a[key])

        .localeCompare(

            String(b[key])

        )

    );

}

/*=========================================================
    SORT Z-A
=========================================================*/

function sortZA(array,key){

    return [...array].sort(

        (a,b)=>

        String(b[key])

        .localeCompare(

            String(a[key])

        )

    );

}

/*=========================================================
    SEARCH OBJECTS
=========================================================*/

function searchObjects(array,keyword,fields=[]){

    keyword=keyword.toLowerCase();

    return array.filter(item=>{

        return fields.some(field=>{

            return String(item[field]||"")

            .toLowerCase()

            .includes(keyword);

        });

    });

}

/*=========================================================
    GROUP BY
=========================================================*/

function groupBy(array,key){

    return array.reduce((groups,item)=>{

        const value=item[key];

        groups[value]=groups[value]||[];

        groups[value].push(item);

        return groups;

    },{});

}

/*=========================================================
    SUM
=========================================================*/

function sum(array,key){

    return array.reduce(

        (total,item)=>

        total+

        Number(item[key]||0),

        0

    );

}

/*=========================================================
    AVERAGE
=========================================================*/

function average(array,key){

    if(array.length===0){

        return 0;

    }

    return sum(array,key)/array.length;

}

/*=========================================================
    MAX
=========================================================*/

function max(array,key){

    return Math.max(

        ...array.map(

            item=>Number(item[key])

        )

    );

}

/*=========================================================
    MIN
=========================================================*/

function min(array,key){

    return Math.min(

        ...array.map(

            item=>Number(item[key])

        )

    );

}

/*=========================================================
    WAIT
=========================================================*/

function wait(ms){

    return new Promise(resolve=>{

        setTimeout(resolve,ms);

    });

}

/*=========================================================
    IS EMPTY
=========================================================*/

function isEmpty(value){

    return value===null ||

           value===undefined ||

           value==="";

}

/*=========================================================
    CAPITALIZE
=========================================================*/

function capitalize(text){

    if(!text)return "";

    return text

    .charAt(0)

    .toUpperCase()

    +

    text.slice(1)

    .toLowerCase();

}

/*=========================================================
    TITLE CASE
=========================================================*/

function titleCase(text){

    if(!text)return "";

    return text

    .split(" ")

    .map(word=>capitalize(word))

    .join(" ");

}

/*=========================================================
    SCROLL TOP
=========================================================*/

function scrollTopPage(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

/*=========================================================
    SCROLL BOTTOM
=========================================================*/

function scrollBottomPage(){

    window.scrollTo({

        top:document.body.scrollHeight,

        behavior:"smooth"

    });

}