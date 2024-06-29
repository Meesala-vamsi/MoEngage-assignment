const express = require("express")
const reviewController = require("../Controllers/reviewsController")
const UserController = require('../Controllers/authController')

const reviewRouter = express.Router()

reviewRouter.route("/")
  .post(UserController.contentPermission, reviewController.createReview)

reviewRouter.route("/:id")
  .get(UserController.contentPermission, reviewController.getAllReviews)



module.exports = reviewRouter