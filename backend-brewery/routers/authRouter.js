const express = require('express')
const UserController = require('../Controllers/authController')

let router = express.Router()
router.route('/signup')
  .post(UserController.createUser)

router.route('/login')
  .post(UserController.loginUser)
router.route("/profile")
  .get(UserController.contentPermission, UserController.getUser)




module.exports = router