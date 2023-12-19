import { useContext, useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";
import Layout from "../../components/Admin/Layout";
import axiosClient from "../../utils/axiosClient";
import { Context } from "../../context";
import { toast } from "react-hot-toast";

function Category({ swal }) {
  const context = useContext(Context);
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, []);
  function fetchCategories() {
    context.setLoading(true);
    axiosClient
      .get(`/api/categories`)
      .then((result) => {
        setCategories(result.data.data.categories);
      })
      .catch(() => {
        toast.error("Fetch Data Failed");
      })
      .finally(() => {
        context.setLoading(false);
      });
  }
  async function saveCategory(ev) {
    try {
      context.setLoading(true);
      ev.preventDefault();
      const data = {
        name,
      };
      if (editedCategory) {
        await axiosClient.patch(`/api/categories/${editedCategory._id}`, data);
        setEditedCategory(null);
      } else {
        await axiosClient.post(`/api/categories`, data);
      }
      setName("");
      fetchCategories();
    } catch (error) {
      toast.error("Error occured");
    } finally {
      context.setLoading(false);
    }
  }
  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(","),
      }))
    );
  }
  function deleteCategory(category) {
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you want to delete ${category.name}?`,
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
            const { _id } = category;
            await axiosClient.delete("/api/categories/" + _id);
            fetchCategories();
          } catch (error) {
            toast.error("Delete Failed");
          } finally {
            context.setLoading(true);
          }
        }
      });
  }
  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editedCategory
          ? `Edit category ${editedCategory.name}`
          : "Create new category"}
      </label>
      <form onSubmit={saveCategory}>
        <div className="flex gap-1">
          <input
            type="text"
            placeholder={"Category name"}
            onChange={(ev) => setName(ev.target.value)}
            value={name}
          />
        </div>
        <div className="flex gap-1">
          {editedCategory && (
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setName("");
              }}
              className="btn-default"
            >
              Cancel
            </button>
          )}
          <button type="submit" className="btn-primary py-1">
            Save
          </button>
        </div>
      </form>
      {!editedCategory && (
        <table className="basic mt-4">
          <thead>
            <tr>
              <td></td>
              <td>Category name</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 &&
              categories.map((category, index) => (
                <tr key={category._id}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td>
                    <button
                      onClick={() => editCategory(category)}
                      className="btn-default mr-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCategory(category)}
                      className="btn-red"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            {categories.length === 0 && (
              <tr>
                <td className="text-center text-xl" colSpan="3">
                  No data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <Category swal={swal} />);
