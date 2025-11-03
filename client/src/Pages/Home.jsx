import { useEffect, useState } from "react";
import Table from "../components/Table.jsx";
import { Link } from "react-router-dom";
import LoginModal from "../components/login.jsx";

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedType, setSelectedType] = useState("category");
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  function onDelete(id) {
    setData((prevData) => prevData.filter((item) => item._id !== id));
  }

  async function fetchData(URL) {
    setIsloading(true);
    const response = await fetch(URL);
    if (response.ok) setData(await response.json());
    setIsloading(false);
  }

  useEffect(() => {
    const url =
      selectedType === "product"
        ? "http://localhost:3000/product"
        : "http://localhost:3000/category";
    fetchData(url);
  }, [selectedType]);

  return (
    <>
      {isOpen && <LoginModal onClose={() => setIsOpen(false)} />}
      <div className="flex justify-between px-12">
        <h1>Admin Panel</h1>
        <button className="cursor-pointer" onClick={() => setIsOpen(true)}>
          Renter password
        </button>
      </div>
      <div className="flex flex-col justify-center  mx-auto px-3  lg:w-[80%]">
        <div className="flex justify-center">
          <button
            className={`flex-1 text-gray-500 px-4 py-2 ${
              selectedType === "category" ? "bg-gray-500 text-white" : ""
            }`}
            onClick={() => setSelectedType("category")}
          >
            Categories
          </button>
          <button
            className={`flex-1 text-gray-500 px-4 py-2 ${
              selectedType === "product" ? "bg-gray-500 text-white" : ""
            }`}
            onClick={() => setSelectedType("product")}
          >
            Products
          </button>
        </div>
        {isLoading ? (
          <div className="animate-spin rounded-full mt-[35vh] mx-auto h-15 w-15 border-5 border-b-transparent border-blue-500"></div>
        ) : (
          <Table data={data} type={selectedType} onDelete={onDelete} />
        )}
        <Link
          to={`/form/${selectedType}`}
          className="absolute bottom-5 w-full left-0 sm:left-1/4  sm:w-[50vw]  bg-blue-500 text-white text-center  p-2 rounded"
        >
          Add {selectedType === "product" ? "Product" : "Category"}
        </Link>
      </div>
    </>
  );
}
