const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

/*blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})*/

/*blogsRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
})*/

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  if (!body.title || !body.url || !body.author) {
    return response.status(400).json({
      error: 'data missing'
    })
  } 
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })
  
  //try {
    const savedBlog = await blog.save()
    response.json(savedBlog)
  //} catch(exception) {
    //next(exception)
  //}
})

blogsRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})


module.exports = blogsRouter
