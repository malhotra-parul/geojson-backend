const mongoose = require("mongoose");
require('dotenv').config();
// const config = require("config");
const mongoUri = process.env.mongoUri;
mongoose.connect(mongoUri, {useNewUrlParser: true , useUnifiedTopology: true }, (err) =>{
    if(err) throw err;
    console.log("DB connected!");
})
