const db = require('../database');

module.exports = {
  singleByCustomer: async (id) => {
    const rows = await db.load(
      `select * from billrent where idcustomer = '${id}'`
    );
    if (rows.length === 0) return null;
    return rows[rows.length-1];
  },
  addBillRent: async (billrent) => {
    await db.load(
      `INSERT INTO billrent (idcustomer,datein,dateout,iduser)
      VALUES ('${billrent.id}','${billrent.datein}','${billrent.dateout}','${billrent.iduser}')`
    );
  },
  addDetailsRent: async (detailsRent) => {
    await db.load(
      `INSERT INTO detailsrent (idbillrent,idroom)
      VALUES ('${detailsRent.id}','${detailsRent.idroom}')`
    );
  },
};