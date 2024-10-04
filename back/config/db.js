const mongoose = require('mongoose');
const logger = require('./logger');


async function connectToDatabase(retries = 5) {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      poolSize: 10,
    });
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error.message);
    if (retries === 0) {
      process.exit(1);
    } else {
      setTimeout(() => connectToDatabase(retries - 1), 5000);
    }
  }
}

module.exports = connectToDatabase;