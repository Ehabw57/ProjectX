import { useEffect, useState } from "react";
import Table from "../components/Table.jsx";
import { Link } from "react-router-dom";

export default function Home() {
  const [selectedType, setSelectedType] = useState("categories");
  const [data, setData] = useState([]);

  function onDelete(id) {
    console.log("Deleting item with id:", id);
    setData((prevData) => prevData.filter((item) => item._id !== id));
  }

  async function fetchData(URL) {
    const response = await fetch(URL);
    if (response.ok) setData(await response.json());
    console.log(data);
  }

  useEffect(() => {
    const url =
      selectedType === "products"
        ? "http://localhost:3000/product"
        : "http://localhost:3000/category";
    fetchData(url);
  }, [selectedType]);

  return (
    <>
      <div className="flex flex-col justify-center  mx-auto px-3  lg:w-[80%]">
        <div className="flex justify-center">
          <button
            className={`flex-1 text-gray-500 px-4 py-2 ${
              selectedType === "categories" ? "bg-gray-500 text-white" : ""
            }`}
            onClick={() => setSelectedType("categories")}
          >
            Categories
          </button>
          <button
            className={`flex-1 text-gray-500 px-4 py-2 ${
              selectedType === "products" ? "bg-gray-500 text-white" : ""
            }`}
            onClick={() => setSelectedType("products")}
          >
            Products
          </button>
        </div>
        <Table data={data} type={selectedType} onDelete={onDelete} />
        <Link
          to={`/form/${selectedType}`}
          className="bg-blue-500 text-white text-center w-1/2 p-2 mx-auto mt-10 rounded hover:underline"
        >
          Add {selectedType === "products" ? "Product" : "Category"}
        </Link>
      </div>
    </>
  );
}
