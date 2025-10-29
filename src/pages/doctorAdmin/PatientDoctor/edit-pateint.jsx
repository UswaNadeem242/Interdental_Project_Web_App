import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import TextInput from "../../../Common/Input";
import Toast from "../../../components/Toast";
import { EditPatientValidationSchema } from "../../../Common/FormsValidation";
import { updateUserPatient } from "../../../api/doctorDasboard";

export default function EditPatientForm({ onClose, userData }) {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleDisable = () => {
    setIsDisabled(true); // disable on click
  };

  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") =>
    setToast({ isVisible: true, message, type });
  const hideToast = () =>
    setToast({ isVisible: false, message: "", type: "success" });
  const [firstName = "", lastName = ""] = userData?.name
    ? userData.name.split(" ")
    : [];

  const initialValues = {
    firstName: firstName,
    lastName: lastName,
    email: userData?.email || "",
    phone: userData?.phone || "",
    address: userData?.address || "",
  };
  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("Edit Patient Form - Starting submission with values:", values);
    console.log("Edit Patient Form - User data:", userData);
    console.log("Edit Patient Form - Validation passed, proceeding with API call");

    try {
      const bodyData = {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        address: values.address,
      };

      console.log("Edit Patient Form - Sending data to API:", bodyData);
      const response = await updateUserPatient(bodyData);
      console.log("Edit Patient Form - API Response:", response);

      if (response.success) {
        console.log("Edit Patient Form - Success! User updated successfully");
        showToast("User updated successfully!", "success");
        setTimeout(() => {
          onClose && onClose();
          window.location.reload();
        }, 1500);
      } else {
        console.log("Edit Patient Form - Failed to update user:", response);
        showToast(
          response?.data?.responseDesc || "Failed to update user.",
          "error"
        );
      }
    } catch (error) {
      console.error("Edit Patient Form - Error updating user:", error);
      showToast("Something went wrong!", "error");
    } finally {
      console.log("Edit Patient Form - Submission completed");
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={EditPatientValidationSchema()}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <div className="relative h-full bg-white">
            <Form className="grid md:grid-cols-12 grid-cols-6 gap-4 pb-20">
              {/* First + Last Name */}
              <div className="col-span-6">
                <Field
                  as={TextInput}
                  name="firstName"
                  label="First Name"
                  placeholder="Enter First Name"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-700 text-sm"
                />
              </div>
              <div className="col-span-6">
                <Field
                  as={TextInput}
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter Last Name"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-700 text-sm"
                />
              </div>

              {/* Email */}
              <div className="col-span-12">
                <Field
                  as={TextInput}
                  name="email"
                  label="Email Address"
                  placeholder="Enter Email Address"
                  type="email"
                  readOnly
                // disabled={isDisabled}
                // onClick={handleDisable}
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
                  name="phone"
                  label="Phone Number"
                  placeholder="Enter Phone Number"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-700 text-sm"
                />
              </div>

              {/* Address */}
              <div className="col-span-12">
                <Field
                  as={TextInput}
                  name="address"
                  label="Address"
                  placeholder="Enter Address"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-700 text-sm"
                />
              </div>
              {/* Fixed Bottom Submit Button */}
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full capitalize font-semibold bg-secondaryBrand text-white font-poppins text-sm disabled:opacity-50"
                >
                  {isSubmitting ? "Updating..." : "Update Patient"}
                </button>
              </div>

            </Form>


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
