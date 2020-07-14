const query = require('../database/database');
const tableName = 'room';
module.exports={
    find:()=> query.find(tableName),
    findById:(id)=> query.findById(id),
}