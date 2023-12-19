import { useContext } from "react";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Context } from "../context";
import { OrderCard } from "./OrderCard";
import { totalPrice } from "../utils";
import { useCreateDate } from "../hooks";
import "./styles.css";
import axiosClient from "../utils/axiosClient";
import { toast } from "react-hot-toast";

export const CheckoutSideMenu = () => {
  const context = useContext(Context);
  //console.log(context.cartProducts);

  const date = useCreateDate();

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

  //console.log(context.cartProducts[0].images[0])

  return (
    <aside
      className={`${
        context.isCheckoutSideMenuOpen ? "flex" : "hidden"
      } checkout-side-menu flex-col fixed right-0 border border-black rounded-lg fondo`}
    >
      <div className="flex justify-between items-center p-4">
        <h2 className="font-medium text-xl">My Order</h2>
        <div>
          <XMarkIcon
            className="h-6 w-6 text-black cursor-pointer"
            onClick={() => context.closeCheckoutSideMenu()}
          ></XMarkIcon>
        </div>
      </div>
      <div className="px-4 mb-4">
        <p className="flex flex-row justify-between items-center">
          <span>Total in the shopping cart:</span>
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
      <hr className="mb-6" />
      <div className="overflow-y-scroll">
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
    </aside>
  );
};
