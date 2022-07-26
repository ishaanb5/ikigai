const mongoose = require('mongoose')

beforeEach(async () => {
  const { collections } = mongoose.connection

  Object.keys(collections).forEach(async (key) => {
    const collection = collections[key]
    await collection.deleteMany()
  })
})

beforeAll(async () => {
  mongoose.connect(process.env.MONGODB_URL, { dbName: 'test' })
})
