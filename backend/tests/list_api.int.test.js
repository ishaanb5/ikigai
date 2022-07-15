const supertest = require('supertest')
const app = require('../app')
const List = require('../models/list')
const Task = require('../models/task')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await List.insertMany(helper.initialLists)
  await Task.insertMany(helper.initialTasks)
})

describe('when already saved lists exist', () => {
  test('200 - lists are returned in JSON format', async () => {
    await api.get('/api/lists').expect('Content-Type', /json/).expect(200)
  })

  test('200 - all lists are returned', async () => {
    const response = await api.get('/api/lists').expect(200)

    expect(response.body.length).toBe(helper.initialLists.length)
  })

  test('200 - specific list is returned', async () => {
    const response = await api.get('/api/lists').expect(200)
    const listNames = response.body.map((list) => list.name)

    expect(listNames).toContain('Inbox')
  })

  test('200 - a list contains the number of not completed tasks', async () => {
    const response = await api.get('/api/lists').expect(200)

    const inboxList = response.body.find((list) => list.name === 'Inbox')
    const choresList = response.body.find((list) => list.name === 'Chores')

    expect(inboxList.totalTasks).toBe(3)
    expect(inboxList.remainingTasks).toBe(2)
    expect(choresList.totalTasks).toBe(1)
    expect(choresList.remainingTasks).toBe(1)
  })
  test('200 - does not contain list of belonging tasks', async () => {
    const response = await api.get('/api/lists')
    const list = response.body[0]

    expect(list.tasks).toBeUndefined()
  })
})

describe('creating a new list', () => {
  it('201 - can be done successfully', async () => {
    const listsAtStart = await helper.listsInDb()
    const listToBeAdded = { name: 'shopping list' }

    await api
      .post('/api/lists')
      .set('content-type', 'application/json')
      .send(listToBeAdded)
      .expect(201)

    const lists = await helper.listsInDb()
    const listNames = lists.map((list) => list.name)
    const listsAtEnd = await helper.listsInDb()

    expect(listsAtEnd).toHaveLength(listsAtStart.length + 1)
    expect(listNames).toContain(listToBeAdded.name)
  })

  it('201 - is editable by default', async () => {
    const listToBeAdded = { name: 'shopping list' }

    const response = await api
      .post('/api/lists')
      .set('content-type', 'application/json')
      .send(listToBeAdded)
      .expect(201)

    expect(response.body.editable).toBe(true)
  })

  it('400 - fails if list name already exists', async () => {
    const list = { name: 'Inbox' }

    const response = await api
      .post('/api/lists')
      .set('content-type', 'application/json')
      .send(list)
      .expect(400)

    expect(response.body.error).toBe('list name should be unique')
  })

  it('400 - fails if no listname is provided', async () => {
    const listWithoutName = { name: '' }

    const response = await api
      .post('/api/lists')
      .set('content-type', 'application/json')
      .send(listWithoutName)
      .expect(400)

    expect(response.body.error).toBe('name is required')
  })
})

describe('searching a list with id', () => {
  it('200 - can be done successfully', async () => {
    const listsInDb = await helper.listsInDb()
    const listToBeSearched = listsInDb[0]

    const response = await api
      .get(`/api/lists/${listToBeSearched.id}`)
      .expect(200)

    expect(response.body.name).toBe(listToBeSearched.name)
  })

  it('contains all tasks belonging to the list', async () => {
    const listsInDb = await helper.listsInDb()
    const listToBeSearched = listsInDb[0]

    const response = await api.get(`/api/lists/${listToBeSearched.id}`)

    const tasksIdsInResponse = response.body.tasks.map((task) => task.id)

    //converted objectIds of tasks to strings
    const processedListToBeSearched = JSON.parse(
      JSON.stringify(listToBeSearched),
    )

    expect(tasksIdsInResponse).toEqual(processedListToBeSearched.tasks)
  })
  it('400 - fails for invalid id', async () => {
    const response = await api.get('/api/lists/invalidId').expect(400)

    expect(response.body.error).toBe('invalid id')
  })

  it('404 - fails non-existent id', async () => {
    const response = await api
      .get(`/api/lists/${helper.nonExistentId}`)
      .expect(404)

    expect(response.body.error).toBe('not found')
  })
})

