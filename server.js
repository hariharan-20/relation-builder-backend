const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// MongoAtlas321

const url = 'mongodb+srv://hari_haran:MongoAtlas321@cluster0.vaedp.mongodb.net/relationTable?retryWrites=true&w=majority'

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(
    () => {
      console.log("Connected to database")
  }
).catch(error => {
  console.log("Error connecting to database")
  console.log(error)
})

app.use(cors({
  credentials: true,
  origin: 'https://relation-builder-frontend.herokuapp.com'
}))
app.use('', require("./routes/apiRoutes"))



const port=process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Running on port ${port}`);
  });