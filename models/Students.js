const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    name: { type: String, require: true, minlength: 3 },
    age: { type: Number, require: true, min: 18 }, 
    major: { type: String }, 
    email: { type: String, require: true, unique: true }, 
    gpa: { type: Number, min: 0, max: 4 }
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);