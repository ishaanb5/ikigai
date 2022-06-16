const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')

const api = supertest(app)

beforeAll(() => {})

test('tasks are returned in JSON format', async () => {
  const request = await api
    .get('/api/tasks')
    .expect('Content-Type', /json/)
    .expect(200)

  console.log(request)
})
