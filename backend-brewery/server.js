const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = require('./app')
dotenv.config({ path: "./config.env" })

mongoose.connect(process.env.CONN_STRING, {
  useNewUrlParser: true
})
  .then((conn) => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err.message);
  })

const port = process.env.PORT

app.listen(port, () => {
  console.log("Server Started..." + port);
})