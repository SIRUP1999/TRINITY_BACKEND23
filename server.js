require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const http = require('http')

const server = http.createServer(app)
const PORT = process.env.PORT || 3500

require('express-async-errors')
// module.exports = server
// socketIo intigiration
const socketIO = require('socket.io')
const io = socketIO(server, { cors: [(origin = ['http://localhost:3000'])] })
// socketIo  Ends intigiration
//file upload

app.set('io', io)

io.on('connection', (socket) => {
  console.log(socket.id)

  socket.on('disconnect', () => {
    console.log('disconnect')
  })
})
const expressFileUpload = require('express-fileupload')
//cors
const cors = require('cors')
const connectDB = require('./config/Db.conn')
const cookieparser = require('cookie-parser')
const mongoose = require('mongoose')
const { logger, logEvents } = require('./Middleware/LogEvents')
const verifyJWT = require('./Middleware/VerifyJwt')
// const schedule = require('node-schedule')
//import from local files
const CorsOption = require('./config/CorsOption')
// const { error } = require('console')
app.use(cors(CorsOption))
//custom middleware
app.use(expressFileUpload())

app.use(logger)
//Built in middlewares
//database connection
// connectDB(process.env.DATABASE_CREDENTIALS)
//third party middlewares
app.use(cookieparser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'Public')))

//ROUTES
app.use('/', require('./routes/root'))
app.use('/auth', require('./routes/Auth'))
app.use(verifyJWT)
app.use('/term', require('./routes/HandleFeesAndTerm'))
app.use('/users', require('./routes/User'))
app.use('/Fees', require('./routes/Fees'))
app.use('/register', require('./routes/StudentRoute'))
app.use('/reference', require('./routes/Reference'))
app.use('/TerminalBill', require('./routes/TerminalBill'))
app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('txt')) {
    res.status(404).send('404 not found')
  } else if (req.accepts('json')) {
    res.status(404).send('404 not found')
  } else {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
  }
})

mongoose.connection.once('open', () => {
  try {
    console.log('connected to the db')
  } catch (err) {
    console.log(err)
  }
})
server.listen(PORT, () => console.log(`server is running on port ${PORT}`))

mongoose.connection.on('error', (err) => {
  // logEvents(
  //   `${err.code}\t${err.no}\t${err.syscall}${err.hostname}`,
  //   'errlog.log'
  // )
  console.log(err)
})
