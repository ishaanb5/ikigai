const express = require('express')
require('express-async-errors')
const app = express()
const mongoose = require('mongoose')
const { MONGODB_URL } = require('./utils/config')
const logger = require('./utils/logger')

const taskRouter = require('./controllers/task')
const listRouter = require('./controllers/list')
const middleware = require('./utils/middleware')

if (process.env.NODE_ENV !== 'test') {
  logger.info(`connecting to mongodb: ${MONGODB_URL}`)
  mongoose
    .connect(MONGODB_URL)
    .then(() => logger.info('succesfully connected to mongodb'))
    .catch((error) => logger.error('error connecting to mongodb', error))
}
app.use(express.json())
app.use('/api/tasks', taskRouter)
app.use('/api/lists', listRouter)
app.use('/', middleware.unknownEndpoint)
app.use('/', middleware.errorHandler)

module.exports = app
