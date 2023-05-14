require("dotenv").config();
const express = require("express");
const app = express();
const User = require("./model/user.js");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello,LCO from auth system");
});

app.post("/register", (req, res) => {
  //get all info
  const { firstname, lastname, email, password } = req.body;

  // check mandatory and validation field & need to check essitionally weather the all information is coming or not.
  if (!(firstname, lastname, email, password)) {
    res.status(400).send("All fields are required")
  }
  // already registered 
  const existingUser = User.findOne({email})
  if(existingUser){
    res.status(400).send("User Already exit")
  }
  // Take care of password
  

});

module.exports = app;
