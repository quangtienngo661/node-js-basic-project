const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true}, 
    username: {type: String, required: true, unique: true}, 
    password: {type: String, require: true}, 
    createAt: {type: Date, default: Date.now}
}); 

module.exports = mongoose.model("User", userSchema);

