const query = require('../database/');
const tableName = 'room';
module.exports = {
  find: () =>
    query.load(
      `select r.id, r.name , r.status, rt.id as idType, rt.name as typeName ,rt.price, rt.maxCustomer from Room r,RoomType rt where r.idType=rt.id and r.isDelete =0`
    ),
  findById: (id) => query.findById(tableName, id),
  updateById:(id ,entity)=> query.updateById(tableName,id,entity),
  deleteById:id=>query.load(`update ${tableName} set isDelete =1 where id=${id} `),
  insert:entity=>query.insert(tableName,entity)
};
