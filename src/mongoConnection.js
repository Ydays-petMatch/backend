const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

function mongoConnect() {
  mongoose.connect(process.env.MONGO_URI, {
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASSWORD,
    authSource: process.env.AUTH_SOURCE
  });
  
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('Connected to MongoDB');
  });
}

module.exports = mongoConnect();


// const connectToDatabase = async () => {
//   try {
//     await mongoose.connect(env.mongo_uri);
//     logger.info("MongoDB connected");
//   } catch (err) {
//     logger.error("Error connecting to MongoDB : ", err);
//     process.exit(1);
//   }
// };