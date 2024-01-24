const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const getAllUsers = async (req, res) => {
  const users = await User.find({}).sort("createdAt");
  res.status(StatusCodes.OK).json({ users, count: users.length });
};

const getUser = async (req, res) => {
  const {
    params: { id: userId },
  } = req;
  const user = await User.findById(userId);

  if (!user) {
    throw new NotFoundError(` No User with id ${UserId}`);
  }
  console.log(user);
  res.status(StatusCodes.OK).json({ user });
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({ user });
  } catch (e) {
    console.log(e);
  }
};

const updateUser = async (req, res) => {
  //res.send("get all Users");
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
    body: { name, email, isadmin },
    params: { id: userId },
  } = req;
  if (!name || !email) {
    throw new BadRequestError("Name / Email cannot be empty");
  }
  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        name: req.body.name,
        email: req.body.email,
        isadmin: req.body.isadmin,
      },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new NotFoundError(` No user with id ${userId}`);
    }
    res.status(StatusCodes.OK).json({ user });
  } catch (e) {
    console.log(e);
  }
};

const deleteUser = async (req, res) => {
  const {
    params: { id: userId },
  } = req;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new NotFoundError(` No user with id ${userId}`);
    }
    res.status(StatusCodes.OK).json({ msg: "The entry was deleted." });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
