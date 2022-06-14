const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')
const config = require('../utils/config')

const globalSetup = async () => {
  const mongod = await MongoMemoryServer.create()
  const uri = mongod.getUri()

  globalThis.__MONGOD = mongod
  process.env.MONGO_URL = uri

  await mongoose.connection.db.dropDatabase()
  await mongoose.disconnect()
}

module.exports = globalSetup
