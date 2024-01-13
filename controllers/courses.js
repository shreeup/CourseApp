const Course = require("../models/Course");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllCourses = async (req, res) => {
  //res.send("get all Courses");
  const courses = await Course.find({}).sort("createdAt");
  res.status(StatusCodes.OK).json({ courses, count: courses.length });
};

const getCourse = async (req, res) => {
  const {
    params: { id: courseId },
  } = req;
  const course = await Course.findById(courseId);

  if (!course) {
    throw new NotFoundError(` No Course with id ${CourseId}`);
  }
  console.log(course);
  res.status(StatusCodes.OK).json({ course });
};

const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(StatusCodes.CREATED).json({ course });
  } catch (e) {
    console.log(e);
  }
};

const updateCourse = async (req, res) => {
  //res.send("get all Courses");
  // "name":"hyytj saa",
  // "email":"5fdrdger@yswf.com",
  // "password":"563cfe"
  // "name":"bfb cvnbvn",
  //   "email":"ergegr@yswf.com",
  //   "password":"yufg43wer"

  //   {
  //     "name":"Fnu Shree",
  //     "email":"shree@ctd.com",
  //     "password":"shr33@CTD"
  // }

  // {
  //     "name":"Fnu Shree",
  //     "email":"fnushree@ctd.com",
  //     "password":"FNUshr33"
  // }
  //   {
  //   "name": "shree swagger",
  //   "email": "fnushree@swagger.com",
  //   "password": "sw@gg3r"
  // }
  const {
    body: { title, description, price, imageLink, published },
    user: { _id: userId },
    params: { id: courseId },
  } = req;
  if (!title || !price) {
    throw new BadRequestError("Title / Price cannot be empty");
  }
  try {
    const course = await Course.findOneAndUpdate(
      { _id: courseId },
      {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        imageLink: req.body.imageLink,
        published: req.body.published,
      },
      { new: true, runValidators: true }
    );

    if (!course) {
      throw new NotFoundError(` No course with id ${courseId}`);
    }
    res.status(StatusCodes.OK).json({ course });
  } catch (e) {
    console.log(e);
  }
};

const deleteCourse = async (req, res) => {
  const {
    user: { _id: userId },
    params: { id: courseId },
  } = req;
  try {
    const course = await Course.findByIdAndDelete(courseId);
    if (!course) {
      throw new NotFoundError(` No course with id ${courseId}`);
    }
    res.status(StatusCodes.OK).json({ msg: "The entry was deleted." });
  } catch (e) {
    console.log(e);
  }
};

const purchaseCourse = async (req, res) => {
  const {
    user: { _id: userId },
    params: { id: courseId },
  } = req;
  try {
    const course = await Course.findOne({
      _id: courseId,
    });
    if (!course) {
      throw new NotFoundError(` No course with id ${courseId}`);
    }
    await User.findOneAndUpdate(
      {
        _id: userId,
      },
      { $addToSet: { purchasedcourses: course } }
    );
    res.status(StatusCodes.OK).json({ msg: "Course purchased successfully." });
  } catch (e) {
    console.log(e);
  }
};

const getPurchasedCourses = async (req, res) => {
  const {
    user: { _id: userId },
  } = req;
  try {
    let user = await User.findOne({
      _id: userId,
    }).populate("purchasedcourses", "-__v");
    res.status(StatusCodes.OK).send(user.purchasedcourses);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  purchaseCourse,
  getPurchasedCourses,
};
