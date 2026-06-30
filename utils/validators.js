/*=========================================================
    MASKIIN CAAWIYE
    VALIDATORS
=========================================================*/

"use strict";

/*=========================================================
    REQUIRED
=========================================================*/

function required(value){

    return value !== null &&
           value !== undefined &&
           String(value).trim() !== "";

}

/*=========================================================
    MIN LENGTH
=========================================================*/

function minLength(value,length){

    return String(value).trim().length >= length;

}

/*=========================================================
    MAX LENGTH
=========================================================*/

function maxLength(value,length){

    return String(value).trim().length <= length;

}

/*=========================================================
    NUMERIC
=========================================================*/

function isNumber(value){

    return !isNaN(value);

}

/*=========================================================
    POSITIVE NUMBER
=========================================================*/

function positiveNumber(value){

    return Number(value) >= 0;

}

/*=========================================================
    INTEGER
=========================================================*/

function isInteger(value){

    return Number.isInteger(Number(value));

}

/*=========================================================
    AGE
=========================================================*/

function validAge(age){

    age = Number(age);

    return age >= 0 && age <= 120;

}

/*=========================================================
    CHILDREN
=========================================================*/

function validChildren(number){

    number = Number(number);

    return number >= 0 && number <= 99;

}

/*=========================================================
    MONEY
=========================================================*/

function validMoney(amount){

    amount = Number(amount);

    return amount >= 0 && amount <= 1000000;

}

/*=========================================================
    PHONE
=========================================================*/

function validPhone(phone){

    phone = phone.replace(/\D/g,"");

    return /^6\d{8}$/.test(phone);

}

/*=========================================================
    EMAIL
=========================================================*/

function validEmail(email){

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}

/*=========================================================
    NAME
=========================================================*/

function validName(name){

    name = name.trim();

    return /^[A-Za-zÀ-ÿ\s'.-]{2,100}$/.test(name);

}

/*=========================================================
    PASSWORD
=========================================================*/

function validPassword(password){

    return password.length >= 6;

}

/*=========================================================
    NATIONAL ID
=========================================================*/

function validNationalID(id){

    if(id==="") return true;

    return id.length >= 5;

}

/*=========================================================
    GENDER
=========================================================*/

function validGender(gender){

    return [

        "Male",

        "Female"

    ].includes(gender);

}

/*=========================================================
    MARITAL STATUS
=========================================================*/

function validMaritalStatus(status){

    return [

        "Single",

        "Married",

        "Widowed",

        "Divorced",

        "Separated"

    ].includes(status);

}

/*=========================================================
    REGION
=========================================================*/

function validRegion(region){

    return required(region);

}

/*=========================================================
    DISTRICT
=========================================================*/

function validDistrict(district){

    return required(district);

}

/*=========================================================
    PHONE EXISTS
=========================================================*/

function phoneExists(phone){

    const families = DB.active(DATABASE.FAMILIES);

    return families.some(

        item => item.phone === phone

    );

}

/*=========================================================
    UNIQUE PHONE
=========================================================*/

function uniquePhone(phone,id=null){

    const families = DB.active(DATABASE.FAMILIES);

    return !families.some(item=>{

        if(id){

            return item.phone===phone && item.id!==id;

        }

        return item.phone===phone;

    });

}

/*=========================================================
    REQUIRED FIELDS
=========================================================*/

function validateFamily(data){

    const errors=[];

    if(!required(data.fullName))

        errors.push("Full name is required.");

    if(!validName(data.fullName))

        errors.push("Invalid full name.");

    if(!required(data.phone))

        errors.push("Phone number is required.");

    if(!validPhone(data.phone))

        errors.push("Invalid Somali phone number.");

    if(!uniquePhone(data.phone,data.id))

        errors.push("Phone number already exists.");

    if(!validAge(data.age))

        errors.push("Invalid age.");

    if(!validRegion(data.region))

        errors.push("Please select a region.");

    if(!validDistrict(data.district))

        errors.push("Please select a district.");

    if(!validGender(data.gender))

        errors.push("Invalid gender.");

    if(!validMaritalStatus(data.maritalStatus))

        errors.push("Invalid marital status.");

    if(!validMoney(data.familySupport))

        errors.push("Invalid family support amount.");

    return errors;

}

/*=========================================================
    SHOW VALIDATION
=========================================================*/

function showValidation(errors){

    if(errors.length===0){

        return true;

    }

    alert(errors.join("\n"));

    return false;

}