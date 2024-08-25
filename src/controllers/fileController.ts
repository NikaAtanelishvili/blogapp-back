import { Handler } from 'express'
import mongoose from 'mongoose'

export const getFile: Handler = async (req, res, _next) => {
  const connection = mongoose.connection

  // Ensure the MongoDB connection is ready
  if (!connection.readyState) {
    return res
      .status(500)
      .json({ message: 'MongoDB connection not established' })
  }

  // Initialize GridFSBucket after connection is ready
  const gfs = new mongoose.mongo.GridFSBucket(connection.db!, {
    bucketName: 'uploads',
  })

  try {
    // Use the find method to search for the file
    const files = await gfs.find({ filename: req.params.filename }).toArray()

    if (!files || files.length === 0) {
      return res.status(404).json({ message: 'File not found' })
    }

    // Stream the file to the response
    const readStream = gfs.openDownloadStreamByName(req.params.filename)
    readStream.pipe(res)
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving file', error: error })
  }
}
