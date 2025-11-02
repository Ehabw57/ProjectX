import { Link } from "react-router-dom";
import Table from "../components/Table.jsx";

export default function Home() {
  const categories = [
    { id: 1, name: "Category 1", image: "cat1.jpg" },
    { id: 2, name: "Category 2", image: "cat2.jpg" },
    { id: 3, name: "Category 3", image: "cat3.jpg" },
    { id: 4, name: "Category 4", image: "cat4.jpg" },
  ];
  return (
    <>
      <Table data={categories} />
    </>
  );
}
