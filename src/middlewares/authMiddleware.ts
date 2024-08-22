import { Handler } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

const authMiddleware: Handler = async (req, _res, next) => {
  try {
    dotenv.config()

    const { JWT_TOKEN_SECRET } = process.env

    const token = req.cookies.authToken // Extract token from the cookies

    if (!token) {
      const error: any = new Error('User is not authorized.')
      error.statusCode = 403
      throw error
    }

    jwt.verify(token, JWT_TOKEN_SECRET as jwt.Secret) // Verify the token

    next()
  } catch (err) {
    next(err)
  }
}

export default authMiddleware
