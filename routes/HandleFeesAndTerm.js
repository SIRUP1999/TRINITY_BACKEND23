const express = require('express')
const router = express.Router()
const HandleTermAndFees = require('../Controllers/HandleFeesAndTerm')

router
  .route('/')
  .get(HandleTermAndFees.getFeesAndTerm)
  .post(HandleTermAndFees.CreateFeesAndTerm)

module.exports = router
