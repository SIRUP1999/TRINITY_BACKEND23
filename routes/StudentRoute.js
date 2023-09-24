const express = require('express')
const router = express.Router()
const RegisterController = require('../Controllers/RegisterControllers')
router
  .route('/')
  .get(RegisterController.getAllStudents)
  .post(RegisterController.createNewStudent)
  .delete(RegisterController.deleteStudent)
  .patch(RegisterController.UpdateStudent)

module.exports = router
