import React, { useEffect, useRef, useState } from "react";


const ChangePasswordModel = ({
    isModalPassword,
    setIsModalPassword,
}) => {


    const handleOpenModal = () => {
        setIsModalPassword(true);
    };

    const handleCloseModal = () => {
        setIsModalPassword(false);
    };
    // const [show, setShow] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const inputRef = useRef(null);
    const [value, setValue] = useState("");
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [show, setShow] = useState({
        old: false,
        new: false,
        confirm: false,
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            alert("New password and confirm password do not match!");
            return;
        }
        console.log("Submitted data:", formData);
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
            <div className="flex flex-col justify-center items-center gap-[24px] bg-white p-[32px] rounded-[24px] shadow-lg  md:w-auto w-96 relative">
                <div className=" w-[350px] ">
                    <div className="flex  justify-between items-center gap-[4px] pb-4 border-b  outline-offset-[-0.50px] outline-black/10">
                        <p className="font-poppins font-medium text-[20px] leading-[30px] text-[#0D4041]">
                            Change Password
                        </p>

                        <button
                            onClick={handleCloseModal}
                            className="w-6 h-6 rounded-full bg-[#E5E5E5] right-4 text-gray-500 hover:text-gray-800"
                        >
                            ✕
                        </button>
                    </div>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="mx-4 w-full rounded-3xl bg-white"
                >
                    {/* Old Password */}
                    <div className="relative mb-4">
                        <input
                            name="oldPassword"
                            value={formData.oldPassword}
                            onChange={handleChange}
                            placeholder="Old Password"
                            type={show.old ? "text" : "password"}
                            className="w-full rounded-full border border-secondaryText bg-red px-4 py-3 pr-11 text-sm text-gray-900 placeholder-gray-400 outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => setShow({ ...show, old: !show.old })}
                            className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600"
                        >
                            {show.old ? (
                                // Eye Open Icon
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path d="M1.5 12s4-7.5 10.5-7.5S22.5 12 22.5 12s-4 7.5-10.5 7.5S1.5 12 1.5 12z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            ) : (
                                // Eye Closed Icon
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path d="M3 3l18 18M10.58 10.58a3 3 0 004.24 4.24" />
                                    <path d="M9.88 4.12A9.77 9.77 0 0121 12c-1.5 2.5-4.5 6-9 6-1.67 0-3.23-.48-4.56-1.29" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* New Password */}
                    <div className="relative mb-4">
                        <input
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="New Password"
                            type={show.new ? "text" : "password"}
                            className="w-full rounded-full border border-secondaryText px-4 py-3 pr-11 text-sm text-gray-900 placeholder-gray-400 outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => setShow({ ...show, new: !show.new })}
                            className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600"
                        >
                            {show.new ? (
                                // Eye Open Icon
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path d="M1.5 12s4-7.5 10.5-7.5S22.5 12 22.5 12s-4 7.5-10.5 7.5S1.5 12 1.5 12z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            ) : (
                                // Eye Closed Icon
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path d="M3 3l18 18M10.58 10.58a3 3 0 004.24 4.24" />
                                    <path d="M9.88 4.12A9.77 9.77 0 0121 12c-1.5 2.5-4.5 6-9 6-1.67 0-3.23-.48-4.56-1.29" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative mb-4">
                        <input
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            type={show.confirm ? "text" : "password"}
                            className="w-full rounded-full border border-secondaryText px-4 py-3 pr-11 text-sm text-gray-900 placeholder-gray-400 outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => setShow({ ...show, confirm: !show.confirm })}
                            className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600"
                        >
                            {show.confirm ? (
                                // Eye Open Icon
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path d="M1.5 12s4-7.5 10.5-7.5S22.5 12 22.5 12s-4 7.5-10.5 7.5S1.5 12 1.5 12z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            ) : (
                                // Eye Closed Icon
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path d="M3 3l18 18M10.58 10.58a3 3 0 004.24 4.24" />
                                    <path d="M9.88 4.12A9.77 9.77 0 0121 12c-1.5 2.5-4.5 6-9 6-1.67 0-3.23-.48-4.56-1.29" />
                                </svg>
                            )}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className=" w-full flex justify-center items-center bg-secondaryBrand text-white  h-10  rounded-full  border-[1px] border-secondaryBrand gap-2 py-5   px-2  text-xs font-poppins font-normal leading-[18px]"
                    >
                        Confirm

                    </button>

                </form>




            </div>
        </div>
    );
};

export default ChangePasswordModel;
