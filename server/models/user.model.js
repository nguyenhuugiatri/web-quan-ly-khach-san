const db = require('./../database/database');

module.exports = {
  singleByUsername: async (username) => {
    const rows = await db.load(
      `select * from user where username = '${username}'`
    );
    if (rows.length === 0) return null;
    return rows[0];
  },
};
