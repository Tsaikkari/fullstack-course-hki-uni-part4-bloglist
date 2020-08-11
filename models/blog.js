const mongoose = require('mongoose')
const config = require('../utils/config')
const logger = require('../utils/logger')

//logger.info('connecting to', config.MONGODB_URI)

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

module.exports = mongoose.model('Blog', blogSchema)