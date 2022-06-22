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
    expect(response.body.map((task) => task.title)).toContain('Water Plants')
  })
})

describe('an already existing task', () => {
  let task
  beforeEach(async () => {
    const tasksInDb = await helper.tasksInDb()
    task = tasksInDb[0]
  })

  test('can be searched using its id', async () => {
    const response = await api
      .get(`/api/tasks/${task.id}`)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(response.body.id).toBe(task._id.toString())
    expect(response.body.title).toBe(task.title)
  })

  test('contains information about the list it belongs to', async () => {
    const response = await api.get(`/api/tasks/${task._id.toString()}`)
    const listOfTask = await List.findOne({
      tasks: { $elemMatch: { $eq: task.list } },
    })

    expect(response.body.list.id).toBe(task.list.toString())
    expect(response.body.list.name).toBe(listOfTask.name)
  })
})
