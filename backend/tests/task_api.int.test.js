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

  test('tasks have a unique identifier id', async () => {})

  test('tasks do not contain default fields _id and __v', () => {})

  test('tasks contain name and id of the list they belong to', async () => {
    const tasksInDb = await helper.tasksInDb()
    const task = tasksInDb[0]

    const response = await api.get(`/api/tasks/${task._id.toString()}`)
    const list = await List.findOne({ tasks: task._id })

    expect(response.body.list.id).toBe(task.list.toString())
    expect(response.body.list.name).toBe(list.name)
  })
})

describe('viewing a specific task', () => {
  it('can be done using its id', async () => {
    const tasksInDb = await helper.tasksInDb()
    const task = tasksInDb[0]

    const response = await api
      .get(`/api/tasks/${task.id}`)
      .expect('Content-Type', /json/)
      .expect(200)

    expect(response.body.id).toBe(task._id.toString())
    expect(response.body.title).toBe(task.title)
  })

  it('throws http error code 400 if id is in invalid format', async () => {
    const response = await api.get('/api/tasks/invalidID').expect(400)

    expect(response.body.error).toBe('invalid id')
  })

  it('throws http error code 404 if task does not exist', async () => {
    const response = await api
      .get(`/api/tasks/${helper.nonExistentId()}`)
      .expect(404)

    expect(response.body.error).toBe('not found')
  })
})

describe('deletion of a task', () => {
  test.only('can be done successfully with code 204', async () => {
    const tasksAtStart = await helper.tasksInDb()
    const task = tasksAtStart[0]

    await api.delete(`/api/list/${task.id}`).expect(204)
  })
})
