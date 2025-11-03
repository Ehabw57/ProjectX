import React, { useState, useRef } from "react";

function ImageUpload({ previewx = null, onUpload }) {
  // ✅ أضفنا prop اسمه onUpload
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState(previewx);
  const fileInputRef = useRef(null);

  // ✅ لما المستخدم يختار فايل من الجهاز
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // ✅ أضفنا دي علشان نبلغ الفورم إن في صورة جديدة اتضافت
      onUpload && onUpload(file); // ← هنا بيرجع الفايل للفورم
    }
  };

  // ✅ لما المستخدم يسحب الصورة ويحطها
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // ✅ نفس الفكرة هنا
      onUpload && onUpload(file);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleRemove = () => {
    setFileName("");
    setPreview(null);
    fileInputRef.current.value = "";
    onUpload && onUpload(null); // ✅ لما نحذف الصورة، نرجع null للفورم
  };

  return (
    <div className="w-full">
      <label className="text-right block text-sm font-medium text-gray-700 mb-2">
        الصورة
      </label>

      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition relative"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current.click()}
      >
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="mx-auto h-40 object-contain rounded"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600 transition"
            >
              إزالة
            </button>
          </div>
        ) : (
          <>
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H20V20H8v8h12v12h8V28h12v-8H28V8z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-600">
              <span className="text-blue-600 font-medium">تحميل ملف</span> أو
              اسحب وأفلت
            </p>
          </>
        )}

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {fileName && (
        <p className="mt-2 text-sm text-gray-500 text-center">{fileName}</p>
      )}
    </div>
  );
}

export default ImageUpload;
