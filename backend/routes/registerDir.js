const router = require("express").Router();

const handleNewUser = require("../controller/registerUserController");

router.post("/", handleNewUser)

module.exports = router;