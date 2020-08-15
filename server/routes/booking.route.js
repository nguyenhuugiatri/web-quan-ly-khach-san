const router = require("express").Router();
const customerModel = require("../models/customer.model");
const bookingModel = require("../models/booking.model");
const rentReceiptModel = require("../models/rentReceipt.model");
const moment = require("moment");

router.get('/listBooking', async (req, res) => {
  await bookingModel
    .getListBooking()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((e) => {
      console.log('err',e);
      res.status(400).json(e);
    });
});
router.post("/checkinbooked", async (req, res) => {
  try {
    console.log('booked',req.body);
    let {data, currentUser} = req.body;
      // idCustomer - dateIn dateOut idUser price idroom idrentcepit
    let roomBook = {
      idRoom: data.idRoom,
      price: data.price,
      dateIn: data.dateIn,
      dateOut: data.dateOut,
    };
    console.log('data:',data);
    await bookingModel.setStatusBookReceipt(data.id);
    await rentReceiptModel.addRentReceipt({
      id: data.idCustomer,
      idUser: currentUser.id,
      price: roomBook.price,
      dateIn : roomBook.dateIn,
      dateOut: roomBook.dateOut,
    });
    const rentReceiptCurrent = await rentReceiptModel.singleByCustomer(
      data.idCustomer
    );
    await rentReceiptModel.addRentReceiptDetail({
      id: rentReceiptCurrent.id,
      idRoom: roomBook.idRoom,
    });
    await rentReceiptModel.setStatusToRent(roomBook.idRoom);
    return res.status(200).json({ message: "Accept was successful !" });
  }catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Accept was failed !" });
  }
  
});
router.post('/bookRoom', async (req, res, next) => {
  try {
    const { bookCustomer, bookRoom } = req.body;
    const { phone } = bookCustomer;
    const { date } = bookRoom;
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
      status: '0',
      price: bookRoom.price,
    });

    const bookReceipt = await bookingModel.singleByCustomer(customer.id);
    await bookingModel.addBookReceiptDetail({
      id: bookReceipt.id,
      idRoom: bookRoom.idRoom,
    });
    return res.status(200).json({ message: 'Booking was successful !' });
  } catch (err) {
    return res.status(400).json({ message: 'Booking was failed !' });
  }
});

module.exports = router;
