const { MongoMemoryServer } = require('mongo-memory-server')
const mongoose = require('mongoose')

const globalTeardown = async () => {
  await mongoose.disconnect()
  const mongod = globalThis.mongod.stop()
}

module.exports = globalTeardown
