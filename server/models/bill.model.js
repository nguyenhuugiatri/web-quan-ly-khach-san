const db = require('../database');

module.exports = {
  createNewBill: async (idRentReceipt, idUser, paymentDate, total) => {
    await db.load(
      `INSERT INTO Bill (idRentReceipt, idUser, paymentDate, total)
      VALUES ('${idRentReceipt}', '${idUser}', '${paymentDate}', '${total}');
      `
    );
  },
};
