import { useContext, useEffect, useState } from "react";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";
import axiosClient from "../../utils/axiosClient";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import { Context } from "../../context";
import { useNavigate } from "react-router-dom";
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  category: yup.string().required("Category is required"),
  description: yup.string().required("Description is required"),
  brand: yup.string().required("Brand is required"),
  banner: yup.string().required("banner is required"),
  images: yup.array().test({
    name: "images",
    test: (arr) => arr.length === 3,
    message: "Images must have exactly 1 for thumbnail and 2 for description)",
  }),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required")
    .positive("Price must > 0"),
  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .required("Quantity is required")
    .positive("Quantity must > 0"),
});

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  banner: existingBanner,
  category: assignedCategory,
  brand: existingBrand,
  quantity: existingQuantity,
}) {
  const context = useContext(Context);
  const navigate = useNavigate();
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [category, setCategory] = useState(assignedCategory?._id || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [quantity, setQuantity] = useState(existingQuantity || "");
  const [brand, setBrand] = useState(existingBrand || "");
  const [thumbnail, setThumbnail] = useState(
    existingImages ? existingImages[0] : null
  );
  const [banner, setBanner] = useState(existingBanner || null);
  const [images, setImages] = useState(
    existingImages ? existingImages.slice(-2) : []
  );
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    context.setLoading(true);
    axiosClient
      .get("/api/categories")
      .then((result) => {
        setCategories(result.data.data.categories);
      })
      .catch(() => {
        toast.error("Fetch Categories Failed");
      })
      .finally(() => {
        context.setLoading(false);
      });
  }, []);
  async function saveProduct(ev) {
    try {
      context.setLoading(true);
      ev.preventDefault();
      const newImages = [thumbnail, ...images];
      const data = {
        title,
        description,
        price,
        images: newImages,
        banner,
        category,
        brand,
        quantity,
      };
      await schema.validate(data);
      if (_id) {
        //update
        await axiosClient.patch(`/api/products/${_id}`, data);
      } else {
        //create
        await axiosClient.post("/api/products", data);
      }
      toast.success(`${_id ? "Update" : "Create"} successfully `);
      navigate("/admin/products");
    } catch (error) {
      toast.error(error.message);
    } finally {
      context.setLoading(false);
    }
  }

  async function uploadImages(ev) {
    try {
      const files = ev.target?.files;
      if (files?.length > 0) {
        setIsUploading(true);
        const data = new FormData();
        for (const file of files) {
          data.append("file", file);
        }
        const res = await axiosClient.post("/api/products/upload", data);
        setImages((oldImages) => {
          return [...oldImages, res.data.data.link];
        });
        setIsUploading(false);
      }
    } catch (error) {
      setIsUploading(false);
      toast.error("Upload Failed");
    }
  }
  async function uploadThumbnail(ev) {
    try {
      const files = ev.target?.files;
      if (files?.length > 0) {
        setIsUploadingThumbnail(true);
        const data = new FormData();
        for (const file of files) {
          data.append("file", file);
        }
        const res = await axiosClient.post("/api/products/upload", data);
        setThumbnail(res.data.data.link);
        setIsUploadingThumbnail(false);
      }
    } catch (error) {
      setIsUploadingThumbnail(false);
      toast.error("Upload failed");
    }
  }
  async function uploadBanner(ev) {
    try {
      const files = ev.target?.files;
      if (files?.length > 0) {
        setIsUploadingBanner(true);
        const data = new FormData();
        for (const file of files) {
          data.append("file", file);
        }
        const res = await axiosClient.post("/api/products/upload", data);
        setBanner(res.data.data.link);
        setIsUploadingBanner(false);
      }
    } catch (error) {
      setIsUploadingBanner(false);
      toast.error("Upload Failed");
    }
  }
  function updateImagesOrder(images) {
    setImages(images);
  }

  return (
    <form onSubmit={saveProduct}>
      <label>Product name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <label>Category</label>
      <select value={category} onChange={(ev) => setCategory(ev.target.value)}>
        <option value="">Uncategorized</option>
        {categories.length > 0 &&
          categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
      </select>
      <div className="flex gap-16">
        <div className="flex flex-col">
          <label>Thumbnail(1 image)</label>
          <div className="mb-2 flex flex-wrap gap-1">
            {thumbnail && (
              <div className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
                <img src={thumbnail} alt="" className="rounded-lg" />
              </div>
            )}
            {isUploadingThumbnail && (
              <div className="h-24 flex items-center">
                <Spinner number={2} />
              </div>
            )}
            {!thumbnail && !isUploadingThumbnail && (
              <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                <div>Add image</div>
                <input
                  type="file"
                  onChange={uploadThumbnail}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <label>Banner(1 image)</label>
          <div className="mb-2 flex flex-wrap gap-1">
            {banner && (
              <div className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
                <img src={banner} alt="" className="rounded-lg" />
              </div>
            )}
            {isUploadingBanner && (
              <div className="h-24 flex items-center">
                <Spinner number={2} />
              </div>
            )}
            {!banner && !isUploadingBanner && (
              <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                <div>Add image</div>
                <input type="file" onChange={uploadBanner} className="hidden" />
              </label>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <label>Photos(Must upload 2 images)</label>
          <div className="mb-2 flex flex-wrap gap-1">
            <ReactSortable
              list={images}
              className="flex flex-wrap gap-1"
              setList={updateImagesOrder}
            >
              {!!images?.length &&
                images.map((link) => (
                  <div
                    key={link}
                    className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200"
                  >
                    <img src={link} alt="" className="rounded-lg" />
                  </div>
                ))}
            </ReactSortable>
            {isUploading && (
              <div className="h-24 flex items-center">
                <Spinner number={2} />
              </div>
            )}
            {images.length < 2 && !isUploading && (
              <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                <div>Add image</div>
                <input type="file" onChange={uploadImages} className="hidden" />
              </label>
            )}
          </div>
        </div>
      </div>
      <label>Description</label>
      <textarea
        placeholder="description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      />
      <label>Price (in USD)</label>
      <input
        type="number"
        placeholder="price"
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
      />
      <label>Brand</label>
      <input
        type="text"
        placeholder="brand"
        value={brand}
        onChange={(ev) => setBrand(ev.target.value)}
      />
      <label>Quantity</label>
      <input
        type="number"
        placeholder="quantity"
        value={quantity}
        onChange={(ev) => setQuantity(ev.target.value)}
      />
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
