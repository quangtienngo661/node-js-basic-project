const express = require("express");
const logger = require("./middlewares/logger.middleware");
const connectDB = require("./config/db");
const students = require('./routes/student.routes');
const auth = require('./routes/auth.routes')
const validation = require("./middlewares/auth.middleware");
const app = express();

connectDB();

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(logger)

// Auth apis
app.use('/auth', auth)
app.use('/profile', validation, auth)

// Student apis
app.use('/api/students', validation, students);

app.listen(5000, () => {
    console.log("Server is listening on port 5000....")
})