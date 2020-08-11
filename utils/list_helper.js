const dummy = (blogs) => {
  return blogs.push(1)
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item
  }

  let likes = blogs.map(blog => blog.likes)
  console.log(likes)
  return blogs.length === 0
  ? 0
  : likes.reduce(reducer, 0)
}

module.exports = {
  dummy,
  totalLikes
}