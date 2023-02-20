const mongoose = require("mongoose");

const userSchema= new mongoose.Schema({
    name: {type: String, default: true},
    email: {type: String, default: true},
    password: {type:String},
    token:{type: String},

})
module.exports = mongoose.model ("User",userSchema);