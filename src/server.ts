import express from 'express'
import bodyParser from 'body-parser'

import { api } from 'routes'
import { errorHandlerMiddleware } from 'middlewares'

import { cors, mongoConnect } from 'config'
import path from 'path'

const server = express()

mongoConnect()

server.use(cors)

server.use(bodyParser.json())

// Serve static files from the uploads directory
server.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

server.use('/api', api)

server.use(errorHandlerMiddleware)

server.listen(8080)
