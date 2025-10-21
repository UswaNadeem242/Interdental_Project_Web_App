import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import { BASE_URL } from "../config";
import Icons from "../components/Icons";
import { showToast } from "../store/toast-slice";
import { useDispatch } from "react-redux";
import { useAuth } from "../auth/AuthContext";
import * as Yup from "yup";
import useFieldValidation from "../Hooks/useFieldValidation";

const ProfileModal = ({ isModalOpen, setIsModalOpen }) => {
  const { user: parsedUserData, updateUser } = useAuth();
  const isDoctor = parsedUserData?.roles?.includes("DOCTOR");
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: parsedUserData?.firstName || "",
    lastName: parsedUserData?.lastName || "",
    email: parsedUserData?.email || "",
    phone: parsedUserData?.phoneNumber || "",
    address: parsedUserData?.address || "",
    officeRefNumber: parsedUserData?.officeRefNo || "",
    doctorLicenceNumber: parsedUserData?.doctorLicenceNumber || "",
  });

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(
    parsedUserData?.profileImage || null,
  );
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

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

  const {
    validationErrors,
    validateField,
    clearFieldError,
    validateAllFields,
  } = useFieldValidation(validationSchema);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isModalOpen]);

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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (validationErrors[name]) {
      clearFieldError(name);
    }
  };

  const handleBlur = async (e) => {
    const { name, value } = e.target;
    // Validate field when user leaves it
    if (value.trim()) {
      await validateField(name, value, formData);
    }
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

        console.log(updatedUserData, "[[updated]]");

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

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const validationError = await validateAllFields(formData);
    if (validationError) {
      dispatch(
        showToast({
          message: validationError,
          type: "error",
        }),
      );
      return;
    }

    try {
      setLoading(true);

      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        address: formData.address,
      };

      if (isDoctor) {
        payload.officeRefNumber = formData.officeRefNumber;
        payload.doctorLicenceNumber = formData.doctorLicenceNumber;
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
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phone,
          address: formData.address,
          ...(isDoctor && {
            officeRefNo: formData.officeRefNumber,
            doctorLicenceNumber: formData.doctorLicenceNumber,
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
  };

  if (!isModalOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4"
      onClick={handleCloseModal}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-[640px] max-h-[90vh] flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleCloseModal}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <Icons.Close className="w-6 h-6" fill="currentColor" />
        </button>

        {/* Sticky Header */}
        <div className="sticky rounded-t-3xl top-0 bg-white z-10">
          <div className="flex items-center justify-between p-6 md:py-6 md:px-6 pb-0">
            <h2 className="font-poppins font-semibold text-xl md:text-2xl text-[#0F153E]">
              Your Account
            </h2>
          </div>
          <div className="w-full h-[1px] bg-gray-200"></div>
        </div>

        {/* Content with proper scrolling */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 md:p-8">

            {/* Avatar */}
            <div className="flex flex-col justify-center items-center mb-6">
              <div className="relative">
                {!imagePreview ? (
                  // Show default ProfileAvatar when no image
                  <label
                    htmlFor="profile-image-upload"
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    title="Click to upload profile image"
                  >
                    <div className="w-[112px] h-[112px] rounded-full border-2 border-[#001D58] flex items-center justify-center bg-gray-100">
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
                      className="w-[112px] h-[112px] rounded-full object-cover border-2 border-[#001D58]"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      disabled={uploadingImage}
                      className="absolute -top-2 -right-3 bg-red-500 hover:bg-red-600 rounded-full p-1.5 shadow-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Remove image"
                    >
                      <Icons.Close className="w-3.5 h-3.5" fill="white" />
                    </button>
                  </div>
                )}
              </div>
              {uploadingImage && (
                <p className="text-xs text-[#001D58] mt-2 font-poppins">
                  {isRemoving ? "Removing image..." : "Uploading image..."}
                </p>
              )}
              {!imagePreview && !uploadingImage && (
                <p className="text-[11px] text-gray-500 mt-2 font-poppins text-center">
                  Click to upload profile image
                </p>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSaveChanges} className="space-y-4">
              {/* First Name */}
              <div>
                <label className="block font-poppins font-medium text-[#434343] text-[13px] md:text-sm mb-1.5">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your first name"
                  className={`w-full px-3.5 py-2.5 border rounded-xl outline-none focus:border-[#001D58] transition-colors font-poppins text-[13px] md:text-sm ${
                    validationErrors.firstName
                      ? "border-red-500"
                      : "border-[#624C7926]"
                  }`}
                />
                {validationErrors.firstName && (
                  <p className="text-red-500 text-[11px] mt-1">
                    {validationErrors.firstName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block font-poppins font-medium text-[#434343] text-[13px] md:text-sm mb-1.5">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your last name"
                  className={`w-full px-3.5 py-2.5 border rounded-xl outline-none focus:border-[#001D58] transition-colors font-poppins text-[13px] md:text-sm ${
                    validationErrors.lastName
                      ? "border-red-500"
                      : "border-[#624C7926]"
                  }`}
                />
                {validationErrors.lastName && (
                  <p className="text-red-500 text-[11px] mt-1">
                    {validationErrors.lastName}
                  </p>
                )}
              </div>

              {/* Email (Disabled) */}
              <div>
                <label className="block font-poppins font-medium text-[#434343] text-[13px] md:text-sm mb-1.5">
                  E-mail Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full px-3.5 py-2.5 border border-[#624C7926] rounded-xl outline-none font-poppins text-[13px] md:text-sm bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block font-poppins font-medium text-[#434343] text-[13px] md:text-sm mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your phone number"
                  className={`w-full px-3.5 py-2.5 border rounded-xl outline-none focus:border-[#001D58] transition-colors font-poppins text-[13px] md:text-sm ${
                    validationErrors.phone
                      ? "border-red-500"
                      : "border-[#624C7926]"
                  }`}
                />
                {validationErrors.phone && (
                  <p className="text-red-500 text-[11px] mt-1">
                    {validationErrors.phone}
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block font-poppins font-medium text-[#434343] text-[13px] md:text-sm mb-1.5">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your address"
                  className={`w-full px-3.5 py-2.5 border rounded-xl outline-none focus:border-[#001D58] transition-colors font-poppins text-[13px] md:text-sm ${
                    validationErrors.address
                      ? "border-red-500"
                      : "border-[#624C7926]"
                  }`}
                />
                {validationErrors.address && (
                  <p className="text-red-500 text-[11px] mt-1">
                    {validationErrors.address}
                  </p>
                )}
              </div>

              {/* Doctor Only Fields */}
              {isDoctor && (
                <>
                  {/* Office Reference Number */}
                  <div>
                    <label className="block font-poppins font-medium text-[#434343] text-[13px] md:text-sm mb-1.5">
                      Office Reference Number
                    </label>
                    <input
                      type="text"
                      name="officeRefNumber"
                      value={formData.officeRefNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter office reference number"
                      className={`w-full px-3.5 py-2.5 border rounded-xl outline-none focus:border-[#001D58] transition-colors font-poppins text-[13px] md:text-sm ${
                        validationErrors.officeRefNumber
                          ? "border-red-500"
                          : "border-[#624C7926]"
                      }`}
                    />
                    {validationErrors.officeRefNumber && (
                      <p className="text-red-500 text-[11px] mt-1">
                        {validationErrors.officeRefNumber}
                      </p>
                    )}
                  </div>

                  {/* Doctor Licence Number */}
                  <div>
                    <label className="block font-poppins font-medium text-[#434343] text-[13px] md:text-sm mb-1.5">
                      Doctor Licence Number
                    </label>
                    <input
                      type="text"
                      name="doctorLicenceNumber"
                      value={formData.doctorLicenceNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter doctor licence number"
                      className={`w-full px-3.5 py-2.5 border rounded-xl outline-none focus:border-[#001D58] transition-colors font-poppins text-[13px] md:text-sm ${
                        validationErrors.doctorLicenceNumber
                          ? "border-red-500"
                          : "border-[#624C7926]"
                      }`}
                    />
                    {validationErrors.doctorLicenceNumber && (
                      <p className="text-red-500 text-[11px] mt-1">
                        {validationErrors.doctorLicenceNumber}
                      </p>
                    )}
                  </div>
                </>
              )}
            </form>
          </div>
        </div>

        {/* Sticky Footer with Save Button */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 md:p-6 rounded-b-3xl">
          <button
            onClick={handleSaveChanges}
            disabled={loading}
            className="w-full bg-[#001D58] text-white font-poppins font-semibold text-sm md:text-sm py-3 rounded-full hover:bg-[#002575] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-lg"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ProfileModal;
