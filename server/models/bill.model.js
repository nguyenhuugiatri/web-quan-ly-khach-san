const db = require('../database');
const tableName = 'Bill';
module.exports = {
  createNewBill: async (idRentReceipt, idUser, paymentDate, total) => {
    await db.load(
      `INSERT INTO Bill (idRentReceipt, idUser, paymentDate, total)
      VALUES ('${idRentReceipt}', '${idUser}', '${paymentDate}', '${total}');
      `
    );
  },
  find: () => db.find(tableName),
  insert: (entity) => db.insert(tableName, entity),
  insertS: (values) =>
    db.loadWithFields(
      `INSERT INTO bill (idRentReceipt, idUser, paymentDate,roomCharge,serviceCharge) VALUES ?`,
      [values]
    ),
};
