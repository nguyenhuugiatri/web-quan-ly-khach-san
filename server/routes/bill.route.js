const router = require('express').Router();
const billModel = require('../models/bill.model');
router.get('/list', async (req, res) => {
  await billModel;
});

module.exports = router;
