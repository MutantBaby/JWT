const usersDB = {
  users: require("../model/user.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
  console.log("\n\nEntering LogoutController");
  // On client, also delete the access token
  const cookies = req.cookies;

  if (!cookies?.jwt)
    return res.status(204).json({ message: "No Cookies -> LogoutController" }); // no content

  console.log("Cookies -> LogoutController", cookies);

  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });

    return res
      .status(204)
      .json({ message: "No User, No Cookies -> LogoutController" }); // no content
  }

  // Delete User
  const otherUsers = usersDB.users.filter(
    (person) => person.refreshToken !== foundUser.refreshToken
  );

  console.log("Other Users -> LogoutController", otherUsers);

  const currentUser = { ...foundUser, refreshToken: "" };

  console.log("CurrentUser -> LogoutController", currentUser);

  usersDB.setUsers([...otherUsers, currentUser]);

  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(usersDB.users)
  );

  console.log(`User cookie deleted -> LogoutController`, usersDB.users);

  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true }); // use secure: true -> only serve on https

  res.sendStatus(204);
};

module.exports = { handleLogout };
