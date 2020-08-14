const router = require('express').Router();
const roomtypeSchema = require('../models/roomtype.model');
router.get('/list', async (req, res) => {
  await roomtypeSchema
    .find()
    .then((result) => {
      if (result) return res.status(200).json({ roomType: result });
      return res.status(404).json({ message: 'Not found!' });
    })
    .catch((err) => {
      return res.status(400).json({ message: 'Something went wrong!' });
    });
});

module.exports = router;
