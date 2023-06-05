require("dotenv").config(); /*Always top Bring MongoDB Url */
require("./config/database").connect();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cookieParser());

// NEW_BEING_INTRODUCED
const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

// INVITE_AUTH_MIDDLEWARE
const auth = require("./middleware/auth");

// PREVIOUSELY HERE SINUP & LOGIN PRESENT NOW IT WENT TO CONTR & ROUTES WITH SOME FOLDER & FILES & PACKAGE AS WELL 


app.get("/", (req, res) => {
  res.send("Hello,LCO from auth system");
});

app.get("/dashboard", auth, (req, res) => {
  res.send("Welcome to Secret information");
});

module.exports = app;
