const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const JWT_SECRET = "portfoli_o$@";
const fetchuser = require("../middleware/fetchuser");

// creating a user with post request at /api/auth/createuser
router.post(
  "/createuser",
  [
    body("name", "somthing went wrong").notEmpty(),
    body("email", "email already exist").isEmail(),
    body("password", "password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    const { name, email } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      // checking whether a user exist or not
      let userAe = await User.findOne({
        email: req.body.email,
      });
      if (userAe) {
        return res
          .status(400)
          .json({ success, error: "sorry a user already exist" });
      }
      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, salt);
      const user = new User({
        name,
        email,
        password: secpass,
      });
      const newuser = await user.save();
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      res.status(500).json({
        error: "Internal server error",
      });
    }
  }
);

// creating a user with post request at /api/auth/createuser
router.post(
  "/login",
  [
    body("email", "Please Enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({
            success,
            error: "Please try to login with correct credentials",
          });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({
            success,
            error: "Please try to login with correct credentials",
          });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      res.status(500).json({
        error: "Internal server error",
      });
    }
  }
);
// getloggedin details using get  at /api/auth/getuser
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userID = req.user.id;
    const user = await User.findById(userID).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router;
