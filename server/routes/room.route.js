const router = require('express').Router();
const roomModel = require('../models/room.model');
const moment = require('moment');

router.get('/list', async (req, res) => {
  await roomModel
    .find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((e) => {
      res.status(400).json(e);
    });
});
router.get('/listRoom', async (req, res) => {
  await query
    .listRoom()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((e) => {
      res.status(400).json(e);
    });
});
router.post('/roomCurrent', async (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  await query
    .roomById(id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((e) => {
      res.status(400).json(e);
    });
});


router.post('/checkOut', async (req, res, next) => {
  const { idRoom } = req.body;
  const roomCheckOut = await roomModel.getRoomByCheckOutId(idRoom);
  if (roomCheckOut === null)
    return res.status(404).json({
      message: 'Not found',
    });

  let { dateIn, dateOut, price, priceHour } = roomCheckOut;
  let total = 0;
  dateIn = moment(dateIn);
  dateOut = moment();
  const numberOfDays = dateOut.diff(dateIn, 'days');
  const numberOfHour = dateOut.diff(dateIn, 'hours');
  if (numberOfDays === 0) {
    total += priceHour + (numberOfHour - 1) * (priceHour / 2);
  } else {
    const overtime = numberOfHour % 24;
    total += numberOfDays * price + overtime * (priceHour / 2);
  }

  return res.status(200).json({ roomCheckOut, total, message: 'Successful !' });
});

module.exports = router;
