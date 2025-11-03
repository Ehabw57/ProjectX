import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ImageUpload from "../components/uploadImage";

export default function Form() {
  const [loading, setLoading] = useState(false);
  const { type } = useParams(); // 'product' or 'category'
  const location = useLocation();
  const { item } = location.state || {};
  const isEdit = !!item;

  const [formData, setFormData] = useState({
    name: item?.name || "",
    category: item?.categoryId?._id || "",
    image: item?.imageUrl || null,
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (type === "product") {
      fetch("http://localhost:3000/category")
        .then((res) => res.json())
        .then((data) => setCategories(data))
        .catch((err) => console.error("Error fetching categories:", err));
    }
  }, [type]);

  // 📌 تحديث القيم
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const apiUrl = isEdit
      ? `http://localhost:3000/${type}/${item._id}`
      : `http://localhost:3000/${type}`;

    const method = isEdit ? "PUT" : "POST";

    // ✅ هنا نستخدم FormData بدل JSON
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    if (type === "product") {
      formDataToSend.append("categoryId", formData.category);
    }

    if (formData.image) {
      formDataToSend.append("image", formData.image); // لازم يكون اسم الفايل زي اسم الحقل اللي السيرفر مستنيه
    }
    try {
      const res = await fetch(apiUrl, {
        method,
        headers: {
          authorization: sessionStorage.getItem("adminPassword"),
        },
        body: formDataToSend, // ❗ مفيش headers هنا
      });

      if (!res.ok) throw new Error("Failed to submit");

      const data = await res.json();
      console.log("✅ Success:", data);
      alert(`${type} ${isEdit ? "updated" : "added"} successfully!`);
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Something went wrong!");
    }
    setLoading(false);
    console.log("Submitted Data:", formData);
  };

  return (
    <div className="w-full flex justify-center mt-10 mb-6 px-6 lg:px-20">
      <form
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-5xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isEdit ? `Edit ${type}` : `Add New ${type}`}
        </h2>
        <div className="mb-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-blue-400 rounded outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Enter name"
            required
          />
        </div>
        {type === "product" && (
          <div className="mb-4">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-blue-400 rounded outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))
              ) : (
                <option disabled>Loading...</option>
              )}
            </select>
          </div>
        )}

        {/* 🖼️ رفع الصورة */}
        <ImageUpload
          previewx={formData.image}
          onUpload={(file) => {
            setFormData((prev) => ({ ...prev, image: file }));
          }}
        />

        <button
          className="flex justify-center items-center bg-blue-500 text-white p-2 rounded mt-5 w-full hover:bg-blue-600 transition disabled:bg-gray-500"
          type="submit"
          disabled={loading}
        >
          {loading && (
            <div className="w-4 h-4 border-2 border-dashed border-white rounded-full animate-spin mr-3"></div>
          )}
          {isEdit ? "Update" : "Add"} {type}
        </button>
      </form>
    </div>
  );
}
