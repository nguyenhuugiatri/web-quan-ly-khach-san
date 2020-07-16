const db = require('../database');

module.exports = {
  singleByPhone: async (phone) => {
    const rows = await db.load(
      `select * from customer where phone = '${phone}'`
    );
    if (rows.length === 0) return null;
    return rows[0];
  },

  getAllCustomer: async () => {
    const rows = await db.find('customer');
    if (rows.length === 0) return null;
    return rows;
  },
  addCustomer: async (customer) => {
     await db.load(
      `INSERT INTO customer (cmnd,name,phone,idtype)
      VALUES ('${customer.cmnd}','${customer.name}','${customer.phone}','${customer.idtype}')`
    );
  },
  updateCustomer: async (customer) => {
     await db.load(
      `UPDATE customer
      SET cmnd = '${customer.cmnd}', name = '${customer.name}', idtype='${customer.idtype}'
      WHERE phone = '${customer.phone}';`
    );
  },
  addBillRent: async (billrent) => {
    await db.load(
      `INSERT INTO billrent (idcustomer,datein,dateout)
      VALUES ('${billrent.id}','${billrent.datein}','${billrent.dateout}')`
    );
  },
  addDetailsRent: async (detailsRent) => {
    await db.load(
      `INSERT INTO detailsrent (idbillrent,idroom)
      VALUES ('${detailsRent.id}','${detailsRent.datein}')`
    );
  },
};
