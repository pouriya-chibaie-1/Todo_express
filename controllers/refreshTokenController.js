const RefreshToken = require("../models/RefreshToken"); // Import your RefreshToken model
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const handleRefreshToken = async (req, res) => {
  // const refreshToken = req.body.refreshToken;
  const refreshToken = req.cookies.jwt;
  if (!refreshToken) return res.sendStatus(401);

  try {
    const foundToken = await RefreshToken.findOne({ where: { refreshToken: refreshToken } });
    if (!foundToken) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        await foundToken.destroy(); // Destroy the token if it's invalid
        return res.sendStatus(403);
      }

      const foundUser = await User.findOne({ where: { username: decoded.username } });
      if (!foundUser) return res.sendStatus(403);

      const roles = foundUser.role;

      // Create a new access token
      const accessToken = jwt.sign(
        { userInfo: { username: decoded.username, roles } },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      // Generate a new refresh token
      const newRefreshToken = jwt.sign(
        { username: foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      // Delete the used refresh token from the database
      await foundToken.destroy();

      // Create a new refresh token entry in the database
      await RefreshToken.create({ refreshToken: newRefreshToken, userId: foundUser.userId });

      // Set the new refresh token in the cookie
      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 1000 * 60 * 60 * 24,
      });

      // Respond with roles and the new access token
      res.json({ roles, accessToken ,newRefreshToken});
    });
  } catch (error) {
    console.error("Error during token refresh:", error);
    res.sendStatus(500);
  }
};

module.exports = { handleRefreshToken };
