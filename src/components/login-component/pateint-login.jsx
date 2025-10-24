import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../config";
import { useAuth } from "../../auth/AuthContext";
import AccountDeactivate from "../../modals/AccountDeactivateModal";
import { showToast } from "../../store/toast-slice";
import { useDispatch } from "react-redux";

const PateintLogin = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            dispatch(
                showToast({
                    message: 'Please fill all the fields',
                    type: "error",
                })
            );
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(
                `${BASE_URL}/api/users/sign-in`,
                {
                    email: email,
                    password: password,
                    fcmToken: "",
                    gmailToken: "",
                    facebookToken: "",
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "*/*",
                    },
                }
            );
            setLoading(false);
            if (
                response.data.responseCode === "003" ||
                response.data.responseMessage === "User is not active"
            ) {
                dispatch(
                    showToast({
                        message: 'Invalid email or password. Please try again.',
                        type: "error",
                    })
                );
            }
            // { setIsModalOpen(true); }
            login(response?.data?.data?.users, response?.data?.data?.accessToken);
            if (response.data.data.users.roles[0] === "ADMIN") {
                navigate("/doctor-admin/dashboard");
            } else if (response.data.data.users.roles[0] === "PATIENT") {
                navigate("/patient-admin/dashboard");
            } else if (response.data.data.users.roles[0] === "DOCTOR") {
                navigate("/doctor-admin/dashboard");
            } else {
                dispatch(
                    showToast({
                        message: 'Login failed',
                        type: "error",
                    })
                );
            }
        } catch (error) {
            console.log(error);
            // alert("Wrong credentials");
            setLoading(false);
        }
    };


    return (
        <div className="pt-5">
            {/* flex    flex-col lg:flex-row justify-start items-center lg:gap-20 p-4 lg:p-8 bg-gradient-to-b from-[#E7F9FF] to-[#E5FFF600] min-h-screen */}


            {/* Login form */}
            <div className="flex flex-col justify-center items-center w-full lg:w-[494px]  gap-6 lg:gap-8">
                <div className="flex flex-col justify-center items-center w-full px-4 lg:w-[494px]  gap-4 lg:gap-[16px]">
                    <div className="relative w-full lg:w-[494px]">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder=" "
                            className="peer w-full rounded-full   py-3 px-4 text-textFieldHeading outline-none focus:border-secondaryBrand"
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
                    <div className="relative w-full lg:w-[494px]">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className="peer w-full h-[51px] rounded-[32px] border border-[#FFFFFF] px-[24px] pr-12 outline-none text-textFieldHeading placeholder-transparent"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {/* Floating Label */}
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
                            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
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
                                    <path d="M1 1l22 22" /> {/* diagonal line crossing the eye */}
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            )}
                        </div>
                    </div>



                    <p

                        onClick={() => {
                            if (email && email.trim() !== "") {

                                navigate("/forgot-password");
                            } else {
                                dispatch(
                                    showToast({
                                        message: "Please Add the Email First",
                                        type: "error",
                                    })
                                );
                            }
                        }}


                        className="flex justify-end w-full font-poppins font-normal cursor-pointer text-xs lg:text-[12px] leading-[18px] text-secondaryBrand"
                    >
                        Forgot Password ?
                    </p>
                </div>

                <div className="flex items-center flex-col w-full lg:w-[494px] h-auto lg:h-[270px] gap-6 px-6 lg:gap-[32px]">
                    <button
                        onClick={() => handleLogin()}
                        disabled={loading}
                        className={`w-full lg:w-[494px] h-[57px] gap-[10px] rounded-[99px] py-[18px] px-4  lg:px-[129px] bg-secondaryBrand font-poppins font-semibold text-white text-sm lg:text-[14px] leading-[21px] ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                            }`}
                    >
                        Login
                    </button>
                </div>
            </div>
            {
                isModalOpen && (
                    <AccountDeactivate
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                    />
                )
            }
        </div >
    );
};

export default PateintLogin;
