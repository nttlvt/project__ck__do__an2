import { useContext } from "react";
import { Layout, OrderCard } from "../components";
import { GoToTop } from "../utils";
import { Context } from "../context";
import { Link } from "react-router-dom";
import { totalPrice } from "../utils";
import { useCreateDate } from "../hooks";
import axiosClient from "../utils/axiosClient";
import { toast } from "react-hot-toast";

export const CartShoppingPage = () => {
  const context = useContext(Context);
  const date = useCreateDate();
  GoToTop();

  const handleDelete = (id) => {
    const filteredProducts = context.cartProducts.filter(
      (prod) => prod.product._id != id
    );
    context.setCartProducts(filteredProducts);
  };

  const handleCheckout = () => {
    context.setLoading(true);
    const orderToAdd = {
      products: context.cartProducts,
      totalPrice: totalPrice(context.cartProducts),
    };
    axiosClient
      .post("/api/orders", orderToAdd)
      .then(() => {
        toast.success("Checkout Successfully");
        context.setCartProducts([]);
        context.closeCheckoutSideMenu();
      })
      .catch(() => {
        toast.error("Checkout Failed");
      })
      .finally(() => {
        context.setLoading(false);
      });
  };

  return (
    <Layout>
      <h1 className="mb-5 font-bold text-4xl">My shopping cart</h1>

      <div className="flex flex-grow justify-between items-start max-w-screen-lg">
        <div className="overflow-y-scroll px-20">
          {context.cartProducts.map((prod) => (
            <OrderCard
              key={prod.product._id}
              id={prod.product._id}
              title={prod.product.title}
              imageUrl={prod.product.images[0]}
              price={prod.product.price}
              quantity={prod.quantity}
              handleDelete={handleDelete}
            />
          ))}
        </div>
        <div className="px-4 mb-4">
          <p className="flex flex-row justify-between items-center">
            <span className="mr-5">Total in the shopping cart:</span>

            <span className="font-medium text-2xl text-red-800">
              ${totalPrice(context.cartProducts)}
            </span>
          </p>
          {context.productsCount !== 0 && (
            <div>
              <button
                type="button"
                className="border-2 p-2 rounded-lg w-full mt-3 bg-orange-200"
                onClick={() => handleCheckout()}
              >
                Buy
              </button>
              <button
                type="button"
                onClick={() => context.setCartProducts([])}
                className="border-2 p-2 rounded-lg w-full bg-red-200 mt-3"
              >
                Delete all items
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
