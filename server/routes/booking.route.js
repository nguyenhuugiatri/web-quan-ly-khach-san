const router = require('express').Router();
const customerModel = require('../models/customer.model');
const bookingModel = require('../models/booking.model');
const moment = require('moment');



router.post('/bookRoom', async (req, res, next) => {
  const { bookCustomer, bookRoom } = req.body;
  const { phone } = bookCustomer;
  const { date } = bookRoom;
  console.log(req.body);
  const dateIn = moment(date[0]).format('YYYY-MM-DD hh:mm:ss');
  const dateOut = moment(date[1]).format('YYYY-MM-DD hh:mm:ss');

  const checkExist = await customerModel.singleByPhone(phone);
  if (checkExist === null) {
    await customerModel.addCustomer(bookCustomer);
  } else {
    await customerModel.updateCustomer(bookCustomer);
  }
//   const customer = await customerModel.singleByPhone(phone);
//   await bookingModel.addBookReceipt({
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
