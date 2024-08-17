import { Handler } from 'express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'
dotenv.config()

export const login: Handler = async (req, res, next) => {
  try {
    const { JWT_TOKEN_SECRET, JWT_TOKEN_EXPIRE_TIME } = process.env

    const db = mongoose.connection.db

    if (!db) {
      throw { message: 'Database is not connected', statusCode: 500 }
    }

    const { email } = req.body
    const user = await db.collection('users').findOne({ email })

    if (!user) {
      const error: any = new Error('Invalid email')
      error.statusCode = 401
      throw error
    }

    // Generate token
    const token = jwt.sign({ email: user.email }, JWT_TOKEN_SECRET!, {
      expiresIn: JWT_TOKEN_EXPIRE_TIME,
    })

    res.status(200).json({
      message: 'Login successful',
      token,
      expiresIn: JWT_TOKEN_EXPIRE_TIME,
    })
  } catch (err) {
    next(err)
  }
}
