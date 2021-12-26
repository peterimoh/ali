require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const os = require('os');
const authRoute = require('./routes/auth.route');
const planRoute = require('./routes/plan.route');
const productRoute = require('./routes/product.route');

const app = express();

const networkInterfaces = os.networkInterfaces();
const ip = networkInterfaces.address;
// console.log(networkInterfaces)

//middlewares
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

//routes
app.get('/', (req, res) => {
  console.log(res.cookie());
  res.status(200).json({ time: Date().toString() });
});
app.use('/api', authRoute);
app.use('/api/plan', planRoute);
app.use('/product', productRoute);

module.exports = app;
