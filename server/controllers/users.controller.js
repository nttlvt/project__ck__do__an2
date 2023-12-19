import User from "../models/users.model.js";
import {
  deleteOne,
  getAll,
  updateOne,
} from "../repositories/base.repository.js";
import catchAsync from "../utils/catchAsync.js";

const getMe = (req, res) => {
  return res.json({ user: req.user });
};

const updateMe = catchAsync(async (req, res) => {
  if (req.body.email) delete req.body.email;
  const user = await updateOne(User, req.user.id, req.body);
  return res.json({ user });
});

const updatePassword = catchAsync(async (req, res) => {
  const user = await updateOne(User, { password: req.body.password });
  return res.json({ user });
});

const getAllUsers = catchAsync(async (req, res) => {
  const users = await getAll(User, req);
  return res.json({ users });
});

const deleteUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  const users = await deleteOne(User, id);
  return res.json({ users });
});

export { getMe, updatePassword, getAllUsers, deleteUser, updateMe };
