import { Handler } from 'express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'
dotenv.config()

export const login: Handler = async (req, res, next) => {
  try {
    const {
      JWT_TOKEN_SECRET,
      JWT_TOKEN_EXPIRE_TIME,
      JWT_TOKEN_EXPIRE_TIME_IN_MS,
    } = process.env

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

    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Only send cookies over HTTPS in production
      sameSite: 'lax', // Helps mitigate CSRF
      maxAge: Number(JWT_TOKEN_EXPIRE_TIME_IN_MS), // JWT expiration time in milliseconds
    })

    res.status(200).json({
      message: 'Login successful',
      expiresAt: Date.now() + Number(JWT_TOKEN_EXPIRE_TIME_IN_MS), // sent exact timestep
    })
  } catch (err) {
    next(err)
  }
}
