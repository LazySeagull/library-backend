const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

async function connectMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully!');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
}

module.exports = connectMongo;
