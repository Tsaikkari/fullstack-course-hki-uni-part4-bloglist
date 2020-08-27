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
  const authorLikes = []
  
  for (const [author, blogs] of Object.entries(authorGroup)) {
    let likes = 0
    const authorBlogs = blogs.map((b) => ({
      author: b.author,
      likes: likes += b.likes
    }))
    // last object in each author's array has the sum of the likes of the author's blogs
    authorLikes.push(authorBlogs.pop())
    console.log('authorLikes', authorLikes)
    const orderedList =  _.orderBy(authorLikes, ['likes'], ['asc'])
    let result = orderedList.pop()
    console.log('result', result)
    // return result
  }
}
  
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}