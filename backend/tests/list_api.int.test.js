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
        await api
        .get('/api/lists')
        .expect('Content-Type', /json/)
        .expect(200)
      })

    test('200 - all lists are returned', async () => {
        const response = await api
            .get('/api/lists')
            .expect(200)

        expect(response.body.length).toBe(helper.initialLists.length)    

    })

    test('200 - specific list is returned', async () => {
        const response = await api.get('/api/lists').expect(200)
        const listNames = response.body.map(list => list.name)

        expect(listNames).toContain('Inbox')
    })

    test('200 - a list contains the number of not completed tasks', async () => {
        const response = await api
            .get('/api/lists')
            .expect(200)

        const inboxList = response.body.find(list => list.name === 'Inbox')
        const choresList = response.body.find(list => list.name ==='Chores')   
    
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

describe('creating a new list', () => {
    it('can be done successfully', () => {})
    it('fails if list name already exists', () => {
        // check for inbox?
    })
}) 

describe('searching a list with id', () => {
    it('can be done successfully', () => {})
    it('throws http error code 400 for invalid id', () => {})
    it('throws http error code 404 for non-existent id', () => {})
})



describe('updating a list', () => {
    it('can be done successfully', () => {})
    it('throws http error code 404 for non-existent id', () => {})
    it('throws http error code 400 for invalid id', () => {})
    it('the response does not contain list of tasks', () => {}
    )
})

describe('deleting a list with id', () => {
    it('can be done successfully', () => {})
    it('throws http error code 400 for invalid id', () => {})
})

})