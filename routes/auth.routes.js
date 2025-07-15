const express = require('express')
const router = express.Router();
const {
    userRegister, userLogin, getUserProfile
} = require('../controllers/auth.controller')

router.post('/register', userRegister)
router.post('/login', userLogin)
router.get('/', getUserProfile)

module.exports = router