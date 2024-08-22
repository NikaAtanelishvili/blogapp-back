import { Handler } from 'express'
/*
const cors: Handler = (_req, res, next) => {
  // Specify the frontend origin you want to allow. Replace with your actual frontend URL.
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://your-frontend-domain.com',
  )

  // Allow credentials (necessary for sending cookies)
  res.setHeader('Access-Control-Allow-Credentials', 'true')

  // Keep the existing allowed methods
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE',
  )

  // Allow the necessary headers, including 'Authorization' and any others you might need
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  // Pass to next middleware
  next()
}
*/
const cors: Handler = (req, res, next) => {
  const allowedOrigins = ['http://localhost:5173']

  const origin = req.get('Origin')

  // Check if origin is defined and is part of allowedOrigins
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE',
  )
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
}

export default cors
