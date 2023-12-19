import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  products: [Object],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const Order = mongoose.model("Order", orderSchema);

export default Order;
