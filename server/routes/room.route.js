const router = require('express').Router();
const roomModel = require('../models/room.model');
const moment = require('moment');

router.get('/list', async (req, res) => {
  const listRoomReserved = await roomModel.getRoomReserved(
    moment().format('YYYY-MM-DD')
  );
  if (listRoomReserved.length !== 0) {
    let idRoom = listRoomReserved.map((e) => e.idRoom).join(',');
    await roomModel.updateRoomReserved(idRoom);
  }

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
  await roomModel
    .listRoom()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((e) => {
      res.status(400).json(e);
    });
});
router.get('/listTypeRoom', async (req, res) => {
  await roomModel
    .listTypeRoom()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((e) => {
      res.status(400).json(e);
    });
});
router.get('/listRoomRent', async (req, res) => {
  await roomModel
    .listRoomRent()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((e) => {
      res.status(400).json(e);
    });
});
router.post('/roomCurrent', async (req, res) => {
  const { id } = req.body;
  await roomModel
    .roomById(id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((e) => {
      res.status(400).json(e);
    });
});
router.post('/dataRoom', async (req, res) => {
  const { id } = req.body;
  await roomModel
    .getDataCurrRoom(id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((e) => {
      res.status(400).json(e);
    });
});
router.post('/changeRoom', async (req, res) => {
  try {
    const { idRentReceipt, idRoom, idRoomCurrent, price } = req.body;
    await roomModel.ChangeRoomInDetail(idRentReceipt, idRoom);
    await roomModel.updateRoomAvailable(idRoomCurrent);
    await roomModel.updateRoomRent(idRoom);
    await roomModel.updateRoomRentChange(idRentReceipt, price);
    return res.status(200).json({ message: 'Change Room Success!' });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'Change Room Fail!' });
  }
});
router.post('/listRoomByType', async (req, res) => {
  const { id, dateIn, dateOut } = req.body;
  await roomModel
    .listRoomByType(id, dateIn, dateOut)
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
  dateIn = moment(dateIn);
  dateOut = moment();
  let total = 0;
  const numberOfHour = Math.abs(dateOut.diff(dateIn, 'hours'));
  const numberOfDays = parseInt(numberOfHour / 24);
  if (numberOfDays === 0) {
    total += priceHour + (numberOfHour - 1) * (priceHour / 2);
  } else {
    const overtime = numberOfHour % 24;
    total += numberOfDays * price + overtime * (priceHour / 2);
  }

  return res.status(200).json({ roomCheckOut, total, message: 'Successful !' });
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

router.post('/confirmCleaning', async (req, res, next) => {
  try {
    const { idRoom } = req.body;
    await roomModel.updateRoomStatus(idRoom, 1);
    return res.status(200).json({ message: 'Successful !' });
  } catch (err) {
    console.log('Error:', err);
    return res.status(400).json({ message: 'Failed !' });
  }
});

module.exports = router;
