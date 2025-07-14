const jwt = require('jsonwebtoken');
require('dotenv').config(); // Add this line

const tokenValidation = (req, res, next) => {
    const bearer = req.headers.authorization;
    
    if (!bearer || !bearer.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'Unauthorized' });
    }

    const token = bearer.split(' ')[1];
    // Note: string.split('position or character to split') will be an array including strings divided from the split character

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ msg: 'Invalid or expired token.' });
    }
}

module.exports = tokenValidation;