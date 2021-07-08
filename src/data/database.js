const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const connect = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
.then(console.log('Database connected!'))
.catch(error => console.error('Could not connect', error))}

module.exports = { connect }