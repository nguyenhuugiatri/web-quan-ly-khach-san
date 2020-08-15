const db = require('../database');

module.exports = {
  createNewBill: async (
    idRentReceipt,
    idUser,
    paymentDate,
    roomCharge,
    serviceCharge
  ) => {
    await db.load(
      `INSERT INTO Bill (idRentReceipt, idUser, paymentDate, roomCharge, serviceCharge)
      VALUES ('${idRentReceipt}', '${idUser}', '${paymentDate}', '${roomCharge}','${serviceCharge}');
      `
    );
  },
};
