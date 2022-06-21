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

describe('when some tasks are already created', () => {
  test('tasks are returned in JSON format', async () => {
    await api.get('/api/tasks').expect('Content-Type', /json/).expect(200)
  })

  test('all tasks are returned', async () => {
    const response = await api.get('/api/tasks').expect(200)
    expect(response.body.length).toBe(helper.initialTasks.length)
  })

  test('a particular task is returned', async () => {
    const response = await api.get('/api/tasks').expect(200)
    expect(response.body.map((task) => task.title)).toContain('Do Laundry')
  })
})

describe('an already existing task', () => {
  const task = new Task({
    title: 'Water Plants',
    description: 'check if the top layer is dry before watering',
    completed: false,
    _id: mongoose.Types.ObjectId('507f191e810c19729de860eb'),
    list: mongoose.Types.ObjectId('507f191e810c19729de861ea'),
  })

  beforeEach(async () => {
    await task.save()
  })
  test('can be searched using its id', async () => {
    const response = await api
      .get(`/api/tasks/${task._id.toString()}`)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(response.body.id).toBe(task._id.toString())
    expect(response.body.title).toBe(task.title)
  })

  test.only('contains information about the list it belongs to', async () => {
    const response = await api.get(`/api/tasks/${task._id.toString()}`)

    expect(response.body.list.id).toBe(task.list)
  })
})
