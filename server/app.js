require('dotenv').config();
const express =require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//* declare routes
const userRouter = require('./routes/users');

const app = express();
app.use(cors());
app.use(bodyParser.json());


//* use routes
app.use('/user',userRouter);


//*declare port
const PORT = process.env.PORT||3002;


app.listen(PORT,()=>{
    console.log(`app listen port: ${PORT}`);
})