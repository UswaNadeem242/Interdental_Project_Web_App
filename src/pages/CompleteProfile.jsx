import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { BASE_URL } from "../config";
import { useAuth } from "../auth/AuthContext";
import { doctorProfileCompletionSchema } from "../services/utils/validationSchemas";
import Toast from "../components/Toast";

const CompleteProfile = () => {
    const navigate = useNavigate();
    const { user, updateUser, isProfileComplete, logout } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");

    useEffect(() => {
        // if (isProfileComplete()) {
        //   navigate("/doctor-admin/dashboard");
        // }
    }, [isProfileComplete, navigate]);

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
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            phone: values.phoneNumber,
            address: values.address,
            city: values.city,
            zip: values.zip,
            officeRefNumber: values.officeRefNo,
            doctorLicenceNumber: values.drLicenseNo,
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
                setToastMessage("Profile completed successfully!");
                setToastType("success");
                setToastVisible(true);

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

    const SimpleHeader = () => (
        <header className="fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 top-4 w-[95%] sm:w-[92%] md:w-[90%]">
            {/* pill container */}
            <div className="mx-auto flex items-center justify-between bg-white/95 ring-1 ring-black/5 backdrop-blur px-3 sm:px-5 md:px-6 py-2.5 transition-all duration-300 rounded-full">
                <div className="w-10 lg:hidden" />

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <img
                            src="/assets/logo.png"
                            alt="Interdental Lab"
                            className="h-5 w-auto sm:h-5"
                        />
                    </div>
                </div>

                <div className="hidden lg:flex items-center gap-4">
                    {user && user?.email ? (
                        <button
                            onClick={() => {
                                logout();
                                navigate("/login");
                            }}
                            className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white whitespace-nowrap text-sm font-semibold shadow-[inset_0_-2px_0_rgba(255,255,255,0.15)] transition-colors"
                        >
                            Logout
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate("/login")}
                            className="px-4 py-2 rounded-full bg-secondaryBrand text-white whitespace-nowrap text-sm font-semibold shadow-[inset_0_-2px_0_rgba(255,255,255,0.15)]"
                        >
                            Log In
                        </button>
                    )}
                </div>

                <div className="lg:hidden">
                    {user && user?.email ? (
                        <button
                            onClick={() => {
                                logout();
                                navigate("/login");
                            }}
                            className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors"
                        >
                            Logout
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate("/login")}
                            className="px-4 py-2 rounded-full bg-secondaryBrand text-white text-sm font-semibold"
                        >
                            Log In
                        </button>
                    )}
                </div>
            </div>
        </header>
    );

    return (
        <>
            <SimpleHeader />
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
                    <div className="text-center mb-8">
                        <h1 className="font-poppins font-bold text-3xl text-[#013764] mb-3">
                            Almost <span className="text-[#00BCD4]">Done</span>!
                        </h1>
                        <p className="font-poppins text-sm text-[#949494] leading-relaxed">
                            You've signed up with Google. Please provide a few more details to finish setting up your account.
                        </p>
                    </div>

                    <div

                        className=""
                    >
                        <div className="space-y-4">
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
