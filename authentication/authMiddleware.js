const jwt = require("jsonwebtoken");
const passport=require("passport");
// const authMiddleware = (req, res, next) => {
//     const token = req.headers.authorization;
//     //const token = req.header("Authorization")?.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "Access Denied, No Token Provided" });

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         res.status(400).json({ message: "Invalid Token" });
//     }
// };


const authMiddleware = passport.authenticate('jwt', { session: false });


module.exports = authMiddleware;