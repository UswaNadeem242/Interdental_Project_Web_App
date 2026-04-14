import React, { useState } from "react";
import TextInput from "../../../Common/Input"; 
import { ErrorMessage, Field, Formik, Form } from "formik";
import { AddPatientValidationSchema } from "../../../Common/FormsValidation";
import { EyeOpenIcon, EyeCloseIcon } from "../../../icon/EyeIcon";
import { addPatient } from "../../../api/doctorDasboard";
import Toast from "../../../components/Toast";

export default function AddPatientForm({
  fetchPatients,
  onClose, 
  skipImageValidation = false
}) {
  const [showPassword, setShowPassword] = useState(false);
  // const [uploadedImage, setUploadedImage] = useState(null); 
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });

  const initialValues = {
    // photo: null,
    username: "",
    lastName: "",
    address: "",
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
  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setUploadedImage(file);
  //     // Create preview URL
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setImagePreview(e.target.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // Handle image deletion
  // const handleImageDelete = () => {
  //   setUploadedImage(null);
  //   setImagePreview(null);
  //   // Reset the file input
  //   const fileInput = document.getElementById("image-upload");
  //   if (fileInput) {
  //     fileInput.value = "";
  //   }
  // };

  // Form submit handler
  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("Add Patient Form - Starting submission with values:", values);
    // console.log("Add Patient Form - Uploaded image:", uploadedImage);
    console.log("Add Patient Form - Validation passed, proceeding with API call");

    if (
      !values.username ||
      !values.lastName ||
      !values.address ||
      !values.email ||
      !values.phone ||
      !values.password
    ) {
      console.log("Add Patient Form - Validation failed: Missing required fields");
      showToast("Please fill all the fields", "error");
      setSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();

      // Append the image file (File object from input) - exactly like AddBrandModal
      // if (uploadedImage) {
      //   formData.append("image", uploadedImage);
      // }

      // Append the patient object with proper MIME type - exactly like AddBrandModal
      const patientData = {
        email: values.email,
        firstName: values.username,
        lastName: values?.lastName,
        address: values?.address,
        phoneNumber: values.phone,
        password: values.password,
      };
      formData.append(
        "req",
        new Blob([JSON.stringify(patientData)], { type: "application/json" })
      );

      // API call using the new addPatient function
      console.log("Add Patient Form - Sending formData to API:", formData);
      const response = await addPatient(formData);
      console.log("Add Patient Form - API Response:", response);
      // Check for success using the API function response format
      if (response.success) {
        console.log("Add Patient Form - Success! Patient added successfully");
        showToast("Patient added successfully!", "success");

       
        setTimeout(() => {
          if (onClose) {
            onClose(); // Close the drawer
          } else {
            console.log("onClose function not available");
          }
          fetchPatients();
        }, 2000);
      } else {
        console.log("Add Patient Form - Failed to add patient:", response);
        showToast(
          response?.data?.responseDesc ||
          "Failed to add patient. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Add Patient Form - API Error:", error);
      showToast("An error occurred. Please try again.", "error");
    } finally {
      console.log("Add Patient Form - Submission completed");
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        // validationSchema={PatientvalidationSchema}
        validationSchema={AddPatientValidationSchema(skipImageValidation)}
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
          <div className="relative h-full bg-white">
            <Form className="grid md:grid-cols-12 grid-cols-6 gap-4 py-4 pb-20">




              {/* First Name */}
              <div className="col-span-12 grid grid-cols-12 gap-2">
                <div className="col-span-12 sm:col-span-6">
                  <Field
                    as={TextInput}
                    id="username"
                    name="username"
                    label="First Name"
                    placeholder="First Name"
                    type="text"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-700 text-sm"
                  />
                </div>
                <div className="col-span-12 sm:col-span-6">
                  <Field
                    as={TextInput}
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    placeholder="Last Name"
                    type="text"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-700 text-sm"
                  />
                </div>
              </div>
              {/* Email */}
              <div className="col-span-12">
                <Field
                  as={TextInput}
                  id="email"
                  name="email"
                  label="Email Address"
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

              <div className="col-span-12">
                <Field
                  as={TextInput}
                  id="address"
                  name="address"
                  label="Address"
                  placeholder="Enter Address"
                  type="text"
                />
                <ErrorMessage
                  name="address"
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
                    className="w-full rounded border borderPrimary py-2 px-2 text-sm outline-none"
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
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-10">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full capitalize font-semibold bg-secondaryBrand text-white font-poppins text-sm disabled:opacity-50"
                >
                  {isSubmitting ? "Adding Patient..." : "Add Patient"}
                </button>
              </div>
            </Form>

            {/* Fixed Bottom Submit Button */}

          </div>
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
