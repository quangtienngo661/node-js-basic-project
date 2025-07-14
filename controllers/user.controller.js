const User = require('../models/User')
const bcrypt = require('bcryptjs')
const hashPassword = require('../utils/hash_password');
const returnedToken = require('../utils/jwt_sign')

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = { ...req.body };

        if (!username || !email || !password) {
            return res.status(400).json({ msg: "Missing required field(s)" })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(409).json({ msg: "Email already in use!" })
        }

        const hashedPassword = await hashPassword(password);

        const createdUser = await User.create({
            username, email, password: hashedPassword
        })

        return res.status(201).json({
            msg: "Successfully created user",
            newUser: {
                username: createdUser.username,
                email: createdUser.email
            }
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Error registering user",
            error
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ msg: "Missing required field(s)" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ msg: "User not found!" });
        }

        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ msg: "Password invalid" })
        }

        return res.status(200).json({ token: `${returnedToken(user._id)}` })
    } catch (error) {
        return res.status(500).json({
            msg: "Error user loging in",
            error: error.message
        })
    }
}

const getProfile = async (req, res) => {
    try {
        const { id } = req.user;
        const user = await User.findById(id).select('-password');
        // Note: Used .select('-password') to exclude sensitive data

        if (!user) {
            return res.status(404).json({ msg: "User not found" })
        }

        return res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Error fetching user profile",
            error: error.message
        });
    }
}

module.exports = { registerUser, loginUser, getProfile } 