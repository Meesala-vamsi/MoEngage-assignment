const jwt = require('jsonwebtoken')
const User = require('../Models/userModel')
const { asyncErrorController } = require("../Utils/asyncErrorController")
const ErrorFeature = require('../Utils/globalErrorFeature')


const getToken = (id) => {
  return jwt.sign(id, "vamsi", {
    expiresIn: process.env.LOGIN_EXPIRES
  })
}



exports.contentPermission = asyncErrorController(async (req, res, next) => {
  const authHeader = req.headers.authorization
  let authToken
  if (authHeader !== undefined) {
    authToken = authHeader.split(" ")[1]
  }
  if (authToken === undefined) {
    const error = new ErrorFeature("You are not Logged In!", 404)
    return next(error)
  }
  jwt.verify(authToken, "vamsi", async (err, data) => {
    if (err) {
      const error = new ErrorFeature("Invalid JWT Token", 401)
      return next(error)
    } else {
      const user = await User.findById(data.id)
      req.user = user
      next()
    }
  })
})


exports.createUser = asyncErrorController(async (req, res, next) => {

  const user = await User.findOne({ email: req.body.email })
  if (user) {
    const error = new ErrorFeature("User Already Exists", 200)
    next(error)
  }
  const users = await User.create(req.body)
  const token = jwt.sign({ id: users._id }, "vamsi")


  res.cookie('jwtToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 30 * 24 * 60 * 60 * 1000
  });


  res.status(201).json({
    status: "success",
    token,
    data: {
      users
    },
    message: "User Created Successfully....."
  })
})

//POST METHOD

exports.loginUser = asyncErrorController(async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }).select('+password')
  if (!user || !(await user.comparePasswordsInDb(password, user.password))) {
    const error = new ErrorFeature("Invalid Password or email", 400)
    next(error)
  }
  const token = getToken({ id: user._id })


  res.cookie('jwtToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 30 * 24 * 60 * 60 * 1000
  });

  res.status(200).json({
    message: "User Logged In Successfully...",
    status: "success",
    token,
    data: {
      user
    }
  })
})


//GET METHOD

exports.getUser = asyncErrorController(async (req, res, next) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    const error = new ErrorFeature("User Not Found", 404)
    next(error)
  }

  res.status(200).json({
    status: "Success",
    data: {
      user
    },
    message: "Something Went Wrong...."
  })
})

