import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { BASE_URL } from "../config";
import { useAuth } from "../auth/AuthContext";
import { doctorProfileCompletionSchema } from "../services/utils/validationSchemas";
import Toast from "../components/Toast";
import Header from "./landing-page/header";

const CompleteProfile = () => {
    const navigate = useNavigate();
    const { user, updateUser, isProfileComplete } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");

    // Redirect if profile is already complete
    useEffect(() => {
        // Temporarily commented out for testing
        // if (isProfileComplete()) {
        //   navigate("/doctor-admin/dashboard");
        // }
    }, [isProfileComplete, navigate]);

    // Formik setup with real-time validation
    const formik = useFormik({
        initialValues: {
            phoneNumber: user?.phoneNumber || "",
            address: user?.address || "",
            city: user?.city || "",
            zip: user?.zip || "",
            drLicenseNo: user?.drLicenseNo || "",
            officeRefNo: user?.officeRefNo || "",
        },
        validationSchema: doctorProfileCompletionSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            await handleSubmit(values);
        },
    });

    const handleSubmit = async (values) => {
        setIsSubmitting(true);

        const payload = {
            phone: values.phoneNumber,
            address: values.address,
            city: values.city,
            zip: values.zip,
            drLicenseNo: values.drLicenseNo,
            officeRefNo: values.officeRefNo,
        };

        try {
            const response = await axios.post(
                `${BASE_URL}/api/users/update-profile-info`,
                payload,
                {
                    headers: {
                        Accept: "*/*",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.data) {
                // Update user data in context
                const updatedUserData = {
                    ...user,
                    phoneNumber: values.phoneNumber,
                    address: values.address,
                    city: values.city,
                    zip: values.zip,
                    drLicenseNo: values.drLicenseNo,
                    officeRefNo: values.officeRefNo,
                };

                updateUser(updatedUserData);

                setToastMessage("Profile completed successfully!");
                setToastType("success");
                setToastVisible(true);

                // Navigate to dashboard after a short delay
                setTimeout(() => {
                    navigate("/doctor-admin/dashboard");
                }, 1500);
            }
        } catch (error) {
            console.error("Error completing profile:", error);
            setToastMessage(
                `Error: ${error.response?.data?.responseDesc || "Failed to complete profile. Please try again."}`
            );
            setToastType("error");
            setToastVisible(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeToast = () => {
        setToastVisible(false);
    };

    return (
        <>
            <Header />
            <div
                style={{
                    background: "linear-gradient(180deg, #E7F9FF 0%, rgba(229, 255, 246, 0.19) 106.26%)",
                }}
                className="min-h-screen flex items-center justify-center p-4 pt-24">
                <div className="w-full max-w-xl p-8" style={{
                    borderRadius: "16px",
                    border: "3px solid #FFF",
                    background: "rgba(255, 255, 255, 0.30)",
                }}>
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="font-poppins font-bold text-3xl text-[#013764] mb-3">
                            Almost <span className="text-[#00BCD4]">Done</span>!
                        </h1>
                        <p className="font-poppins text-sm text-[#949494] leading-relaxed">
                            You've signed up with Google. Please provide a few more details to finish setting up your account.
                        </p>
                    </div>

                    {/* Form Card */}
                    <div

                        className=""
                    >
                        {/* Form */}
                        <div className="space-y-4">
                            {/* Phone Number */}
                            <div className="relative">
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formik.values.phoneNumber}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Phone Number"
                                    className={`w-full rounded-lg py-3 px-4 text-sm border outline-none transition-colors ${formik.errors.phoneNumber && formik.touched.phoneNumber
                                            ? "border-red-500"
                                            : "border-gray-300 focus:border-[#013764]"
                                        }`}
                                />
                                {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                                    <div className="text-red-500 text-xs mt-1">
                                        {formik.errors.phoneNumber}
                                    </div>
                                )}
                            </div>

                            {/* Address */}
                            <div className="relative">
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Address"
                                    className={`w-full rounded-lg py-3 px-4 text-sm border outline-none transition-colors ${formik.errors.address && formik.touched.address
                                            ? "border-red-500"
                                            : "border-gray-300 focus:border-[#013764]"
                                        }`}
                                />
                                {formik.errors.address && formik.touched.address && (
                                    <div className="text-red-500 text-xs mt-1">
                                        {formik.errors.address}
                                    </div>
                                )}
                            </div>

                            {/* City + ZIP */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={formik.values.city}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="City"
                                        className={`w-full rounded-lg py-3 px-4 text-sm border outline-none transition-colors ${formik.errors.city && formik.touched.city
                                                ? "border-red-500"
                                                : "border-gray-300 focus:border-[#013764]"
                                            }`}
                                    />
                                    {formik.errors.city && formik.touched.city && (
                                        <div className="text-red-500 text-xs mt-1">
                                            {formik.errors.city}
                                        </div>
                                    )}
                                </div>

                                <div className="relative">
                                    <input
                                        type="text"
                                        id="zip"
                                        name="zip"
                                        value={formik.values.zip}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="ZIP"
                                        className={`w-full rounded-lg py-3 px-4 text-sm border outline-none transition-colors ${formik.errors.zip && formik.touched.zip
                                                ? "border-red-500"
                                                : "border-gray-300 focus:border-[#013764]"
                                            }`}
                                    />
                                    {formik.errors.zip && formik.touched.zip && (
                                        <div className="text-red-500 text-xs mt-1">
                                            {formik.errors.zip}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Doctor's License Number + Office Reference Number */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="drLicenseNo"
                                        name="drLicenseNo"
                                        value={formik.values.drLicenseNo}
                                        onChange={(e) => {
                                            formik.setFieldValue("drLicenseNo", e.target.value.toUpperCase());
                                        }}
                                        onBlur={formik.handleBlur}
                                        placeholder="Doctor's License Number"
                                        className={`w-full rounded-lg py-3 px-4 text-sm border outline-none transition-colors ${formik.errors.drLicenseNo && formik.touched.drLicenseNo
                                                ? "border-red-500"
                                                : "border-gray-300 focus:border-[#013764]"
                                            }`}
                                    />
                                    {formik.errors.drLicenseNo && formik.touched.drLicenseNo && (
                                        <div className="text-red-500 text-xs mt-1">
                                            {formik.errors.drLicenseNo}
                                        </div>
                                    )}
                                </div>

                                <div className="relative">
                                    <input
                                        type="text"
                                        id="officeRefNo"
                                        name="officeRefNo"
                                        value={formik.values.officeRefNo}
                                        onChange={(e) => {
                                            formik.setFieldValue("officeRefNo", e.target.value.toUpperCase());
                                        }}
                                        onBlur={formik.handleBlur}
                                        placeholder="Office Reference Number"
                                        className={`w-full rounded-lg py-3 px-4 text-sm border outline-none transition-colors ${formik.errors.officeRefNo && formik.touched.officeRefNo
                                                ? "border-red-500"
                                                : "border-gray-300 focus:border-[#013764]"
                                            }`}
                                    />
                                    {formik.errors.officeRefNo && formik.touched.officeRefNo && (
                                        <div className="text-red-500 text-xs mt-1">
                                            {formik.errors.officeRefNo}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Continue Button */}
                        <button
                            type="button"
                            onClick={() => formik.handleSubmit()}
                            disabled={isSubmitting}
                            className={`w-full mt-8 py-3 px-6 rounded-lg font-poppins font-semibold text-white text-sm transition-all duration-200 ${isSubmitting
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-[#013764] hover:bg-[#002550]"
                                }`}
                        >
                            {isSubmitting ? "Saving..." : "Continue"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Toast notification */}
            <Toast
                message={toastMessage}
                isVisible={toastVisible}
                onClose={closeToast}
                type={toastType}
            />
        </>
    );
};

export default CompleteProfile;
