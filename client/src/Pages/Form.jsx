import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ImageUpload from "../components/uploadImage";
import Swal from "sweetalert2";
import NavbarAdmin from "../components/NavbarAdmin";
import LoginModal from "../components/Login";

export default function Form() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { type } = useParams(); // 'product' or 'category'
  const location = useLocation();
  const { item } = location.state || {};
  const isEdit = !!item;

  const typeTranslations = {
    product: "منتج",
    category: "فئة",
  };
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
        .catch((err) => {
          Swal.fire({
            title: "Error!",
            text: err.message,
            icon: "error",
            confirmButtonText: "OK",
          });
        });
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
        body: formDataToSend,
      });

      if ([401, 403].includes(res.status)) {
        Swal.fire({
          title: "خطأ في كلمة المرور!",
          text: `فشل في ${isEdit ? "تحديث" : "إضافة"} ال${
            typeTranslations[type]
          }، برجاء التأكد من كلمة المرور.`,
          icon: "info",
          confirmButtonText: "موافق",
        });
      } else if (res.status === 400) {
        Swal.fire({
          title: "خطأ في البيانات!",
          text: `يرجى التحقق من البيانات المُدخلة الخاصة بـال${typeTranslations[type]}.`,
          icon: "warning",
          confirmButtonText: "موافق",
        });
      } else {
        if (!isEdit) setFormData({ name: "", category: "", image: null });
        Swal.fire({
          title: "تم بنجاح!",
          text: `تم ${isEdit ? "تحديث" : "إضافته"} ال${
            typeTranslations[type]
          }   بنجاح.`,
          icon: "success",
          confirmButtonText: "موافق",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "حدث خطأ!",
        text: "حدث خطأ غير متوقع، يرجى المحاولة لاحقًا.",
        icon: "error",
        confirmButtonText: "موافق",
      });
    }
    setLoading(false);
  };

  return (
    <>
      {isOpen && <LoginModal onClose={() => setIsOpen(false)} />}
      <NavbarAdmin setIsOpen={setIsOpen} />
      <div className="w-full flex justify-center mt-10 mb-6 px-6 lg:px-20">
        <form
          className="bg-white rounded-lg shadow-lg p-8 w-full max-w-5xl"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isEdit
              ? `تعديل ${typeTranslations[type]}`
              : `إضافة ${typeTranslations[type]} `}
          </h2>
          <div className="mb-4">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="text-right placeholder:text-right p-2  w-full px-3 py-2 border border-blue-400 rounded outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="أدخل الاسم"
              required
            />
          </div>
          {type === "product" && (
            <div className="mb-4">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="text-right placeholder:text-right p-2  w-full px-3 py-2 border border-blue-400 rounded outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="" disabled>
                  أختر الفئة
                </option>
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))
                ) : (
                  <option disabled>تحميل...</option>
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
            {isEdit ? "تحديث" : "إضافة"} {typeTranslations[type]}
          </button>
        </form>
      </div>
    </>
  );
}
