const jwt = require("jsonwebtoken");
const User = require("./User");
const sendResponse = require("../utils/responseHandler");
const httpstatus = require("../utils/httpStatus")
const bcrypt = require("bcryptjs");
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const newUser = new User({ name, email, password });
        await newUser.save();
        sendResponse(res, httpstatus.Success.CREATED, "Employee created successfully", { user: newUser })

    } catch (error) {
        sendResponse(res, httpstatus.ServerError.INTERNAL_SERVER_ERROR, "Failed to create employee", {}, { message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return sendResponse(res, httpstatus.ClientError.UNAUTHORIZED, "Invalid credentials", { user })
        // res.status(401).json({ message: "Invalid credentials" });
        // ✅ Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return sendResponse(res, httpstatus.ClientError.UNAUTHORIZED, "Invalid credentials", { user: null });
        }
        const payload = { id: user._id, name: user.name, password: user.password };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
        sendResponse(res, httpstatus.Success.OK, "Succesfully Login", { token })

    } catch (error) {
        sendResponse(res, http.ServerError.INTERNAL_SERVER_ERROR, "Failed to Login", { error: error.message })

    }
};