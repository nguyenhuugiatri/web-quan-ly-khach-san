const db = require('../database');

module.exports = {
  singleByPhone: async (phone) => {
    const rows = await db.load(
      `select * from customer where phone = '${phone}'`
    );
    if (rows.length === 0) return null;
    return rows[0];
  },

  getAllCustomer: async () => {
    const rows = await db.find('customer');
    if (rows.length === 0) return null;
    return rows;
  },
};
