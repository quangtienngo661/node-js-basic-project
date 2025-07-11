const express = require("express");
const logger = require("./middlewares/logger.middleware");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(logger)

app.get('/', (req, res) => {
    res.end("Home page")
})

app.listen(5000, () => {
    console.log("Server is listening on port 5000....")
})