require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');

const userRouter = require('./routes/user.route');
const roomRouter = require('./routes/room.route');
const serviceRouter = require('./routes/service.route');
const customerRouter = require('./routes/customer.route');
const bookingRouter = require('./routes/booking.route');
const roomTypeRouter = require('./routes/roomtype.route');
const PORT = process.env.PORT || 3002;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  session({
    secret: 'anhem1nha',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 15,
    },
  })
);
app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});
app.use(morgan('dev'));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/user', userRouter);
app.use('/room', roomRouter);
app.use('/service', serviceRouter);
app.use('/customer', customerRouter);
app.use('/booking', bookingRouter);
app.use('/roomtype', roomTypeRouter);

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
