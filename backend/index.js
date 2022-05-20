const http = require('http')
const app = require('./app')
const { PORT } = require('./utils/config')
const { logger } = require('./utils/middleware')

const server = http.createServer(app)

server.listen(PORT, () => {
  logger.info(`server running on port ${PORT}`)
})
