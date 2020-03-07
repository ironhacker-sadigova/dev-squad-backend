/* Note for myself : 
if Console.log (“PROCESS: “, process) it throws   
the entire application running in the process */
const express = require ('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan'); 
/* => npm morgan : Morgan acts as a middleware and helps to see in the console the routes paths: 
from which route we are getting the request*/
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

// CONNECTING TO MDB
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true,
    useUnifiedTopology: true}
)
.then(() => console.log('Successfuly Connected to the Database'))
 
mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
});


//ROUTES
const postRoutes = require('./routes/post');
 /* we use it as a middleware, any request on '/' will be 
 passed to the postRoutes who will give it to the  controller*/

 //MIDDLEWARES EXECUTING IN THE MIDDLE
app.use(morgan('dev'));  // in dev mode you gonna see what happens :) 
app.use(bodyParser.json());
app.use(expressValidator());
app.use('/',postRoutes);

const port=8000;

app.listen(port,()=> {
    console.log (`The Api is listening on port: ${port}`);
});

