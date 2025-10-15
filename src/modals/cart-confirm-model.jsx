import { useState } from "react";
import ConfirmIcon from ".././icon/confirmIcon";
const CartConfirmModel = ({
  isopenCartModel,
  setIsOpenCartModel,
  createOrder,
  activeTab,
}) => {
  const [loading, setLoading] = useState(false);

  const handleCloseModal = () => {
    activeTab("checkout");
    setIsOpenCartModel(false);
  };
  const handleConfirm = async () => {
    try {
      setLoading(true);
      await createOrder();
      activeTab("order");
      setIsOpenCartModel(false);
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setLoading(false);
    }
  };
  if (!isopenCartModel) return null;
  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
        onClick={(e) => {
          // Close only when clicking on the backdrop
          if (e.target === e.currentTarget) {
            console.log("Backdrop clicked!");
            setIsOpenCartModel(false); // optional close
          }
        }}
      >
        <div
          className="flex flex-col justify-center items-center gap-[24px] bg-white p-[32px] rounded-[24px] shadow-lg w-96 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-secondaryBrand w-24  h-24 rounded-full flex justify-center items-center">
            <ConfirmIcon />
          </div>

          <div className="w-full">
            <div className="flex justify-center items-center gap-1 pb-4   ">
              <h3 className="font-poppins font-bold text-2xl leading-[30px] text-primaryText">
                Confirm Order
              </h3>{" "}
            </div>
            <p className="text-center text-sm font-normal font-poppins text-secondaryText">
              Are you sure you want to confirm this order? Once confirmed, you
              won’t be able to make changes.
            </p>
            <div className="flex justify-between items-center gap-3 pt-4">
              <button
                type="button"
                onClick={handleCloseModal}
                className=" px-10 py-4 rounded-full bg-background right-4 text-primaryText text-sm font-poppins"
              >
                Go Back
              </button>
              <button
                type="button"
                onClick={() => handleConfirm()}
                disabled={loading}
                className={`px-4 py-4 rounded-full right-4 text-white text-sm font-poppins flex items-center justify-center min-w-[140px] ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-secondaryBrand hover:bg-blue-700"
                }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Confirming...
                  </>
                ) : (
                  "Yes, Confirm Order"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartConfirmModel;
