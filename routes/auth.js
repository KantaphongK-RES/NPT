const express = require("express");
const {
  register,
  login,
  getHimselfNotes,
  logout,
} = require("../controllers/auth");
const router = express.Router();
const { permissionProtect } = require("../middleware/authpermission");

router.get("/me", permissionProtect, getHimselfNotes);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
