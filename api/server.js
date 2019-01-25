/* 0.IMPORT DEPENDENCIES */ 
const dotenv = require("dotenv")
dotenv.config()

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
/* 0.IMPORT DEPENDENCIES */ 



/* 1.EXPRESS Related Setup */
// Set Express Port
const EXPRESS_PORT = 4000;

// Instantiate Express instance
const app = express();

const tagsRoutes = require('./tags.routes');
/* 1.EXPRESS Related Setup */



/* 2.MONGO DB Related Setup */

const mongoose = require('mongoose');

// Connection URL
const MONGO_INSTANCE_URL = process.env.MONGO_DB_URL;

// Database Name
const MONGO_DB_NAME = 'tags';

const MONGO_DB_URL = MONGO_INSTANCE_URL + '/' + MONGO_DB_NAME;

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_DB_URL, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

/* 2.MONGO DB Related Setup */



app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/tags', tagsRoutes);

app.listen(EXPRESS_PORT, function(){
  console.log('Server is running on Port:', EXPRESS_PORT);
});