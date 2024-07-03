const express = require("express");
const { register, login } = require("../controllers/auth");
const router = express.Router();
const { permissionProtect } = require("../middleware/authpermission");

router.post("/register", register);
router.post("/login", login);

module.exports = router;
