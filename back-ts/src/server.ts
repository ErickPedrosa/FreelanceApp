// @ts-ignore
import dotenv from 'dotenv-safe'
import mongoose from 'mongoose'
import app from './app'
import winston from 'winston'


dotenv.config()


const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console(), new winston.transports.File({ filename: 'server.log' })]
})


const connectToDatabase = async (retries = 5): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string)
    logger.info('Connected to MongoDB')
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error)
    if (retries === 0) process.exit(1)
    setTimeout(() => connectToDatabase(retries - 1), 5000)
  }
}


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
  connectToDatabase()
})
