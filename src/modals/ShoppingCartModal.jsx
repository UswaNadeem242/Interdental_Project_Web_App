import React, { useEffect, useState } from "react";
import CartProduct from "../components/CartProduct";
import product2 from "../assets/product2.png";

const ShoppingCart = ({ isModalOpen, setIsModalOpen }) => {
  const [activeTab, setActiveTab] = useState("cart");
  const [openOrders, setOpenOrders] = useState(true);
  const [openPaymentMethod, setOpenPaymentMethod] = useState(true);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isModalOpen]);

  return (
    <div className="fixed top-0 right-0 inset-0 flex items-center justify-end bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="flex flex-col justify-center items-center bg-[#FAFAFA] p-[32px] gap-[16px] shadow-lg w-[651px] h-full relative">
        {/* Tabs */}
        <div className="flex justify-around w-[587px] h-[68.69px] mb-[16px] pb-[16px] pt-[8px]">
          <div className="flex justify-around w-[539.02px] h-[44.69px]">
            <button
              onClick={() => setActiveTab("cart")}
              className={`py-2 px-4 font-poppins font-semibold text-[16px] leading-[24px] ${
                activeTab === "cart"
                  ? "border-b-[4.69px] border-secondaryBrand font-semibold"
                  : "text-[#949494] border-b-[4.69px] border-[#0000000D]"
              }`}
            >
              Shopping Cart
            </button>
            <button
              onClick={() => setActiveTab("checkout")}
              className={`py-2 px-4 font-poppins font-semibold text-[16px] leading-[24px] ${
                activeTab === "checkout"
                  ? "border-b-[4.69px] border-secondaryBrand font-semibold"
                  : "text-[#949494] border-b-[4.69px] border-[#0000000D]"
              }`}
            >
              Checkout
            </button>
            <button
              onClick={() => setActiveTab("order")}
              className={`py-2 px-4 font-poppins font-semibold text-[16px] leading-[24px] ${
                activeTab === "order"
                  ? "border-b-[4.69px] border-secondaryBrand font-semibold"
                  : "text-[#949494] border-b-[4.69px] border-[#0000000D]"
              }`}
            >
              Order Completion
            </button>
          </div>
          <button
            onClick={handleCloseModal}
            className="py-2 px-4 text-[#393A44] hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-auto">
          {activeTab === "cart" && (
            <div className="flex flex-col justify-start items-start space-y-8">
              <div className="flex flex-col justify-start items-start gap-4 overflow-y-auto h-[calc(100vh-320px)]">
                <CartProduct />
                <CartProduct />
                <CartProduct />
              </div>
              <div className="fixed bottom-0 w-[587px] h-[168px] rounded-[32px] border-[1px] border-[#0000000D] space-y-[24px] py-[24px] px-[32px] bg-[#FFFFFF]">
                <div className="flex justify-between items-center w-[523px] h-[39px] gap-[16px] border-b-[1px] border-[#0000000D]">
                  <h1 className="font-poppins font-medium text-[16px] leading-[24px] text-[#1A1A1A]">
                    Subtotal
                  </h1>
                  <h1 className="font-poppins font-bold text-[26px] leading-[39px] text-[#1A1A1A]">
                    539 $
                  </h1>
                </div>
                <div className="flex justify-between items-center w-[523px] h-[57px] gap-[20px]">
                  <div className="flex justify-center items-center w-[251.5px] h-[55px] rounded-[32px] gap-[8px] bg-[#0137641A]">
                    <h1 className="flex justify-center items-center cursor-pointer leading-[21px] font-poppins font-semibold text-secondayBrand text-[14px] w-full">
                      Go Back
                    </h1>
                  </div>
                  <div className="flex justify-center items-center w-[251.5px] h-[55px] rounded-[32px] gap-[8px] bg-secondaryBrand">
                    <h1 className="flex justify-center items-center cursor-pointer leading-[21px] font-poppins font-semibold text-white text-[14px] w-full">
                      Confirm Order
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "checkout" && (
            <div className="flex flex-col justify-start items-center w-[651px] h-[1094px] gap-[16px]">
              {/* Buyer's Details */}
              <div className="flex flex-col justify-start items-start w-[587px] h-[155px] space-y-[16px]">
                <h1 className="font-inter font-medium text-[14px] leading-[16.94px] text-[#000000]">
                  Buyer's Details
                </h1>
                <div className="flex flex-col justify-center items-center w-[587px] h-[122px] space-y-[16px]">
                  <div className="flex justify-start items-center w-[587px] h-[53px] gap-[16px]">
                    <input
                      type="text"
                      className="w-[285.5px] h-[53px] rounded-[8px] outline-none border-[1px] border-[#FFFFFF] gap-[10px] py-[10px] px-[15px]"
                      placeholder="Full Name"
                      name=""
                      id=""
                    />
                    <input
                      type="text"
                      className="w-[285.5px] h-[53px] rounded-[8px] outline-none border-[1px] border-[#FFFFFF] gap-[10px] py-[10px] px-[15px]"
                      placeholder="Contact Number"
                      name=""
                      id=""
                    />
                  </div>
                  <input
                    type="text"
                    className="w-[587px] h-[53px] rounded-[8px] outline-none border-[1px] border-[#FFFFFF] gap-[10px] py-[10px] px-[15px]"
                    placeholder="Email Address"
                    name=""
                    id=""
                  />
                </div>
              </div>
              {/* Shipping */}
              <div className="flex flex-col justify-start items-start w-[587px] h-[155px] space-y-[16px]">
                <h1 className="font-inter font-medium text-[14px] leading-[16.94px] text-[#000000]">
                  Shipping
                </h1>
                <div className="flex flex-col justify-center items-center w-[587px] h-[122px] space-y-[16px]">
                  <div className="flex justify-start items-center w-[587px] h-[53px] gap-[16px]">
                    <input
                      type="text"
                      className="w-[285.5px] h-[53px] rounded-[8px] outline-none border-[1px] border-[#FFFFFF] gap-[10px] py-[10px] px-[15px]"
                      placeholder="Country"
                      name=""
                      id=""
                    />
                    <input
                      type="text"
                      className="w-[285.5px] h-[53px] rounded-[8px] outline-none border-[1px] border-[#FFFFFF] gap-[10px] py-[10px] px-[15px]"
                      placeholder="State/Province"
                      name=""
                      id=""
                    />
                  </div>
                  <div className="flex justify-start items-center w-[587px] h-[53px] gap-[16px]">
                    <input
                      type="text"
                      className="w-[285.5px] h-[53px] rounded-[8px] outline-none border-[1px] border-[#FFFFFF] gap-[10px] py-[10px] px-[15px]"
                      placeholder="City"
                      name=""
                      id=""
                    />
                    <input
                      type="text"
                      className="w-[285.5px] h-[53px] rounded-[8px] outline-none border-[1px] border-[#FFFFFF] gap-[10px] py-[10px] px-[15px]"
                      placeholder="Street"
                      name=""
                      id=""
                    />
                  </div>
                </div>
              </div>
              {/* Your Orders */}
              <div
                className={`flex flex-col w-[587px] ${
                  openOrders ? "h-[307.66px]" : ""
                } rounded-[8px] gap-[8px] bg-white border-[1px] border-[#FFFFFF0D]`}
              >
                <div className="flex justify-center items-center w-[587px] h-[37px] border-b-[1px] border-[#0000000D] py-[8px] px-[16px] gap-[8px]">
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M1.07326 2.49277C1.18241 2.16531 1.53636 1.98833 1.86383 2.09749L2.11748 2.18204C2.63946 2.35601 3.08057 2.50303 3.42743 2.66439C3.79612 2.83591 4.11604 3.04849 4.35862 3.38505C4.6012 3.72162 4.7017 4.09233 4.74783 4.49635C4.77138 4.70267 4.78215 4.93401 4.78706 5.19042H13.7084C15.4208 5.19042 16.2771 5.19042 16.6476 5.7523C17.0181 6.31419 16.6808 7.1012 16.0062 8.67521L15.6491 9.50855C15.3341 10.2434 15.1767 10.6109 14.8636 10.8173C14.5505 11.0237 14.1507 11.0237 13.3512 11.0237H4.91885C5.00634 11.4736 5.14437 11.7369 5.34036 11.9329C5.571 12.1635 5.89481 12.3139 6.50629 12.3961C7.13574 12.4808 7.97 12.4821 9.16618 12.4821H14.9995C15.3447 12.4821 15.6245 12.7619 15.6245 13.1071C15.6245 13.4523 15.3447 13.7321 14.9995 13.7321H9.12045C7.9808 13.7321 7.0622 13.7321 6.33973 13.635C5.58964 13.5341 4.95807 13.3184 4.45648 12.8168C3.95488 12.3152 3.73913 11.6836 3.63829 10.9335C3.54115 10.2111 3.54117 9.29247 3.54118 8.15281L3.54119 5.92628C3.54119 5.33212 3.54024 4.93898 3.50589 4.63814C3.47337 4.35327 3.41658 4.21586 3.34456 4.11594C3.27255 4.01602 3.16015 3.91869 2.90018 3.79776C2.62564 3.67004 2.25297 3.54482 1.6893 3.35693L1.46854 3.28334C1.14108 3.17419 0.964103 2.82024 1.07326 2.49277ZM6.66619 7.06542C6.32101 7.06542 6.04119 7.34524 6.04119 7.69042C6.04119 8.03559 6.32101 8.31542 6.66619 8.31542H9.16619C9.51136 8.31542 9.79119 8.03559 9.79119 7.69042C9.79119 7.34524 9.51136 7.06542 9.16619 7.06542H6.66619Z"
                      fill="#E4E4E4"
                    />
                    <path
                      d="M6.24935 15.1904C6.9397 15.1904 7.49935 15.7501 7.49935 16.4404C7.49935 17.1308 6.9397 17.6904 6.24935 17.6904C5.55899 17.6904 4.99935 17.1308 4.99935 16.4404C4.99935 15.7501 5.55899 15.1904 6.24935 15.1904Z"
                      fill="#E4E4E4"
                    />
                    <path
                      d="M13.7493 15.1905C14.4397 15.1905 14.9993 15.7502 14.9993 16.4405C14.9993 17.1309 14.4397 17.6905 13.7493 17.6905C13.059 17.6905 12.4993 17.1309 12.4993 16.4405C12.4993 15.7502 13.059 15.1905 13.7493 15.1905Z"
                      fill="#E4E4E4"
                    />
                  </svg>
                  <h1 className="w-[509px] font-poppins font-semibold text-[14px] leading-[21px] text-[#393A44]">
                    Your Orders
                  </h1>
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => setOpenOrders(!openOrders)}
                  >
                    <path
                      d="M9.85828 0.590033C9.68649 0.418248 9.41768 0.402632 9.22825 0.543183L9.17398 0.590033L5 4.76379L0.826019 0.590033C0.654235 0.418248 0.38542 0.402632 0.195992 0.543183L0.141723 0.590033C-0.0300617 0.761818 -0.0456791 1.03063 0.0948725 1.22006L0.141723 1.27433L4.65785 5.79046C4.82964 5.96224 5.09845 5.97786 5.28788 5.83731L5.34215 5.79046L9.85828 1.27433C10.0472 1.08537 10.0472 0.778997 9.85828 0.590033Z"
                      fill="#4B4B4B"
                    />
                  </svg>
                </div>
                <div
                  className={`${
                    openOrders ? "block" : "hidden"
                  } flex flex-col justify-center items-center w-[587px] h-[262.66px] gap-[24px] p-[16px] rounded-[16px]`}
                >
                  <div className="flex justify-center items-center w-[555px] h-[103.33px] gap-[16px]">
                    <img
                      src={product2}
                      alt="product"
                      className="w-[98px] h-[103.33px]"
                    />
                    <div className="flex justify-center items-center w-[441px] h-[103.33px] gap-[8px]">
                      <div className="flex flex-col justify-start items-start w-[379px] h-[66px] space-y-[8px]">
                        <h1 className="font-poppins font-semibold text-[16px] leading-[24px] text-[#000000]">
                          Woodpecker Scaling Tip
                        </h1>
                        <h1 className="font-poppins font-normal w-[253px] h-auto text-[11.19px] leading-[16.79px] text-[#808080]">
                          Keep The Soil Evenly Moist For The Healthiest Gro...
                        </h1>
                      </div>
                      <h1>$70</h1>
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-[555px] h-[103.33px] gap-[16px]">
                    <img
                      src={product2}
                      alt="product"
                      className="w-[98px] h-[103.33px]"
                    />
                    <div className="flex justify-center items-center w-[441px] h-[103.33px] gap-[8px]">
                      <div className="flex flex-col justify-start items-start w-[379px] h-[66px] space-y-[8px]">
                        <h1 className="font-poppins font-semibold text-[16px] leading-[24px] text-[#000000]">
                          Woodpecker Scaling Tip
                        </h1>
                        <h1 className="font-poppins font-normal w-[253px] h-auto text-[11.19px] leading-[16.79px] text-[#808080]">
                          Keep The Soil Evenly Moist For The Healthiest Gro...
                        </h1>
                      </div>
                      <h1>$70</h1>
                    </div>
                  </div>
                </div>
              </div>
              {/* Payment method */}
              <div
                className={`flex flex-col justify-start items-center bg-white w-[587px] ${
                  openPaymentMethod ? "h-[94.95px]" : ""
                } rounded-[8px] border-[1px] border-[#FFFFFF0D]`}
              >
                <div className="flex justify-center items-center w-[587px] h-[37px] border-b-[1px] border-[#0000000D] py-[8px] px-[16px] gap-[8px]">
                  <svg
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.5 11.5386C4.35082 11.5386 4.20774 11.5978 4.10225 11.7033C3.99676 11.8088 3.9375 11.9519 3.9375 12.1011C3.9375 12.2503 3.99676 12.3933 4.10225 12.4988C4.20774 12.6043 4.35082 12.6636 4.5 12.6636H9C9.14918 12.6636 9.29226 12.6043 9.39775 12.4988C9.50324 12.3933 9.5625 12.2503 9.5625 12.1011C9.5625 11.9519 9.50324 11.8088 9.39775 11.7033C9.29226 11.5978 9.14918 11.5386 9 11.5386H4.5Z"
                      fill="black"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.75 3.85107C3.15326 3.85107 2.58097 4.08813 2.15901 4.51008C1.73705 4.93204 1.5 5.50434 1.5 6.10107V13.6011C1.5 14.1978 1.73705 14.7701 2.15901 15.1921C2.58097 15.614 3.15326 15.8511 3.75 15.8511H14.25C14.8467 15.8511 15.419 15.614 15.841 15.1921C16.2629 14.7701 16.5 14.1978 16.5 13.6011V6.10107C16.5 5.50434 16.2629 4.93204 15.841 4.51008C15.419 4.08813 14.8467 3.85107 14.25 3.85107H3.75ZM14.25 4.97607H3.75C3.45163 4.97607 3.16548 5.0946 2.9545 5.30558C2.74353 5.51656 2.625 5.80271 2.625 6.10107V7.03857H15.375V6.10107C15.375 5.80271 15.2565 5.51656 15.0455 5.30558C14.8345 5.0946 14.5484 4.97607 14.25 4.97607ZM2.625 13.6011V8.16357H15.375V13.6011C15.375 13.8994 15.2565 14.1856 15.0455 14.3966C14.8345 14.6075 14.5484 14.7261 14.25 14.7261H3.75C3.45163 14.7261 3.16548 14.6075 2.9545 14.3966C2.74353 14.1856 2.625 13.8994 2.625 13.6011Z"
                      fill="black"
                    />
                  </svg>
                  <h1 className="w-[509px] font-poppins font-semibold text-[14px] leading-[21px] text-[#393A44]">
                    Payment Method
                  </h1>
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => setOpenPaymentMethod(!openPaymentMethod)}
                  >
                    <path
                      d="M9.85828 0.590033C9.68649 0.418248 9.41768 0.402632 9.22825 0.543183L9.17398 0.590033L5 4.76379L0.826019 0.590033C0.654235 0.418248 0.38542 0.402632 0.195992 0.543183L0.141723 0.590033C-0.0300617 0.761818 -0.0456791 1.03063 0.0948725 1.22006L0.141723 1.27433L4.65785 5.79046C4.82964 5.96224 5.09845 5.97786 5.28788 5.83731L5.34215 5.79046L9.85828 1.27433C10.0472 1.08537 10.0472 0.778997 9.85828 0.590033Z"
                      fill="#4B4B4B"
                    />
                  </svg>
                </div>
                <div
                  className={`${
                    openPaymentMethod ? "block" : "hidden"
                  } flex justify-center items-center w-full h-[57.45px] p-[16px] gap-[8px]`}
                >
                  <svg
                    width="24"
                    height="26"
                    viewBox="0 0 24 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 13.0781C2 9.07831 2 7.07842 3.17157 5.83584C4.34315 4.59326 6.22876 4.59326 10 4.59326H14C17.7712 4.59326 19.6569 4.59326 20.8284 5.83584C22 7.07842 22 9.07831 22 13.0781C22 17.0779 22 19.0778 20.8284 20.3204C19.6569 21.563 17.7712 21.563 14 21.563H10C6.22876 21.563 4.34315 21.563 3.17157 20.3204C2 19.0778 2 17.0779 2 13.0781Z"
                      stroke="#E4E4E4"
                      stroke-width="1.09091"
                    />
                    <path
                      d="M10 17.3205H6"
                      stroke="#E4E4E4"
                      stroke-width="1.09091"
                      stroke-linecap="round"
                    />
                    <path
                      d="M14 17.3205H12.5"
                      stroke="#E4E4E4"
                      stroke-width="1.09091"
                      stroke-linecap="round"
                    />
                    <path
                      d="M2 10.9569L22 10.9569"
                      stroke="#E4E4E4"
                      stroke-width="1.09091"
                      stroke-linecap="round"
                    />
                  </svg>
                  <h1 className="w-[502px] h-[18px] gap-[4px] font-outfit font-semibold text-[14px]">
                    Credit or Debit Card
                  </h1>
                  <input type="radio" className="accent-[#001D58]" />
                </div>
              </div>
              {/* Confirm order */}
              <div className="flex flex-col justify-end bg-[#FAFAFA] fixed bottom-0 w-[587px] h-[168px] space-y-[24px] py-[24px] px-[32px]">
                <div className="flex justify-center items-center w-[523.5px] h-[57px] rounded-[99px] gap-[8px] bg-secondaryBrand">
                  <h1 className="flex justify-center items-center cursor-pointer leading-[21px] font-poppins font-semibold text-white text-[14px] w-full">
                    Confirm Order
                  </h1>
                </div>
              </div>
            </div>
          )}
          {activeTab === "order" && (
            <div className="flex flex-col justify-center items-center w-[587px] h-auto rounded-[24px] p-[32px] gap-[24px] bg-white">
              <svg
                width="107"
                height="108"
                viewBox="0 0 107 108"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="9.5"
                  y="9.84512"
                  width="88"
                  height="88"
                  rx="44"
                  fill="#4FAD2E"
                />
                <rect
                  x="4.86842"
                  y="5.21354"
                  width="97.2632"
                  height="97.2632"
                  rx="48.6316"
                  stroke="#4BD31A"
                  stroke-opacity="0.1"
                  stroke-width="9.26316"
                />
                <path
                  d="M39.0254 53.8451L48.6632 63.1083L67.9728 44.582"
                  stroke="white"
                  stroke-width="4.63158"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div className="flex flex-col justify-center items-center w-[523px] h-[122px] space-y-[8px]">
                <h1 className="text-center font-poppins font-semibold text-[20px] w-[351px] leading-[30px] text-[#000000]">
                  Your Order Has Been Successfully Placed!
                </h1>
                <h1 className="font-poppins font-normal text-[12px] leading-[18px] text-center text-[#8E8E8E]">
                  Thank you for shopping with us. Your order is being processed,
                  and you’ll receive an email confirmation shortly with the
                  details. We appreciate your trust in our service, and we’ll
                  ensure your order is delivered promptly.
                </h1>
              </div>
              <div className="flex justify-center items-center w-[396px] h-[57px] rounded-[99px] gap-[8px] bg-secondaryBrand">
                <h1 className="flex justify-center items-center cursor-pointer leading-[21px] font-poppins font-semibold text-white text-[14px] w-full">
                  Continue Shopping
                </h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
