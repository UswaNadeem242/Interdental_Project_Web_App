import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountDeactivate from "../../modals/AccountDeactivateModal";
import axios from "axios";
import { BASE_URL } from "../../config";
import Toast from "../../components/Toast";
import YearlyPlanModel from "../../modals/yearly-plan";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const DoctorSignup = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [drLicenseNo, setdrLicense] = useState("");
    const [officeRefNo, setofficeRefNo] = useState("");
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");
    const [labs, setLabs] = useState([]);
    const [selectedLab, setSelectedLab] = useState("");
    const [yearly, setYearly] = useState(false)
    const validate = () => {
        if (!firstName?.trim()) return "First name is required";
        if (!lastName?.trim()) return "Last name is required";     // remove if not needed
        if (!email?.trim()) return "Email is required";
        if (!phoneNumber?.trim()) return "Phone is required";
        if (!address) return "Address is required";
        if (!city) return "City is required";
        if (!zip) return "Zip Number is required";
        if (!drLicenseNo) return "Doctor's License Number is required";
        if (!officeRefNo) return "Office Reference number is required";
        if (!password) return "Password is required"; 
        const nameRegex = /^[A-Za-z]{3,}$/;
        const numberRegex = /^[0-9]{10}$/;
        const zipRegex = /^[0-9]{5}$/;
        const addressRegex = /^(?=.*[A-Za-z0-9])[A-Za-z0-9\s,.'#\/&@-]+$/;
        if (!nameRegex.test(firstName)) return "Enter a valid First Name (letters only)";
        if (!nameRegex.test(lastName)) return "Enter a valid Last Name (letters only)";
        if (!addressRegex.test(city)) return "Enter a City Name";
        if (!zipRegex.test(zip)) return "Enter a valid 5-digit Zip Code";
        // if (!addressRegex.test(address)) return "Enter a valid Address";
        // Must contain at least one letter or digit


        if (!addressRegex.test(address)) {
            return "Enter a valid Address";
        }

        if (!numberRegex.test(drLicenseNo)) return "Enter a valid 10-digit Doctor's License Number";
        if (!numberRegex.test(officeRefNo)) return "Enter a valid 10-digit Office Reference number";
        if (!password) return "Password is required";
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return "Enter a valid email address";
        // Optional: phone 7–15 digits
        const phoneRegex = /^[0-9]{11}$/;
        if (!phoneNumber) return "Phone number is required";
        if (!phoneRegex.test(phoneNumber)) return "Enter a valid 11-digit phone number";
        return null;
    };
    const handleSignup = async () => {
        const error = validate();
        if (error) {
            setToastMessage(error);
            setToastType("error");
            setToastVisible(true);
            return;
        }
        const payload = {
            email,
            password,
            firstName,
            lastName,
            phoneNumber,
            address,
            drLicenseNo,
            officeRefNo, 
            role: "DOCTOR",
        };
        try {
            const response = await axios.post(`${BASE_URL}/api/users/sign-up`, payload,
                {
                    headers: {
                        Accept: "*/*",
                    },
                });
            setToastMessage("User Registered Successfully!");
            setToastType("success");
            setToastVisible(true);
            navigate("/login");
        } catch (error) {
            console.log("Signup error:", error);
            setToastMessage(`Error: ${error.response?.data?.responseDesc || error.responseDesc}`);
            setToastType("error");
            setToastVisible(true);
        } finally {

        }
    };
    const [isLoadingLabs, setIsLoadingLabs] = useState(false);
    // useEffect(() => {
    //     const loadLabs = async () => {
    //         try {
    //             setIsLoadingLabs(true);

    //             const res = await axios.get(`${BASE_URL}/api/lab/getAll`);
    //             // Ensure raw is always an array
    //             const raw =
    //                 Array.isArray(res.data)
    //                     ? res.data
    //                     : Array.isArray(res.data?.data)
    //                         ? res.data.data
    //                         : Array.isArray(res.data?.content)
    //                             ? res.data.content
    //                             : [];

    //             const options = raw.map((l) => ({
    //                 label: l.name || l.labName || `Lab ${l.id}`,
    //                 value: String(l.id),
    //             }));

    //             setLabs(options);
    //             setSelectedLab(options.length > 0 ? options[0].value : "");
    //         } catch (err) {
    //             setToastMessage(
    //                 `Could not load labs: ${err.response?.data?.message || err.message}`
    //             );
    //             setToastType("error");
    //             setToastVisible(true);
    //         } finally {
    //             setIsLoadingLabs(false);
    //         }
    //     };
    //     loadLabs();
    // }, []);

    const closeToast = () => {
        setToastVisible(false);
    };

    return (
        <div className="mt-3">
            <div className="flex flex-col justify-center items-center w-full lg:w-[494px] h-auto lg:h-[581px] gap-6 lg:gap-[32px]">
                <div className="flex flex-col justify-center items-center w-full lg:w-[494px] gap-8">


                    {/* Form */}
                    <div className="w-full space-y-4">
                        {/* Full width */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                            <div className="relative w-full">
                                <input
                                    type="text"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder=" "
                                    className="peer w-full rounded-md     py-3 px-4 text-textFieldHeading outline-none
                "
                                />
                                <label
                                    htmlFor="firstName"
                                    className="absolute left-3 top-3 text-gray-400 text-sm transition-all
      peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryBrand
      peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-secondaryBrand
    "
                                >
                                    First Name
                                </label>
                            </div>


                            <div className="relative w-full">
                                <input
                                    type="text"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder=" "  // ek space zaroori hai
                                    className="peer w-full rounded-md  py-3 px-4 text-textFieldHeading outline-none focus:border-secondaryBrand"
                                />
                                <label
                                    htmlFor="lastName"
                                    className="absolute left-3 top-3 text-gray-400 text-sm transition-all
      peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryBrand
      peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-secondaryBrand
    "
                                >
                                    Last Name
                                </label>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder=" "
                                    className="peer w-full rounded-md   py-3 px-4 text-textFieldHeading outline-none focus:border-secondaryBrand"
                                />
                                <label
                                    htmlFor="email"
                                    className="absolute left-3 top-3 text-gray-400 text-sm transition-all
      peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryBrand
      peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-secondaryBrand
    "
                                >
                                    Email
                                </label>
                            </div>

                            <div className="relative w-full">
                                <input
                                    type="text"
                                    id="phone"
                                    value={phoneNumber}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder=" "
                                    className="peer w-full rounded-md  py-3 px-4 text-textFieldHeading outline-none focus:border-secondaryBrand"
                                />
                                <label
                                    htmlFor="phone"
                                    className="absolute left-3 top-3 text-gray-400 text-sm transition-all
      peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryBrand
      peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-secondaryBrand
    "
                                >
                                    Phone
                                </label>
                            </div>

                        </div>

                        {/* Address */}
                        <div className="relative w-full">
                            <input
                                type="text"
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder=" "
                                className="peer w-full rounded-md   py-3 px-4 text-textFieldHeading outline-none focus:border-secondaryBrand"
                            />
                            <label
                                htmlFor="address"
                                className="absolute left-3 top-3 text-gray-400 text-sm transition-all
      peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryBrand
      peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-secondaryBrand
    "
                            >
                                Address
                            </label>
                        </div>


                        {/* City + Zip */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    id="city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder=" "
                                    className="peer w-full rounded-md  py-3 px-4 text-textFieldHeading outline-none focus:border-secondaryBrand"
                                />
                                <label
                                    htmlFor="city"
                                    className="absolute left-3 top-3 text-gray-400 text-sm transition-all
      peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryBrand
      peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-secondaryBrand
    "
                                >
                                    City
                                </label>
                            </div>
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    id="zip"
                                    value={zip}
                                    onChange={(e) => setZip(e.target.value)}
                                    placeholder=" "
                                    className="peer w-full rounded-md   py-3 px-4 text-textFieldHeading outline-none focus:border-secondaryBrand"
                                />
                                <label
                                    htmlFor="zip"
                                    className="absolute left-3 top-3 text-gray-400 text-sm transition-all
      peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryBrand
      peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-secondaryBrand
    "
                                >
                                    Zip
                                </label>
                            </div>

                        </div>

                        {/* License + Office Ref */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    id="drLicenseNo"
                                    value={drLicenseNo}
                                    onChange={(e) => setdrLicense(e.target.value)}
                                    placeholder=" "
                                    className="peer w-full rounded-md   py-3 px-4 text-textFieldHeading outline-none focus:border-secondaryBrand"
                                />
                                <label
                                    htmlFor="drLicenseNo"
                                    className="absolute left-3 top-3 text-gray-400 text-sm transition-all
      peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryBrand
      peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-secondaryBrand
    "
                                >
                                    Doctor's License Number
                                </label>
                            </div>

                            <div className="relative w-full">
                                <input
                                    type="text"
                                    id="officeRefNo"
                                    value={officeRefNo}
                                    onChange={(e) => setofficeRefNo(e.target.value)}
                                    placeholder=" "
                                    className="peer w-full rounded-md   py-3 px-4 text-textFieldHeading outline-none focus:border-secondaryBrand"
                                />
                                <label
                                    htmlFor="officeRefNo"
                                    className="absolute left-3 top-3 text-gray-400 text-sm transition-all
      peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryBrand
      peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-secondaryBrand
    "
                                >
                                    Office Reference Number
                                </label>
                            </div>

                        </div>

                        {/* Password */}
                        <div className="relative w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder=" "
                                className="peer w-full rounded-md   py-3 px-4 text-textFieldHeading outline-none focus:border-secondaryBrand"
                            />
                            <label
                                htmlFor="password"
                                className="absolute left-3 top-3 text-gray-400 text-sm transition-all
      peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryBrand
      peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-secondaryBrand
    "
                            >
                                Password
                            </label>

                            {/* Eye Icon */}
                            <div
                                className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    // Eye Open
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#808080"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                ) : (
                                    // Eye Closed
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#808080"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M17.94 17.94C16.09 19.09 14.06 19.75 12 19.75c-7 0-11-7-11-7 1.65-3.3 4.66-5.68 8-6.7" />
                                        <path d="M12 5c7 0 11 7 11 7-1.65 3.3-4.66 5.68-8 6.7" />
                                        <line x1="1" y1="1" x2="23" y2="23" /> {/* Diagonal line */}
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-4  items-center flex flex-col w-full lg:w-[494px] h-auto lg:h-[270px] gap-6 lg:gap-[32px]">
                    <button
                        onClick={() => handleSignup()}
                        className="w-full lg:w-[494px] h-[57px] gap-[10px] rounded-[99px] py-[18px] px-4 lg:px-[129px] bg-secondaryBrand font-poppins font-semibold text-white text-sm lg:text-[14px] leading-[21px]"
                    >
                        Sign Up
                    </button>


                    <div className="flex flex-col justify-center items-center w-full h-auto lg:h-[93px] space-y-4 lg:space-y-[16px]">
                        <p className="font-poppins font-normal text-sm lg:text-[14px] leading-[21px] text-[#808080]">
                            Already have an account
                        </p>
                        <button
                            onClick={() => navigate("/login")}
                            className="w-full lg:w-[494px] h-[57px] gap-[10px] rounded-[99px] py-[18px] px-4 lg:px-[129px] font-poppins font-semibold border-[1px] border-[#013764] text-secondaryBrand text-sm lg:text-[14px] leading-[21px]"
                        >
                            Log in
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal and Toast components */}
            {isModalOpen && (
                <AccountDeactivate
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                />
            )}
            <Toast
                message={toastMessage}
                isVisible={toastVisible}
                onClose={closeToast}
                type={toastType}
            />
            {yearly && (
                <YearlyPlanModel
                    yearly={yearly}
                    setYearly={setYearly}
                />
            )}


        </div>
    );
};

export default DoctorSignup;


















