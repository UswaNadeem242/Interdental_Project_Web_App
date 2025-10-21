import React, { useState } from "react";
import { changePassword } from "../api/doctorDasboard";
import Toast from "../components/Toast";
import { createPortal } from "react-dom";

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

  return createPortal(

    <>
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />

      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-[480px] flex flex-col relative">
          {/* Close */}
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          >
            ✕
          </button>

          {/* Content */}
          <div className="flex-1">
            <div className="p-6 md:p-8">
              <h2 className="font-poppins font-semibold text-xl md:text-2xl text-[#0F153E] mb-1">
                Change Password
              </h2>
              <div className="w-full h-[1px] bg-gray-200 mb-6"></div>

              <form onSubmit={handleSubmit} className="w-full rounded-3xl bg-white space-y-4">
            {/* Old Password */}
            <div className="relative">
              <input
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                placeholder="Old Password"
                type={show.old ? "text" : "password"}
                className={`w-full rounded-full border px-3.5 py-2.5 pr-10 text-[13px] md:text-sm text-gray-900 placeholder-gray-400 outline-none ${errors.oldPassword ? "border-red-500" : "border-[#624C7926]"
                  }`}
              />
              <button
                type="button"
                onClick={() => setShow({ ...show, old: !show.old })}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {show.old ? (
                  // Eye Open Icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
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
                    width="18"
                    height="18"
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
              <p className="text-red-500 text-[11px] mb-1.5 ml-2 break-words">
                {errors.oldPassword}
              </p>
            )}

            {/* New Password */}
            <div className="relative">
              <input
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="New Password"
                type={show.new ? "text" : "password"}
                className={`w-full rounded-full border px-3.5 py-2.5 pr-10 text-[13px] md:text-sm text-gray-900 placeholder-gray-400 outline-none ${errors.newPassword ? "border-red-500" : "border-[#624C7926]"
                  }`}
              />
              <button
                type="button"
                onClick={() => setShow({ ...show, new: !show.new })}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {show.new ? (
                  // Eye Open Icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
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
                    width="18"
                    height="18"
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
              <p className="text-red-500 text-[11px] mb-1.5 ml-2 break-words">
                {errors.newPassword}
              </p>
            )}

            {/* Confirm Password */}
            <div className="relative">
              <input
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                type={show.confirm ? "text" : "password"}
                className={`w-full rounded-full border px-3.5 py-2.5 pr-10 text-[13px] md:text-sm text-gray-900 placeholder-gray-400 outline-none ${errors.confirmPassword ? "border-red-500" : "border-[#624C7926]"}`}
              />
              <button
                type="button"
                onClick={() => setShow({ ...show, confirm: !show.confirm })}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {show.confirm ? (
                  // Eye Open Icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
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
                    width="18"
                    height="18"
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
              <p className="text-red-500 text-[11px] mb-1.5 ml-2 break-words">
                {errors.confirmPassword}
              </p>
            )}

              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full flex justify-center items-center bg-[#001D58] text-white rounded-full border border-[#001D58] gap-2 py-3 px-2 text-sm font-poppins font-semibold hover:bg-[#002575] transition-colors"
              >
                Confirm
              </button>
            </form>
            </div>
          </div>

          {/* Footer spacing to mirror ProfileModal */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 md:p-6 rounded-b-3xl"></div>
        </div>
      </div>
    </>, document.body
  );
};

export default ChangePasswordModel;
