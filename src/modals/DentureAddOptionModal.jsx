import React, { useEffect, useState, useRef } from "react";
// import Group from "../assets/Group.png";
import axios from "axios";
import { BASE_URL } from "../config";

export const NameAddModal = ({
  title,
  desc,
  handleUpdateStatus,
  setIsModalOpen,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6 relative animate-scaleUp">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" rx="12" fill="#E5E5E5" />
            <path
              d="M12 10.8891L15.8891 7L17 8.11094L13.1109 12L17 15.8891L15.8891 17L12 13.1109L8.11094 17L7 15.8891L10.8891 12L7 8.11094L8.11094 7L12 10.8891Z"
              fill="#4F4F4F"
            />
          </svg>
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold text-[#0D4041] mb-2">{title}</h2>
        <div className="border-b border-gray-200 mb-5"></div>

        {/* Input */}
        <input
          type="text"
          placeholder="Enter Name"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-6 focus:outline-none  placeholder:font-normal placeholder:text-sm "
        />

        {/* Add button */}
        <button className="w-full text-sm bg-[#001F54] text-[#F8F8F8] py-3 rounded-full font-semibold hover:bg-[#002B70] transition">
          Add
        </button>
      </div>
    </div>
  );
};

export const NameAndPriceAddModal = ({
  title,
  desc,
  handleUpdateStatus,
  setIsModalOpen,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6 relative animate-scaleUp">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" rx="12" fill="#E5E5E5" />
            <path
              d="M12 10.8891L15.8891 7L17 8.11094L13.1109 12L17 15.8891L15.8891 17L12 13.1109L8.11094 17L7 15.8891L10.8891 12L7 8.11094L8.11094 7L12 10.8891Z"
              fill="#4F4F4F"
            />
          </svg>
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold text-[#0D4041] mb-2">{title}</h2>
        <div className="border-b border-gray-200 mb-5"></div>

        {/* Input */}
        <input
          type="text"
          placeholder="Enter Name"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-6 focus:outline-none  placeholder:font-normal placeholder:text-sm "
        />
        <input
          type="text"
          placeholder="Enter Price"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-6 focus:outline-none  placeholder:font-normal placeholder:text-sm "
        />

        {/* Add button */}
        <button className="w-full text-sm bg-[#001F54] text-[#F8F8F8] py-3 rounded-full font-semibold hover:bg-[#002B70] transition">
          Add
        </button>
      </div>
    </div>
  );
};

//

export const SmileDesignAddModal = ({
  title,
  desc,
  handleUpdateStatus,
  setIsModalOpen,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6 relative animate-scaleUp">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" rx="12" fill="#E5E5E5" />
            <path
              d="M12 10.8891L15.8891 7L17 8.11094L13.1109 12L17 15.8891L15.8891 17L12 13.1109L8.11094 17L7 15.8891L10.8891 12L7 8.11094L8.11094 7L12 10.8891Z"
              fill="#4F4F4F"
            />
          </svg>
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold text-[#0D4041] mb-2">{title}</h2>
        <div className="border-b border-gray-200 mb-5"></div>

        {/* Upload Area */}
        <div className="flex flex-col items-start  mt-4 mb-4 ml-4">
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center justify-center w-16 h-16 bg-[#F8F8F8] rounded-full hover:bg-gray-100 transition"
          >
            <svg
              width="95"
              height="95"
              viewBox="0 0 95 95"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_23956_26519)">
                <rect
                  width="95"
                  height="95"
                  rx="47.5"
                  fill="#EF6A1F"
                  fill-opacity="0.05"
                />
                <circle cx="47.5" cy="47.5" r="47.5" fill="#F8F8F8" />
                <path
                  d="M59.1245 51.375V56.5417C59.1245 57.2268 58.8523 57.8839 58.3679 58.3684C57.8834 58.8528 57.2263 59.125 56.5412 59.125H38.4578C37.7727 59.125 37.1156 58.8528 36.6312 58.3684C36.1467 57.8839 35.8745 57.2268 35.8745 56.5417V51.375"
                  stroke="#001D58"
                  stroke-width="2.58333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M53.9596 42.3324L47.5013 35.874L41.043 42.3324"
                  stroke="#001D58"
                  stroke-width="2.58333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M47.5 35.874V51.374"
                  stroke="#001D58"
                  stroke-width="2.58333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_23956_26519">
                  <rect width="95" height="95" rx="47.5" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            className="hidden"
            // onChange={handleFileChange}
          />
          <p className="text-xs text-[#003C3C] mt-2 font-normal -ml-4 ">
            {/* {file ? file.name : "Upload Brand Logo"} */}
            Upload Brand Logo
          </p>
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder="Enter Name"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-6 focus:outline-none  placeholder:font-normal placeholder:text-sm "
        />
        {/* <input
          type="text"
          placeholder="Enter Price"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-6 focus:outline-none  placeholder:font-normal placeholder:text-sm "
        /> */}

        {/* Add button */}
        <button className="w-full text-sm bg-[#001F54] text-[#F8F8F8] py-3 rounded-full font-semibold hover:bg-[#002B70] transition">
          Add
        </button>
      </div>
    </div>
  );
};
