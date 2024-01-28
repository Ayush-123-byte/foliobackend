const express = require("express");
const connectToMongoose = require("./db");
var cors= require('cors')
connectToMongoose();
const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());
app.use("/api/auth", require("./routes/auth")); 
app.use("/api/auth", require("./routes/contact"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
