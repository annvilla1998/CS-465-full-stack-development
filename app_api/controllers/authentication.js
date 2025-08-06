require('../config/passport');
const passport = require("passport");
const User = require("../database/models").User;

const register = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: "All fields required" });
  }
  
  try {
    const user = await User.build({
      name: req.body.name,
      email: req.body.email,
    });

    user.setPassword(req.body.password);

    await user.save();

    const token = user.generateJwt();
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({ message: "Registration failed", error: err.message });
  }
};
const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "All fields required" });
  }
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(404).json(err);
    }

    if (user) {
      const token = user.generateJwt();
      res.status(200).json({ token });
    } else {
      res.status(401).json(info);
    }
  })(req, res);
};

module.exports = {
  register,
  login,
};
