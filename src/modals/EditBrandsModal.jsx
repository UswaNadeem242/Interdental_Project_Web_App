import { useState } from "react";

export default function EditBrandsModal({ isOpen, onClose, onSave }) {
  const [categories] = useState([
    "Brand A",
    "Brand A",
    "Brand A",
    "Brand A",
    "Brand A",
    "Brand A",
  ]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-bgWhite rounded-2xl shadow-xl w-full max-w-md p-6 animate-fadeIn">
        <h2 className="text-xl font-bold font-poppins text-[#434343] mb-5">
          Edit Brand
        </h2>

        <div className="space-y-3 border border-[#E5E5E5] p-4 rounded-2xl">
          {categories.map((cat, i) => (
            <input
              key={i}
              //   value={cat}
              //   onChange={(e) => handleChange(i, e.target.value)}
              className="w-full border   border-[#E5E5E5] rounded-xl px-4 py-3 placeholder:text-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Brand A"
            />
          ))}
        </div>

        <div className="flex justify-between gap-3 mt-8 ">
          <button
            onClick={() => onClose()}
            className="px-[72px] py-3 font-poppins rounded-full bg-[#F8F8F8] text-[#434343] text-sm font-semibold hover:bg-gray-200 transition"
          >
            Cancel
          </button>

          <button className="px-[72px] py-3 font-poppins rounded-full bg-[#001F54] text-white text-sm font-semibold  hover:bg-[#002b75] transition">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
