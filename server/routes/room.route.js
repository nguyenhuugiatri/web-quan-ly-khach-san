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

router.patch('/update', async (req, res) => {
  await roomModel
    .updateById(req.body.id, req.body)
    .then((r) => {
      return res.status(200).json({ message: 'Update success!' });
    })
    .catch((e) => {
      return res.status(400).json({ message: 'Update Failed!', e });
    });
});

router.patch('/delete', async (req, res) => {
  if (!req.body.id) return res.status(404).json({ message: 'Room not found!' });
  await roomModel
    .deleteById(req.body.id)
    .then((r) => {
      return res.status(200).json({ message: 'Delete success!' });
    })
    .catch((err) => {
      return res.status(400).json({ message: `Delete failed!`, err });
    });
});

router.post('/insert', async (req, res) => {
  req.body.status = 1;
  await roomModel
    .insert(req.body)
    .then((r) => {
      return res.status(200).json({ message: 'Create success!' });
    })
    .catch((err) => {
      return res.status(400).json({ message: 'Something went wrongs' });
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
  const numberOfHour = dateOut.diff(dateIn, 'hours');
  const numberOfDays = parseInt(numberOfHour / 24);
  if (numberOfDays === 0) {
    total += priceHour + (numberOfHour - 1) * (priceHour / 2);
  } else {
    const overtime = numberOfHour % 24;
    total += numberOfDays * price + overtime * (priceHour / 2);
  }

  return res.status(200).json({ roomCheckOut, total, message: 'Successful !' });
});

module.exports = router;
