const auth = (req, res, next) => {
    const key = req.headers['api-token'];
    console.log(key)
    if (key === "api-token-abcxyz") {
        next();
    } 
    else {
        return res.status(401).json({msg: "Unauthorized"})
    }
}

module.exports = auth