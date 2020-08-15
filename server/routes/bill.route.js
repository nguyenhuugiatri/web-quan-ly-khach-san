const router = require('express').Router();
const billModel = require('../models/bill.model');
const roomModel = require('../models/room.model');
const moment = require('moment');

router.post('/add', async (req, res) => {
  try {
    const { checkOutRoom, currentUser } = req.body;
    const {
      rentReceiptId,
      total: roomCharge = 0,
      id: idRoom,
      serviceCharge = 0,
    } = checkOutRoom;
    const { id: idUser } = currentUser;
    const paymentDate = moment().format('YYYY-MM-DD HH:mm');
    await billModel.createNewBill(
      rentReceiptId,
      idUser,
      paymentDate,
      roomCharge,
      serviceCharge
    );
    await roomModel.updateRoomStatus(idRoom, 4);
    return res.status(200).json({ message: 'Check out was successful !' });
  } catch (err) {
    console.log('Error:', err);
    return res.status(400).json({ message: 'Check out was failed !' });
  }
});

module.exports = router;
