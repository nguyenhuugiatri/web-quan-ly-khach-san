const db = require('../database');

module.exports = {
  addNewRentReceiptDetail: async ({
    idRentReceipt,
    idRoom,
    idServiceReceipt,
  }) => {
    await db.load(`INSERT INTO RentReceiptDetail (idRentReceipt, idRoom, idServiceReceipt)
    VALUES (${idRentReceipt}, ${idRoom}, ${idServiceReceipt})`);
  },
};
