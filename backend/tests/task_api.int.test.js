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

  test('tasks do not contain default fields _id and __v', async () => {
    const response = await api.get('/api/tasks/').expect(200)

    const task = 
  })

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
  it('can be done successfully with code 204', async () => {
    const tasksAtStart = await helper.tasksInDb()
    const taskToDelete = tasksAtStart[0]

    await api.delete(`/api/tasks/${taskToDelete.id}`).expect(204)

    const tasksAtEnd = await helper.tasksInDb()
    expect(tasksAtEnd.length).toBe(tasksAtStart.length - 1)

    const titles = tasksAtEnd.map((task) => task.title)
    expect(titles).not.toContain(taskToDelete.title)
  })
})

describe('adding a new task', () => {
  it('can be done succesfully', async () => {
    const newTask = {
      title: 'Write tests',
      description: 'make sure app functions as intended',
      completed: false,
      listId: '507f191e810c19729de860ea',
    }

    const tasksAtStart = await helper.tasksInDb()

    await api
      .post('/api/tasks')
      .set('Content-Type', 'application/json')
      .send(newTask)
      .expect(201)

    const tasksAtEnd = await helper.tasksInDb()
    expect(tasksAtEnd.length).toBe(tasksAtStart.length + 1)

    const titles = tasksAtEnd.map((task) => task.title)
    expect(titles).toContain(newTask.title)
  })

  test('without list id sets Inbox as default list', async () => {
    const newTask = {
      title: 'Write tests',
      description: 'make sure app functions as intended',
      completed: false,
    }

    const response = await api
      .post('/api/tasks')
      .set('Content-Type', 'application/json')
      .send(newTask)
      .expect(201)

    const inboxList = await List.findOne({ name: 'Inbox' })

    expect(response.body.list).toBeDefined()
    expect(response.body.list.id).toBe(inboxList.id)
    expect(response.body.list.name).toBe('Inbox')
  })

  test('without completed sets false as default value', async () => {
    const newTask = {
      title: 'Write tests',
      description: 'make sure app functions as intended',
      listId: '507f191e810c19729de860ea',
    }

    const response = await api
      .post('/api/tasks')
      .set('Content-Type', 'appication/json')
      .send(newTask)
      .expect(201)

    expect(response.body.completed).toBeDefined()
    expect(response.body.completed).toBe(false)
  })
})
