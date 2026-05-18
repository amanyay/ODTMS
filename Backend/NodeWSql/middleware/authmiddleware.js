const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        // no token
        if (!authHeader) {

            return res.status(401).json({
                message: "No token provided"
            });

        }

        // Bearer TOKEN
        const token =
            authHeader.split(" ")[1];

        // verify token
        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );

        req.user = decoded;

        next();

    } catch (err) {

        return res.status(401).json({
            message: "Invalid token"
        });

    }

};