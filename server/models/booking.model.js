const db = require('../database');

module.exports = {
  singleByCustomer: async (id) => {
    const rows = await db.load(
      `select * from bookReceipt where idCustomer = '${id}'`
    );
    if (rows.length === 0) return null;
    return rows[rows.length - 1];
  },
  addBookReceipt: async (bookReceipt) => {
    await db.load(
      `INSERT INTO bookReceipt (idCustomer,dateIn,status)
      VALUES ('${bookReceipt.id}','${bookReceipt.dateIn}','${bookReceipt.status})`
    );
  },
  addBookReceiptDetail: async (bookReceiptDetail) => {
    await db.load(
      `INSERT INTO bookReceiptDetail (idBookReceipt,idRoom)
      VALUES ('${bookReceiptDetail.id}','${bookReceiptDetail.idRoom}')`
    );
  },
  setStatusToBook: async (id) => {
    await db.load(
      `UPDATE room
      SET status='3'
      WHERE id='${id}';`
    );
  },
};
