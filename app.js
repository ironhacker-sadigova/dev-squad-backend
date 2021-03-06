



/* Note for myself : 
if Console.log (“PROCESS: “, process) it throws   
the entire application running in the process */
/*const express = require ('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan'); 
/* => npm morgan : Morgan acts as a middleware and helps to see in the console the routes paths: 
from which route we are getting the request*/
/*const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const FileSystem = require('fs');
const cors = require ('cors');


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
const authRoutes = require ('./routes/auth');
 /* we use it as a middleware, any request on '/' will be 
 passed to the postRoutes who will give it to the  controller*/
/*const userRoutes = require ('./routes/user');

//ApiDocs

app.get ('/', (req,res)=> {
  FileSystem.readFile('docs/api.json', (err,data)=>{
    if (err){
      res.status(400).json({
        error:err
      });
  }
const docs = JSON.parse(data);
res.json(docs);
   
});

});





 //MIDDLEWARES EXECUTING IN THE MIDDLE
app.use(morgan('dev'));  // in dev mode you gonna see what happens :) 
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());
app.use (cors());
app.use('/',postRoutes);
app.use ('/', authRoutes);
app.use ('/', userRoutes);

//Error handling whenever trying to access to a route not being authenticated , code snippet on npm doc jwt express
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  }
});


// Inutile d'écrire ça vu que je l'ai sur l'.env but better to see on which port its running straight from the terminal
const port=8000;

app.listen(port,()=> {
    console.log (`The Api is listening on port: ${port}`);
});

*/


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const fs = require("fs");
const cors = require("cors");
const path = require('path'); 
const dotenv = require("dotenv");
dotenv.config();


// db

/*mongoose
    .connect(
        process.env.MONGO_URI,
        { useNewUrlParser: true }
    )
    .then(() => console.log("DB Connected"));

mongoose.connection.on("error", err => {
    console.log(`DB connection error: ${err.message}`);
});
*/
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true,
    useUnifiedTopology: true}
)
.then(() => console.log('Successfuly Connected to the Database'))
 
mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
});



// bring in routes
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
// apiDocs
app.get('/api', (req, res) => {
  fs.readFile('docs/apiDocs.json', (err, data) => {
      if (err) {
          res.status(400).json({
              error: err
          });
      }
      const docs = JSON.parse(data);
      res.json(docs);
  });
});
// middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);
/// Serve static files from client/build
app.use(express.static(path.join(__dirname, "public/build")));
// For any other routes: serve public/build/index.html SPA
app.use((req, res, next) => {
  res.sendFile(`${__dirname}/public/build/index.html`), err => {
    if (err) { next(err) }
  }
})
app.use(function(err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        res.status(401).json({ error: "Unauthorized!" });
    }
});



const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`API is listening on port: ${port}`);
});