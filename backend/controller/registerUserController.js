const path = require("path");
const bcrypt = require("bcrypt");
const fsPromises = require("fs/promises");

const usersDB = {
  users: require("../model/user.json"),
  setUsers: function (data) { this.users = data; }
}

const handleNewUser = async (req, res) => {
  console.log("\n\nEntering RegisterUserController");
  const { user, password } = req.body;

  if (!user || !password)
    return res.status(400).json({
      message: "User's name & password required -> RegisterUserController",
    }); // Bad Request

  const deplicate = usersDB.users.find((person) => person.username === user);

  if (deplicate)
    return res
      .status(409)
      .json({ message: "User exists -> RegisterUserController" }); // conflict

  try {
    const hashPassword = await bcrypt.hash(password, 15);

    const newUser = {
      username: user,
      password: hashPassword,
    };

    // appending data
    usersDB.setUsers([...usersDB.users, newUser]);

    // adding appended data into user.json file
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "user.json"),
      JSON.stringify(usersDB.users)
    );

    console.log("UserDB -> RegisterUserController => ", usersDB.users);
    res.status(201).json({
      success: `New user ${user} is created -> RegisterUserController`,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


module.exports = handleNewUser;