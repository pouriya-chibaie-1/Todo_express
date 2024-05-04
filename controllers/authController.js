const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/RefreshToken");

const handleLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "Username and password are required." });

  try {
    const foundUser = await User.findOne({ where: { username: username } });

    if (!foundUser) {
      return res.sendStatus(401);
    }

    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      return res.sendStatus(401);
    }
const {role,user_id} = foundUser
    const accessToken = jwt.sign(
      { userInfo: { username:foundUser.username, role,user_id } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const newRefreshToken = jwt.sign(
      { username:foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    await RefreshToken.create({ refreshToken: newRefreshToken, user_id });
    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.json({ roles: foundUser.role, accessToken });
  } catch (error) {
    console.error("Error during login:", error);
    res.sendStatus(500);
  }
};

module.exports = { handleLogin };
