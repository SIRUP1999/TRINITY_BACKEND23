const express = require('express')
const router = express.Router()
const UsersController = require('../Controllers/UsersController')

router
  .route('/')
  .get(UsersController.findAllUsers)
  .post(UsersController.CreateUser)
  .patch(UsersController.UpdateUser)
  .delete(UsersController.deleteUser)

module.exports = router
