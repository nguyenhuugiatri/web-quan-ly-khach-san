const db = require('../database');

module.exports = {
  getLastServiceReceipt: async () => {
    const rows = await db.load(`SELECT * from ServiceReceipt`);
    if (rows.length === 0) return null;
    return rows[rows.length - 1];
  },

  deleteServiceReceipt: async (rentReceiptId) => {
    await db.load(`UPDATE ServiceReceipt
    SET amount = 0, total=0
    WHERE id=${rentReceiptId};`);
  },
};
