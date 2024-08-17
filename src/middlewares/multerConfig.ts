import multer from 'multer'

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads/') // Directory for storing uploaded files
  },
  filename: (_req, file, cb) => {
    cb(null, file.originalname) // Preserve original filename
  },
})

const upload = multer({ storage: storage })

export default upload