describe('updating a list', () => {
  it('201 - can be done successfully', async () => {
    const listsAtStart = await helper.listsInDb()
    const listToBeUpdated = await List.findOne({ editable: true })

    await api
      .put(`/api/lists/${listToBeUpdated.id}`)
      .set('content-type', 'application/json')
      .send({
        name: 'updated list name',
      })
      .expect(201)

    const listsAtEnd = await helper.listsInDb()
    const listNames = listsAtEnd.map((list) => list.name)

    expect(listsAtEnd).toHaveLength(listsAtStart.length)
    expect(listNames).toContain('updated list name')
  })

  test('201 - name of the list cannot be updated if editable property is false', async () => {
    const listToBeUpdated = await List.findOne({ editable: false })

    const response = await api
      .put(`/api/lists/${listToBeUpdated.id}`)
      .set('content-type', 'application/json')
      .send({ name: 'cannot be changed' })
      .expect(201)

    const listsInDb = await helper.listsInDb()
    const listNames = listsInDb.map((list) => list.name)

    expect(listNames).not.toContain('cannot be changed')
  })

  it('404 - fails for non-existent id', async () => {
    const response = await api
      .put(`/api/lists/${helper.nonExistentId()}`)
      .expect(404)

    expect(response.body.error).toBe('not found')
  })

  it('400 - fails for invalid id', async () => {
    const response = await api.put('/api/lists/invalidId').expect(400)

    expect(response.body.error).toContain('invalid id')
  })

  it('201 - the response does not contain list of tasks', async () => {
    const listsInDb = await helper.listsInDb()
    const listToBeUpdated = listsInDb[0]

    const response = await api
      .put(`/api/lists/${listToBeUpdated.id}`)
      .set('content-type', 'application/json')
      .send({ name: 'updated name' })
      .expect(201)

    expect(response.body.tasks).toBeUndefined()
  })

  it('201 - fails if the list name already exists', async () => {
    const listsInDb = await helper.listsInDb()
    const listToBeUpdated = listsInDb[0]

    const response = await api
      .put(`/api/lists/${listToBeUpdated.id}`)
      .set('content-type', 'application/json')
      .send({ name: 'Chores' })
      .expect(400)

    expect(response.body.error).toBe('list name already exists')
  })
})

describe('deleting a list with id', () => {
  it('can be done successfully', async () => {
    const listsAtStart = await helper.listsInDb()
    const listToBeDeleted = listsAtStart[0]

    const response = await api
      .delete(`/api/lists/${listToBeDeleted.id}`)
      .expect(204)

    const listsAtEnd = await helper.listsInDb()
    const listNames = listsAtEnd.map((list) => list.name)

    expect(listsAtEnd).toHaveLength(listsAtStart.length - 1)
    expect(listNames).not.toContain(listsAtStart.name)
  })

  it('400 - fails for invalid id', async () => {
    const response = await api.delete('/api/lists/invalidId').expect(400)

    expect(response.body.error).toBe('invalid id')
  })

  it('404 -  fails for non-existent lists', async () => {
    const response = await api
      .delete(`/api/lists/${helper.nonExistentId()}`)
      .expect(404)

    expect(response.body.error).toBe('list not found')
  })

  it('405 -  fails for lists that are not editable', async () => {
    const listToBeDeleted = await List.findOne({ editable: false })

    const response = await api
      .delete(`/api/lists/${listToBeDeleted._id.toString()}`)
      .expect(405)

    expect(response.body.error).toBe('delete not allowed')
  })

  it('deletes all tasks that present in that list', async () => {
    const listsAtStart = await helper.listsInDb()
    const listToBeDeleted = listsAtStart[1]
    const tasksInList = listToBeDeleted.tasks

    await api.delete(`/api/lists/${listToBeDeleted.id}`).expect(204)

    const tasksAtEnd = await helper.tasksInDb()
    expect(tasksAtEnd).toEqual(expect.not.arrayContaining(tasksInList))
  })
})
