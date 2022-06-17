const mongoose = require('mongoose')

beforeEach(async () => {
  const collections = mongoose.connection.collections

  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany()
  }
})

beforeAll(async () => {
  mongoose.connect(process.env.MONGODB_URL, { dbName: 'test' })
})
