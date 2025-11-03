import Row from "./Row.jsx";
export default function Table({ data, type, onDelete }) {
  return (
    <table className="text-center  bg-white  rounded-b-lg w-full shadow-md">
      <thead>
        <tr className="bg-gray-100 border-b-2 border-gray-500">
          <th className="py-2  border-b border-gray-200 ">الصورة</th>
          <th className="py-2 border-b border-gray-200 ">الاسم</th>
          {type === "product" && (
            <th className="py-2 border-b border-gray-200 ">الفئة</th>
          )}
          <th className="py-2  border-b border-gray-200 ">الإجراءات</th>
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
