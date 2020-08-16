const router = require('express').Router();
const billModel = require('../models/bill.model');
const roomModel = require('../models/room.model');
const userModel = require('../models/user.model');
const rentreceipt = require('../models/rentReceipt.model');
const moment = require('moment');
const COLOR = ['#00b7c2', '#e8505b', '#f6ab6c', '#ff5f40'];
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

router.post('/', async (req, res) => {
  try {
    let data = [],
      backgroundColor = [],
      datasets = [];
    let Bills = await billModel.find();
    let labels = [];
    let year = Array.from(
      new Set(
        Array.from(Bills, (value) =>
          parseInt(moment(value.paymentDate).format('Y'))
        )
      )
    );
    if (req.body.type === 'month') {
      labels = Array.from(Array(12), (_, i) => {
        return `Month ${i + 1}`;
      });
      for (let y = 0; y < year.length; y++) {
        let colorForYear = COLOR[y];
        let label = `Year ${year[y]}`;
        for (let k = 0; k < labels.length; k++) {
          let priceOfMonth = Bills.map((value) => {
            if (
              parseInt(moment(value.paymentDate).format('M')) === k + 1 &&
              year[y] === parseInt(moment(value.paymentDate).format('YYYY'))
            ) {
              return value.roomCharge + value.serviceCharge;
            }
            return 0;
          });
          let sumMonth = priceOfMonth.reduce(function (a, b) {
            return a + b;
          }, 0);
          data.push(sumMonth);
          backgroundColor.push(colorForYear);
        }
        datasets.push({ backgroundColor, data, label });
        data = [];
        backgroundColor = [];
      }
    } else if (req.body.type === 'year') {
      labels=year.map(v=>`Year ${v}`)
      let mainlabel = [`Total room charge`,`Total service charge`];
      let label = [];
      //get room charge
      for(let k = 0;k<2;k++){
        for(let i = 0 ;i<year.length;i++){
          let color = COLOR[i];
          let total = Bills.map(value=>{
            if(parseInt(moment(value.paymentDate).format('YYYY'))===year[i]){
              if(k===0)
              return value.roomCharge;
              return value.serviceCharge;
            }
            return 0;
          }).reduce((a,b)=>a+b,0)
          backgroundColor.push(color)
          label.push(`${mainlabel[k]} ${year[i]}`)
          data.push(total)
        }
        datasets.push({
          backgroundColor,
          label,
          data
        })
        data=[];
        label=[];
        data=[];
        backgroundColor=[]
      }
    }
    res.send({ datasets, labels });
  } catch (error) {
    res.status(400).json('Somthings went wrongs');
  }
});

router.get('/clone', async (req, res) => {
  let price = [200, 400, 600, 500, 100, 20, 80, 60, 300, 350, 150];
  let service = [100, 150, 50, 60, 70, 80, 90, 110, 120, 130];
  let record = [];
  for (var m = 2018; m < 2021; m++) {
    for (var j = 0; j < 12; j++) {
      for (var i = 0; i < 20; i++) {
        let roomCharge = price[Math.floor(Math.random() * (price.length - 1))];
        let serviceCharge =
          service[Math.floor(Math.random() * (price.length - 1))];
        let time = new Date(`${j + 1}/20/${m}`);
        let objR = {
          idCustomer: 1,
          idUser: 1,
          dateIn: time,
          dateOut: time,
          price: 200,
        };
        await rentreceipt.insert(objR).then(async (r) => {
          if (r) {
            record.push([r.insertId, 1, time, roomCharge, serviceCharge]);
          }
        });
      }
    }
  }
  await billModel
    .insertS(record)
    .then((r) => {
      res.send(r);
    })
    .catch((r) => {
      res.send(r);
    });
});

router.post('/', async (req, res) => {
  try {
    let data = [],
      backgroundColor = [],
      datasets = [];
    let Bills = await billModel.find();
    let labels = [];
    let year = Array.from(
      new Set(
        Array.from(Bills, (value) =>
          parseInt(moment(value.paymentDate).format('Y'))
        )
      )
    );
    if (req.body.type === 'month') {
      labels = Array.from(Array(12), (_, i) => {
        return `Month ${i + 1}`;
      });
      for (let y = 0; y < year.length; y++) {
        let colorForYear = COLOR[y];
        let label = `Year ${year[y]}`;
        for (let k = 0; k < labels.length; k++) {
          let priceOfMonth = Bills.map((value) => {
            if (
              parseInt(moment(value.paymentDate).format('M')) === k + 1 &&
              year[y] === parseInt(moment(value.paymentDate).format('YYYY'))
            ) {
              return value.roomCharge + value.serviceCharge;
            }
            return 0;
          });
          let sumMonth = priceOfMonth.reduce(function (a, b) {
            return a + b;
          }, 0);
          data.push(sumMonth);
          backgroundColor.push(colorForYear);
        }
        datasets.push({ backgroundColor, data, label });
        data = [];
        backgroundColor = [];
      }
    } else if (req.body.type === 'year') {
      labels=year.map(v=>`Year ${v}`)
      let mainlabel = [`Total room charge`,`Total service charge`];
      let label = [];
      //get room charge
      for(let k = 0;k<2;k++){
        for(let i = 0 ;i<year.length;i++){
          let color = COLOR[i];
          let total = Bills.map(value=>{
            if(parseInt(moment(value.paymentDate).format('YYYY'))===year[i]){
              if(k===0)
              return value.roomCharge;
              return value.serviceCharge;
            }
            return 0;
          }).reduce((a,b)=>a+b,0)
          backgroundColor.push(color)
          label.push(`${mainlabel[k]} ${year[i]}`)
          data.push(total)
        }
        datasets.push({
          backgroundColor,
          label,
          data
        })
        data=[];
        label=[];
        data=[];
        backgroundColor=[]
      }
    }
    res.send({ datasets, labels });
  } catch (error) {
    res.status(400).json('Somthings went wrongs');
  }
});

router.get('/clone', async (req, res) => {
  let price = [200, 400, 600, 500, 100, 20, 80, 60, 300, 350, 150];
  let service = [100, 150, 50, 60, 70, 80, 90, 110, 120, 130];
  let record = [];
  for (var m = 2018; m < 2021; m++) {
    for (var j = 0; j < 12; j++) {
      for (var i = 0; i < 20; i++) {
        let roomCharge = price[Math.floor(Math.random() * (price.length - 1))];
        let serviceCharge =
          service[Math.floor(Math.random() * (price.length - 1))];
        let time = new Date(`${j + 1}/20/${m}`);
        let objR = {
          idCustomer: 1,
          idUser: 1,
          dateIn: time,
          dateOut: time,
          price: 200,
        };
        await rentreceipt.insert(objR).then(async (r) => {
          if (r) {
            record.push([r.insertId, 1, time, roomCharge, serviceCharge]);
          }
        });
      }
    }
  }
  await billModel
    .insertS(record)
    .then((r) => {
      res.send(r);
    })
    .catch((r) => {
      res.send(r);
    });
});

module.exports = router;
