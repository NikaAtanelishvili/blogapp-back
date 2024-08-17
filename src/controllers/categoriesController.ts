import { Handler } from 'express'
import mongoose from 'mongoose'

export const getAllCategories: Handler = async (_req, res, next) => {
  try {
    const db = mongoose.connection.db

    if (!db) {
      throw { message: 'Database is not connected', statusCode: 500 }
    }

    const categories = await db.collection('categories').find().toArray()
    res
      .status(200)
      .json({
        data: categories,
        message: 'Categories were fetched successfully',
      })
  } catch (err) {
    next(err)
  }
}
