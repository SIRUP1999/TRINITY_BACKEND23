const express = require('express')
const router = express.Router()
const FeesRecord = require('../Controllers/FeesController')

router
  .route('/')
  .get(FeesRecord.getAllFees)
  .post(FeesRecord.CreateFees)
  .delete(FeesRecord.deleteFeess)
router.route('/:id').patch(FeesRecord.UpdateFees)

module.exports = router
