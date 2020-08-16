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
  const authorGroup = _.groupBy(blogs, 'author')
  for (const [author, arr] of Object.entries(authorGroup)) {
    // TODO: fix this
    const max = Math.max(...arr.map(a => a.likes).reduce(reducer, 0))
    console.log('max', max)
    const authorList = blogs.map(() => ({
      author: author,
      likes: max
    }))
    console.log('authorList', authorList) 
  }
    /*let max = Object.keys(likesGroup).reduce((a, b) => likesGroup[a] > likesGroup[b] ? a : b);
    console.log('max', max)*/
}
  
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}