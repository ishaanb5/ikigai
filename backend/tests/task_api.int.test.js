const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const Task = require('../models/task')
const List = require('../models/list')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await List.create(helper.initialLists)
  await Task.create(helper.initialTasks)
})

afterAll(() => {
  mongoose.connection.close()
})

describe('when some tasks are already created', () => {
  test('tasks are returned in JSON format', async () => {
    const request = await api
      .get('/api/tasks')
      .expect('Content-Type', /json/)
      .expect(200)
  })
})
