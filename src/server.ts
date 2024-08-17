import express from 'express'
import bodyParser from 'body-parser'

import { api } from 'routes'
import { errorHandlerMiddleware } from 'middlewares'

import { cors, mongoConnect } from 'config'

const server = express()

mongoConnect()

server.use(cors)

server.use(bodyParser.json())

server.use('/api', api)

server.use(errorHandlerMiddleware)

server.listen(8080)
