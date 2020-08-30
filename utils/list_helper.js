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

// TODO: should return the same result that console.log prints, 4.7*
const mostLikes = (blogs) => {
  const authorGroup = _.groupBy(blogs, 'author')
  const authorLikes = []
  
  for (const [author, blogs] of Object.entries(authorGroup)) {
    let likes = 0
    blogs.forEach((b) => 
      authorLikes.push({ author, likes: likes += b.likes })
    )
    
    console.log('authorLikes', authorLikes)
    const orderedList =  _.orderBy(authorLikes, ['likes'], ['asc'])
    /* get last item in the array */
    let x = orderedList.length - 1
    let result = orderedList[x]
    console.log('result', result)
    //return result
  }
}
  
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}