const usersDB = {
  users: require("../model/user.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

require("dotenv").config();
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  console.log("\n\nEntering RefreshTokenController");

  const cookies = req?.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);

  console.log("Cookies -> RefreshTokenController", cookies);

  const refreshToken = cookies.jwt;

  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );

  if (!foundUser)
    return res
      .status(403)
      .json({ message: "User not matched -> RefreshTokenController" }); // Forbidden

  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_SECRET_TOKEN, (err, decoded) => {
    console.log("-> jwt.verify -> RefreshTokenController");

    if (err || foundUser?.username !== decoded?.username) {
      console.log("Error -> jwt.verify -> RefreshTokenController", err);
      return res.sendStatus(403);
    }

    const roles = Object.values(foundUser.roles);

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: decoded.username,
          roles: roles,
        },
      },
      process.env.ACCESS_SECRET_TOKEN,
      { expiresIn: "10s" }
    );

    console.log(
      "AccessToken -> jwt.verify -> RefreshTokenController",
      accessToken
    );

    res.json({ accessToken, roles });
  });
};

module.exports = { handleRefreshToken };
