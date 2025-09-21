import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../redux/toastSlice";

const Toast = () => {
    const dispatch = useDispatch();
    const { message, type, visible } = useSelector((state) => state.toast);

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                dispatch(hideToast());
            }, 3000); // auto hide after 3s
            return () => clearTimeout(timer);
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <div className={`fixed bottom-4 right-4 p-4 rounded shadow-lg text-white
      ${type === "error" ? "bg-red-500" : "bg-blue-500"}`}>
            {message}
        </div>
    );
};

export default Toast;
