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
    const rows = await db.load(`select * from user where isDelete=0`);
    if (rows.length === 0) return null;
    return rows;
  },
  resetPassword:(id,newPassword)=>db.load(`update user set password="${newPassword}" where id=${id}`),
  delete:id=>db.load(`update user set isDelete =1 where id=${id}`),
  update:(id,{username, permission})=>db.load(`update user set username='${username}', permission=${permission} where id =${id}`)
};
