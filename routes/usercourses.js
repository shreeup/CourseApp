const express = require("express");

const router = express.Router();

const {
  purchaseCourse,
  getPurchasedCourses,
  getCourse,
} = require("../controllers/courses");

router.route("/purchase/:id").post(purchaseCourse);
router.route("/purchasedcourses").get(getPurchasedCourses);
router.route("/purchase/:id").get(getCourse);

module.exports = router;
