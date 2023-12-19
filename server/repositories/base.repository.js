import Category from "../models/categories.model.js";
import AppError from "../utils/appError.js";

const deleteOne = async (Model, id) => {
  const doc = await Model.findByIdAndDelete(id);

  if (!doc) {
    return next(new AppError("Not found", 404));
  }
  return doc;
};

const updateOne = async (Model, id, data) => {
  const doc = await Model.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError("Not found", 404));
  }

  return doc;
};

const createOne = async (Model, data) => {
  const doc = await Model.create(data);
  return doc;
};

const getOne = async (Model, id, popOptions) => {
  let query = Model.findById(id);
  if (popOptions) query = query.populate(popOptions);
  const doc = await query;

  if (!doc) {
    return next(new AppError("Not found", 404));
  }

  return doc;
};
const getOneWithOption = async (Model, filter) => {
  let doc = await Model.findOne(filter);
  return doc;
};

const getAll = async (Model, req) => {
  let filter = {};
  if (req.query.user) filter.user = req.query.user;
  if (req.query.category) {
    const category = await Category.findOne({
      name: { $regex: req.query.category, $options: "i" },
    });
    filter.category = category._id.toString();
  }
  if (req.query.keyword) filter["$text"] = { $search: req.query.keyword };
  const doc = await Model.find(filter).sort("-createdAt");
  return doc;
};

export { getAll, getOne, createOne, updateOne, deleteOne, getOneWithOption };
