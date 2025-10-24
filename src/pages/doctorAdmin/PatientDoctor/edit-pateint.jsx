import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import TextInput from "../../../Common/Input";
import Toast from "../../../components/Toast";
import { PatientvalidationSchema } from "../../../Common/FormsValidation";
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

    // 🧠 Initialize form fields with userData (or empty if not provided)
    const initialValues = {
        firstName: firstName,
        lastName: lastName,
        email: userData?.email || "",
        phone: userData?.phone || "",
        address: userData?.address || "",
    };
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const bodyData = {
                email: values.email,
                firstName: values.firstName,
                lastName: values.lastName,
                phone: values.phone,
                address: values.address,
            };
            const response = await updateUserPatient(bodyData);

            if (response.success) {
                showToast("User updated successfully!", "success");
                setTimeout(() => {
                    onClose && onClose();
                    window.location.reload();
                }, 1500);
            } else {
                showToast(response?.data?.responseDesc || "Failed to update user.", "error");
            }
        } catch (error) {
            console.error("Error updating user:", error);
            showToast("Something went wrong!", "error");
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <div>
            <Formik
                initialValues={initialValues}
                enableReinitialize // ✅ re-fill when userData changes
                // validationSchema={PatientvalidationSchema(true)}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="grid md:grid-cols-12 grid-cols-6 gap-4 bg-white">
                        {/* First + Last Name */}
                        <div className="col-span-6">
                            <Field
                                as={TextInput}
                                name="firstName"
                                label="First Name"
                                placeholder="Enter First Name"
                            />
                            <ErrorMessage name="firstName" component="div" className="text-red-700 text-sm" />
                        </div>
                        <div className="col-span-6">
                            <Field
                                as={TextInput}
                                name="lastName"
                                label="Last Name"
                                placeholder="Enter Last Name"
                            />
                            <ErrorMessage name="lastName" component="div" className="text-red-700 text-sm" />
                        </div>

                        {/* Email */}
                        <div className="col-span-12">
                            <Field
                                as={TextInput}
                                name="email"
                                label="Email"
                                placeholder="Enter Email"
                                type="email"
                                readOnly
                                // disabled={isDisabled}
                                // onClick={handleDisable}
                            />
                            <ErrorMessage name="email" component="div" className="text-red-700 text-sm" />
                        </div>

                        {/* Phone */}
                        <div className="col-span-12">
                            <Field
                                as={TextInput}
                                name="phone"
                                label="Phone Number"
                                placeholder="Enter Phone Number"
                            />
                            <ErrorMessage name="phone" component="div" className="text-red-700 text-sm" />
                        </div>

                        {/* Address */}
                        <div className="col-span-12">
                            <Field
                                as={TextInput}
                                name="address"
                                label="Address"
                                placeholder="Enter Address"
                            />
                            <ErrorMessage name="address" component="div" className="text-red-700 text-sm" />
                        </div>

                        {/* Submit */}
                        <div className="col-span-12 mt-6">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-20 py-5 rounded-full capitalize w-full font-semibold bg-secondaryBrand text-white font-poppins text-sm whitespace-nowrap disabled:opacity-50"
                            >
                                {isSubmitting ? "Updating..." : "Update Patient"}
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
