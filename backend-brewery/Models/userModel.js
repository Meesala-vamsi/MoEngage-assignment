const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name Field is REquired"]
  },
  email: {
    type: String,
    required: [true, "Email Field is Required"],
    validate: [
      validator.isEmail,
      "Enter a Valid Email"
    ],
    unique: true
  },
  password: {
    type: String,
    select: false
  }
}, { timestamps: true, minimize: false })

usersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
  const hashedPassword = await bcrypt.hash(this.password, 10)
  this.password = hashedPassword
})

usersSchema.methods.comparePasswordsInDb = async function (password) {
  const checkPassword = await bcrypt.compare(password, this.password)
  return checkPassword
}

const User = mongoose.model("User", usersSchema)

module.exports = User