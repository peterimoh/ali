const app = require('./express');
const path = require('path');
const config = require('./config/config');
const { connectDB, createDir } = require('./config/helper');

connectDB();

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  let dirPath = path.join(__dirname, 'public/api/static/productImg');
  console.info('Server started on port %s.', config.port);
  createDir(dirPath)
});
