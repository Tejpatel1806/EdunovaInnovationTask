const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/userController");
router.route("/registerUser").post(registerUser);
module.exports = router;
