const mongoose = require('mongoose')

beforeEach(async () => {
  const collections = mongoose.connection.collections

  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany()
  }
})

afterAll(() => {
  mongoose.connection.close()
})
