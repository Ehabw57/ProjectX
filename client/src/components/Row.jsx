import { Link } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Row({ item, onDelete }) {
  const [loadingIds, setLoadingIds] = useState([]);

  const handleDelete = (id) => {
    try {
      Swal.fire({
        title: "هل انت متأكد؟",
        text: "هل تريد حذف هذا العنصر",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "حذف!",
        cancelButtonText: "إلغاء",
      }).then((result) => {
        if (result.isConfirmed) {
          setLoadingIds((prev) => [...prev, id]);
          const url = item.categoryId
            ? `${window.SERVERDATA}/product/${id}`
            : `${window.SERVERDATA}/category/${id}`;
          fetch(url, {
            method: "DELETE",
            headers: { Authorization: sessionStorage.getItem("adminPassword") },
          }).then((response) => {
            if (response.ok) {
              Swal.fire({
                title: "نجاح",
                text: "تم الحذف بنجاح",
                icon: "success",
                confirmButtonText: "موافق",
              });
              onDelete(id);
            } else if ([401, 403].includes(response.status)) {
              Swal.fire({
                title: "خطأ في كلمة المرور!",
                text: "فشل في حذف العنصر.",
                icon: "warning",
                confirmButtonText: "موافق",
              });
            }
            setLoadingIds((prev) =>
              prev.filter((loadingId) => loadingId !== id)
            );
          });
        }
      });
    } catch (err) {
      Swal.fire({
        title: "حدث خطأ!",
        text: err.message,
        icon: "error",
        confirmButtonText: "موافق",
      });
      setLoadingIds((prev) => prev.filter((loadingId) => loadingId !== id));
    }
  };
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 ">
      <td className="p-4  flex space-x-2 justify-center items-center">
        {loadingIds.includes(item._id) && (
          <div className=" w-10 h-10 border-4 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
        )}
        <img src={item.imageUrl} className="w-15 h-15" />
      </td>
      <td
        className="p-4 max-w-20 truncate whitespace-nowrap overflow-hidden"
        title={item.name}
      >
        {item.name}
      </td>
      {item.categoryId && (
        <td
          className="p-4 max-w-20 truncate whitespace-nowrap overflow-hidden"
          title={item.categoryId.name}
        >
          {item.categoryId.name}
        </td>
      )}
      <td className="py-4  space-x-2 ">
        <Link
          to={`/form/${item.categoryId ? "product" : "category"}/${item._id}`}
          state={{ item }}
          className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-800 text-xs sm:text-lg"
        >
          تعديل
        </Link>
        <button
          hidden={loadingIds.includes(item._id)}
          onClick={() => handleDelete(item._id)}
          className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-800 text-xs sm:text-lg"
        >
          حذف
        </button>
      </td>
    </tr>
  );
}
