import { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import { Link, useParams } from "react-router-dom";
import { Layout, OrderCard } from "../components";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { GoToTop } from "../utils";
import axiosClient from "../utils/axiosClient";
import { toast } from "react-hot-toast";

export const OrderPage = () => {
  const context = useContext(Context);
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  function fetchOrder() {
    context.setLoading(true);
    axiosClient
      .get(`/api/orders/${id}`)
      .then((result) => {
        setOrder(result.data.data.order);
      })
      .catch(() => {
        toast.error("Fetch Data Failed");
      })
      .finally(() => {
        context.setLoading(false);
      });
  }

  useEffect(() => {
    fetchOrder();
  }, []);
  GoToTop();

  return (
    <Layout>
      <div className="flex justify-center items-center font-light w-1/2 relative">
        <h1 className="mb-5 font-bold text-2xl">Order</h1>
        <Link to="/my-orders" className="absolute right-0">
          <ChevronRightIcon className="h-4 w-4 text-black"></ChevronRightIcon>
        </Link>
      </div>
      <div className="w-1/2 mt-10">
        {!context.loading && order && order?.products?.map((prod) => (
          <OrderCard
            key={prod.product._id}
            id={prod.product._id}
            title={prod.product.title}
            imageUrl={prod.product.images?.[0]}
            price={prod.product.price}
            quantity={prod.quantity}
          />
        ))}
      </div>
    </Layout>
  );
};
