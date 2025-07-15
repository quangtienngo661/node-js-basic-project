const hashPassword = require('../utils/hash_password');
const jwtGen = require('../utils/jwt_sign');
const bcrypt = require('bcryptjs')
const User = require('../models/User');

const userRegister = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        if (!email || !username || !password) {
            res.status(400).json({ msg: "Missing required fields" })
        }

        const existingUser = await User.exists({ email });
        if (existingUser) {
            res.status(409).json({ msg: "This user has existed" })
        }

        const hashedPassword = hashPassword(password)

        const newUser = await User.create({
            email,
            username,
            password: hashedPassword
        })

        return res.status(201).json({
            msg: "User created successfully!",
            newUser: {
                id: newUser._id,
                email: newUser.email,
                username: newUser.username,
                createAt: newUser.createAt
            }
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Error creating user",
            error: error.message
        })
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ msg: "Missing required fields" })
        }
        
        const user = await User.findOne({ email });
        const isValidPassword = bcrypt.compareSync(password, user.password);

        if (!user || !isValidPassword) {
            return res.status(400).json({ msg: "Invalid email or password" });
        }

        const token = jwtGen(user._id);
        if (!token) {
            return res.status(400).json({ msg: "Error getting login token" });
        }

        return res.status(200).json({ token })
    } catch (error) {
        return res.status(500).json({
            msg: "Error user login",
            error: error.message
        })
    }

}

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ msg: "User not found!" });
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({
            msg: "Error getting user",
            error: error.message
        })
    }
}

module.exports = { userRegister, userLogin, getUserProfile }