import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Table from "../components/Table.jsx";
import { Link } from "react-router-dom";
import LoginModal from "../components/Login.jsx";
import NavbarAdmin from "../components/NavbarAdmin.jsx";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("category");
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  function onDelete(id) {
    setData((prevData) => prevData.filter((item) => item._id !== id));
  }

  async function fetchData(URL) {
    try {
      setIsloading(true);
      const response = await fetch(URL);
      if (response.ok) setData(await response.json());
    } catch (error) {
      Swal.fire({
        title: "حدث خطأ!",
        text: "حدث خطأ غير متوقع، يرجى المحاولة لاحقًا.",
        icon: "error",
        confirmButtonText: "موافق",
      });
    } finally {
      setIsloading(false);
    }
  }

  useEffect(() => {
    const url =
      selectedType === "product"
        ? `${window.SERVERDATA}/product`
        : `${window.SERVERDATA}/category`;
    fetchData(url);
  }, [selectedType]);

  return (
    <>
      {isOpen && <LoginModal onClose={() => setIsOpen(false)} />}
      <NavbarAdmin setIsOpen={setIsOpen} />
      <div className="flex flex-col justify-center  mx-auto px-3  lg:w-[80%] rounded-lg">
        <div className="flex justify-center rounded-t-lg overflow-hidden  mb-0">
          <button
            className={`flex-1 text-gray-500 px-4 py-2 cursor-pointer  ${
              selectedType === "product" ? "bg-gray-500 text-white" : ""
            }`}
            onClick={() => setSelectedType("product")}
          >
            المنتجات
          </button>
          <button
            className={`flex-1 text-gray-500 px-4 py-2 cursor-pointer ${
              selectedType === "category" ? "bg-gray-500 text-white" : ""
            }`}
            onClick={() => setSelectedType("category")}
          >
            الفئات
          </button>
        </div>
        {isLoading ? (
          <div className="animate-spin rounded-full mt-[35vh] mx-auto h-15 w-15 border-5 border-b-transparent border-blue-500"></div>
        ) : (
          <Table data={data} type={selectedType} onDelete={onDelete} />
        )}
        <Link
          to={`/form/${selectedType}`}
          className="block mx-auto mt-2 w-full sm:w-[50vw] bg-blue-500 text-white text-center p-2 rounded"
        >
          إضافة {selectedType === "product" ? "منتج" : "فئة"}
        </Link>
      </div>
    </>
  );
}
