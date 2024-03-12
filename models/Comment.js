const mongoose = require("mongoose");
const { Schema } = mongoose;
const ComentSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("comment", ComentSchema);
