const router = require('express').Router();
const customerModel = require('../models/customer.model');
const bookingModel = require('../models/booking.model');
const moment = require('moment');


router.get('/listBooking', async (req, res) => {
  await bookingModel.getListBooking()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((e) => {
      res.status(400).json(e);
    });
});
router.post('/setStatus', async (req, res) => {
  await bookingModel.setStatusBookReceipt(req.body.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((e) => {
      res.status(400).json(e);
    });
});
router.post('/bookRoom', async (req, res, next) => {
  const { bookCustomer, bookRoom } = req.body;
  const { phone } = bookCustomer;
  const { date } = bookRoom;
  console.log(req.body);
  const dateIn = moment(date[0]).format('YYYY-MM-DD hh:mm');
  const dateOut = moment(date[1]).format('YYYY-MM-DD hh:mm');

  const checkExist = await customerModel.singleByPhone(phone);
  if (checkExist === null) {
    await customerModel.addCustomer(bookCustomer);
  } else {
    await customerModel.updateCustomer(bookCustomer);
  }
  const customer = await customerModel.singleByPhone(phone);
  await bookingModel.addBookReceipt({
    id: customer.id,
    dateIn,
    dateOut,
    status:'0',
  });

  const bookReceipt = await bookingModel.singleByCustomer(customer.id);
  await bookingModel.addBookReceiptDetail({
    id: bookReceipt.id,
    idRoom: bookRoom.idRoom,
  });
});

module.exports = router;
