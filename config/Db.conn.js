const mongoose = require('mongoose')

const connectDB = async (URL) => {
  try {
    await mongoose.connect(URL)
  } catch (err) {
    console.log(err)
  }
}

module.exports = connectDB
