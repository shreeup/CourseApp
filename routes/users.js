const express = require("express");

const router = express.Router();
const { adminauth, auth } = require("../middleware/authentication");

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

router.route("/").get(auth, adminauth, getAllUsers);
router.route("/:id").get(auth, adminauth, getUser);
router
  .route("/:id")
  .delete(auth, adminauth, deleteUser)
  .post(auth, adminauth, updateUser);

module.exports = router;
