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
  console.log(allLikes)
  let max = blogs.find(blog => blog.likes === Math.max(...allLikes))
  console.log(max)
  return max
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}