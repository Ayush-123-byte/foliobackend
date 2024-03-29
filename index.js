const dotenv = require("dotenv");
const express = require("express");
const connectToMongoose = require("./db");
var cors = require("cors");
connectToMongoose();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/auth", require("./routes/contact"));
app.use("/api/auth", require("./routes/comment"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
