const usersDB = {
  users: require("../model/user.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

require("dotenv").config();
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  console.log("Im in refreshToken Controller");

  const cookies = req?.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);

  console.log("Cookies in Refresh Token Control ", cookies);

  const refreshToken = cookies.jwt;

  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );

  if (!foundUser)
    return res.status(403).json({ message: "User refresh token not matched" }); // Forbidden

    console.log("REFRESH_SECRET_TOKEN in refreshTokenCOntroller", process.env.REFRESH_SECRET_TOKEN);

  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_SECRET_TOKEN, (err, decoded) => {
    console.log("Entering in jwt.verify in refreshTokenController");
    if (err || foundUser?.username !== decoded?.username) {
      console.log(
        "Error in jwt.verify in refreshTokenController",
        err,
        "And",
        foundUser?.username,
        decoded?.username
      );
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
      "AccessToken recieved in jwt.verify in refreshTokenController",
      accessToken
    );

    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
