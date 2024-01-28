const mongoose = require("mongoose");

const uri="mongodb+srv://ayush132:TsH23wA1V1xbBBzE@cluster0.ivszlkf.mongodb.net/folio";
// Connect to the database
 const connectToMongoose=()=>{
    mongoose.connect(uri)
    console.log("connected to mongodb ");
 }
 
 module.exports= connectToMongoose;
 
 