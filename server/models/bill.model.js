const db = require('../database');
const tableName = 'Bill';
module.exports = {
  createNewBill: async (
    idRentReceipt,
    idUser,
    paymentDate,
    roomCharge,
    serviceCharge
  ) => {
    await db.load(
      `INSERT INTO Bill (idRentReceipt, idUser, paymentDate, roomCharge, serviceCharge)
      VALUES ('${idRentReceipt}', '${idUser}', '${paymentDate}', '${roomCharge}','${serviceCharge}');
      `
    );
  },
  getListBill: async (dateFrom,dateTo) => {
    const rows = await db.load(
      `select DISTINCT u.username, b.id,rd.idRoom,r.dateIn,b.paymentDate as dateOut,b.roomCharge,b.serviceCharge, r.price from bill as b, rentreceipt as r,user as u, rentreceiptdetail as rd where r.id=b.idRentReceipt and r.id=rd.idRentReceipt and b.idUser=u.id and b.paymentDate >= '${dateFrom}' and cast(b.paymentDate as DATE) <= '${dateTo}' ORDER BY b.paymentDate DESC`
    );
    if (rows.length === 0) return [];
    return rows;
  },
  getAllBill: async () => {
    const rows = await db.load(
      `select DISTINCT u.username, b.id,rd.idRoom,r.dateIn,b.paymentDate as dateOut,b.roomCharge,b.serviceCharge, r.price from bill as b, rentreceipt as r,user as u, rentreceiptdetail as rd where r.id=b.idRentReceipt and r.id=rd.idRentReceipt and b.idUser=u.id ORDER BY b.paymentDate DESC`
    );
    if (rows.length === 0) return [];
    return rows;
  },
  find: () => db.find(tableName),
  insert: (entity) => db.insert(tableName, entity),
  insertS: (values) =>
    db.loadWithFields(
      `INSERT INTO bill (idRentReceipt, idUser, paymentDate,roomCharge,serviceCharge) VALUES ?`,
      [values]
    ),
};
