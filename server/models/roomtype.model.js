const query = require('../database/');
const table = 'roomtype';

module.exports={
    find:()=>query.find(table),
    update:entity => query.update(table,entity),
    insert:entity=>query.insert(table,entity)
}