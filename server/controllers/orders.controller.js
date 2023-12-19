import Order from "../models/orders.model.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
} from "../repositories/base.repository.js";
import catchAsync from "../utils/catchAsync.js";

const createOrder = catchAsync(async (req, res, next) => {
  req.body.user = req.user.id;
  const order = await createOne(Order, req.body);
  return res.json({ order });
});

const getOrder = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const order = await getOne(Order, id);
  return res.json({ order });
});

const deleteOrder = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  await deleteOne(Order, id);
  return res.json({ message: "Delete Order successfully" });
});

const getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await getAll(Order, req);
  return res.json({ orders });
});

export { createOrder, deleteOrder, getAllOrders, getOrder };
