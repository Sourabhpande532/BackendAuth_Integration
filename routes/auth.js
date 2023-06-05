const express = require("express");
const router = express.Router();

const { signup,login } = require("../controller/auth");
const { check 
} = require("express-validator");

router.post(
  "/signup",
  [
    check("firstname")
      .isLength({ min: 3 })
      .withMessage("name must be at least 5 chars long"),
    check("email", "Email is required").isEmail(),
    check("password")
      .isLength({ min: 3 })
      .withMessage("Password Must be at least +4 chars long")
      .matches(/\d/)
      .withMessage("password must contain a number")
      .not()
      .isIn(["123", "abc", "", "12345", "password", "god"])
      .withMessage("Do not use a common word as the password"),
  ],
  signup
);

router.post("/login",[
  check("email","Email is required").isEmail(),
  check("password")
    .isLength({ min: 3 })
    .withMessage("field is required ")
    .matches(/\d/)
    .withMessage("must contain a number")
], login);


module.exports = router;
