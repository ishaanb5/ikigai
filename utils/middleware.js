const logger = require('./logger')

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
  logger.error(err)
  if (err.name === 'CastError') {
    res.status(400).json({ error: 'invalid id' })
  } else {
    res.status(400).json({ error: err.message })
  }

  next()
}

module.exports = { logger, unknownEndpoint, errorHandler }
