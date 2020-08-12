const db = require('../database');

module.exports = {
  addServiceReceipt: async () => {
    await db.load(
      `INSERT INTO servicereceipt (idService,amount,total)
      VALUES (NULL,NULL,'0')`
    );
  },
  getNewServiceReceipt: async () => {
    const rows = await db.load(
      `select id from servicereceipt`
    );
    if (rows.length === 0) return null;
    return rows[rows.length - 1];
  },

};
