const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { validateRegister, validateLogin } = require("../utils/validators");

router.post("/register", validateRegister, userController.register);
router.post("/login", validateLogin, userController.login);
router.post("/refresh", userController.refreshToken);

module.exports = router;