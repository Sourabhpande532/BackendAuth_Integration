const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

// REGISTRATION
exports.signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }

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
    // user.password = undefined;

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
};

// LOGIN
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  try {
    /*get all info */
    const { email, password } = req.body;

    /*check mandatory and validation */
    if (!(email && password)) {
      res.status(400).send("Field is missing,Invalide creditionals");
    }
    /* get user from db */
    const user = await User.findOne({ email });

    /*Identifire:[🥲] Location: 📂trackProject.js👇*/

    /* Compare and varify password */
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.SECRET_KEY,
        {
          expiresIn: "99days",
        }
      );
      /*process of saving the password */
      user.token = token;
      user.password = undefined;

      /*res.status(200).json(user);↙️ //instead "json" pass into "cookie" */

      /*Send Token Via cookie */
      const options = {
        expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        user,
        message: "Successfully login",
      });

      /*🔝@IDENTIFIRE[😙(@ABOUT: "Setting Up Secure Cookies"
          -@HINT:"Send token into token") to="📂tp.js"]*/
    }
    /*If Invalide creditionals */
    res.sendStatus(400).send("invalid email or password");
  } catch (error) {
    console.log(error);
  }
};

//DASHBOARD
