const mongoose = require('mongoose')

const globalTeardown = async () => {
  await mongoose.disconnect()
  const mongod = globalThis.__MONGOD
  await mongod.stop()
}

module.exports = globalTeardown
