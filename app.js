require("dotenv").config(); /*Always top Bring MongoDB Url */
require("./config/database").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const app = express();
app.use(express.json());

const User = require("./model/user.js");

app.get("/", (req, res) => {
  res.send("Hello,LCO from auth system");
});

app.post("/register", async (req, res) => {
  /*get all info */
  const { firstname, lastname, email, password } = req.body;

  /*check mandatory and validation */
  if (!(firstname, lastname, email, password)) {
    res.status(400).send("All fields are required");
  }
  /* already registered */
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).send("User Already exit");
  }

  /* Take care of password*/
  const myEncPassword = await bcrypt.hash(password, 10);
  /* @Identifire:[🤖(-) Go and read to clear stuff]*/

  const user = await User.create({
    firstname,
    lastname,
    email: email.toLowerCase(),
    password: myEncPassword,
  });
});

module.exports = app;
