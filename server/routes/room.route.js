const router = require('express').Router();
const query = require('../models/room.model');
router.get('/list', async (req, res) => {
  await query
    .find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((e) => {
      res.status(400).json(e);
    });
});
router.patch('/update', async (req, res) => {
  await query
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
  await query
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
  await query
    .insert(req.body)
    .then((r) => {
      return res.status(200).json({ message: 'Create success!' });
    })
    .catch((err) => {
      return res.status(400).json({ message: 'Something went wrongs' });
    });
});
module.exports = router;
