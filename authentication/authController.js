const jwt = require("jsonwebtoken");
const User = require("./User");

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });



  const payload = { id: user._id, name: user.name };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

  res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};