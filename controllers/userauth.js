const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    throw new BadRequestError("Please provide name,email and password");

  const user = await User.create({ ...req.body });

  const token = await user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: { name: user.getName() },
    token,
    message: "Registered successfully",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) throw new UnauthenticatedError("Please provide valid credentials");
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect)
    throw new UnauthenticatedError("Please provide valid credentials");
  const token = await user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

const adminregister = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    throw new BadRequestError("Please provide name,email and password");

  const user = await User.create({ ...req.body, isadmin: true });

  const token = await user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.getName() }, token });
};

const getMe = async (req, res, next) => {
  const authHEader = req.headers.authorization;
  if (!authHEader || !authHEader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  const token = authHEader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    //attach user to job routes
    const user = await User.findById(payload.userId).select("-password");
    res
      .status(StatusCodes.CREATED)
      .json({ user: { name: user.getName(), isadmin: user.isadmin }, token });
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = {
  register,
  login,
  adminregister,
  getMe,
};
