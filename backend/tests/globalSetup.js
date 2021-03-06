// eslint-disable-next-line import/no-extraneous-dependencies
const { MongoMemoryServer } = require('mongodb-memory-server')

const globalSetup = async () => {
  const mongod = await MongoMemoryServer.create()
  globalThis.__MONGOD = mongod

  const uri = mongod.getUri()
  process.env.MONGODB_URL = uri
}

module.exports = globalSetup
