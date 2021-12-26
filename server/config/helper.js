const mongoose = require('mongoose')
const fs = require('fs');
const config = require('./config')

exports.connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.mongoUri, {
          useUnifiedTopology: true,
          useNewUrlParser: true,
        });
        console.log(`MongoDB connect: ${conn.connection.host}`)
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}

exports.createDir=(dirPath)=> {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true }, (err) => {
      if (err) {
        console.error('createDir Error:', err);
      } else {
        console.log('Directory is made!');
      }
    });
  }
}
