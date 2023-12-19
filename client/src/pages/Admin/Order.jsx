import { useContext, useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";
import Layout from "../../components/Admin/Layout";
import axiosClient from "../../utils/axiosClient";
import { Context } from "../../context";
import { toast } from "react-hot-toast";

function Order({ swal }) {
  const context = useContext(Context);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetchOrders();
  }, []);
  function fetchOrders() {
    context.setLoading(true);
    axiosClient
      .get(`/api/orders`)
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
  function deleteOrder(order) {
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you want to delete ${order._id}?`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, Delete!",
        confirmButtonColor: "#d55",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            context.setLoading(true);
            const { _id } = order;
            await axiosClient.delete("/api/orders/" + _id);
            fetchOrders();
          } catch (error) {
            toast.error("Delete Failed");
            context.setLoading(false);
          }
        }
      });
  }
  return (
    <Layout>
      <h1>Orders</h1>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td></td>
            <td>Products</td>
            <td>Created At</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders.map((order, index) => (
              <tr
                className="border-b-2 border-gray-100 border-solid"
                key={order._id}
              >
                <td>{index + 1}</td>
                <td>
                  <div className="flex flex-col">
                    {order.products.map((item) => (
                      <div className="flex items-center">
                        <div class="h-16 w-16 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
                          <img
                            src={item.product.images[0]}
                            alt=""
                            class="rounded-lg"
                          />
                        </div>
                        <p>
                          {item.product.title} x {item.quantity}{" "}
                        </p>
                      </div>
                    ))}
                  </div>
                </td>
                <td>{order.createdAt}</td>
                <td>
                  <button
                    onClick={() => deleteOrder(order)}
                    className="btn-red"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          {orders.length === 0 && (
            <tr>
              <td className="text-center text-xl" colSpan="3">
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <Order swal={swal} />);
