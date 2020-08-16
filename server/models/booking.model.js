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
      `INSERT INTO bookReceipt (idCustomer,dateIn,dateOut,status,price)
      VALUES ('${bookReceipt.id}','${bookReceipt.dateIn}','${bookReceipt.dateOut}','${bookReceipt.status}','${bookReceipt.price}')`
    );
  },
  addBookReceiptDetail: async (bookReceiptDetail) => {
    await db.load(
      `INSERT INTO bookReceiptDetail (idBookReceipt,idRoom)
      VALUES ('${bookReceiptDetail.id}','${bookReceiptDetail.idRoom}')`
    );
  },
  setStatusToBooked: async (id) => {
    await db.load(
      `UPDATE room
      SET status='3'
      WHERE id='${id}';`
    );
  },
  setStatusBookReceipt: async (id) => {
    await db.load(
      `UPDATE bookreceipt
      SET status='1'
      WHERE id='${id}';`
    );
  },
  getListBooking: async () => {
    const rows = await db.load(
      `select br.id,br.idCustomer,c.name,c.phone,c.idNumber,br.dateIn,br.dateOut,br.status,br.idRoom, br.nameRoom,br.price from (select br.price,br.idCustomer,br.id,br.dateIn,br.dateOut,br.status,brd.idRoom, r.name as nameRoom from bookreceipt as br, bookreceiptdetail as brd, room as r where brd.idRoom=r.id and brd.idBookReceipt=br.id) as br, customer as c where c.id = br.idCustomer and br.status='0'`
    );
    if (rows.length === 0) return [];
    return rows;
  },
  getListBookingFilter: async (dateFrom,dateTo) => {
    const rows = await db.load(
      `select br.id,br.idCustomer,c.name,c.phone,c.idNumber,br.dateIn,br.dateOut,br.status,br.idRoom, br.nameRoom,br.price from (select br.price,br.idCustomer,br.id,br.dateIn,br.dateOut,br.status,brd.idRoom, r.name as nameRoom from bookreceipt as br, bookreceiptdetail as brd, room as r where brd.idRoom=r.id and brd.idBookReceipt=br.id) as br, customer as c where c.id = br.idCustomer and br.status='0' and br.dateIn >= '${dateFrom}' and cast(br.dateIn as DATE) <= '${dateTo}' ORDER BY br.dateIn ASC`
    );
    if (rows.length === 0) return [];
    return rows;
  },
};
