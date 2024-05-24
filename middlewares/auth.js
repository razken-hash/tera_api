const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("token");
        if (!token) {
            return res.status(401).json({
                "message": "No Token, Access Denied",
            }) //! 401 = Not Authorized
        }
        const verified = jwt.verify(token, "passwordKey")
        if (!verified) {
            return res.status(401).json({
                "message": "Invalid Token, Access Denied",
            }) //! 401 = Not Authorized
        }
        req.user = verified.id;
        req.token = token;
        next();
    } catch (e) {
        res.status(500).json({
            "message": e.message
        }); //! 500: Internal Server Error
    }
}

module.exports = authMiddleware;