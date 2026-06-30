/*=========================================================
    MASKIIN CAAWIYE
    DATABASE
=========================================================*/

"use strict";

/*
|--------------------------------------------------------------------------
| Database Keys
|--------------------------------------------------------------------------
*/

const DATABASE = {

    USERS: "mc_users",

    FAMILIES: "mc_families",

    TRANSACTIONS: "mc_transactions",

    REPORTS: "mc_reports",

    SETTINGS: "mc_settings",

    NOTIFICATIONS: "mc_notifications"

};

/*
|--------------------------------------------------------------------------
| Database Class
|--------------------------------------------------------------------------
*/

const DB = {

    /*
    --------------------------------------------
    Get Data
    --------------------------------------------
    */

    get(key) {

        try {

            const data = localStorage.getItem(key);

            return data ? JSON.parse(data) : [];

        }

        catch (error) {

            console.error(error);

            return [];

        }

    },

    /*
    --------------------------------------------
    Save Data
    --------------------------------------------
    */

    set(key, value) {

        localStorage.setItem(

            key,

            JSON.stringify(value)

        );

    },

    /*
    --------------------------------------------
    Insert New Record
    --------------------------------------------
    */

    insert(key, record) {

        const records = this.get(key);

        records.push(record);

        this.set(key, records);

        return record;

    },

    /*
    --------------------------------------------
    Update Record
    --------------------------------------------
    */

    update(key, id, newData) {

        const records = this.get(key);

        const index = records.findIndex(

            item => item.id === id

        );

        if (index === -1) return false;

        records[index] = {

            ...records[index],

            ...newData,

            updatedAt: new Date().toISOString()

        };

        this.set(key, records);

        return true;

    },

    /*
    --------------------------------------------
    Delete Record
    Soft Delete
    --------------------------------------------
    */

    softDelete(key, id) {

        return this.update(

            key,

            id,

            {

                deleted: true,

                deletedAt: new Date().toISOString()

            }

        );

    },

    /*
    --------------------------------------------
    Permanent Delete
    --------------------------------------------
    */

    delete(key, id) {

        let records = this.get(key);

        records = records.filter(

            item => item.id !== id

        );

        this.set(key, records);

    },

    /*
    --------------------------------------------
    Find One
    --------------------------------------------
    */

    find(key, id) {

        return this.get(key).find(

            item => item.id === id

        );

    },

    /*
    --------------------------------------------
    Get Active Records
    --------------------------------------------
    */

    active(key) {

        return this.get(key).filter(

            item => !item.deleted

        );

    },

    /*
    --------------------------------------------
    Count
    --------------------------------------------
    */

    count(key) {

        return this.active(key).length;

    },

    /*
    --------------------------------------------
    Clear Table
    --------------------------------------------
    */

    clear(key) {

        localStorage.removeItem(key);

    },

    /*
    --------------------------------------------
    Reset Everything
    --------------------------------------------
    */

    reset() {

        Object.values(DATABASE).forEach(key => {

            localStorage.removeItem(key);

        });

    },

    /*
    --------------------------------------------
    Exists
    --------------------------------------------
    */

    exists(key) {

        return localStorage.getItem(key) !== null;

    },

    /*
    --------------------------------------------
    Export Database
    --------------------------------------------
    */

    export() {

        return {

            users: this.get(DATABASE.USERS),

            families: this.get(DATABASE.FAMILIES),

            transactions: this.get(DATABASE.TRANSACTIONS),

            reports: this.get(DATABASE.REPORTS),

            settings: this.get(DATABASE.SETTINGS),

            notifications: this.get(DATABASE.NOTIFICATIONS)

        };

    },

    /*
    --------------------------------------------
    Import Database
    --------------------------------------------
    */

    import(data) {

        if (data.users)

            this.set(DATABASE.USERS, data.users);

        if (data.families)

            this.set(DATABASE.FAMILIES, data.families);

        if (data.transactions)

            this.set(DATABASE.TRANSACTIONS, data.transactions);

        if (data.reports)

            this.set(DATABASE.REPORTS, data.reports);

        if (data.settings)

            this.set(DATABASE.SETTINGS, data.settings);

        if (data.notifications)

            this.set(DATABASE.NOTIFICATIONS, data.notifications);

    }

};

/*
|--------------------------------------------------------------------------
| Initialize Database
|--------------------------------------------------------------------------
*/

(function initializeDatabase() {

    Object.values(DATABASE).forEach(key => {

        if (!DB.exists(key)) {

            DB.set(key, []);

        }

    });

})();