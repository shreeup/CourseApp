const mongoose = require("mongoose");
const CourseSchema = new mongoose.Schema(
  {
    // Schema definition here
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// const Course = mongoose.model("Course", CourseSchema);

// module.exports = {
//   Course,
// };
module.exports = mongoose.model("Course", CourseSchema);
