import { useState } from "react";

export default function SmileDesignCard({ label, image, onClick }) {
  const [enabled, setEnabled] = useState(false);

  return (
    <div
      className=" mx-auto bg-bgWhite rounded-xl shadow-sm border-2 p-3 border-cartColor flex flex-col gap-3 "
      onClick={() => onClick()}
    >
      <div className="">
        <img
          src={image}
          alt="Smile Design"
          className=" object-cover rounded-md"
        />
      </div>

      <div className="flex items-center justify-between gap-6 ">
        <p className="text-gray-800 font-medium text-sm">{label}</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setEnabled(!enabled);
          }}
          className={`relative w-10 h-6 rounded-full transition-colors duration-300 ${
            enabled ? "bg-secondaryBrand" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-4 h-4 bg-bgWhite rounded-full shadow-md transition-transform duration-300 ${
              enabled ? "translate-x-4" : ""
            }`}
          ></span>
        </button>
      </div>
    </div>
  );
}
