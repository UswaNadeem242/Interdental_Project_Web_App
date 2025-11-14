import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Icons from "../components/Icons";
import { useDispatch } from "react-redux";
import { showToast } from "../store/toast-slice";

const RejectClaimModal = ({ isOpen, onClose, onReject, claimId }) => {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const MAX_LENGTH = 500;

  const handleClose = () => {
    if (!isLoading) {
      setDescription("");
      onClose();
    }
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_LENGTH) {
      setDescription(value);
    }
  };

  const handleReject = async () => {
    if (!description.trim()) {
      dispatch(
        showToast({
          message: "Please provide a reason for rejecting this claim.",
          type: "error",
        })
      );
      return;
    }

    setIsLoading(true);
    try {
      await onReject(description);
      setDescription("");
    } catch (error) {
      console.error("Error rejecting claim:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-[100]">
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-[500px] bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col items-center space-y-4">
            <Icons.WarningHexagon className="w-[100px] h-[100px]" />

            <DialogTitle className="font-poppins font-bold text-2xl text-center">
              Reject Claim Request
            </DialogTitle>

            <p className="font-poppins text-[#98A0A0] text-center text-sm leading-5 px-4">
              Please provide a brief reason for rejecting this claim. The doctor will see your note in their dashboard.
            </p>

            <div className="w-full mt-4">
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Briefly describe the reason."
                maxLength={MAX_LENGTH}
                className="w-full min-h-[120px] px-4 py-3 border border-gray-300 rounded-lg resize-none outline-none focus:ring-0 focus:ring-offset-0 font-poppins text-sm"
                disabled={isLoading}
              />
              <div className="flex justify-end mt-2">
                <span className="text-xs text-gray-400 font-poppins">
                  {description.length}/{MAX_LENGTH}
                </span>
              </div>
            </div>

            <div className="flex justify-center items-center gap-4 w-full mt-6">
              <button
                onClick={handleClose}
                disabled={isLoading}
                className="flex justify-center items-center w-[123.5px] h-[56px] rounded-[28px] bg-[#F8F8F8] font-poppins font-semibold text-[#434343] text-sm transition-colors hover:bg-[#E8E8E8] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Go Back
              </button>
              <button
                onClick={handleReject}
                disabled={isLoading || !description.trim()}
                className={`flex justify-center items-center w-[123.5px] h-[56px] rounded-[28px] bg-secondaryBrand font-poppins font-semibold text-white text-sm transition-colors hover:bg-secondaryBrand/90 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading ? "Rejecting..." : "Reject Claim"}
              </button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default RejectClaimModal;

