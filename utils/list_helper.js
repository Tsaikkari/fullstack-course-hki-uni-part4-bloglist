const _= require('lodash')

const reducer = (sum, item) => {
  return sum + item
}

const dummy = (blogs) => {
  return blogs.push(1)
}

const totalLikes = (blogs) => {
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
  const blogList = _(blogs).countBy('author')
  let max = Math.max(...blogList)
  const authors = _.groupBy(blogs, 'author')  
  for (const [author, arr] of Object.entries(authors)) {
    if (arr.length === max) {
    blogs.find(b => b === b.author === author)
      return { author, blogs: max } 
    }
  }
}

const mostLikes = (blogs) => {
  const likesGroup = _.groupBy(blogs, 'likes')
  const authorGroup = _.groupBy(blogs, 'author')
  console.log('likesGroup', likesGroup)
  for (const [author, authorArr] of Object.entries(authorGroup)) {
    const max = arr.find(a => a.totalLikes === Math.max.apply(null, arr))
    console.log(max) // undefined
    arr.find(a => a.author === author)
    return { author, likes: max }
    }
  }

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}