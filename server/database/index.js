const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  port: 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'password',
  database: process.env.DB_NAME || 'hotelmanager',
  multipleStatements: true,
});

pool.on('connection', () => {
  console.log('Database connected');
  pool.on('error', function (err) {
    console.error(new Date(), 'MySQL error', err.code);
  });
  pool.on('close', function (err) {
    console.error(new Date(), 'MySQL close', err);
  });
});
const mysql_query = util.promisify(pool.query).bind(pool);

module.exports = {
    load: sql => mysql_query(sql),
    find: tableName => mysql_query(`select * from ${tableName}`),
    findById: (tableName,id)=>mysql(`select * from ${tableName} where id = ${id}`),
    insert: (tableName, entity) => mysql_query(`insert into ${tableName} set ?`, entity),
    updateById: (tableName,id,entity)=>mysql_query(`update ${tableName} set ? where id=${id}`,entity),
    deleteById:(tableName,id)=>mysql_query(`delete from ${tableName} where id=${id}`),
}
