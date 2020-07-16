const router = require('express').Router();
const customerModel = require('../models/customer.model');
const billrentModel = require('../models/billrent.model');
var moment = require('moment');

router.post('/getByPhone', async (req, res, next) => {
  const { phone } = req.body;
  const customer = await customerModel.singleByPhone(phone);

  if (customer === null)
    return res.status(404).json({
      message: 'Not found',
    });

  return res.status(200).json({ customer, message: 'Successful !' });
});

router.post('/checkIn', async (req, res, next) => {
  console.log(req.body);
  const {checkInCustomer, checkInRoom,currentUser} = req.body;
  const {phone} = checkInCustomer;
  const {date} = checkInRoom;
 
  const checkExist = await customerModel.singleByPhone(phone);
  
  var dateIn = moment(date[0]).format("YYYY-MM-DD hh:mm:ss");
  var dateOut = moment(date[1]).format("YYYY-MM-DD hh:mm:ss");
  if (checkExist===null){
    await customerModel.addCustomer(checkInCustomer);
  }
  else {
    //update
    await customerModel.updateCustomer(checkInCustomer);
  }
  const customer = await customerModel.singleByPhone(phone);
  // add table billRent
  await billrentModel.addBillRent({id: customer.id, datein : dateIn, dateout:dateOut, iduser: currentUser.id});
  const billRent = await billrentModel.singleByCustomer(checkInCustomer.id);
  // add table detailsrent
  await billrentModel.addDetailsRent({id : billRent.id,idroom:checkInRoom.id});

});

module.exports = router;
