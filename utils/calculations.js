/*=========================================================
    MASKIIN CAAWIYE
    CALCULATIONS ENGINE
=========================================================*/

"use strict";

/*=========================================================
    GET ACTIVE DATA
=========================================================*/

function getFamilies(){

    return DB.active(DATABASE.FAMILIES) || [];

}

function getTransactions(){

    return DB.active(DATABASE.TRANSACTIONS) || [];

}

/*=========================================================
    TOTAL FAMILIES
=========================================================*/

function totalFamilies(){

    return getFamilies().length;

}

/*=========================================================
    TOTAL PEOPLE (ESTIMATED)
=========================================================*/

function totalPeople(){

    const families = getFamilies();

    return families.reduce((sum,f)=>{

        const children = Number(f.children || 0);

        const adults = f.maritalStatus === "Single" ? 1 : 2;

        return sum + children + adults;

    },0);

}

/*=========================================================
    TOTAL CHILDREN
=========================================================*/

function totalChildren(){

    return getFamilies().reduce((sum,f)=>{

        return sum + Number(f.children || 0);

    },0);

}

/*=========================================================
    TOTAL MONEY GIVEN
=========================================================*/

function totalMoneyGiven(){

    return getTransactions().reduce((sum,t)=>{

        return sum + Number(t.amount || 0);

    },0);

}

/*=========================================================
    AVERAGE SUPPORT
=========================================================*/

function averageSupport(){

    const families = getFamilies();

    if(families.length === 0) return 0;

    const total = families.reduce((sum,f)=>{

        return sum + Number(f.totalSupport || 0);

    },0);

    return total / families.length;

}

/*=========================================================
    MONEY BY REGION
=========================================================*/

function moneyByRegion(){

    const families = getFamilies();

    const result = {};

    families.forEach(f=>{

        const region = f.region || "Unknown";

        result[region] = (result[region] || 0) + Number(f.totalSupport || 0);

    });

    return result;

}

/*=========================================================
    MONEY BY DISTRICT
=========================================================*/

function moneyByDistrict(){

    const families = getFamilies();

    const result = {};

    families.forEach(f=>{

        const district = f.district || "Unknown";

        result[district] = (result[district] || 0) + Number(f.totalSupport || 0);

    });

    return result;

}

/*=========================================================
    GENDER DISTRIBUTION
=========================================================*/

function genderDistribution(){

    const families = getFamilies();

    let male = 0;

    let female = 0;

    families.forEach(f=>{

        if(f.gender === "Male") male++;

        if(f.gender === "Female") female++;

    });

    return { male, female };

}


/*=========================================================
    FAMILY TOTAL CALCULATION (PHASE 2)
=========================================================*/

function calculateFamilyTotal(family){

  const familySupport = Number(family.familySupport || 0);

  const children = Number(family.children || 0);

  const childrenSupport = Number(family.childrenSupport || 0);

  const extraSupport = Number(family.extraSupport || 0);

  const childrenTotal = children * childrenSupport;

  return {

      familySupport,

      childrenTotal,

      extraSupport,

      grandTotal: familySupport + childrenTotal + extraSupport

  };

}

/*=========================================================
  UPDATE FAMILY TOTALS
=========================================================*/

function updateFamilyTotals(family){

  const calc = calculateFamilyTotal(family);

  family.childrenTotal = calc.childrenTotal;

  family.grandTotal = calc.grandTotal;

  return family;

}

/*=========================================================
  FAMILY WITH FULL DETAILS
=========================================================*/

function enrichFamilies(){

  const families = DB.active(DATABASE.FAMILIES);

  return families.map(f => updateFamilyTotals(f));

}
/*=========================================================
    MARITAL DISTRIBUTION
=========================================================*/

function maritalDistribution(){

    const families = getFamilies();

    const result = {

        Single:0,

        Married:0,

        Widowed:0,

        Divorced:0,

        Separated:0

    };

    families.forEach(f=>{

        if(result[f.maritalStatus] !== undefined){

            result[f.maritalStatus]++;

        }

    });

    return result;

}

/*=========================================================
    TOP SUPPORT FAMILIES
=========================================================*/

function topFamilies(limit = 5){

    const families = [...getFamilies()];

    return families

        .sort((a,b)=>b.totalSupport - a.totalSupport)

        .slice(0,limit);

}

/*=========================================================
    TOP TRANSACTIONS
=========================================================*/

function topTransactions(limit = 5){

    const tx = [...getTransactions()];

    return tx

        .sort((a,b)=>b.amount - a.amount)

        .slice(0,limit);

}

/*=========================================================
    MONTHLY PAYMENTS
=========================================================*/

function monthlyPayments(){

    const tx = getTransactions();

    const result = {};

    tx.forEach(t=>{

        const date = new Date(t.createdAt);

        const key = `${date.getFullYear()}-${date.getMonth()+1}`;

        result[key] = (result[key] || 0) + Number(t.amount || 0);

    });

    return result;

}

/*=========================================================
    DAILY PAYMENTS
=========================================================*/

function dailyPayments(){

    const tx = getTransactions();

    const result = {};

    tx.forEach(t=>{

        const date = new Date(t.createdAt);

        const key = date.toISOString().split("T")[0];

        result[key] = (result[key] || 0) + Number(t.amount || 0);

    });

    return result;

}

/*=========================================================
    PAYMENT STATUS
=========================================================*/

function paymentStatus(){

    const tx = getTransactions();

    let completed = 0;

    let pending = 0;

    tx.forEach(t=>{

        if(t.status === "Completed") completed++;

        else pending++;

    });

    return { completed, pending };

}

/*=========================================================
    TOTAL SUPPORT BREAKDOWN
=========================================================*/

function supportBreakdown(){

    const families = getFamilies();

    let family = 0;

    let children = 0;

    let extra = 0;

    families.forEach(f=>{

        family += Number(f.familySupport || 0);

        children += Number(f.childrenSupport || 0);

        extra += Number(f.extraSupport || 0);

    });

    return {

        family,

        children,

        extra,

        total: family + children + extra

    };

}

/*=========================================================
    DASHBOARD SUMMARY (MAIN FUNCTION)
=========================================================*/

function dashboardSummary(){

    return {

        totalFamilies: totalFamilies(),

        totalPeople: totalPeople(),

        totalChildren: totalChildren(),

        totalMoney: totalMoneyGiven(),

        avgSupport: averageSupport(),

        gender: genderDistribution(),

        marital: maritalDistribution(),

        topFamilies: topFamilies(5),

        topTransactions: topTransactions(5),

        regionMoney: moneyByRegion(),

        districtMoney: moneyByDistrict(),

        payments: paymentStatus(),

        support: supportBreakdown()

    };

}