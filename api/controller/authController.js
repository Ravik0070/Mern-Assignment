const User = require("../model/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../middleware/jwtMiddleware");

exports.Login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: falsex });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res
        .status(404)
        .json({ message: "Wrong password", success: false });
    }

    const token = await generateToken(user);

    const resUser = user.toObject();
    delete resUser.password;

    res.status(200).json({ user: resUser, token, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

exports.Register = async (req, res) => {
  try {
    const { username, email } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const resUser = user.toObject();
    delete resUser.password;
    res.status(200).json(resUser);
  } catch (error) {
    res.status(500).json(error);
  }
};
