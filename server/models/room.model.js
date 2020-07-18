const query = require('../database/');
const tableName = 'room';
module.exports = {
  find: () =>
    query.load(
      `select r.id, r.name , r.status, rt.id as idType, rt.name as typeName ,rt.price, rt.maxCustomer from Room r,RoomType rt where r.idType=rt.id`
    ),
  findById: (id) => query.findById(tableName, id),
};
