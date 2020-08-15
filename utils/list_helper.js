const _= require('lodash')
const { filter } = require('lodash')

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
  const blogList = _(blogs).countBy('author')
  let max = Math.max(...blogList)
  const authors = _.groupBy(blogs, 'author')  
  for (const [author, arr] of Object.entries(authors)) {
    if (arr.length === max) {
    blogs.find(b => b === b.author === author)
      return { author: author, blogs: max } 
    }
  }
}

const mostLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item
  }

  const authorList = blogs.map((blog) => ({
    author: blog.author,
    likes: blog.likes
  }))

  const authors = authorList.map(a => a.author)
  let uniqAuthors = authors.reduce((a, b) => {
    if (a.indexOf(b) < 0) a.push(b)
    return a
  }, [])

  // TODO: Fix this
  let specificsAuthors = uniqAuthors.forEach(e => {
    authorList.includes(e) 
    && authorList.filter(a => a.author === uniqAuthor[e])
  })

  let likes = specificsAuthors.map(a => a.likes)
  return likes.reduce(reducer, 0)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  //mostLikes
}