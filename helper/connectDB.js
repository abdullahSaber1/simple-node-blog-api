const mongoose = require('mongoose');

const connectDB = (DB_URL) => {
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log('DB connected');
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectDB;
