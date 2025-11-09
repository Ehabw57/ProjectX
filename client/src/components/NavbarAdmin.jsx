import { Link } from "react-router-dom";

function NavbarAdmin({ setIsOpen }) {
  return (
    <div className="flex justify-between items-center px-6 bg-[#eee] py-3 mb-3 shadow-md ">
      <Link
        to="/admin"
        className="font-bold text-xs bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-800 sm:text-lg"
      >
        لوحة تحكم المسؤول
      </Link>
      <button
        className="font-bold text-xs bg-blue-600 text-white hover:bg-blue-800 px-3 py-1 rounded  sm:text-lg"
        onClick={() => setIsOpen(true)}
      >
        إعادة إدخال كلمة المرور
      </button>
    </div>
  );
}

export default NavbarAdmin;
