const express = require('express')
const router = express.Router()
const TerminalBill = require('../Controllers/TerminalBill')
router
  .route('/')
  .get(TerminalBill.GetTerminalBill)
  .post(TerminalBill.CreateTerminalBill)

module.exports = router
