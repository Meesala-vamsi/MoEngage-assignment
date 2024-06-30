const Reviews = require("../Models/reviewModel")
const { asyncErrorController } = require("../Utils/asyncErrorController")


exports.createReview = asyncErrorController(async (req, res, next) => {
  const post = await Reviews.create({
    rating: req.body.rating,
    description: req.body.description,
    userName: req.user.name,
    userId: req.user._id
  })

  res.status(201).json({
    status: "Success",
    count: post.length,
    message: "Review added to database Successfully"
  })
})

exports.getAllReviews = asyncErrorController(async (req, res, next) => {
  const reviews = await Reviews.find()
  res.status(200).json({
    status: "Success",
    count: reviews.length,
    data: {
      reviews
    }
  })
})