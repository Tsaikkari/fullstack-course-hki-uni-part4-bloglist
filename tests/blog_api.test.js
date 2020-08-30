const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})
  
  /*let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()*/

describe('when there are initially some blogs saved', () => {
  test('bloglist is returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .catch(error => next(error))
  })
  
  test('blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  
  test('identifier property of blogs is named id', async () => {
    const blogs = await helper.blogsInDb() 
    const ids = blogs.map(b => b.id)
    expect(ids).toBeDefined()
  })

  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
  
    const blogToView = blogsAtStart[0]
  
    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
  
    expect(resultBlog.body).toEqual(processedBlogToView)
  })
})

describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: "Canonical string reduction", 
      author: "Edsger W. Dijkstra", 
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
      likes: 12
    }
  
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const savedBlog = response.body
    const contents = { 
      title: savedBlog.title, 
      author: savedBlog.author, 
      url: savedBlog.url, 
      likes: savedBlog.likes
    }
    expect(newBlog).toEqual(contents)
  })

  test('blog without likes gets added with default value', async () => {
    const newBlog = {
      title: "The awesome Some",
      author: "Some Author", 
      url: "http://www.cs.some.html"
    }
  
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const savedBlog = response.body
    const result = {
      title: savedBlog.title, 
      author: savedBlog.author, 
      url: savedBlog.url, 
      likes: Blog.likes
    }
    expect(newBlog).toEqual(result)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('fails with status code 400 if data invalid', async () => {
    const newBlog = {
      author: "A. Writer",
      likes: 5
    }
  
    await api 
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()    
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is invalid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
  
    await api
      .delete(`/api/notes/${blogToDelete.id}`)
      .expect(204)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    
    const contents = blogsAtEnd.map((blog) => ({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes
    }))
  
    expect(contents).not.toContain(blogToDelete.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})





