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
router.post('/listBill', async (req, res, next) => {
  
  const {dateFrom,dateTo}=req.body;
  const listBill = await billModel.getListBill(dateFrom,dateTo);
  for (let i=0;i<listBill.length;i++){
    listBill[i].key=i;
    listBill[i].total=listBill[i].serviceCharge + listBill[i].roomCharge;
    listBill[i].dateIn=moment(listBill[i].dateIn).format('YYYY-MM-DD HH:mm');
    listBill[i].dateOut=moment(listBill[i].dateOut).format('YYYY-MM-DD HH:mm');
  }
  console.log('get',listBill);
  if (listBill === null)
    return res.status(404).json({
      message: 'Not found',
    });

  return res.status(200).json({ listBill, message: 'Successful !' });
});
router.get('/allBill', async (req, res, next) => {
  // const {dateFrom,dateTo}=req.body;
  // const listBill = await billModel.getListBill(dateFrom,dateTo);
  
  const listAllBill = await billModel.getAllBill();
  for (let i=0;i<listAllBill.length;i++){
    listAllBill[i].key=i;
    listAllBill[i].total=listAllBill[i].serviceCharge + listAllBill[i].roomCharge;
    listAllBill[i].dateIn=moment(listAllBill[i].dateIn).format('YYYY-MM-DD HH:mm');
    listAllBill[i].dateOut=moment(listAllBill[i].dateOut).format('YYYY-MM-DD HH:mm');
  }
  if (listAllBill === null)
    return res.status(404).json({
      message: 'Not found',
    });

  return res.status(200).json({ listAllBill, message: 'Successful !' });
});

module.exports = router;
