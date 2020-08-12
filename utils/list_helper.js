const _= require('lodash')

const dummy = (blogs) => {
  return blogs.push(1)
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item
  }

  let likes = blogs.map(blog => blog.likes)
  return blogs.length === 0
  ? 0
  : likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  let allLikes = blogs.map(blog => blog.likes)
  let max = blogs.find(blog => blog.likes === Math.max(...allLikes))
  return max
}

const mostBlogs = (blogs) => {
  let counts = _(blogs).countBy('author')
  let max = Math.max(...counts)
  console.log(max)
  // TODO: fix this
  const authors = blogs.map(blog => blog.author)
  const author = authors.find(a => (a * max === true))

  return {
    author: author,
    blogs: max
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}