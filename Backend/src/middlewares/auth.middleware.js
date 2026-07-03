const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")



async function authUser(req, res, next) {

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "Token not provided."
        })
    }

    const isTokenBlacklisted = await tokenBlacklistModel.findOne({
        token
    })

    if (isTokenBlacklisted) {
        return res.status(401).json({
            message: "token is invalid"
        })
    }

    // try {
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET)

    //     req.user = decoded

    //     next()

    // } catch (err) {

    //     return res.status(401).json({
    //         message: "Invalid token."
    //     })
    // }


    try {
    console.log("Received Token:", token);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded:", decoded);

    req.user = decoded;

    next();

} catch (err) {
    console.error("JWT Error:", err);

    return res.status(401).json({
        message: "Invalid token."
    });
}

}


module.exports = { authUser }