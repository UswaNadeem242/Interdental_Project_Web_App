import React, { useState } from "react";
import { changePassword } from "../api/doctorDasboard";
import Toast from "../components/Toast";

const ChangePasswordModel = ({ isModalPassword, setIsModalPassword }) => {
  const handleCloseModal = () => {
    setIsModalPassword(false);
  };
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });
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

  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Function to show toast messages
  const showToast = (message, type = "success") => {
    setToast({
      isVisible: true,
      message,
      type,
    });
  };

  // Function to hide toast
  const hideToast = () => {
    setToast({
      isVisible: false,
      message: "",
      type: "success",
    });
  };

  // Comprehensive password validation function
  const validatePassword = (password) => {
    const errors = [];

    if (password.length < 8) {
      errors.push("minimum 8 characters");
    }

    if (!/[A-Z]/.test(password)) {
      errors.push("at least 1 uppercase");
    }

    if (!/[a-z]/.test(password)) {
      errors.push("at least 1 lowercase");
    }

    if (!/\d/.test(password)) {
      errors.push("1 digit");
    }

    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      errors.push("1 special character");
    }

    return errors;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate oldPassword - required field
    if (name === "oldPassword") {
      if (!value.trim()) {
        setErrors((prev) => ({
          ...prev,
          oldPassword: "Old Password is required",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          oldPassword: "",
        }));
      }
    }

    // Validate newPassword with comprehensive rules
    if (name === "newPassword") {
      if (value) {
        const passwordErrors = validatePassword(value);
        if (passwordErrors.length > 0) {
          setErrors((prev) => ({
            ...prev,
            newPassword: `Password must have: ${passwordErrors.join(", ")}`,
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            newPassword: "",
          }));
        }
      } else {
        setErrors((prev) => ({
          ...prev,
          newPassword: "",
        }));
      }
    }

    // Validate confirmPassword - check if it matches newPassword
    if (name === "confirmPassword") {
      if (value) {
        if (formData.newPassword && value !== formData.newPassword) {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: "New password and confirm password do not match!",
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: "",
          }));
        }
      } else {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "",
        }));
      }
    }
  };

  const updatePassword = async () => {
    const bodyData = {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
      newConfirmPassword: formData.confirmPassword,
    };
    const response = await changePassword(bodyData);

    if (response.data.responseCode === "200") {
      showToast(response.data.responseMessage, "success");

      // Close modal after 1 second delay
      setTimeout(() => {
        handleCloseModal();
      }, 1000);
    } else {
      console.error("Failed to update password:", response);

      showToast(response.data.responseMessage, "error");
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Initialize errors object
    const newErrors = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    // Validate oldPassword
    if (!formData.oldPassword.trim()) {
      newErrors.oldPassword = "Old Password is required";
    }

    // Validate newPassword with comprehensive rules
    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "New Password is required";
    } else {
      const newPasswordErrors = validatePassword(formData.newPassword);
      if (newPasswordErrors.length > 0) {
        newErrors.newPassword = `Password must have: ${newPasswordErrors.join(
          ", "
        )}`;
      }
    }

    // Validate confirmPassword
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword =
        "New password and confirm password do not match!";
    }

    // Set all errors at once
    setErrors(newErrors);

    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (hasErrors) {
      return;
    }

    // If no errors, proceed with password update
    updatePassword();
  };

  return (
    <>
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />

      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
        <div className="flex flex-col justify-center items-center gap-[24px] bg-white p-[32px] rounded-[24px] shadow-lg w-96 relative">
          <div className="w-full">
            <div className="flex justify-between items-center gap-[4px] pb-4 border-b outline-offset-[-0.50px] outline-black/10">
              <p className="font-poppins font-medium text-[20px] leading-[30px] text-[#0D4041]">
                Change Password
              </p>

              <button
                onClick={handleCloseModal}
                className="w-6 h-6 rounded-full bg-[#E5E5E5] right-4 text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="w-full rounded-3xl bg-white">
            {/* Old Password */}
            <div className="relative mb-4">
              <input
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                placeholder="Old Password"
                type={show.old ? "text" : "password"}
                className={`w-full rounded-full border px-4 py-3 pr-11 text-sm text-gray-900 placeholder-gray-400 outline-none ${
                  errors.oldPassword ? "border-red-500" : "border-borderPrimary"
                }`}
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
                    <path d="M1 1l22 22" />{" "}
                    {/* diagonal line crossing the eye */}
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.oldPassword && (
              <p className="text-red-500 text-xs mb-2 ml-2 break-words">
                {errors.oldPassword}
              </p>
            )}

            {/* New Password */}
            <div className="relative mb-4">
              <input
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="New Password"
                type={show.new ? "text" : "password"}
                className={`w-full rounded-full border px-4 py-3 pr-11 text-sm text-gray-900 placeholder-gray-400 outline-none ${
                  errors.newPassword ? "border-red-500" : "border-borderPrimary"
                }`}
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
                    <path d="M1 1l22 22" />{" "}
                    {/* diagonal line crossing the eye */}
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-xs mb-2 ml-2 break-words">
                {errors.newPassword}
              </p>
            )}

            {/* Confirm Password */}
            <div className="relative mb-4">
              <input
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                type={show.confirm ? "text" : "password"}
                className={`w-full rounded-full border px-4 py-3 pr-11 text-sm text-gray-900 placeholder-gray-400 outline-none ${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-borderPrimary"
                }`}
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
                    <path d="M1 1l22 22" />{" "}
                    {/* diagonal line crossing the eye */}
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mb-2 ml-2 break-words">
                {errors.confirmPassword}
              </p>
            )}

            <button
              type="submit"
              onClick={handleSubmit}
              className=" w-full flex justify-center items-center bg-secondaryBrand text-white  h-10  rounded-full  border-[1px] border-secondaryBrand gap-2 py-5   px-2  text-xs font-poppins font-normal leading-[18px]"
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordModel;
