import { useEffect, useState } from "react";
import TextInput from "../../../Common/Input";
import PenIcon from "../../../icon/PenIcon";
import ChangePasswordModel from "../../../modals/ChangePasswordModel";
import ChevronRightIcon from "../../../icon/ChevronRight";
import LockIcon from "../../../icon/LockIcon";
import Toast from "../../../components/Toast";
import {
  getDoctorProfile,
  updateDoctorProfile,
  updateUserProfileImage,
} from "../../../api/doctorDasboard";
import { useDispatch, useSelector } from "react-redux";
import { setProfileImage } from "../../../store/slices/profileImage-slice";
import { setProfileData } from "../../../store/slices/profileData-slice";

const DoctorProfile = () => {
  const [isModalPassword, setIsModalPassword] = useState(false);
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const dispatch = useDispatch();
  const profileImage = useSelector((state) => state.profile?.profileImage);
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });
  useEffect(() => {
    const userData = localStorage.getItem("users");

    if (userData) {
      const parsedUserData = JSON.parse(userData);
      const userId = parsedUserData.id;

      const fetchDoctorProfile = async () => {
        const response = await getDoctorProfile(userId);

        if (response.status === 200) {
          dispatch(setProfileData(response.data.data));
        }
        setDoctorProfile(response.data.data);
      };
      fetchDoctorProfile();
    }
  }, []);

  // State for input values
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    license: "",
    reference: "",
    address: "",
  });
  // Update form data when doctorProfile is loaded
  useEffect(() => {
    if (doctorProfile) {
      setFormData({
        firstName: doctorProfile?.firstName || "",
        lastName: doctorProfile?.lastName || "",
        email: doctorProfile?.email || "",
        phone: doctorProfile?.phoneNumber || "",
        license: doctorProfile?.doctorLicenceNumber || "",
        reference: doctorProfile?.officeRefNumber || "",
        address: doctorProfile?.address || "",
      });
    }
  }, [doctorProfile]);

  // State for input errors
  const [errors, setErrors] = useState({});
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



  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate type
    if (!file.type.startsWith("image/")) {
      showToast("Please select a valid image file", "error");
      return;
    }

    // Validate size
    if (file.size > 5 * 1024 * 1024) {
      showToast("Image size should be less than 5MB", "error");
      return;
    }

    // Instant preview
    const reader = new FileReader();
    reader.onload = (e) => setProfileImagePreview(e.target.result);
    reader.readAsDataURL(file);

    setIsUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append("profileImage", file);

      const response = await updateUserProfileImage(formData);

      if (response.status === 200 || response.data?.responseCode === "200") {
        showToast("Profile image updated successfully!", "success");

        // ✅ Use preview image for Redux (instant update across app)
        dispatch(setProfileImage(reader.result));
      } else {
        showToast(
          response.data?.responseMessage || "Failed to update profile image",
          "error",
        );
        setProfileImagePreview(null);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      showToast("Error uploading image. Please try again.", "error");
      setProfileImagePreview(null);
    } finally {
      setIsUploadingImage(false);
      event.target.value = "";
    }
  };


  const validateField = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "firstName": // ✅ keep the same field name from your first function
        if (!value.trim()) {
          errorMsg = "First name is required.";
        } else if (value.length < 3) {
          errorMsg = "First name must be at least 3 characters.";
        } else if (value.length > 10) {
          errorMsg = "First name cannot exceed 10 characters.";
        } else if (!/^[A-Za-z]+$/.test(value)) {
          errorMsg =
            "First name must contain only letters (no spaces or numbers).";
        }
        break;

      case "lastName": // ✅ new validation added from your second function
        if (!value.trim()) {
          errorMsg = "Last name is required.";
        } else if (value.length < 3) {
          errorMsg = "Last name must be at least 3 characters.";
        } else if (value.length > 10) {
          errorMsg = "Last name cannot exceed 10 characters.";
        } else if (!/^[A-Za-z]+$/.test(value)) {
          errorMsg =
            "Last name must contain only letters (no spaces or numbers).";
        }
        break;

      case "email":
        if (!value.trim()) errorMsg = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          errorMsg = "Invalid email address.";
        break;

      case "phone":
        if (!value.trim()) {
          errorMsg = "Phone number is required.";
        } else if (!/^\d{11}$/.test(value)) {
          errorMsg = "Phone number must be exactly 11 digits.";
        }
        break;

      case "license":
        if (!value.trim()) errorMsg = "License number is required.";
        break;

      case "reference":
        if (!value.trim()) errorMsg = "Office reference number is required.";
        break;

      case "address":
        if (!value.trim()) errorMsg = "Address is required.";
        break;

      default:
        errorMsg = "";
    }

    return errorMsg;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Optional: validate on change
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  // Handle onBlur for immediate validation
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submit
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        setIsUpdating(true);

        const bodyData = {
          firstName: formData?.firstName,
          lastName: formData?.lastName,
          phone: formData?.phone,
          address: formData?.address,
          officeRefNumber: formData?.reference,
          doctorLicenceNumber: formData?.license,
        };

        const response = await updateDoctorProfile(bodyData);

        if (response.status === 200) {
          showToast("Profile updated successfully!", "success");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          console.error("Failed to update profile:", response);
          showToast("Failed to update profile. Please try again.", "error");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        showToast("Error updating profile. Please try again.", "error");
      } finally {
        setIsUpdating(false);
      }
    }
  };
  return (
    <>
      {/* Toast Component */}
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />

      <div className="grid md:grid-cols-12 grid-cols-1 gap-4 bg-white md:p-8 p-4 rounded-2xl items-center ">
        {/* Left side */}
        <div className="col-span-12 md:col-span-6 flex gap-4 items-center">
          {profileImage || profileImagePreview || doctorProfile?.profileImage ? (
            <img
              src={profileImage || profileImagePreview || doctorProfile?.profileImage}
              className="md:w-20 md:h-20 w-12 h-12 object-cover rounded-full"
              alt="Profile"
            />
          ) : (
            <div className="md:w-20 md:h-20 w-12 h-12 rounded-full bg-secondaryBrand flex items-center justify-center text-white font-semibold text-lg">
              {doctorProfile
                ? `${doctorProfile.firstName?.[0] || ""}${doctorProfile.lastName?.[0] || ""
                  }`.toUpperCase()
                : "?"}
            </div>
          )}
          <div>
            <h3 className="text-2xl font-bold font-poppins">
              {doctorProfile?.firstName} {doctorProfile?.lastName}
            </h3>
            <p className="text-docText font-poppins text-sm">
              {doctorProfile?.email}
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="col-span-12 md:col-span-6 flex md:justify-end justify-start">
          <div>
            <input
              type="file"
              id="fileUpload"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              disabled={isUploadingImage}
            />
            <label
              htmlFor="fileUpload"
              className={`cursor-pointer bg-textField text-textColor1 text-sm py-5 px-6 rounded-full font-semibold font-poppins inline-block ${
                isUploadingImage ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isUploadingImage ? "Uploading..." : "Upload new picture"}
            </label>
          </div>
        </div>

        {/* seccond part */}
        <div className="bg-textField py-4 px-6 col-span-12 rounded-2xl ">
          <div className="pb-4">
            <h3 className="text-black text-sm font-semibold font-poppins">
              Subscription Plan
            </h3>
          </div>
          <div className="pb-4">
            <p className="text-primaryText text-xs font-medium font-poppins capitalize">
              will be expired on 23 march 2023
            </p>
          </div>
          <div className="pb-4">
            <div className="w-full bg-white rounded-full h-2.5 ">
              <div
                className="bg-secondaryBrand h-2.5 rounded-full"
                style={{ width: `45%` }}
              ></div>
            </div>
          </div>
          <div className="flex bg-white  justify-between px-3 py-2 rounded-lg">
            <p className="font-poppins text-primary text-xs font-normal">
              Number of patients
            </p>
            <p className="text-secondaryBrand text-xs font-poppins capitalize font-medium">
              10/20
            </p>
          </div>
        </div>
        <button className="bg-secondaryBrand text-white rounded-full md:col-span-2 col-span-4 py-4 px-4 whitespace-nowrap">
          Update Plan
        </button>
      </div>
      <div className="bg-white rounded-2xl md:p-8 p-4   mt-10">
        <form className=" " onSubmit={handleSubmit}>
          {/* grid md:grid-cols-12 grid-cols-6 gap-4 bg-white */}

          <div className="grid md:grid-cols-12 grid-cols-6 gap-4  items-center">
            <div className="md:col-span-6 col-span-3">
              <h3 className="text-primaryText text-lg font-poppins font-semibold  capitalize">
                Account info
              </h3>{" "}
            </div>
            <div className="md:col-span-6 col-span-3  md:flex  md:justify-end">
              <div className="col-span-12 flex justify-end mt-6">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className={`bg-secondaryBrand text-white md:px-8 px-4  md:py-4 md:text-md text-sm py-2 rounded-full ${
                    isUpdating
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-secondaryBrand"
                  }`}
                >
                  {isUpdating ? "Save Change ..." : "Save Change"}
                </button>
              </div>
            </div>
          </div>

          <div className=" grid md:grid-cols-12 grid-cols-6 gap-4 bg-white">
            <div className="md:col-span-6 col-span-12">
              <TextInput
                id="firstName"
                name="firstName"
                label="First Name"
                placeholder="First Name"
                className3={"text-secondaryText"}
                icon={<PenIcon size={18} />}
                value={formData.firstName || ""}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.firstName && (
                <p className="text-red-800 text-sm">{errors.firstName}</p>
              )}
            </div>

            <div className="md:col-span-6 col-span-12">
              <TextInput
                id="lastName"
                name="lastName"
                label="Last Name"
                placeholder="Last Name"
                className3={"text-secondaryText"}
                icon={<PenIcon size={18} />}
                value={formData.lastName || ""}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.lastName && (
                <p className="text-red-800 text-sm">{errors.lastName}</p>
              )}
            </div>

            <div className="md:col-span-6 col-span-12">
              {/* <TextInput
                id="email"
                name="email"
                label="Email"
                 disabled
                placeholder="hanry463@gmail.com"
                type="email"
                className3={"text-secondaryText"}
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}

              /> */}
              <TextInput
                id="email"
                name="email"
                label="Email"
                placeholder="hanry463@gmail.com"
                type="email"
                className3="text-secondaryText cursor-not-allowed"
                value={formData.email || ""}
                disabled // <- this makes it fully non-editable
              />

              {errors.email && (
                <p className="text-red-800 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="md:col-span-6 col-span-12">
              <TextInput
                id="phone"
                name="phone"
                label="Phone Number"
                placeholder="+92 457 765 456"
                type="text"
                className3={"text-secondaryText"}
                icon={<PenIcon size={18} />}
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.phone && (
                <p className="text-red-800 text-sm">{errors.phone}</p>
              )}
            </div>
            <div className="md:col-span-6 col-span-12">
              <TextInput
                id="license"
                name="license"
                label="Doctor's License Number"
                placeholder="658756RFTYT7"
                className3={"text-secondaryText"}
                type="text"
                icon={<PenIcon size={18} />}
                value={formData.license}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.license && (
                <p className="text-red-800 text-sm">{errors.license}</p>
              )}
            </div>
            <div className="md:col-span-6 col-span-12">
              <TextInput
                id="reference"
                name="reference"
                className3={"text-secondaryText"}
                label="Office Reference number"
                placeholder="76A8SDH75"
                type="text"
                icon={<PenIcon size={18} />}
                value={formData.reference}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.reference && (
                <p className="text-red-800 text-sm">{errors.reference}</p>
              )}
            </div>

            <div className="col-span-12 ">
              <TextInput
                id="address"
                name="address"
                label="Address"
                placeholder="76A8SDH75"
                className3={"text-secondaryText"}
                type="text"
                icon={<PenIcon size={18} />}
                value={formData.address}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.address && (
                <p className="text-red-800 text-sm">{errors.address}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          {/* <div className="col-span-12 flex justify-end mt-6">
            <button
              type="submit"
              disabled={isUpdating}
              className={`px-8 py-3 rounded-lg font-semibold text-white transition-colors ${isUpdating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-secondaryBrand"
                }`}
            >
              {isUpdating ? "Updating..." : "Update Profile"}
            </button>
          </div> */}
        </form>
        <button
          onClick={() => setIsModalPassword(true)}
          className="w-full flex items-center justify-between py-3 px-4 border-b border-borderPrimary text-left hover:border-borderPrimary transition mt-7"
        >
          <div className="flex items-center gap-3">
            <LockIcon size={18} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              Change password
            </span>
          </div>

          <ChevronRightIcon className="text-primaryText" />
        </button>

        {isModalPassword && (
          <ChangePasswordModel
            isModalPassword={isModalPassword}
            setIsModalPassword={setIsModalPassword}
          />
        )}
      </div>
    </>
  );
};

export default DoctorProfile;
