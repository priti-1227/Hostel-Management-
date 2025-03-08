require("dotenv").config();
const mongoose = require("mongoose");

function connectDB() {
  //Database connnection
  mongoose.connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  });
  const connection = mongoose.connection; //call in variable beacause we have to perform some methods on it

  connection
    .once("open", () => {
      console.log("Database connected.");
    })
    .on("error", (err) => {
      console.log("Connection failed.");
    }); // work like event listerner if connected it call callback function
}
module.exports = connectDB;
