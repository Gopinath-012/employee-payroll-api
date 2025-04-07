const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const mongoose = require("mongoose");
const User = require("../authentication/User"); // Use Employee model here
require("dotenv").config();

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

module.exports = (passport) => {
    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
            try {
                console.log("JWT Payload:", jwt_payload);
                const employee = await User.findById(jwt_payload.id).select("-password");
                if (employee) return done(null, employee);
                return done(null, false);
            } catch (err) {
                return done(err, false);
            }
        })
    );
};