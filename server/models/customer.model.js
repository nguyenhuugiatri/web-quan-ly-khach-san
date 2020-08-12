const db = require('../database');

module.exports = {
  singleByPhone: async (phone) => {
    const rows = await db.load(
      `select c.id, c.name, c.phone, c.idNumber, c.idType, ct.name as typeName, c.isDelete from Customer c, CustomerType ct where c.idType=ct.id and phone = '${phone}'`
    );
    if (rows.length === 0) return null;
    return rows[0];
  },

  getCustomerType: async () => {
    const rows = await db.find('CustomerType');
    if (rows.length === 0) return null;
    return rows;
  },

  getAllCustomer: async () => {
    const rows = await db.find('Customer');
    if (rows.length === 0) return null;
    return rows;
  },
  addCustomer: async (customer) => {
    await db.load(
      `INSERT INTO Customer (idNumber,name,phone,idType)
      VALUES ('${customer.idNumber}','${customer.name}','${customer.phone}','${customer.idType}')`
    );
  },
  updateCustomer: async (customer) => {
    await db.load(
      `UPDATE Customer
      SET idNumber = '${customer.idNumber}', name = '${customer.name}', idType='${customer.idType}'
      WHERE phone = '${customer.phone}';`
    );
  },
};
