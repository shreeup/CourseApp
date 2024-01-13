const express = require("express");

const router = express.Router();
const { adminauth, auth } = require("../middleware/authentication");

const {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses");

router.route("/").post(auth, adminauth, createCourse);
router.route("/").get(getAllCourses);
router.route("/:id").get(getCourse);
router
  .route("/:id")
  .delete(auth, adminauth, deleteCourse)
  .post(auth, adminauth, updateCourse);

module.exports = router;
