/*=========================================================
    MASKIIN CAAWIYE
    DEMO DATA
=========================================================*/

"use strict";

/*
|--------------------------------------------------------------------------
| Default Settings
|--------------------------------------------------------------------------
*/

const DEFAULT_SETTINGS = {

    organization: "Maskiin Caawiye",

    language: "en",

    theme: "light",

    currency: "USD",

    mobilePayment: "EVC Plus",

    createdAt: new Date().toISOString()

};

/*
|--------------------------------------------------------------------------
| Demo User
|--------------------------------------------------------------------------
*/

const DEMO_USER = {

    id: 1,

    username: "admin",

    password: "admin123",

    fullName: "Administrator",

    role: "Admin",

    phone: "0617000000",

    createdAt: new Date().toISOString()

};

/*
|--------------------------------------------------------------------------
| Demo Families
|--------------------------------------------------------------------------
*/

const DEMO_FAMILIES = [

{

    id:1001,

    fullName:"Ahmed Ali Hassan",

    phone:"0617123456",

    gender:"Male",

    age:42,

    maritalStatus:"Married",

    region:"Banadir",

    district:"Hodan",

    neighborhood:"Tarabuunka",

    children:4,

    familySupport:250,

    childrenSupport:120,

    extraSupport:50,

    totalSupport:420,

    deleted:false,

    createdAt:"2026-01-05"

},

{

    id:1002,

    fullName:"Asha Mohamed Nur",

    phone:"0617556677",

    gender:"Female",

    age:35,

    maritalStatus:"Widowed",

    region:"Banadir",

    district:"Wadajir",

    neighborhood:"Buulo Xuubey",

    children:3,

    familySupport:220,

    childrenSupport:90,

    extraSupport:0,

    totalSupport:310,

    deleted:false,

    createdAt:"2026-02-11"

},

{

    id:1003,

    fullName:"Mohamed Abdi Omar",

    phone:"0617999911",

    gender:"Male",

    age:51,

    maritalStatus:"Married",

    region:"Banadir",

    district:"Dayniile",

    neighborhood:"Barwaaqo",

    children:6,

    familySupport:350,

    childrenSupport:180,

    extraSupport:70,

    totalSupport:600,

    deleted:false,

    createdAt:"2026-03-09"

},

{

    id:1004,

    fullName:"Sahra Yusuf Ali",

    phone:"0618112233",

    gender:"Female",

    age:29,

    maritalStatus:"Single",

    region:"Banadir",

    district:"Karaan",

    neighborhood:"Jamhuuriya",

    children:0,

    familySupport:180,

    childrenSupport:0,

    extraSupport:20,

    totalSupport:200,

    deleted:false,

    createdAt:"2026-04-20"

},

{

    id:1005,

    fullName:"Ismail Aden Mohamed",

    phone:"0616334455",

    gender:"Male",

    age:47,

    maritalStatus:"Married",

    region:"Banadir",

    district:"Yaqshiid",

    neighborhood:"Towfiiq",

    children:5,

    familySupport:300,

    childrenSupport:150,

    extraSupport:100,

    totalSupport:550,

    deleted:false,

    createdAt:"2026-05-15"

}

];

/*
|--------------------------------------------------------------------------
| Demo Transactions
|--------------------------------------------------------------------------
*/

const DEMO_TRANSACTIONS = [

{

    id:5001,

    familyId:1001,

    fullName:"Ahmed Ali Hassan",

    phone:"0617123456",

    amount:420,

    paymentMethod:"EVC Plus",

    status:"Completed",

    reference:"MC100001",

    createdAt:"2026-06-01"

},

{

    id:5002,

    familyId:1002,

    fullName:"Asha Mohamed Nur",

    phone:"0617556677",

    amount:310,

    paymentMethod:"EVC Plus",

    status:"Completed",

    reference:"MC100002",

    createdAt:"2026-06-02"

},

{

    id:5003,

    familyId:1003,

    fullName:"Mohamed Abdi Omar",

    phone:"0617999911",

    amount:600,

    paymentMethod:"Zaad",

    status:"Completed",

    reference:"MC100003",

    createdAt:"2026-06-03"

},

{

    id:5004,

    familyId:1004,

    fullName:"Sahra Yusuf Ali",

    phone:"0618112233",

    amount:200,

    paymentMethod:"eDahab",

    status:"Completed",

    reference:"MC100004",

    createdAt:"2026-06-04"

},

{

    id:5005,

    familyId:1005,

    fullName:"Ismail Aden Mohamed",

    phone:"0616334455",

    amount:550,

    paymentMethod:"EVC Plus",

    status:"Completed",

    reference:"MC100005",

    createdAt:"2026-06-05"

}

];

/*
|--------------------------------------------------------------------------
| Demo Notifications
|--------------------------------------------------------------------------
*/

const DEMO_NOTIFICATIONS = [

{

    id:1,

    title:"Welcome",

    message:"Welcome to Maskiin Caawiye.",

    type:"success",

    read:false

},

{

    id:2,

    title:"Payment",

    message:"Demo payment records have been added.",

    type:"info",

    read:false

}

];

/*
|--------------------------------------------------------------------------
| Seed Database
|--------------------------------------------------------------------------
*/

(function seedDatabase(){

    if(DB.count(DATABASE.USERS)===0){

        DB.insert(DATABASE.USERS,DEMO_USER);

    }

    if(DB.count(DATABASE.FAMILIES)===0){

        DEMO_FAMILIES.forEach(item=>{

            DB.insert(DATABASE.FAMILIES,item);

        });

    }

    if(DB.count(DATABASE.TRANSACTIONS)===0){

        DEMO_TRANSACTIONS.forEach(item=>{

            DB.insert(DATABASE.TRANSACTIONS,item);

        });

    }

    if(DB.count(DATABASE.SETTINGS)===0){

        DB.insert(DATABASE.SETTINGS,DEFAULT_SETTINGS);

    }

    if(DB.count(DATABASE.NOTIFICATIONS)===0){

        DEMO_NOTIFICATIONS.forEach(item=>{

            DB.insert(DATABASE.NOTIFICATIONS,item);

        });

    }

})();