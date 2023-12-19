import { useContext, useEffect, useState } from "react";
import { Card, Layout, ProductDetail } from "../components";
import { Context } from "../context";
import { GoToTop } from "../utils";
import axiosClient from "../utils/axiosClient";
import { useLocation } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import toast from "react-hot-toast";
export const HomePage = () => {
  const context = useContext(Context);
  const location = useLocation();
  const [keyword, setKeyword] = useState(null);
  const [items, setItems] = useState([]);
  function fetchProducts() {
    context.setLoading(true);
    let query = `?`;
    if (location.pathname !== "/") {
      query += `category=${location.pathname.replace(/\//g, "")}`;
      if (keyword) query += `&keyword=${keyword}`;
    } else if (keyword) query += `keyword=${keyword}`;

    axiosClient
      .get(`/api/products${query}`)
      .then((result) => {
        setItems(result.data.data.products);
      })
      .catch(() => {
        toast.error("Fetch Data Failed");
      })
      .finally(() => {
        context.setLoading(false);
      });
  }
  const debouncedKeyword = useDebounce(keyword, 500);

  useEffect(() => {
    fetchProducts();
  }, [debouncedKeyword, location.pathname]);
  GoToTop();

  const renderView = () => {
    if (!context.loading) {
      if (items?.length > 0) {
        return (
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-screen-lg">
            {items?.map((item) => (
              <Card key={item._id} item={item} />
            ))}
          </div>
        );
      } else {
        return <p>No results found 😣</p>;
      }
    }
  };

  return (
    <Layout>
      <h1 className="mb-5 font-bold text-4xl">Shopi</h1>

      <form className="w-1/2 mb-8">
        <input
          type="text"
          placeholder="Search product..."
          className="border-2 rounded-lg w-full p-3"
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>

      {renderView()}

      <ProductDetail />
    </Layout>
  );
};
