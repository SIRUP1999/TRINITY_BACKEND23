const express = require('express')
const router = express.Router()
const AuthController = require('../Controllers/AuthControllers')

router.route('/refresh').get(AuthController.refresh)

router.route('/login').post(AuthController.login)

router.route('/logout').post(AuthController.logout)

module.exports = router
