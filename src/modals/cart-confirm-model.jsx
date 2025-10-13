
import { useEffect, useRef } from 'react';
import ConfirmIcon from '.././icon/confirmIcon'
const CartConfirmModel = ({ isopenCartModel, setIsOpenCartModel, createOrder }) => {


    // const handleCloseModal = () => console.log('heelo')

    // const handleConfirm = async () => {
    //     await createOrder();      // ✅ call createOrder here
    //     // setIsOpenModel(false);    // close modal after API call
    // };

    // const handleCloseModal = () => {
    //     console.log("Modal close clicked");
    //     // setIsOpenModel(false); // ✅ actually close the modal
    // };

    // const handleConfirm = async () => {
    //     console.log("Confirm clicked"); // ✅ check working
    //     // await createOrder();
    //     // setIsOpenModel(false); // ✅ close after success
    // };

    // if (!isopenModel) return null;


    const handleCloseModal = () => {
        console.log("Close button clicked");
        // setIsOpenModel(false);
    };

    const handleConfirm = async () => {
        console.log("Confirm clicked");
        // await createOrder();
    };

    console.log("Modal mounted, isopenModel:", isopenCartModel);

    if (!isopenCartModel) return null;
    return (
        <>

            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50" onClick={(e) => {
                // Close only when clicking on the backdrop
                if (e.target === e.currentTarget) {
                    console.log("Backdrop clicked!");
                    setIsOpenCartModel(false); // optional close
                }
            }}>
                <div className="flex flex-col justify-center items-center gap-[24px] bg-white p-[32px] rounded-[24px] shadow-lg w-96 relative" onClick={(e) => e.stopPropagation()}>
                    <div className='bg-secondaryBrand w-24  h-24 rounded-full flex justify-center items-center'><ConfirmIcon /></div>

                    <div className="w-full">

                        <div className="flex justify-center items-center gap-1 pb-4   " >
                            <h3 className="font-poppins font-bold text-2xl leading-[30px] text-primaryText">
                                Confirm Order
                            </h3> </div>
                        <p className='text-center text-sm font-normal font-poppins text-secondaryText'>Are you sure you want to confirm this order? Once confirmed, you won’t be able to make changes.</p>
                        <div className='flex justify-between items-center gap-3 pt-4'>
                            <button
                                type='button'
                                onClick={handleCloseModal}
                                className=" px-10 py-4 rounded-full bg-background right-4 text-primaryText text-sm font-poppins"
                            >
                                Go Back
                            </button>
                            <button
                                type='button'
                                onClick={() => console.log('confirm')}
                                // onClick={() => handleConfirm()}
                                className=" px-4 py-4 rounded-full bg-secondaryBrand right-4 text-white text-sm font-poppins"
                            >
                                Yes, Confirm Order 1234
                            </button>
                        </div>


                    </div>

                </div>
            </div>
        </>
    );
};

export default CartConfirmModel;
