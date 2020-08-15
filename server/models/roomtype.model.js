const query = require('../database/');
const table = 'roomtype';

module.exports={
    find:()=>query.find(table),
    updateById:(id,entity) => query.updateById(table,id,entity),
    insert:entity=>query.insert(table,entity)
}