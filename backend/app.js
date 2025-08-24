// express framwork
var express = require('express');

// built in node.js to work with directory path
var path = require('path');

// to parse cookies from the HTTP headers
var cookieParser = require('cookie-parser');

// a middleware logger to log http requests to the console
var logger = require('morgan');

// CORS middleware
const cors = require('cors');

// Session middleware
const session = require('express-session');

// import and enable verbose mode for sqlite to get more detail debug info
const sqlite3 = require('sqlite3').verbose();

// dot env file 
const dotenv = require('dotenv');


const responseHelper = require('./utils/responseHelper');

var app = express();
dotenv.config();

// declare routes
const usersRouter = require('./routes/users');
const paymentsRouter = require('./routes/payments');
const reviewRouter = require('./routes/Review');
const accommodationsRouter = require('./routes/Accommodations');
const accommodationsImagesRouter = require('./routes/Accommodations_images');
const amenitiesRouter = require('./routes/Amenities');
const accommodationsAmenitiesRouter = require('./routes/Accommodations_amenities');
const accommodationsRoomsImagesRouter = require('./routes/Accommodations_rooms_images');
const bookingsRouter = require('./routes/Bookings');
const roomsRouter = require('./routes/Rooms');
const accommodationRoomsRouter = require('./routes/Accommodations_rooms');
const accommodationsBookingsRouter = require('./routes/Accommodations_bookings');
const ownersRouter = require('./routes/Owners');
const ownersBookingsRouter = require('./routes/Owners_bookings');
const ownersAccommodationsRouter = require('./routes/Owners_Accommodations');
const authRouter = require('./routes/Auth');

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
app.use(cors({
  origin: true, // Allow all origins for now
  credentials: true // Allow cookies
}));

// Simple session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'simple-travel-booking-secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//serve static file in public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images/Accommodations', express.static(path.join(__dirname, 'db/images/Accommodations')));
app.use('/images/Rooms', express.static(path.join(__dirname, 'db/images/Rooms')));

// Routes
app.use('/users', usersRouter);
app.use('/payments', paymentsRouter);
app.use('/reviews', reviewRouter);

app.use('/accommodations', accommodationsRouter);
app.use('/accommodations', accommodationsImagesRouter);
app.use('/accommodations', accommodationsRoomsImagesRouter);
app.use('/accommodations', accommodationRoomsRouter);;
app.use('/accommodations', accommodationsAmenitiesRouter);
app.use('/accommodations', accommodationsBookingsRouter);

app.use('owners', ownersBookingsRouter);
app.use('/owners', ownersAccommodationsRouter);

app.use('/bookings', bookingsRouter);
app.use('/rooms', roomsRouter);
app.use('/owners', ownersRouter);
app.use('/auth', authRouter);
app.use('/amenities', amenitiesRouter);
app.use('/', home);

// middleware serve the err
app.use((err, req, res, next) => {
  console.error(err.stack);
  // Sử dụng responseHelper để trả về format thống nhất
  return responseHelper.error(res, 'Internal Server Error', 500, err.message);
});

module.exports = app