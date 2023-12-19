import { useContext, useEffect, useState } from "react";
import Layout from "../../../components/Admin/Layout";
import ProductForm from "../../../components/Admin/ProductForm";
import axiosClient from "../../../utils/axiosClient";
import { useParams } from "react-router-dom";
import { Context } from "../../../context";

export default function EditProductPage() {
  const context = useContext(Context);
  const { id } = useParams();
  const [productInfo, setProductInfo] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    context.setLoading(true);
    axiosClient.get("/api/products/" + id).then((response) => {
      setProductInfo(response.data.data.product);
      context.setLoading(false);
    });
  }, [id]);
  return (
    <Layout>
      <h1>Edit product</h1>
      {productInfo && <ProductForm {...productInfo} />}
    </Layout>
  );
}
