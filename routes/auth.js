const express = require("express");

const router = express.Router();

const {
  login,
  register,
  adminregister,
  getMe,
} = require("../controllers/userauth");
router.post("/admin/register", adminregister);
router.post("/register", register);

router.route("/login").post(login);
router.route("/me").get(getMe);

module.exports = router;
