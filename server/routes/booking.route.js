const router = require('express').Router();
const customerModel = require('../models/customer.model');
const rentReceiptModel = require('../models/rentReceipt.model');
const moment = require('moment');



router.post('/bookRoom', async (req, res, next) => {
  const { checkInCustomer, checkInRoom } = req.body;
  const { phone } = checkInCustomer;
  const { date } = checkInRoom;
  console.log(req.body);
  const dateIn = moment(date[0]).format('YYYY-MM-DD hh:mm:ss');
  const dateOut = moment(date[1]).format('YYYY-MM-DD hh:mm:ss');

//   const checkExist = await customerModel.singleByPhone(phone);
//   if (checkExist === null) {
//     await customerModel.addCustomer(checkInCustomer);
//   } else {
//     await customerModel.updateCustomer(checkInCustomer);
//   }
//   const customer = await customerModel.singleByPhone(phone);
//   await rentReceiptModel.addRentReceipt({
//     id: customer.id,
//     idUser: currentUser.id,
//     dateIn,
//     dateOut,
//   });

//   const billRent = await rentReceiptModel.singleByCustomer(checkInCustomer.id);
//   await rentReceiptModel.addRentReceiptDetail({
//     id: billRent.id,
//     idRoom: checkInRoom.id,
//   });
});

module.exports = router;
