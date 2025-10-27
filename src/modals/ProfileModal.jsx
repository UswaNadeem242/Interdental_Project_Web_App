import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import { BASE_URL } from "../config";
import Icons from "../components/Icons";
import { showToast } from "../store/toast-slice";
import { useDispatch } from "react-redux";
import { useAuth } from "../auth/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";

const ProfileModal = ({ isModalOpen, setIsModalOpen }) => {
  const { user: parsedUserData, updateUser } = useAuth();
  const isDoctor = parsedUserData?.roles?.includes("DOCTOR");
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(
    parsedUserData?.profileImage || null,
  );
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const modalRef = useRef(null);

  // Check if form data has changed from initial values
  const hasDataChanged = () => {
    const currentValues = formik.values;
    const initialValues = {
      firstName: parsedUserData?.firstName || "",
      lastName: parsedUserData?.lastName || "",
      email: parsedUserData?.email || "",
      phone: parsedUserData?.phoneNumber || "",
      address: parsedUserData?.address || "",
      officeRefNumber: parsedUserData?.officeRefNo || "",
      doctorLicenceNumber: parsedUserData?.doctorLicenceNumber || "",
    };

    return (
      currentValues.firstName !== initialValues.firstName ||
      currentValues.lastName !== initialValues.lastName ||
      currentValues.phone !== initialValues.phone ||
      currentValues.address !== initialValues.address ||
      (isDoctor && currentValues.officeRefNumber !== initialValues.officeRefNumber) ||
      (isDoctor && currentValues.doctorLicenceNumber !== initialValues.doctorLicenceNumber)
    );
  };

  // Yup validation schema
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "First name must be at least 2 characters")
      .max(25, "First name must not exceed 25 characters")
      .matches(
        /^[a-zA-Z\s'-]+$/,
        "Only letters, spaces, hyphens, and apostrophes are allowed",
      )
      .required("First name is required"),
    lastName: Yup.string()
      .min(2, "Last name must be at least 2 characters")
      .max(25, "Last name must not exceed 25 characters")
      .matches(
        /^[a-zA-Z\s'-]+$/,
        "Only letters, spaces, hyphens, and apostrophes are allowed",
      )
      .required("Last name is required"),
    phone: Yup.string()
      .matches(
        /^[0-9]{7,15}$/,
        "Please enter a valid phone number (7-15 digits)",
      )
      .required("Phone number is required"),
    address: Yup.string()
      .min(10, "Address must be at least 10 characters")
      .required("Address is required"),
    officeRefNumber: Yup.string().when([], {
      is: () => isDoctor,
      then: (schema) => schema.required("Office reference number is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    doctorLicenceNumber: Yup.string().when([], {
      is: () => isDoctor,
      then: (schema) => schema.required("Doctor licence number is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      firstName: parsedUserData?.firstName || "",
      lastName: parsedUserData?.lastName || "",
      email: parsedUserData?.email || "",
      phone: parsedUserData?.phoneNumber || "",
      address: parsedUserData?.address || "",
      officeRefNumber: parsedUserData?.officeRefNo || "",
      doctorLicenceNumber: parsedUserData?.doctorLicenceNumber || "",
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        const payload = {
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          address: values.address,
        };

        if (isDoctor) {
          payload.officeRefNumber = values.officeRefNumber;
          payload.doctorLicenceNumber = values.doctorLicenceNumber;
        }

        const response = await axios.post(
          `${BASE_URL}/api/users/update-profile-info`,
          payload,
          {
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        if (response.data) {
          const updatedUserData = {
            ...parsedUserData,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phoneNumber: values.phone,
            address: values.address,
            ...(isDoctor && {
              officeRefNo: values.officeRefNumber,
              doctorLicenceNumber: values.doctorLicenceNumber,
            }),
          };

          updateUser(updatedUserData);

          dispatch(
            showToast({
              message: "Profile updated successfully!",
              type: "success",
            }),
          );
          setIsModalOpen(false);
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        dispatch(
          showToast({
            message: "Failed to update profile. Please try again.",
            type: "error",
          }),
        );
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isModalOpen]);

  // Handle outside click to close modal
  useEffect(() => {
    if (!isModalOpen) return;

    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen, setIsModalOpen]);

  const handleChange = (e) => {
    const { name } = e.target;
    let { value } = e.target;

    if (name === "firstName" || name === "lastName") {
      // Sanitize name to allowed characters only
      value = value.replace(/[^a-zA-Z\s'-]/g, "");
    }
    if (name === "phone") {
      // Keep digits only and clamp to 15
      value = value.replace(/\D/g, "").slice(0, 15);
    }

    formik.setFieldValue(name, value);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        dispatch(
          showToast({
            message: "Please select a valid image file",
            type: "error",
          }),
        );
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        dispatch(
          showToast({
            message: "Image size should not exceed 5MB",
            type: "error",
          }),
        );
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Auto-upload the image
      await uploadImage(file);
    }
  };

  const uploadImage = async (file) => {
    if (!file) return;

    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append("profileImage", file);

      const response = await axios.post(
        `${BASE_URL}/api/users/updateUserProfileImage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.data) {
        // Fetch updated user data
        const userResponse = await axios.get(
          `${BASE_URL}/api/users/getById/${parsedUserData.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        const updatedUserData = {
          ...parsedUserData,
          profileImage: userResponse?.data?.data?.profileImage,
        };

        updateUser(updatedUserData);

        dispatch(
          showToast({
            message: "Profile image updated successfully!",
            type: "success",
          }),
        );
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      dispatch(
        showToast({
          message: "Failed to upload image. Please try again.",
          type: "error",
        }),
      );
      // Reset preview on error
      setImagePreview(parsedUserData?.profileImage || null);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = async (e) => {
    try {
      setUploadingImage(true);
      setIsRemoving(true);

      const formData = new FormData();
      // Create an empty blob to represent the removal of the image
      const emptyBlob = new Blob([], { type: "image/jpeg" });
      formData.append("profileImage", emptyBlob, "empty.jpg");

      const response = await axios.post(
        `${BASE_URL}/api/users/updateUserProfileImage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.data) {
        const updatedUserData = {
          ...parsedUserData,
          profileImage: null,
        };
        console.log(updatedUserData);

        updateUser(updatedUserData);
        setImagePreview(null);

        dispatch(
          showToast({
            message: "Profile image removed successfully!",
            type: "success",
          }),
        );
      }
    } catch (error) {
      console.error("Error removing image:", error);
      dispatch(
        showToast({
          message: "Failed to remove image. Please try again.",
          type: "error",
        }),
      );
    } finally {
      setUploadingImage(false);
      setIsRemoving(false);
    }
  };


  if (!isModalOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-1 sm:p-4"
      onClick={handleCloseModal}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-[95vw] sm:max-w-[640px] max-h-[95vh] min-h-[50vh] flex flex-col relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleCloseModal}
          className="absolute top-3 right-3 sm:top-6 sm:right-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <Icons.Close className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" />
        </button>

        {/* Header */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-200">
          <h2 className="font-poppins font-semibold text-lg sm:text-xl md:text-2xl text-[#0F153E]">
            Your Account
          </h2>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {/* Avatar */}
          <div className="flex flex-col justify-center items-center mb-4 sm:mb-6">
            <div className="relative">
              {!imagePreview ? (
                // Show default ProfileAvatar when no image
                <label
                  htmlFor="profile-image-upload"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  title="Click to upload profile image"
                >
                  <div className="w-[80px] h-[80px] sm:w-[112px] sm:h-[112px] rounded-full border-2 border-[#001D58] flex items-center justify-center bg-gray-100">
                    <Icons.ProfileAvatar />
                  </div>
                  <input
                    id="profile-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                </label>
              ) : (
                // Show circular image with remove icon when image exists
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="w-[80px] h-[80px] sm:w-[112px] sm:h-[112px] rounded-full object-cover border-2 border-[#001D58]"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    disabled={uploadingImage}
                    className="absolute -top-1 -right-1 sm:-top-2 sm:-right-3 bg-red-500 hover:bg-red-600 rounded-full p-1 sm:p-1.5 shadow-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Remove image"
                  >
                    <Icons.Close className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" fill="white" />
                  </button>
                </div>
              )}
            </div>
            {uploadingImage && (
              <p className="text-xs text-[#001D58] mt-1 sm:mt-2 font-poppins">
                {isRemoving ? "Removing image..." : "Uploading image..."}
              </p>
            )}
            {!imagePreview && !uploadingImage && (
              <p className="text-[10px] sm:text-[11px] text-gray-500 mt-1 sm:mt-2 font-poppins text-center">
                Click to upload profile image
              </p>
            )}
          </div>

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-3 sm:space-y-4">
            {/* Name Fields - Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* First Name */}
              <div>
                <label className="block font-poppins font-medium text-[#434343] text-xs sm:text-[13px] md:text-sm mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your first name"
                  className={`w-full px-3 py-2 sm:px-3.5 sm:py-2.5 border rounded-lg sm:rounded-xl outline-none focus:border-[#001D58] transition-colors font-poppins text-xs sm:text-[13px] md:text-sm ${
                    formik.errors.firstName && formik.touched.firstName
                      ? "border-red-500"
                      : "border-[#624C7926]"
                  }`}
                />
                {formik.errors.firstName && formik.touched.firstName && (
                  <p className="text-red-500 text-[10px] sm:text-[11px] mt-0.5">
                    {formik.errors.firstName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block font-poppins font-medium text-[#434343] text-xs sm:text-[13px] md:text-sm mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your last name"
                  className={`w-full px-3 py-2 sm:px-3.5 sm:py-2.5 border rounded-lg sm:rounded-xl outline-none focus:border-[#001D58] transition-colors font-poppins text-xs sm:text-[13px] md:text-sm ${
                    formik.errors.lastName && formik.touched.lastName
                      ? "border-red-500"
                      : "border-[#624C7926]"
                  }`}
                />
                {formik.errors.lastName && formik.touched.lastName && (
                  <p className="text-red-500 text-[10px] sm:text-[11px] mt-0.5">
                    {formik.errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Email (Disabled) */}
            <div>
              <label className="block font-poppins font-medium text-[#434343] text-xs sm:text-[13px] md:text-sm mb-1">
                E-mail Address
              </label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                disabled
                className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 border border-[#624C7926] rounded-lg sm:rounded-xl outline-none font-poppins text-xs sm:text-[13px] md:text-sm bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>

            {/* Phone and Address - Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Phone */}
              <div>
                <label className="block font-poppins font-medium text-[#434343] text-xs sm:text-[13px] md:text-sm mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formik.values.phone}
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your phone number"
                  className={`w-full px-3 py-2 sm:px-3.5 sm:py-2.5 border rounded-lg sm:rounded-xl outline-none focus:border-[#001D58] transition-colors font-poppins text-xs sm:text-[13px] md:text-sm ${
                    formik.errors.phone && formik.touched.phone
                      ? "border-red-500"
                      : "border-[#624C7926]"
                  }`}
                />
                {formik.errors.phone && formik.touched.phone && (
                  <p className="text-red-500 text-[10px] sm:text-[11px] mt-0.5">
                    {formik.errors.phone}
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block font-poppins font-medium text-[#434343] text-xs sm:text-[13px] md:text-sm mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formik.values.address}
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your address"
                  className={`w-full px-3 py-2 sm:px-3.5 sm:py-2.5 border rounded-lg sm:rounded-xl outline-none focus:border-[#001D58] transition-colors font-poppins text-xs sm:text-[13px] md:text-sm ${
                    formik.errors.address && formik.touched.address
                      ? "border-red-500"
                      : "border-[#624C7926]"
                  }`}
                />
                {formik.errors.address && formik.touched.address && (
                  <p className="text-red-500 text-[10px] sm:text-[11px] mt-0.5">
                    {formik.errors.address}
                  </p>
                )}
              </div>
            </div>

            {/* Doctor Only Fields */}
            {isDoctor && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Office Reference Number */}
                <div>
                  <label className="block font-poppins font-medium text-[#434343] text-xs sm:text-[13px] md:text-sm mb-1">
                    Office Reference Number
                  </label>
                  <input
                    type="text"
                    name="officeRefNumber"
                    value={formik.values.officeRefNumber}
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter office reference number"
                    className={`w-full px-3 py-2 sm:px-3.5 sm:py-2.5 border rounded-lg sm:rounded-xl outline-none focus:border-[#001D58] transition-colors font-poppins text-xs sm:text-[13px] md:text-sm ${
                      formik.errors.officeRefNumber && formik.touched.officeRefNumber
                        ? "border-red-500"
                        : "border-[#624C7926]"
                    }`}
                  />
                  {formik.errors.officeRefNumber && formik.touched.officeRefNumber && (
                    <p className="text-red-500 text-[10px] sm:text-[11px] mt-0.5">
                      {formik.errors.officeRefNumber}
                    </p>
                  )}
                </div>

                {/* Doctor Licence Number */}
                <div>
                  <label className="block font-poppins font-medium text-[#434343] text-xs sm:text-[13px] md:text-sm mb-1">
                    Doctor Licence Number
                  </label>
                  <input
                    type="text"
                    name="doctorLicenceNumber"
                    value={formik.values.doctorLicenceNumber}
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter doctor licence number"
                    className={`w-full px-3 py-2 sm:px-3.5 sm:py-2.5 border rounded-lg sm:rounded-xl outline-none focus:border-[#001D58] transition-colors font-poppins text-xs sm:text-[13px] md:text-sm ${
                      formik.errors.doctorLicenceNumber && formik.touched.doctorLicenceNumber
                        ? "border-red-500"
                        : "border-[#624C7926]"
                    }`}
                  />
                  {formik.errors.doctorLicenceNumber && formik.touched.doctorLicenceNumber && (
                    <p className="text-red-500 text-[10px] sm:text-[11px] mt-0.5">
                      {formik.errors.doctorLicenceNumber}
                    </p>
                  )}
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Footer with Save Button */}
        <div className="border-t border-gray-200 p-3 sm:p-4 md:p-6 rounded-b-2xl sm:rounded-b-3xl flex-shrink-0">
          <button
            type="submit"
            onClick={() => formik.handleSubmit()}
            disabled={loading || !hasDataChanged()}
            className="w-full bg-[#001D58] text-white font-poppins font-semibold text-xs sm:text-sm py-2.5 sm:py-3 rounded-lg sm:rounded-full hover:bg-[#002575] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-lg"
          >
            {loading ? "Saving..." : hasDataChanged() ? "Save Changes" : "No Changes Made"}
          </button>
          
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ProfileModal;
