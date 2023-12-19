import Category from "../models/categories.model.js";
import {
  createOne,
  deleteOne,
  getAll,
  updateOne,
} from "../repositories/base.repository.js";
import catchAsync from "../utils/catchAsync.js";

const createCategory = catchAsync(async (req, res, next) => {
  const category = await createOne(Category, req.body);
  return res.json({ category });
});

const updateCategory = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const category = await updateOne(Category, id, req.body);
  return res.json({ category });
});

const deleteCategory = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  await deleteOne(Category, id);
  return res.json({ message: "Delete Category successfully" });
});

const getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await getAll(Category, req);
  return res.json({ categories });
});

export { createCategory, updateCategory, deleteCategory, getAllCategories };
