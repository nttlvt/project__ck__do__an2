import { useContext, useEffect, useState } from "react";
import { Layout, OrdersCard } from "../components";
import { Context } from "../context";
import { Link } from "react-router-dom";
import { GoToTop } from "../utils";
import axiosClient from "../utils/axiosClient";

export const MyOrders = () => {
  const context = useContext(Context);
  const [orders, setOrders] = useState([]);
  function fetchOrders() {
    context.setLoading(true);
    axiosClient
      .get(`/api/orders?user=${context.profile._id}`)
      .then((result) => {
        setOrders(result.data.data.orders);
      })
      .catch(() => {
        toast.error("Fetch Data Failed");
      })
      .finally(() => {
        context.setLoading(false);
      });
  }

  useEffect(() => {
    fetchOrders();
  }, []);
  GoToTop();

  return (
    <Layout>
      <h1 className="mb-5 font-bold text-2xl">My orders</h1>
      {!context.loading &&
        orders.length > 0 &&
        orders?.map((order) => (
          <Link to={`/my-orders/${order._id}`} key={order._id}>
            <OrdersCard
              key={order._id}
              id={order._id}
              createdAt={order.createdAt}
              totalPrice={order.totalPrice}
            />
          </Link>
        ))}
      {!context.loading && orders.length === 0 && (
        <h1 className="text-xl font-bold uppercase">No data</h1>
      )}
    </Layout>
  );
};
