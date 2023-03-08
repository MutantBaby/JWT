const router = require("express").Router();

const handleUserLogin = require("../controller/authenticateUserController");

router.post("/", handleUserLogin);

module.exports = router;