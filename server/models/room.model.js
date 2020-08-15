const db = require("../database/");
const tableName = "room";
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
  ChangeRoomInDetail: (idRentReceipt, idRoom) =>
    db.load(`UPDATE rentreceiptdetail
  SET idRoom = '${idRoom}'
  WHERE idRentReceipt='${idRentReceipt}'`),
  updateRoomAvailable: (idRoom) => {
    db.load(`UPDATE room
  SET status = 1
  WHERE id= '${idRoom}'`);
  },
  updateRoomRentChange: (id,price) =>
    db.load(`UPDATE rentreceipt
    SET price = '${price}'
    WHERE id='${id}'`),
    updateRoomRent: (idRoom) =>
    db.load(`UPDATE room
    SET status = 2
    WHERE id= '${idRoom}'`),
  getRoomByCheckOutId: async (idRoom) => {
    const rows = await db.load(
      `SELECT rr.id as rentReceiptId, rr.price, rt.priceHour, dateIn, dateOut FROM rentreceipt rr, rentreceiptdetail rrd, Room r, RoomType rt WHERE r.id = rrd.idRoom and rrd.idRentReceipt=rr.id and r.id=rrd.idRoom and r.idType=rt.id and r.id = ${idRoom} order by rr.id ASC;`
    );
    if (rows.length === 0) return null;
    return rows[rows.length - 1];
  },
  getDataCurrRoom: async (idRoom) => {
    const rows = await db.load(
      `select * from rentreceipt as rr, rentreceiptdetail as rrd where rr.id = rrd.idRentReceipt and rrd.idRoom = ' ${idRoom}' `
    );
    if (rows.length === 0) return null;
    return rows[rows.length - 1];
  },
  listRoom: () => db.load(`select * from room`),
  listRoomRent: () => db.load(`select * from room where status='2'`),
  listTypeRoom: () => db.load(`select * from roomtype`),

  roomById: (id) =>
    db.load(
      `SELECT rt.id, rt.name, rt.price, rt.priceHour FROM room as r ,roomtype as rt where r.idType = rt.id and r.id = '${id}'`
    ),
  listRoomByType: (id, dateIn, dateOut) =>
    db.load(
      `SELECT  r.name,r.id,r.idType,rt.price,rt.priceHour from (SELECT * FROM room where id NOT IN
        (SELECT r.id from room as r, bookreceipt as br,bookreceiptdetail as brd where brd.idBookReceipt=br.id and brd.idRoom=r.id and (dateOut>'${dateIn}' and dateIn<'${dateOut}')
        UNION 
        SELECT r.id from room as r, rentreceipt as rr,rentreceiptdetail as rrd where rrd.idRentReceipt=rr.id and rrd.idRoom=r.id and (dateOut>'${dateIn}' and dateIn<'${dateOut}'))) as r,roomtype as rt where r.idType=rt.id and rt.id='${id}' `
    ),

  updateRoomStatus: async (idRoom, status) => {
    await db.load(`UPDATE room
      SET status = ${status}
      WHERE id=${idRoom};`);
  },
};
