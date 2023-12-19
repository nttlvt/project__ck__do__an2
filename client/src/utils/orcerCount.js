export const totalPrice = (products) => {
  let sum = 0;
  products?.forEach((prod) => (sum += prod.product.price * prod.quantity));
  return sum;
};
