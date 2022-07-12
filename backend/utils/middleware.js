const logger = require('./logger')

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
  logger.error(err)

  if (err.name === 'CastError') {
    const taskDoesNotExist = new RegExp(
      /created to have an id of a task that does not exist in db/,
    )
    if (taskDoesNotExist.test(err.value))
      return res.status(404).json({ error: 'not found' })
    else {
      return res.status(400).json({ error: 'invalid id' })
    }
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.errors.name.message })
  }

  if (err.name === 'MongoServerError' && err.code === 11000) {
    return res.status(400).json({ error: err.message })
  }

  return res.status(400).json({ error: err.message })

  next()
}

module.exports = { logger, unknownEndpoint, errorHandler }
