require('dotenv').config()
const mongoose = require('mongoose')

const connect = () => {mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then(console.log('Database connected!'))
.catch(err => console.log('Could not connect',err))}

module.exports = { connect }