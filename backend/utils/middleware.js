const logger = require('./logger')

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
  logger.error(err)
  if (err.name === 'CastError') {
    const isTempTask = new RegExp(/created to have an id of a task that does not exist in db/)
    if(isTempTask.test(err.value))
    return res.status(404).json({ error: 'not found' })
    else {
      res.status(400).json({ error: 'invalid id' })
      
    }
  } else {
    res.status(400).json({ error: err.message })
  }

  next()
}

module.exports = { logger, unknownEndpoint, errorHandler }
