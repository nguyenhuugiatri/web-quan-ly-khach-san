const query = require('../database/database');
const tableName = 'room';
module.exports = {
  find: () =>
    query.load(
      `select r.id, r.name , r.status, rt.id as typeid, rt.name as typename ,rt.price, rt.max_persons from room r,roomtype rt where r.typeid=rt.id`
    ),
  findById: (id) => query.findById(tableName, id),
};
