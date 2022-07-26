const logger = require('./logger')

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
}

// eslint-disable-next-line consistent-return
const errorHandler = (err, req, res, next) => {
  logger.error(err)

  if (err.name === 'CastError') {
    const taskDoesNotExist =
      /created to have an id of a task that does not exist in db/
    if (taskDoesNotExist.test(err.value)) {
      return res.status(404).json({ error: 'not found' })
    }
    return res.status(400).json({ error: 'invalid id' })
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.errors.name.message })
  }

  if (err.name === 'MongoServerError' && err.code === 11000) {
    return res.status(400).json({ error: err.message })
  }

  res.status(400).json({ error: err.message })

  next(err)
}

module.exports = { logger, unknownEndpoint, errorHandler }
