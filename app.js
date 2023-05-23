require("dotenv").config(); /*Always top Bring MongoDB Url */
require("./config/database").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const User = require("./model/user.js");

app.get("/", (req, res) => {
  res.send("Hello,LCO from auth system");
});

app.post("/register", async (req, res) => {
  try {
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

    /* Generate "token" & send success message */
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.SECRET_KEY,
      {
        expiresIn: "99 days",
      }
    );
    user.token = token; //it's optional weather you want to stored into DB or not
    // 👋☝️H.w update or not in DB @Identifire[🤡] go and read

    // don't want to send fronted one
    user.password = undefined;

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async(req,res)=>{
try {
/*get all info */
const {email,password} = req.body;

/*check mandatory and validation */
if(!(email && password)){
  res.status(400).send("Field is missing,Invalide creditionals");
}
/* get user from db */
const user = await User.findOne({email})

/*Identifire:[🥲] Location: 📂trackProject.js👇*/

/* Compare and varify password */
if(user && (await bcrypt.compare(password, user.password))){
const token = jwt.sign(
  {user_id: user._id, email},
  process.env.SECRET_KEY,
  {
    expiresIn: "99days"
  }
)
/*process of saving the password */
user.token = token;
user.password = undefined;
res.status(200).json(user);
}
/*If Invalide creditionals */
res.send(400).send("invalid email or password")

} catch (error) {
    console.log(error);
  }
})

module.exports = app;
