const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { fullname, password, email } = req.body;

    if (fullname.length < 3) {
      return res.status(403).json({ error: "Fullname must be at least 3 letters or more;" });
    }

    if (!email.length) {
      return res.status(403).json({ error: "Enter Email" });
    }

    if (password.length < 6) {
      return res.status(403).json({ error: "Password must be at least 6 letters or more" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(500).json({ error: "Email already Exists" });
    }

    const user = new User({ fullname, password, email });
    await user.save();
    const token = jwt.sign({ id: user._id }, "noob");
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await user.comparePassword(req.body.password))) {
      return res.status(400).send({ error: "Invalid login credentials." });
    }
    const token = jwt.sign({ id: user._id.toString() }, "noob");
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { registerUser, loginUser };
