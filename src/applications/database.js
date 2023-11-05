import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(process.env.MONGO_CONNECTION)

const db = mongoose.connection

db.on('error', () => {
  throw new Error('Connection error.')
})

export default mongoose