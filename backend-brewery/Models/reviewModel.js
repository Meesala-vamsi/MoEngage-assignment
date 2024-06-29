const mongoose = require("mongoose")



const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  description: {
    type: String
  },
  userName: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "User ID field is required"],
  }
})

const Reviews = mongoose.model("Reviews", reviewSchema)

module.exports = Reviews