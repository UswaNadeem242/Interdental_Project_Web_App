import React, { useEffect, useRef, useState } from "react";

const PatientChangePasswordModel = ({
  isModalPassword,
  setIsModalPassword,
}) => {
  const handleOpenModal = () => {
    setIsModalPassword(true);
  };

  const handleCloseModal = () => {
    setIsModalPassword(false);
  };
  // const [show, setShow] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const inputRef = useRef(null);
  const [value, setValue] = useState("");
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    console.log("Submitted data:", formData);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="flex flex-col justify-center items-center gap-[24px] bg-white p-[32px] rounded-[24px] shadow-lg  md:w-auto w-96 relative">
        <div className=" w-[350px] ">
          <div className="flex  justify-between items-center gap-[4px] pb-4 border-b  outline-offset-[-0.50px] outline-black/10">
            <p className="font-poppins font-bold text-[20px] leading-[30px] text-[#0D4041]">
              Change Password
            </p>

            <button
              onClick={handleCloseModal}
              className="w-8 h-8  border rounded-md right-4 text-[#4F4F4F] font-semibold"
            >
              ✕
            </button>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mx-4 w-full rounded-3xl bg-white"
        >
          {/* Old Password */}
          <div className="relative mb-4">
            <input
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              placeholder="Old Password"
              type={show.old ? "text" : "password"}
              className="w-full rounded-full border border-borderPrimary bg-red px-4 py-3 pr-11 text-sm text-gray-900 placeholder-gray-400 outline-none"
            />
            <button
              type="button"
              onClick={() => setShow({ ...show, old: !show.old })}
              className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600"
            >
              {show.old ? (
                // Eye Open Icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#808080"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                // Eye Closed Icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#808080"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94C16.09 19.09 14.06 19.75 12 19.75c-7 0-11-7-11-7 1.65-3.3 4.66-5.68 8-6.7" />
                  <path d="M12 5c7 0 11 7 11 7-1.65 3.3-4.66 5.68-8 6.7" />
                  <path d="M1 1l22 22" /> {/* diagonal line crossing the eye */}
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          {/* New Password */}
          <div className="relative mb-4">
            <input
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="New Password"
              type={show.new ? "text" : "password"}
              className="w-full rounded-full border border-borderPrimary px-4 py-3 pr-11 text-sm text-gray-900 placeholder-gray-400 outline-none"
            />
            <button
              type="button"
              onClick={() => setShow({ ...show, new: !show.new })}
              className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600"
            >
              {show.new ? (
                // Eye Open Icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#808080"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                // Eye Closed Icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#808080"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94C16.09 19.09 14.06 19.75 12 19.75c-7 0-11-7-11-7 1.65-3.3 4.66-5.68 8-6.7" />
                  <path d="M12 5c7 0 11 7 11 7-1.65 3.3-4.66 5.68-8 6.7" />
                  <path d="M1 1l22 22" /> {/* diagonal line crossing the eye */}
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative mb-4">
            <input
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              type={show.confirm ? "text" : "password"}
              className="w-full rounded-full border border-borderPrimary px-4 py-3 pr-11 text-sm text-gray-900 placeholder-gray-400 outline-none"
            />
            <button
              type="button"
              onClick={() => setShow({ ...show, confirm: !show.confirm })}
              className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600"
            >
              {show.confirm ? (
                // Eye Open Icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#808080"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                // Eye Closed Icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#808080"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94C16.09 19.09 14.06 19.75 12 19.75c-7 0-11-7-11-7 1.65-3.3 4.66-5.68 8-6.7" />
                  <path d="M12 5c7 0 11 7 11 7-1.65 3.3-4.66 5.68-8 6.7" />
                  <path d="M1 1l22 22" /> {/* diagonal line crossing the eye */}
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          <button
            type="submit"
            className=" w-full flex justify-center items-center bg-secondaryBrand text-white  h-10  rounded-full  border-[1px] border-secondaryBrand gap-2 py-5   px-2  text-xs font-poppins font-normal leading-[18px]"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientChangePasswordModel;
