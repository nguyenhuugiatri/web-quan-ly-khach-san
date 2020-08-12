const db = require('./../database');

module.exports = {
  singleByUsername: async (username) => {
    const rows = await db.load(
      `select * from User where username = '${username}'`
    );
    if (rows.length === 0) return null;
    return rows[0];
  },
  getAllUser: async () => {
    const rows = await db.find('User');
    if (rows.length === 0) return null;
    return rows;
  },
};
