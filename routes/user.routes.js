const express = require("express"); 
const router = express.Router();

const { registerUser, loginUser, getProfile } = require("../controllers/user.controller")

// User register 
router.post('/register', registerUser);

// User login 
router.post('/login', loginUser);

// Get profile
router.get('/', getProfile);

module.exports = router;