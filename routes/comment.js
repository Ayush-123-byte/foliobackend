const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Comment = require("../models/Comment");

router.post(
  "/addcomment",
  [
    body("comment", "comment must be atleast 5 characters").isLength({
      min:2 ,
    }),
    body("name", "comment must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    const { name,comment } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      const addComment = Comment({
        comment,name
      });
      const newComment = await addComment.save();
      success = true;
      res.json({ success, newComment });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Internal server error",
      });
    }
  }
);

router.get("/comments", async (req, res) => {
const comment = await  Comment.find().sort({ date:-1});
res.json({comment,success:true});

})
module.exports = router;
