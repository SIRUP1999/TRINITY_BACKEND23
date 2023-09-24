const path = require('path')
const fs = require('fs')
const fspromises = require('fs').promises
const { v4: uuid } = require('uuid')
const { format } = require('date-fns')

const LogEvents = async (message, logFile) => {
  const dateTime = format(new Date(), 'dd\tMM\tyyyy\t HH:mm:ss')
  const logItem = `${dateTime} ${uuid()} ${message}\n `

  try {
    if (!fs.existsSync(path.join(__dirname, 'logs'))) {
      await fspromises.mkdir(path.join(__dirname, 'logs'))
    }
    await fspromises.appendFile(path.join(__dirname, 'logs', logFile), logItem)
  } catch (err) {
    console.log(err)
  }
}

const logger = (req, res, next) => {
  LogEvents(
    `${req.url}\t ${req.path}\t${req.headers.origin}\t${req.method}`,
    'reqlog.log'
  )
  console.log(`${req.method}\t${req.url}`)
  next()
}

module.exports = { LogEvents, logger }
