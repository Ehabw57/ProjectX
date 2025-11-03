import Row from "./Row.jsx";
export default function Table({ data, type, onDelete }) {
  return (
    <table className="text-center  bg-white">
      <thead>
        <tr className="bg-gray-100 border-b-2 border-gray-500">
          <th className="py-2  border-b border-gray-200 ">Image</th>
          <th className="py-2 border-b border-gray-200 ">Name</th>
          {type === "product" && (
            <th className="py-2 border-b border-gray-200 ">Category</th>
          )}
          <th className="py-2  border-b border-gray-200 ">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <Row key={item._id} item={item} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
}
