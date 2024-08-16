import { ErrorRequestHandler } from 'express'

const errorHandlerMiddleware: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next,
) => {
  const { message, data, statusCode } = error

  const status = statusCode || 500

  return res.status(status).json({ message: message, data: data })
}

export default errorHandlerMiddleware
