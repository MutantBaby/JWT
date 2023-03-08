const router = require("express").Router();

const handleEmployeesInfo = require("../controller/employeeController");
const verifyAuth = require("../middleware/verifyAuth");

router.get("/", verifyAuth, handleEmployeesInfo);

module.exports = router;
