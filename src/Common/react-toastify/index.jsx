import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../../store/toast-slice";
import { toast, ToastContainer } from "react-toastify";

const Toastify = () => {
  const { message, type, visible } = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    if (visible && message) {
      // Validate toast type and fallback to 'info' if invalid
      const validTypes = ["success", "error", "info", "warning"];
      const toastType = validTypes.includes(type) ? type : "info";

      // Debug logging for invalid types
      if (!validTypes.includes(type)) {
        console.warn(
          `Invalid toast type received: "${type}". Falling back to "info".`,
        );
      }

      toast[toastType](message, {
        position: "top-right", // 👈 you wanted bottom right
        autoClose: 3000,
      });
      dispatch(hideToast()); // reset so it doesn't repeat
    }
  }, [visible, message, type, dispatch]);

  return <ToastContainer />;
};

export default Toastify;
