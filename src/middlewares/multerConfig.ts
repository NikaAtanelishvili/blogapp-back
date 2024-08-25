import multer from 'multer'
import { GridFsStorage } from 'multer-gridfs-storage'
import dotenv from 'dotenv'

dotenv.config()

const { MONGO_USER, MONGO_PASSWORD, MONGO_DEFAULT_DATABASE } = process.env
const MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@blogapp.snm0u.mongodb.net/${MONGO_DEFAULT_DATABASE}`

// GridFsStorage setup
const storage = new GridFsStorage({
  url: MONGO_URI, // MongoDB URI
  file: (_req, file) => {
    return {
      bucketName: 'uploads', // GridFS bucket name
      filename: `file_${Date.now()}_${file.originalname}`, // File naming convention
    }
  },
})

// Initialize Multer with the GridFS storage
const upload = multer({ storage })

export default upload
