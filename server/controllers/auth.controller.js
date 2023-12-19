import catchAsync from "../utils/catchAsync.js";
import env from "../utils/env.js";
import {
  createOne,
  getOne,
  getOneWithOption,
} from "../repositories/base.repository.js";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";
import User from "../models/users.model.js";
const secret_key = env("SECRET_KEY");
const jwt_expired_in = env("JWT_EXPIRES_IN");

const signToken = (id) => {
  const token = jwt.sign({ id }, secret_key, {
    expiresIn: jwt_expired_in,
  });
  return token;
};
const userExist = async (email) => {
  try {
    const user = await getOneWithOption(User, { email });
    return user;
  } catch (error) {
    return next(new AppError("Signup failed", 404));
  }
};

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("Please provide email and password", 404));
  let user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new AppError("Email or Password is incorrect", 404));
  }
  const token = signToken(user.id);
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
  });
  user.password = undefined;
  res.status(200).json({ user, token });
});

const loginAmin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("Please provide email and password", 404));
  let user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new AppError("Email or Password is incorrect", 404));
  }
  if (user.role !== "admin") return next(new AppError("Not Permission", 404));
  const token = signToken(user.id);
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
  });
  user.password = undefined;
  res.status(200).json({ user, token });
});

const signup = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  let isExist = await userExist(email);
  if (isExist) {
    return next(new AppError("Email is already signup", 404));
  }
  const user = await createOne(User, { name, email, password });
  const token = signToken(user.id);
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 24 * 60 * 1000 * 1000),
    httpOnly: true,
  });
  user.password = undefined;
  res.status(200).json({ user, token });
});

const authenticateToken = catchAsync(async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    const decoded = jwt.verify(token, secret_key);
    const currentUser = await getOne(User, decoded.id);
    if (!currentUser) return next(new AppError("Not found this user", 404));
    req.user = currentUser;
    next();
  } catch (error) {
    return next(new AppError("UnAuthorized", 404));
  }
});

// authorize for roles
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return res.status(401).json({
        message: `Not Permission`,
      });
    next();
  };
};

const logout = (req, res, next) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 1 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ message: "Logout Success" });
};

export { login, loginAmin, signup, authenticateToken, restrictTo, logout };
