const express = require('express')
const router = express.Router()
const Reference = require('../Controllers/Reference')

router
  .route('/')
  .get(Reference.GetReference)
  .post(Reference.CreateReference)
  .delete(Reference.DeleteReferemnce)

module.exports = router
