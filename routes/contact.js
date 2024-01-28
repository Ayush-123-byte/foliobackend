const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const Contact = require("../models/Contact");

router.post(
  "/createcontact",
  [
    body("name", "somthing went wrong").notEmpty(),
    body("email", "Invalid email id").isEmail(),
    body("message", "message must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  fetchuser,
  async (req, res) => {
    let success = false;
    const { name, email, message } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      const contact = Contact({
        name,
        email,
        message,
      });
      const newcontact = await contact.save();
      success = true;
      res.json({ success, newcontact });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Internal server error",
      });
    }
  }
);

module.exports = router;
