const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fsPromises = require("fs/promises");

const usersDB = {
  users: require("../model/user.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleUserLogin = async (req, res) => {
  const { user, password } = req.body;

  if (!user || !password)
    return res
      .status(400)
      .json({ message: "User's name & password is required" }); // Bad Request

  const foundUser = usersDB.users.find((person) => person.username === user);

  if (!foundUser) return res.status(401).json({ message: "User not exist" }); // unauthorized

  const matchPassword = await bcrypt.compare(password, foundUser.password);

  if (!matchPassword)
    return res
      .status(422)
      .json({ message: "Wrong password" }); // Unprocessable entity.

  else {
    // roles for authorization
    const roles = Object.values(foundUser.roles).filter(Boolean); // add boolean to eliminate null values

    // access Token will be send in json form
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_SECRET_TOKEN,
      { expiresIn: "10s" }
    );

    // refresh Token will be send to cookies
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_SECRET_TOKEN,
      { expiresIn: "1d" }
    );

    // printing Token values
    console.log("Access Token in AuthenticateUserController ", accessToken);
    console.log("Refresh Token in AuthenticateUserController ", refreshToken);

    const otherUsers = usersDB.users.filter(
      (person) => person.username !== foundUser.username
    );

    const updatedUser = { ...foundUser, refreshToken };

    usersDB.setUsers([...otherUsers, updatedUser]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "user.json"),
      JSON.stringify(usersDB.users)
    );

    console.log("\n\nUsers in Auth Controller ", usersDB.users)

    res.cookie("jwt", refreshToken, {
      secure: true,
      httpOnly: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ accessToken, roles });
  }
};

module.exports = handleUserLogin;
