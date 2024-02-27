const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const handleLogin = async (req, res) => {
  const cookies = req.cookies;

  const { username, password } = req.body;
console.log("username",username, "password",password)
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "نام کاربری و پسورد نمی تواند خالی باشد" });

  const foundUser = await User.findOne({where:{ username:username }});;
  console.log("foundUser.userId",foundUser.userId)

  if (!foundUser) {
    return res.sendStatus(401);
  }

  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) {
    return res.sendStatus(401);
  }

  const accessToken = jwt.sign(
    {
      userInfo: { username: foundUser.username, roles:foundUser.roles },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30s" }
  );

  const newRefreshToken = jwt.sign(
    {
      username: foundUser.username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  let newRefreshTokenArray = !cookies?.jwt
    ? foundUser.refreshToken
    : foundUser.refreshToken?.filter((rt) => rt !== cookies.jwt);

  if (cookies?.jwt) {
    const refreshToken = cookies.jwt;
    const foundToken = await User.findOne({where:{ refreshToken }});
    if (!foundToken) {
      newRefreshTokenArray = [];
    }

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  }
if(Array.isArray(newRefreshTokenArray)){

  foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
  await foundUser.save();
}
else{
  foundUser.refreshToken = [newRefreshToken];
  await foundUser.save();
}
  res.cookie("jwt", newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 1000 * 60 * 60 * 24,
  });

  res.json({ roles:foundUser.roles, accessToken });
res.json({ name:"name" });
};

module.exports = { handleLogin };