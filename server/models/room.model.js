const db = require('../database/');
const tableName = 'room';
module.exports = {
  find: () =>
    db.load(
      `select r.id, r.name , r.status, rt.id as idType, rt.name as typeName ,rt.price, rt.maxCustomer from Room r,RoomType rt where r.idType=rt.id and r.isDelete =0`
    ),

  findById: (id) => db.findById(tableName, id),

  updateById: (id, entity) => db.updateById(tableName, id, entity),

  deleteById: (id) =>
    db.load(`update ${tableName} set isDelete =1 where id=${id} `),

  insert: (entity) => db.insert(tableName, entity),

  getRoomByCheckOutId: async (idRoom) => {
    const rows = await db.load(
      `SELECT rr.id as rentReceiptId, rr.price, rt.priceHour, dateIn, dateOut FROM rentreceipt rr, rentreceiptdetail rrd, Room r, RoomType rt WHERE r.id = rrd.idRoom and rrd.idRentReceipt=rr.id and r.id=rrd.idRoom and r.idType=rt.id and r.id = ${idRoom} order by rr.id ASC;`
    );
    if (rows.length === 0) return null;
    return rows[rows.length - 1];
  },
};
