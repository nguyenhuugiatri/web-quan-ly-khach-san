const db = require('../database');

module.exports = {
  singleByCustomer: async (id) => {
    const rows = await db.load(
      `select * from RentReceipt where idCustomer = '${id}'`
    );
    if (rows.length === 0) return null;
    return rows[rows.length - 1];
  },
  addRentReceipt: async (rentReceipt) => {
    await db.load(
      `INSERT INTO RentReceipt (idCustomer,dateIn,dateOut,idUser,price)
      VALUES ('${rentReceipt.id}','${rentReceipt.dateIn}','${rentReceipt.dateOut}','${rentReceipt.idUser}','${rentReceipt.price}')`
    );
  },
  addRentReceiptDetail: async (rentReceiptDetail) => {
    await db.load(
      `INSERT INTO RentReceiptDetail (idRentReceipt,idRoom,idServiceReceipt)
      VALUES ('${rentReceiptDetail.id}','${rentReceiptDetail.idRoom}','${rentReceiptDetail.idServiceReceipt}')`
    );
  },
  setStatusToRent: async (id) => {
    await db.load(
      `UPDATE room
      SET status='2'
      WHERE id='${id}';`
    );
  },
};
