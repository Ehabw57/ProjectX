import { Link } from "react-router-dom";
import { useState } from "react";
export default function Row({ item, onDelete }) {
  const [loadingIds, setLoadingIds] = useState([]);
  const handleDelete = (id) => {
    const confirmed = confirm("Are you sure you want to delete this item?");
    if (!confirmed) return;
    setLoadingIds((prev) => [...prev, id]);
    const url = item.categoryId
      ? `http://localhost:3000/product/${id}`
      : `http://localhost:3000/category/${id}`;
    fetch(url, { method: "DELETE" }).then((response) => {
      if (response.ok) {
        onDelete(id);
      } else {
        alert("Failed to delete item");
      }
      setLoadingIds((prev) => prev.filter((loadingId) => loadingId !== id));
    });
  };
  return (
    <tr>
      <td className="p-4 border-b border-gray-200 flex space-x-2 justify-center items-center">
        {loadingIds.includes(item._id) && (
          <div className=" w-10 h-10 border-4 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
        )}
        <img src={item.imageUrl} className="w-5 h-5" />
      </td>
      <td className="py-4 border-b border-gray-200">{item.name}</td>
      {item.categoryId && (
        <td className="py-4 border-b border-gray-200">{item.categoryId.name}</td>
      )}
      <td className="py-4 border-b border-gray-200 space-x-2">
        <Link to={`/form/${item.categoryId ? "product" : "category"}/${item._id}`} state={{ item }} className="text-blue-500 hover:underline">
          Edit
        </Link>
        <button
          disabled={loadingIds.includes(item._id)}
          onClick={() => handleDelete(item._id)}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
