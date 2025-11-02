import { Link } from "react-router-dom";

export default function Form() {
  return (
    <>
      <h1>Form Page</h1>
      <button className="bg-green-500 text-white p-2 rounded">
        <Link to="/">Go to Home</Link>
      </button>
    </>
  );
}
