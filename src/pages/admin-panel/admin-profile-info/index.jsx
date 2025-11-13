import { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextInput from "../../../Common/Input";
import PenIcon from "../../../icon/PenIcon";
import ChevronRightIcon from "../../../icon/ChevronRight";
import LockIcon from "../../../icon/LockIcon";
import ChangePasswordModel from "../../../modals/ChangePasswordModel";
import { useAuth } from "../../../auth/AuthContext";
import { useDispatch } from "react-redux";
import { showToast } from "../../../store/toast-slice";
import { setProfileData } from "../../../store/slices/profileData-slice";
import { BASE_URL } from "../../../config";

const ProfileInfoAdminPanel = () => {
  const { user: parsedUserData, updateUser } = useAuth();
  const dispatch = useDispatch();

  const [isModalPassword, setIsModalPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(
    parsedUserData?.profileImage || null,
  );
  const [uploadingImage, setUploadingImage] = useState(false);

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
  });

  const formik = useFormik({
    initialValues: {
      firstName: parsedUserData?.firstName || "",
      lastName: parsedUserData?.lastName || "",
      email: parsedUserData?.email || "",
      phone: parsedUserData?.phoneNumber || "",
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        const payload = {
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
        };

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
         
          const userResponse = await axios.get(
            `${BASE_URL}/api/users/getById/${parsedUserData.id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            },
          );

          if (userResponse?.data?.data) {
            const updatedUserData = userResponse.data.data;
            updateUser(updatedUserData);
            
            // Update Redux store so header reflects changes immediately
            dispatch(setProfileData(updatedUserData));

            dispatch(
              showToast({
                message: "Profile updated successfully!",
                type: "success",
              }),
            );
          }
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
    if (parsedUserData) {
      formik.setValues({
        firstName: parsedUserData?.firstName || "",
        lastName: parsedUserData?.lastName || "",
        email: parsedUserData?.email || "",
        phone: parsedUserData?.phoneNumber || "",
      });
      setImagePreview(parsedUserData?.profileImage || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsedUserData]);

  const hasDataChanged = () => {
    if (!formik || !parsedUserData) return false;
    
    const currentValues = formik.values;
    const initialValues = {
      firstName: parsedUserData?.firstName || "",
      lastName: parsedUserData?.lastName || "",
      email: parsedUserData?.email || "",
      phone: parsedUserData?.phoneNumber || "",
    };

    return (
      currentValues.firstName !== initialValues.firstName ||
      currentValues.lastName !== initialValues.lastName ||
      currentValues.phone !== initialValues.phone
    );
  };

  const handleChange = (e) => {
    const { name } = e.target;
    let { value } = e.target;

    if (name === "firstName" || name === "lastName") {
      value = value.replace(/[^a-zA-Z\s'-]/g, "");
    }
    if (name === "phone") {
      value = value.replace(/\D/g, "").slice(0, 15);
    }

    formik.setFieldValue(name, value);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        dispatch(
          showToast({
            message: "Please select a valid image file",
            type: "error",
          }),
        );
        return;
      }

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
        
        dispatch(setProfileData(userResponse?.data?.data));

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
      setImagePreview(parsedUserData?.profileImage || null);
    } finally {
      setUploadingImage(false);
    }
  };
  return (
    <>
      <div className="grid md:grid-cols-12 grid-cols-1 gap-4 bg-white md:p-8 p-4 rounded-2xl items-center  ">
        <div className="col-span-12 md:col-span-6 flex gap-4 items-center">
          {imagePreview || parsedUserData?.profileImage ? (
            <img
              src={imagePreview || parsedUserData?.profileImage}
              alt="Profile"
              className="md:w-20 md:h-20 w-12 h-12 object-cover rounded-full"
            />
          ) : (
            <div className="md:w-20 md:h-20 w-12 h-12 rounded-full bg-secondaryBrand flex items-center justify-center text-white font-semibold text-lg">
              {parsedUserData
                ? `${parsedUserData.firstName?.[0] || ""}${parsedUserData.lastName?.[0] || ""}`
                    .toUpperCase()
                : "?"}
            </div>
          )}
          <div>
            <h3 className="text-2xl font-bold font-poppins">
              {parsedUserData?.firstName} {parsedUserData?.lastName}
            </h3>
            <p className="text-docText font-poppins text-sm mt-2">
              {parsedUserData?.email}
            </p>
          </div>
        </div>
          
        <div className="col-span-12 md:col-span-6 flex md:justify-end justify-start ">
          <div>
            <input
              type="file"
              id="fileUpload"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              disabled={uploadingImage}
            />
            <label
              htmlFor="fileUpload"
              className={`cursor-pointer bg-textField text-textColor1 text-sm py-5 px-6 rounded-full font-semibold font-poppins inline-block text-primaryText ${
                uploadingImage ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {uploadingImage ? "Uploading..." : "Upload new picture"}
            </label>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl md:p-8 p-4   mt-10 font-poppins">
        <form onSubmit={formik.handleSubmit}>
          <div className="grid md:grid-cols-12 grid-cols-6 gap-4  items-center">
            <div className="md:col-span-6 col-span-3 mb-10 mt-4">
              <h3 className="text-primaryText text-lg font-poppins font-semibold  capitalize">
                Account Information
              </h3>
            </div>
            <div className="md:col-span-6 col-span-3  md:flex  md:justify-end">
              <button
                type="submit"
                disabled={loading || !hasDataChanged()}
                className={`bg-secondaryBrand text-white md:px-8 px-4  md:py-4 md:text-md text-sm py-2 rounded-full mb-10 ${
                  loading || !hasDataChanged()
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-12 grid-cols-6 gap-4 bg-white  ">
            <div className="col-span-6  space-y-4 ">
              <TextInput
                id="firstName"
                name="firstName"
                label="First Name"
                placeholder="Enter your first name"
                icon={<PenIcon size={18} />}
                value={formik.values.firstName}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                className={"font-semibold"}
              />
              {formik.errors.firstName && formik.touched.firstName && (
                <p className="text-red-500 text-sm">
                  {formik.errors.firstName}
                </p>
              )}
            </div>
            <div className="col-span-6  space-y-4 ">
              <TextInput
                id="lastName"
                name="lastName"
                label="Last Name"
                placeholder="Enter your last name"
                icon={<PenIcon size={18} />}
                value={formik.values.lastName}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                className={"font-semibold"}
              />
              {formik.errors.lastName && formik.touched.lastName && (
                <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
              )}
            </div>

            <div className="md:col-span-6 col-span-12 mr-4">
              <TextInput
                id="email"
                name="email"
                label="E-mail Address"
                placeholder="Enter your email"
                type="email"
                icon={""}
                value={formik.values.email}
                disabled
                className3={"font-semibold disabled:opacity-50"}
              />
            </div>
            <div className="md:col-span-6 col-span-12">
              <TextInput
                id="phone"
                name="phone"
                label="Phone Number"
                placeholder="Enter your phone number"
                type="text"
                icon={<PenIcon size={18} />}
                value={formik.values.phone}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                className={"font-semibold"}
              />
              {formik.errors.phone && formik.touched.phone && (
                <p className="text-red-500 text-sm">{formik.errors.phone}</p>
              )}
            </div>
          </div>
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

          <ChevronRightIcon size={10} className="text-gray-400" />
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

export default ProfileInfoAdminPanel;
