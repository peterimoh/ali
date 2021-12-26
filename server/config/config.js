// require('dotenv').config()

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8080,
  jwtRegister: process.env.JWT_REGISTER || 'secretregister',
  jwtSecret: process.env.JWT_SECRET || 'secretsecret1010',
  mongoUri: process.env.MONGODB_URI,
  email: process.env.EMAIL || 'alivps39@gmail.com',
  pass: process.env.PASS || '7ADHAMadham',
  client_url: process.env.CLIENT_URL || 'http://localhost:3000',
  //braintree
  merchantId: process.env.MERCHANT_ID,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
};

module.exports = config;
