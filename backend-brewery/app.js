
const express = require('express')
const fs = require("fs")
const app = express();
const authRouter = require('./routers/authRouter')
const reviewRouter = require("./routers/reviewRouter")
const ErrorFeature = require('./Utils/globalErrorFeature')
const errorController = require('./Controllers/globalErrorController');
const globalErrorController = require('./Controllers/globalErrorController');
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use('/user', authRouter)
app.use("/review", reviewRouter)
app.all('*', function (req, res, next) {

  const err = new ErrorFeature(`Can't find ${req.originalUrl} on the server.`, 404)
  next(err)
})

app.use(globalErrorController)

module.exports = app