import React, { useState, useEffect } from "react";

function LoginModal({ onClose }) {
  const [password, setPassword] = useState("");

  useEffect(() => {
    sessionStorage.getItem("adminPassword");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem("adminPassword", password);
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg w-96 p-6 animate-fadeIn"
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          تسجيل الدخول كمسؤول
        </h1>

        <div className="mb-4">
          <input
            className="w-full px-3 py-2 border border-blue-400 rounded outline-none focus:ring-2 focus:ring-blue-400"
            type="password"
            placeholder="أدخل كلمة مرور المسؤول"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
        </div>

        <button
          className={`w-full py-2 rounded transition ${
            password.trim()
              ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
          type="submit"
          disabled={!password.trim()}
        >
          تأكيد
        </button>
      </form>
    </div>
  );
}

export default LoginModal;
