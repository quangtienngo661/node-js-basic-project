const express = require("express");
const logger = require("./middlewares/logger.middleware");
const connectDB = require("./config/db");
const students = require('./routes/student.routes')

const app = express();
connectDB();

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(logger)
app.use('/api/students', students)

// app.get('/', (req, res) => {
//     res.end("Home page")
// })

app.listen(5000, () => {
    console.log("Server is listening on port 5000....")
})