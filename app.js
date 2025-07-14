const express = require('express');
const app = express();
const connectDB = require('./config/db')
const router = require('./routes/user.routes');
const tokenValidation = require('./middlewares/auth.middleware');

connectDB();
// In your main app file (app.js or server.js)
app.use(express.json()); // For parsing JSON bodies
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded bodies
app.use('/auth', router)
// app.use('/profile', router)
app.use('/profile', tokenValidation, router)

app.listen(5000, () => {
    console.log("Server is listening on port 5000....")
})