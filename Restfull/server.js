const dotenv = require('dotenv');
const connectDB = require('./helper/connectDB');

const app = require('./app');

dotenv.config('.env');

const { PORT, DB_URL } = process.env;

connectDB(DB_URL);

app.listen(PORT, () => {
  console.log('server is running....');
});
