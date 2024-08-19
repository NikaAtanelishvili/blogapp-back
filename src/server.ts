import express from 'express'
import bodyParser from 'body-parser'

import { api } from 'routes'
import { errorHandlerMiddleware } from 'middlewares'

import { cors, mongoConnect, swaggerDocument } from 'config'
import path from 'path'
import swaggerUI from 'swagger-ui-express'

const server = express()

mongoConnect()

server.use(cors)

server.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

server.use(bodyParser.json())

// Serve static files from the uploads directory
server.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

server.use('/api', api)

server.use(errorHandlerMiddleware)

server.listen(8080)
