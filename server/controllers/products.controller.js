import Product from "../models/products.model.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../repositories/base.repository.js";
import { products } from "../../client/src/assets/aa.js";
import catchAsync from "../utils/catchAsync.js";
import cloudinary from "../utils/cloudinary.js";
import AppError from "../utils/appError.js";

const uploadOne = (image) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image.path, (error, result) => {
      if (error) {
        reject(false);
      } else {
        resolve(result.url);
      }
    });
  });
};
const uploadImage = catchAsync(async (req, res, next) => {
  const link = await uploadOne(req.file);
  if (!link) return next(new AppError("Upload failed", 400));
  return res.status(201).json({ link });
});

const createProduct = catchAsync(async (req, res, next) => {
  const product = await createOne(Product, req.body);
  return res.json({ product });
});

const updateProduct = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const product = await updateOne(Product, id, req.body);
  return res.json({ product });
});

const deleteProduct = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  await deleteOne(Product, id);
  return res.json({ message: "Delete product successfully" });
});

const getAllProducts = catchAsync(async (req, res, next) => {
  const products = await getAll(Product, req);
  return res.json({ products });
});

const getProduct = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const product = await getOne(Product, id);
  return res.json({ product });
});

export {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  uploadImage,
  getProduct,
};
