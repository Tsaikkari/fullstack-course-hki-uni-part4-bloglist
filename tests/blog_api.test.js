/*const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('bloglist is returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})

test('the first blog is about React patterns', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].content).toBe('React patterns')
})

afterAll(() => {
  mongoose.connection.close()
})*/