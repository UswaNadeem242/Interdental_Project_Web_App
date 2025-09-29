import React, { useState } from "react";
import TextInput from "../../../Common/Input";
import CloudIcon from "../../../icon/CloudIcon";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { PatientvalidationSchema } from "../../../Common/FormsValidation";
import { EyeOpenIcon, EyeCloseIcon } from "../../../icon/EyeIcon";
import { addPatient } from "../../../api/doctorDasboard";
import Toast from "../../../components/Toast";

export default function AddPatientForm({ onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });

  const initialValues = {
    photo: null,
    username: "",
    email: "",
    phone: "",
    password: "",
  };

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

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image deletion
  const handleImageDelete = () => {
    setUploadedImage(null);
    setImagePreview(null);
    // Reset the file input
    const fileInput = document.getElementById("image-upload");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  // Form submit handler
  const handleSubmit = async (values, { setSubmitting }) => {
    // Validation check (following AddBrandModal pattern)
    if (
      !values.username ||
      !values.email ||
      !values.phone ||
      !values.password
    ) {
      showToast("Please fill all the fields", "error");
      setSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();

      // Append the image file (File object from input) - exactly like AddBrandModal
      if (uploadedImage) {
        formData.append("image", uploadedImage);
      }

      // Append the patient object with proper MIME type - exactly like AddBrandModal
      const patientData = {
        email: values.email,
        firstName: values.username,
        phoneNumber: values.phone,
        password: values.password,
      };
      formData.append(
        "req",
        new Blob([JSON.stringify(patientData)], { type: "application/json" })
      );

      // API call using the new addPatient function
      const response = await addPatient(formData);

      // Check for success using the API function response format
      if (response.success) {
        showToast("Patient added successfully!", "success");

        // Close drawer and refresh page after success
        setTimeout(() => {
          if (onClose) {
            onClose(); // Close the drawer
          } else {
            console.log("onClose function not available");
          }

          window.location.reload();
        }, 2000);
      } else {
        showToast(
          response.message || "Failed to add patient. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("API Error:", error);
      showToast("An error occurred. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={PatientvalidationSchema}
        onSubmit={handleSubmit}
      >
        {({
          setFieldValue,
          values,
          errors,
          touched,
          isValid,
          isSubmitting,
        }) => (
          <Form className="grid md:grid-cols-12 grid-cols-6 gap-4 bg-white">
            {/* Photo Upload */}
            <div className="col-span-6">
              {!imagePreview ? (
                <label className="inline-flex items-center px-6 py-4 bg-textField text-primaryText text-sm font-medium rounded-lg cursor-pointer transition w-full">
                  <div className="flex justify-between gap-3 items-center w-full">
                    <span>
                      <CloudIcon />
                    </span>
                    <p>Upload Photo</p>
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      setFieldValue("photo", e.currentTarget.files[0]);
                      handleImageUpload(e);
                    }}
                  />
                </label>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-3">
                  {/* Round Image Container with Delete Button */}
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
                      <img
                        src={imagePreview}
                        alt="Uploaded preview"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Delete Button - Top Right */}
                    <button
                      type="button"
                      onClick={() => {
                        handleImageDelete();
                      }}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full shadow-md flex items-center justify-center hover:bg-red-600 transition"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 6H5H21M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10 11V17"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14 11V17"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Upload New Profile Picture Button - Smaller */}
                  <label className="px-4 py-2 bg-blue-500 text-white text-xs font-medium rounded cursor-pointer hover:bg-blue-600 transition whitespace-nowrap">
                    Upload new profile picture
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        setFieldValue("photo", e.currentTarget.files[0]);
                        handleImageUpload(e);
                      }}
                    />
                  </label>
                </div>
              )}
              <ErrorMessage
                name="photo"
                component="div"
                className="text-red-700 text-sm mt-1"
              />
            </div>

            {/* First Name */}
            <div className="col-span-12 space-y-1">
              <Field
                as={TextInput}
                id="username"
                name="username"
                label="First Name"
                placeholder="Enter Name"
                type="text"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-700 text-sm"
              />
            </div>

            {/* Email */}
            <div className="col-span-12">
              <Field
                as={TextInput}
                id="email"
                name="email"
                label="Email"
                placeholder="Enter Email Address"
                type="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-700 text-sm"
              />
            </div>

            {/* Phone */}
            <div className="col-span-12">
              <Field
                as={TextInput}
                id="phone"
                name="phone"
                label="Phone Number"
                placeholder="Enter Phone Number"
                type="text"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-700 text-sm"
              />
            </div>

            {/* Password */}
            <div className="col-span-12">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <Field
                  as="input"
                  id="password"
                  name="password"
                  label="Password"
                  placeholder="Enter Password"
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded border borderPrimary py-2 px-3 pr-10 outline-none"
                />

                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOpenIcon /> : <EyeCloseIcon />}
                </span>
              </div>

              <ErrorMessage
                name="password"
                component="div"
                className="text-red-700 text-sm"
              />
            </div>
            {/* Submit Button */}
            <div className="col-span-12 mt-32">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-20 py-5 rounded-full capitalize w-full font-semibold bg-secondaryBrand text-white font-poppins text-sm whitespace-nowrap disabled:opacity-50"
              >
                {isSubmitting ? "Adding Patient..." : "Add Patient"}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />
    </div>
  );
}
