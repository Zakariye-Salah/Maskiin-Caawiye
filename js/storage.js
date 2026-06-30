// Maskiin Caawiye - LocalStorage Engine with Soft Delete & Backup Systems
const StorageEngine = {
  init() {
      if (!localStorage.getItem('mc_people')) localStorage.setItem('mc_people', JSON.stringify([]));
      if (!localStorage.getItem('mc_transactions')) localStorage.setItem('mc_transactions', JSON.stringify([]));
      if (!localStorage.getItem('mc_settings')) {
          localStorage.setItem('mc_settings', JSON.stringify({
              theme: 'light',
              language: 'en',
              emailBackup: '',
              lastBackupDate: ''
          }));
      }
      this.checkAutoBackup();
  },

  // --- PEOPLE OPERATIONS (With Soft Delete) ---
  getPeople() {
      const all = JSON.parse(localStorage.getItem('mc_people')) || [];
      return all.filter(p => !p.isDeleted); // Soft delete filtration
  },

  savePerson(personData) {
      const all = JSON.parse(localStorage.getItem('mc_people')) || [];
      if (personData.id) {
          const index = all.findIndex(p => p.id === personData.id);
          if (index !== -1) all[index] = { ...all[index], ...personData, updatedAt: new Date().toISOString() };
      } else {
          personData.id = 'p_' + Date.now();
          personData.isDeleted = false;
          personData.createdAt = new Date().toISOString();
          all.push(personData);
      }
      localStorage.setItem('mc_people', JSON.stringify(all));
      return personData;
  },

  deletePerson(id) {
      const all = JSON.parse(localStorage.getItem('mc_people')) || [];
      const index = all.findIndex(p => p.id === id);
      if (index !== -1) {
          all[index].isDeleted = true; // Soft Delete flag
          all[index].deletedAt = new Date().toISOString();
          localStorage.setItem('mc_people', JSON.stringify(all));
          return true;
      }
      return false;
  },

  // --- TRANSACTION OPERATIONS ---
  getTransactions() {
      const all = JSON.parse(localStorage.getItem('mc_transactions')) || [];
      return all.filter(t => !t.isDeleted);
  },

  getTransactionsByPerson(personId){

    return this.getTransactions()

        .filter(t=>t.personId===personId)

        .sort((a,b)=>

            new Date(b.date)

            -

            new Date(a.date)

        );

},

  addTransaction(tx) {

    const all = JSON.parse(
        localStorage.getItem("mc_transactions")
    ) || [];

    const payment = {

        id: "tx_" + Date.now(),

        personId: tx.personId,

        familyName: tx.familyName,

        phone: tx.phone,

        amount: Number(tx.amount),

        gateway: tx.gateway,

        reference: tx.reference,

        notes: tx.notes || "",

        date: tx.date || new Date().toISOString(),

        createdAt: new Date().toISOString(),

        updatedAt: null,

        isDeleted: false

    };

    all.push(payment);

    localStorage.setItem(
        "mc_transactions",
        JSON.stringify(all)
    );

    return payment;

},
updateTransaction(id, updatedData) {

    const all = JSON.parse(
        localStorage.getItem("mc_transactions")
    ) || [];

    const index = all.findIndex(t => t.id === id);

    if (index === -1) return false;

    all[index] = {
        ...all[index],
        ...updatedData,
        updatedAt: new Date().toISOString()
    };

    localStorage.setItem(
        "mc_transactions",
        JSON.stringify(all)
    );

    return all[index];

},

getTransactionById(id){

    return this.getTransactions().find(
        t => t.id === id
    );

},
  deleteTransaction(id) {
      const all = JSON.parse(localStorage.getItem('mc_transactions')) || [];
      const index = all.findIndex(t => t.id === id);
      if (index !== -1) {
          all[index].isDeleted = true;
          localStorage.setItem('mc_transactions', JSON.stringify(all));
          return true;
      }
      return false;
  },

  // --- BACKUP & RESTORE MODULES ---
  exportFullBackup() {
      const dataStr = JSON.stringify({
          people: localStorage.getItem('mc_people'),
          transactions: localStorage.getItem('mc_transactions'),
          settings: localStorage.getItem('mc_settings')
      });
      return btoa(unescape(encodeURIComponent(dataStr))); // Base64 export string
  },

  importFullBackup(base64String) {
      try {
          const decoded = decodeURIComponent(escape(atob(base64String)));
          const parsed = JSON.parse(decoded);
          if (parsed.people) localStorage.setItem('mc_people', parsed.people);
          if (parsed.transactions) localStorage.setItem('mc_transactions', parsed.transactions);
          if (parsed.settings) localStorage.setItem('mc_settings', parsed.settings);
          return true;
      } catch (e) {
          console.error("Backup corruption error:", e);
          return false;
      }
  },

  checkAutoBackup() {
      const settings = JSON.parse(localStorage.getItem('mc_settings'));
      const today = new Date().toISOString().split('T')[0];
      if (settings.emailBackup && settings.lastBackupDate !== today) {
          console.log(`Triggering daily local background snapshot for: ${settings.emailBackup}`);
          // Mocking remote sync via payload store preservation
          settings.lastBackupDate = today;
          localStorage.setItem('mc_settings', JSON.stringify(settings));
      }
  }
};
StorageEngine.init();