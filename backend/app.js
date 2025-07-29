// express framwork
var express = require('express');

// built in node.js to work with directory path
var path = require('path');

// to parse cookies from the HTTP headers
var cookieParser = require('cookie-parser');

// a middleware logger to log http requests to the console
var logger = require('morgan');

// import and enable verbose mode for sqlite to get more detail debug info
const sqlite3 = require('sqlite3').verbose();

// dot env file 
const dotenv = require('dotenv');

// define port
const port = 8000;

var app = express();
dotenv.config();

// declare routes
const usersRouter = require('./routes/users');

const home = require("./routes/index");
// connect to db
const db = new sqlite3.Database('./db/db.db', (err) => {
  if (err) {
    console.error('Error connecting to SQLite:', err);
    return;
  }
  console.log('Connected to SQLite database');
});

// middleware
app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//serve static file in public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/users', usersRouter);

app.use('/', home);

// middleware serve the err
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app
// start app
app.listen(port, (req, res) => {
  console.log(`Server is running on http://localhost:${port}`);
});