import dotenv from 'dotenv'
import mongoose from 'mongoose'

const mongoConnect = async () => {
  dotenv.config()

  const { MONGO_USER, MONGO_PASSWORD, MONGO_DEFAULT_DATABASE } = process.env

  const MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@blogapp.snm0u.mongodb.net/${MONGO_DEFAULT_DATABASE}`

  return await mongoose.connect(MONGO_URI)
}

export default mongoConnect
