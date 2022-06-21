const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const Task = require('../models/task')
const List = require('../models/list')
const helper = require('./test_helper')

const api = supertest(app)

beforeAll(async () => {
  await List.create(helper.initialLists)
  const task = new Task(helper.initialTasks[0])
  await task.save()
})

describe('when some tasks are already created', () => {
  test('tasks are returned in JSON format', async () => {
    const request = await api
      .get('/api/tasks')
      .expect('Content-Type', /json/)
      .expect(200)
  })

  test('a particular task is returned', async () => {
    const request = await api.get('/api/tasks').expect(200)

    expect(request).toContain()
  })
})
