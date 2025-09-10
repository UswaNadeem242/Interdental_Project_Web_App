import React, { useEffect, useRef, useState } from "react";
import CartProduct from "../components/CartProduct";
import axios from "axios";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import Toast from "../components/Toast";
// import product2 from "../assets/product2.png";

const ShoppingCart = ({ isModalOpen, setIsModalOpen }) => {
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const [activeTab, setActiveTab] = useState("cart");
  const [openOrders, setOpenOrders] = useState(false);
  const [openPaymentMethod, setOpenPaymentMethod] = useState(false);
  const [openBuyerDetail, setOpenBuyerDetail] = useState(false);
  const [openCartTotal, setOpenCartTotal] = useState(false);
  const [cart, setCart] = useState({});
  const [country, setCountry] = useState("");
  const [showCoutries, setShowCoutries] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [street, setStreet] = useState("");
  const { user } = useAuth();

  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [toastVisible, setToastVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const [recipientName, setRecipientName] = useState("");
  const [paypalUsername, setPaypalUsername] = useState("");
  const [paypalContact, setPaypalContact] = useState("");

  const validateForm = () => {
    // ✅ Full Name
    if (!name || !/^[A-Za-z ]{2,50}$/.test(name)) {
      setToastMessage(
        "Full Name must be 2–50 characters (alphabets & spaces only)."
      );
      setToastType("error");
      setToastVisible(true);
      return false;
    }

    // ✅ Contact Number
    if (!phone || !/^\+?[0-9]{10,15}$/.test(phone)) {
      setToastMessage("Contact Number must be 10–15 digits (with optional +).");
      setToastType("error");
      setToastVisible(true);
      return false;
    }

    // ✅ Email
    if (
      !email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      email.length > 50
    ) {
      setToastMessage("Enter a valid Email (max 50 characters).");
      setToastType("error");
      setToastVisible(true);
      return false;
    }

    // ✅ Country
    if (!country) {
      setToastMessage("Please select a Country.");
      setToastType("error");
      setToastVisible(true);
      return false;
    }

    // ✅ State/Province
    if (!state) {
      setToastMessage("Please select a State/Province.");
      setToastType("error");
      setToastVisible(true);
      return false;
    }

    // ✅ City
    if (!city || !/^[A-Za-z ]{2,30}$/.test(city)) {
      setToastMessage("City must be 2–30 characters (alphabets only).");
      setToastType("error");
      setToastVisible(true);
      return false;
    }

    // ✅ Street
    if (!street || !/^[A-Za-z0-9 ]{5,100}$/.test(street)) {
      setToastMessage(
        "Street must be 5–100 characters (alphanumeric & spaces)."
      );
      setToastType("error");
      setToastVisible(true);
      return false;
    }

    // ✅ Receptionist Name (PayPal)
    if (!recipientName || !/^[A-Za-z ]{2,50}$/.test(recipientName)) {
      setToastMessage("Receptionist Name must be 2–50 alphabets only.");
      setToastType("error");
      setToastVisible(true);
      return false;
    }

    // ✅ PayPal Username
    if (!paypalUsername || !/^[A-Za-z0-9]{5,30}$/.test(paypalUsername)) {
      setToastMessage("PayPal Username must be 5–30 alphanumeric characters.");
      setToastType("error");
      setToastVisible(true);
      return false;
    }

    // ✅ PayPal Email/Phone
    if (!paypalContact) {
      setToastMessage("PayPal Email/Phone is required.");
      setToastType("error");
      setToastVisible(true);
      return false;
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paypalContact);
    const isPhone = /^\+?[0-9]{10,15}$/.test(paypalContact);

    if (!isEmail && !isPhone) {
      setToastMessage("PayPal Contact must be a valid Email or Phone.");
      setToastType("error");
      setToastVisible(true);
      return false;
    }

    // ✅ If all checks pass
    return true;
  };

  const createOrder = async () => {
    //
    console.log("=--=-==--=user=--=-===-", user);

    try {
      const payload = {
        userId: user.id,
        name: name,
        address: `${country},${state},${city},${street}`,
        email: email,
        phone: phone,
        orderItems: cart.items,
      };

      console.log("-=-=-=-=-=payload-=-=-=-=-=-==--=", payload);
      const response = await axios.post(
        `${BASE_URL}/orders/createOrder`,
        payload,
        {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setActiveTab("order");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const getCart = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/cart`, {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCart(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCart();
  }, []);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const { data } = await axios.get(
          "https://restcountries.com/v3.1/all?fields=cca2,name,flags"
        );
        const countryData = data.map((c) => ({
          code: c.cca2,
          name: c.name.common,
          flag: c.flags.png,
        }));
        setCountries(countryData);
      } catch (err) {
        console.error("REST Countries failed, using fallback…", err);

        // Fallback: Build flag URL with FlagCDN
        const fallbackList = [
          /* Hardcoded or minimal list if needed */
        ];
        setCountries(fallbackList);
      }
    };

    loadCountries();
  }, []);
  console.log(countries);

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setCountry(country.name);
    setShowCoutries(false);
  };

  const handleInputChange = (e) => {
    setCountry(e);
    setShowCoutries(true);
  };

  const closeToast = () => {
    setToastVisible(false);
  };

  const paymentRef = useRef(null);


  return (
    <div className="fixed top-0 right-0 inset-0 flex items-center justify-end bg-black bg-opacity-50 backdrop-blur-sm z-50 ">
      <div
        ref={modalRef}
        className="flex flex-col justify-center items-center bg-[#FAFAFA] p-[32px] gap-[16px] shadow-lg w-[651px] h-full relative "
      >
        {/* Tabs */}
        <div className="flex justify-around w-[587px] h-[68.69px]  pb-[16px] pt-[8px]">
          <div className="flex justify-around w-[539.02px] h-[44.69px]">
            <div
              onClick={() => setActiveTab("cart")}
              className={`py-2 px-4 font-poppins font-semibold text-[16px] leading-[24px] ${activeTab === "cart"
                ? "border-b-[4.69px] border-secondaryBrand font-semibold"
                : "text-[#949494] border-b-[4.69px] border-[#0000000D]"
                }`}
            >
              Cart
            </div>
            <div
              // onClick={() => setActiveTab("checkout")}
              className={`py-2 px-4 font-poppins font-semibold text-[16px] leading-[24px] ${activeTab === "checkout"
                ? "border-b-[4.69px] border-secondaryBrand font-semibold"
                : "text-[#949494] border-b-[4.69px] border-[#0000000D]"
                }`}
            >
              Checkout
            </div>
            <div
              // onClick={() => setActiveTab("checkout")}
              className={`py-2 px-4 font-poppins font-semibold text-[16px] leading-[24px] ${activeTab === "review"
                ? "border-b-[4.69px] border-secondaryBrand font-semibold"
                : "text-[#949494] border-b-[4.69px] border-[#0000000D]"
                }`}
            >
              Review
            </div>
            <div
              // onClick={() => setActiveTab("order")}
              className={`py-2 px-4 font-poppins font-semibold text-[16px] leading-[24px] ${activeTab === "order"
                ? "border-b-[4.69px] border-secondaryBrand font-semibold"
                : "text-[#949494] border-b-[4.69px] border-[#0000000D]"
                }`}
            >
              Completion
            </div>
          </div>
          <button
            onClick={handleCloseModal}
            className="py-2 px-4 text-[#393A44] hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto ">
          {activeTab === "cart" && (
            <div className="flex flex-col justify-start items-start space-y-8">
              {cart?.items?.length > 0 ? (
                <div className="flex flex-col justify-start items-start gap-4 ">
                  {cart?.items?.map((item) => (
                    <CartProduct item={item} getCart={getCart} />
                  ))}
                  <div className="fixed bottom-0 w-[587px] h-[168px] rounded-[32px] border-[1px] border-[#0000000D] space-y-[24px] py-[24px] px-[32px] bg-[#FFFFFF]">
                    <div className="flex justify-between items-center w-[523px] h-[39px] gap-[16px] border-b-[1px] border-[#0000000D]">
                      <h1 className="font-poppins font-medium text-[16px] leading-[24px] text-[#1A1A1A]">
                        Subtotal
                      </h1>
                      <h1 className="font-poppins font-bold text-[26px] leading-[39px] text-[#1A1A1A]">
                        {cart?.totalAmount} $
                      </h1>
                    </div>
                    <div className="flex justify-between items-center w-[523px] h-[57px] gap-[20px]">
                      <div
                        onClick={() => setActiveTab("checkout")}
                        className="flex justify-center items-center cursor-pointer w-[523px] h-[57px] rounded-[32px] gap-[20px] bg-secondaryBrand"
                      >
                        <h1 className="flex justify-center items-center leading-[21px] font-poppins font-semibold text-white text-[14px] w-full">
                          Checkout
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p>No Products added to Cart</p>
              )}
            </div>
          )}
          {activeTab === "checkout" && (
            <div className="flex flex-col justify-start items-center w-[651px] h-auto mb-16 gap-[16px]">
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
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      className="w-[285.5px] h-[53px] rounded-[8px] outline-none border-[1px] border-[#FFFFFF] gap-[10px] py-[10px] px-[15px]"
                      placeholder="Contact Number"
                      name=""
                      id=""
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <input
                    type="text"
                    className="w-[587px] h-[53px] rounded-[8px] outline-none border-[1px] border-[#FFFFFF] gap-[10px] py-[10px] px-[15px]"
                    placeholder="Email Address"
                    name=""
                    id=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    <div className="relative flex flex-col justify-start items-start space-y-2">
                      <div className="flex justify-start items-center w-[285.5px] h-[53px] gap-[10px] py-[10px] px-[15px] rounded-[8px] bg-white">
                        {selectedCountry && (
                          <img
                            src={selectedCountry?.flag}
                            alt="flags"
                            className="w-[21px] h-[12.25px]"
                          />
                        )}
                        <input
                          type="text"
                          value={country}
                          onChange={(e) => handleInputChange(e.target.value)}
                          className="w-full h-[53px] rounded-[8px] outline-none border-[1px] border-[#FFFFFF] "
                          placeholder="Country"
                          name=""
                          id=""
                        />
                      </div>
                      {showCoutries && (
                        <div className="absolute top-12 flex flex-col justify-start items-start space-y-4 bg-white border-[1px] border-gray-100 w-full max-h-[250px] overflow-auto px-4 py-2">
                          {countries
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .filter((c) =>
                              c.name
                                .toLowerCase()
                                .includes(country.toLowerCase())
                            )
                            .map((country) => (
                              <div key={country.code} value={country.code}>
                                <div
                                  className="flex items-center cursor-pointer"
                                  onClick={() => handleCountryChange(country)}
                                >
                                  <img
                                    src={country.flag}
                                    alt={country.name}
                                    className="w-[20px] h-[12.25px] mr-2"
                                  />
                                  {country.name}
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>

                    <input
                      type="text"
                      className="w-[285.5px] h-[53px] rounded-[8px] outline-none border-[1px] border-[#FFFFFF] gap-[10px] py-[10px] px-[15px]"
                      placeholder="State/Province"
                      name=""
                      id=""
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-start items-center w-[587px] h-[53px] gap-[16px]">
                    <input
                      type="text"
                      className="w-[285.5px] h-[53px] rounded-[8px] outline-none border-[1px] border-[#FFFFFF] gap-[10px] py-[10px] px-[15px]"
                      placeholder="City"
                      name=""
                      id=""
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <input
                      type="text"
                      className="w-[285.5px] h-[53px] rounded-[8px] outline-none border-[1px] border-[#FFFFFF] gap-[10px] py-[10px] px-[15px]"
                      placeholder="Street"
                      name=""
                      id=""
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Payment method */}
              <div className="flex flex-col justify-start items-start w-[587px] h-auto space-y-[16px]">
                <h1 className="font-inter font-medium text-[14px] leading-[16.94px] text-[#000000]">
                  Payment Method
                </h1>
                {/* <div
                  className={`flex flex-col justify-start items-center bg-white w-[587px] ${openPaymentMethod ? "h-[252px]" : ""
                    } rounded-[8px] border-[1px] border-[#FFFFFF0D]`}
                > */}
                <div
                  ref={paymentRef} // 👈 Attach ref to this section
                  className={`flex flex-col justify-start items-center bg-white w-[587px] ${openPaymentMethod ? "h-[252px]" : ""
                    } rounded-[8px] border-[1px] border-[#FFFFFF0D]`}
                >
                  <div className="flex justify-center items-center w-[587px] h-[53px] border-b-[1px] border-[#0000000D] py-[8px] px-[16px] gap-[8px]">
                    <img src="/assets/paypal.png" alt="paypal" />
                    <h1 className="w-[509px] font-poppins font-semibold text-[14px] leading-[21px] text-[#393A44]">
                      Paypal
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

                    className={`${openPaymentMethod ? "block" : "hidden"
                      } flex flex-col justify-start items-start w-full h-auto p-[16px] space-y-[16px]`}

                  >
                    {/* Recipient Name */}
                    <div className="w-full flex flex-col justify-start items-start space-y-[8px]">
                      <p className="font-poppins font-medium text-[12px] text-[#434343]">
                        Recipient's Name
                      </p>
                      <div className="flex justify-center items-center w-[539px] h-[44px] bg-[#F8F8F8] p-[12px]">
                        <input
                          type="text"
                          value={recipientName}
                          onChange={(e) => setRecipientName(e.target.value)}
                          placeholder="Enter Recipient's Name"
                          className="bg-transparent w-full h-full outline-none font-poppins text-[12px] text-[#434343]"
                        />
                      </div>
                    </div>

                    {/* PayPal Username + Contact */}
                    <div className="flex justify-start items-center gap-[16px] w-full">
                      {/* PayPal Username */}
                      <div className="w-[261.5px] flex flex-col space-y-[8px]">
                        <p className="font-poppins font-medium text-[12px] text-[#434343]">
                          PayPal Username
                        </p>
                        <div className="flex justify-center items-center w-full h-[44px] bg-[#F8F8F8] p-[12px]">
                          <input
                            type="text"
                            value={paypalUsername}
                            onChange={(e) => setPaypalUsername(e.target.value)}
                            placeholder="Enter PayPal Username"
                            className="bg-transparent w-full h-full outline-none font-poppins text-[12px] text-[#434343]"
                          />
                        </div>
                      </div>

                      {/* PayPal Email/Phone */}
                      <div className="w-[261.5px] flex flex-col space-y-[8px]">
                        <p className="font-poppins font-medium text-[12px] text-[#434343]">
                          E-mail / Phone Number
                        </p>
                        <div className="flex justify-center items-center w-full h-[44px] bg-[#F8F8F8] p-[12px]">
                          <input
                            type="text"
                            value={paypalContact}
                            onChange={(e) => setPaypalContact(e.target.value)}
                            placeholder="Enter E-mail / Phone Number"
                            className="bg-transparent w-full h-full outline-none font-poppins text-[12px] text-[#434343]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {!!validateForm && (
                <div className="w-[261.5] h-[60px] flex flex-col justify-start items-start space-y-[8px]">
                  <p className="font-poppins font-medium text-[14px] leading-[18px] text-[#B71212]">
                    Please fill all required fields
                  </p>
                </div>
              )}
              {/* Confirm order */}
              <div className="flex justify-start items-center bg-[#FAFAFA] fixed bottom-0 w-[523px] h-[57px] gap-[20px] pb-[24px]">
                <div
                  onClick={() => setActiveTab("cart")}
                  className="flex justify-center items-center cursor-pointer w-[251.5px] h-[55px] rounded-[32px] gap-[8px] bg-[#0137641A]"
                >
                  <h1 className="flex justify-center items-center leading-[21px] font-poppins font-semibold text-[#013764] text-[14px] w-full">
                    Go Back
                  </h1>
                </div>
                <div
                  onClick={() => {
                    if (!validateForm()) return;

                    // ✅ All validations passed
                    setActiveTab("review");
                  }}
                  className="flex justify-center items-center cursor-pointer w-[251.5px] h-[55px] rounded-[32px] gap-[8px] bg-secondaryBrand"
                >
                  <h1 className="flex justify-center items-center leading-[21px] font-poppins font-semibold text-white text-[14px] w-full">
                    Next
                  </h1>
                </div>
              </div>
            </div>
          )}
          {activeTab === "review" && (
            <div className="flex flex-col justify-start items-start space-y-[16px] w-full h-auto">
              {/* Your Orders */}
              <div
                className={`flex flex-col w-full ${openOrders ? "h-auto border-[1px] border-[#FFFFFF0D]" : ""
                  } rounded-[8px] gap-[8px] bg-white `}
              >
                <div
                  className={`flex justify-start items-center w-[587px] h-[37px] py-[8px] px-[16px] gap-[8px] ${openOrders && "border-b-[1px] border-[#0000000D]"
                    }`}
                >
                  <h1 className="w-[538px] font-poppins font-semibold text-[14px] leading-[21px] text-[#393A44]">
                    Your Orders
                  </h1>
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => setOpenOrders(!openOrders)}
                    className="cursor-pointer"
                  >
                    <path
                      d="M9.85828 0.590033C9.68649 0.418248 9.41768 0.402632 9.22825 0.543183L9.17398 0.590033L5 4.76379L0.826019 0.590033C0.654235 0.418248 0.38542 0.402632 0.195992 0.543183L0.141723 0.590033C-0.0300617 0.761818 -0.0456791 1.03063 0.0948725 1.22006L0.141723 1.27433L4.65785 5.79046C4.82964 5.96224 5.09845 5.97786 5.28788 5.83731L5.34215 5.79046L9.85828 1.27433C10.0472 1.08537 10.0472 0.778997 9.85828 0.590033Z"
                      fill="#4B4B4B"
                    />
                  </svg>
                </div>
                <div
                  className={`${openOrders ? "block" : "hidden"
                    } flex flex-col justify-center items-center w-[587px] h-auto gap-[24px] p-[16px] rounded-[16px]`}
                >
                  {cart &&
                    cart?.items?.map((item) => (
                      <div className="flex justify-center items-center w-[555px] h-[103.33px] gap-[16px]">
                        <img
                          src={item?.imageUrl[0]}
                          alt="product"
                          className="w-[98px] h-[103.33px]"
                        />
                        <div className="flex justify-center items-center w-[441px] h-[103.33px] gap-[8px]">
                          <div className="flex flex-col justify-start items-start w-[379px] h-[66px] space-y-[8px]">
                            <h1 className="font-poppins font-semibold text-[16px] leading-[24px] text-[#000000]">
                              {item.productName}
                            </h1>
                            <h1 className="font-poppins font-normal w-[253px] h-auto text-[11.19px] leading-[16.79px] text-[#808080]">
                              Keep The Soil Evenly Moist For The Healthiest
                              Gro...
                            </h1>
                          </div>
                          <h1>${item.price}</h1>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              {/* Payment method */}
              <div
                className={`flex flex-col w-full ${openOrders ? "h-auto border-[1px] border-[#FFFFFF0D]" : ""
                  } rounded-[8px] gap-[8px] bg-white `}
              >
                <div
                  className={`flex justify-start items-center w-[587px] h-[37px] py-[8px] px-[16px] gap-[8px] ${openPaymentMethod && "border-b-[1px] border-[#0000000D]"
                    }`}
                >
                  <h1 className="w-[537px] font-poppins font-semibold text-[14px] leading-[21px] text-[#393A44]">
                    Payment Method
                  </h1>
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => setOpenPaymentMethod(!openPaymentMethod)}
                    className="cursor-pointer"
                  >
                    <path
                      d="M9.85828 0.590033C9.68649 0.418248 9.41768 0.402632 9.22825 0.543183L9.17398 0.590033L5 4.76379L0.826019 0.590033C0.654235 0.418248 0.38542 0.402632 0.195992 0.543183L0.141723 0.590033C-0.0300617 0.761818 -0.0456791 1.03063 0.0948725 1.22006L0.141723 1.27433L4.65785 5.79046C4.82964 5.96224 5.09845 5.97786 5.28788 5.83731L5.34215 5.79046L9.85828 1.27433C10.0472 1.08537 10.0472 0.778997 9.85828 0.590033Z"
                      fill="#4B4B4B"
                    />
                  </svg>
                </div>
                <div
                  className={`${openPaymentMethod ? "block" : "hidden"
                    } flex justify-start items-start w-[587px] h-[52px] gap-[8px] p-[16px] rounded-[16px]`}
                >
                  <img
                    src="/assets/paypal.png"
                    alt=""
                    className="w-[20px] h-[20px]"
                  />
                  <p className="font-poppins font-semibold text-[14px] leading-[17.64px] text-[#393A44]">
                    Paypal
                  </p>
                </div>
              </div>
              {/* Buyer's Details */}
              <div
                className={`flex flex-col w-full ${openBuyerDetail
                  ? "h-auto border-[1px] border-[#FFFFFF0D]"
                  : ""
                  } rounded-[8px] gap-[8px] bg-white `}
              >
                <div
                  className={`flex justify-start items-center w-[587px] h-[37px] py-[8px] px-[16px] gap-[8px] ${openBuyerDetail && "border-b-[1px] border-[#0000000D]"
                    }`}
                >
                  <h1 className="w-[537px] font-poppins font-semibold text-[14px] leading-[21px] text-[#393A44]">
                    Buyer's Details
                  </h1>
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => setOpenBuyerDetail(!openBuyerDetail)}
                    className="cursor-pointer"
                  >
                    <path
                      d="M9.85828 0.590033C9.68649 0.418248 9.41768 0.402632 9.22825 0.543183L9.17398 0.590033L5 4.76379L0.826019 0.590033C0.654235 0.418248 0.38542 0.402632 0.195992 0.543183L0.141723 0.590033C-0.0300617 0.761818 -0.0456791 1.03063 0.0948725 1.22006L0.141723 1.27433L4.65785 5.79046C4.82964 5.96224 5.09845 5.97786 5.28788 5.83731L5.34215 5.79046L9.85828 1.27433C10.0472 1.08537 10.0472 0.778997 9.85828 0.590033Z"
                      fill="#4B4B4B"
                    />
                  </svg>
                </div>
                <div
                  className={`${openBuyerDetail ? "block" : "hidden"
                    } flex flex-col justify-start items-start w-[587px] h-[328px] gap-[16px] p-[16px] rounded-[16px]`}
                >
                  <div className="w-[555px] h-[62px] flex flex-col justify-start items-start space-y-[6px]">
                    <p className="font-poppins font-normal h-[18px] text-[12px] leading-[18px] text-[#949494]">
                      Full Name
                    </p>
                    <p className="font-poppins font-normal h-[40px] text-[14px] leading-[21px] text-[##434343]">
                      {name}
                    </p>
                  </div>
                  <div className="w-[555px] h-[62px] flex flex-col justify-start items-start space-y-[6px]">
                    <p className="font-poppins font-normal h-[18px] text-[12px] leading-[18px] text-[#949494]">
                      Email Address
                    </p>
                    <p className="font-poppins font-normal h-[40px] text-[14px] leading-[21px] text-[##434343]">
                      {email}
                    </p>
                  </div>
                  <div className="w-[555px] h-[62px] flex flex-col justify-start items-start space-y-[6px]">
                    <p className="font-poppins font-normal h-[18px] text-[12px] leading-[18px] text-[#949494]">
                      Contact Number
                    </p>
                    <p className="font-poppins font-normal h-[40px] text-[14px] leading-[21px] text-[##434343]">
                      {phone}
                    </p>
                  </div>
                  <div className="w-[555px] h-[62px] flex flex-col justify-start items-start space-y-[6px]">
                    <p className="font-poppins font-normal h-[18px] text-[12px] leading-[18px] text-[#949494]">
                      Shipping Address
                    </p>
                    <p className="font-poppins font-normal h-[40px] text-[14px] leading-[21px] text-[##434343]">
                      {selectedCountry?.name} , {street} , {city} , {state}
                    </p>
                  </div>
                </div>
              </div>
              {/* Cart Total */}
              <div
                className={`flex flex-col w-full ${openCartTotal ? "h-auto border-[1px] border-[#FFFFFF0D]" : ""
                  } rounded-[8px] gap-[8px] bg-white `}
              >
                <div
                  className={`flex justify-start items-center w-[587px] h-[37px] py-[8px] px-[16px] gap-[8px] ${openCartTotal && "border-b-[1px] border-[#0000000D]"
                    }`}
                >
                  <h1 className="w-[537px] font-poppins font-semibold text-[14px] leading-[21px] text-[#393A44]">
                    Cart Total
                  </h1>
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => setOpenCartTotal(!openCartTotal)}
                    className="cursor-pointer"
                  >
                    <path
                      d="M9.85828 0.590033C9.68649 0.418248 9.41768 0.402632 9.22825 0.543183L9.17398 0.590033L5 4.76379L0.826019 0.590033C0.654235 0.418248 0.38542 0.402632 0.195992 0.543183L0.141723 0.590033C-0.0300617 0.761818 -0.0456791 1.03063 0.0948725 1.22006L0.141723 1.27433L4.65785 5.79046C4.82964 5.96224 5.09845 5.97786 5.28788 5.83731L5.34215 5.79046L9.85828 1.27433C10.0472 1.08537 10.0472 0.778997 9.85828 0.590033Z"
                      fill="#4B4B4B"
                    />
                  </svg>
                </div>
                <div
                  className={`${openCartTotal ? "block" : "hidden"
                    } flex flex-col justify-start items-start w-[555px] h-[138px] gap-[9px]`}
                >
                  <div className="flex justify-start items-start w-[425px] h-[37px] py-[8px] px-[16px] gap-[10px]">
                    <p className="font-poppins font-normal text-[14px] w-[300px] leading-[21px] tet-[#434343]">
                      SubTotal
                    </p>
                    <p className="font-poppins font-semibold text-[14px] leading-[21px] tet-[#434343]">
                      ${cart.totalAmount}
                    </p>
                  </div>
                  <div className="flex justify-start items-start w-[425px] h-[37px] py-[8px] px-[16px] gap-[10px]">
                    <p className="font-poppins font-normal text-[14px] w-[300px] leading-[21px] tet-[#434343]">
                      Shipping
                    </p>
                    <p className="font-poppins font-semibold text-[14px] leading-[21px] tet-[#434343]">
                      Free
                    </p>
                  </div>
                  <div className="w-[585px] border-[1px] border-[#EEEEEE]"></div>
                  <div className="flex justify-start items-start w-[425px] h-[37px] py-[8px] px-[16px] gap-[10px]">
                    <p className="font-poppins font-normal w-[300px] text-[14px] leading-[21px] tet-[#434343]">
                      Total
                    </p>
                    <p className="font-poppins font-semibold text-[14px] leading-[21px] tet-[#434343]">
                      ${cart.totalAmount}
                    </p>
                  </div>
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
              <div
                onClick={() => {
                  setIsModalOpen(false);
                  navigate("/shop");
                }}
                className="flex justify-center items-center cursor-pointer w-[396px] h-[57px] rounded-[99px] gap-[8px] bg-secondaryBrand"
              >
                <h1 className="flex justify-center items-center leading-[21px] font-poppins font-semibold text-white text-[14px] w-full">
                  Continue Shopping
                </h1>
              </div>
            </div>
          )}
        </div>
        {activeTab === "completion" && (
          <div className="flex justify-center items-center w-[587px] h-[105px] rounded-[32px] py-[24px] px-[32px] gap-[24px]">
            <button
              onClick={() => {
                createOrder();
              }}
              className="flex justify-center items-center w-[523px] h-[57px] rounded-[99px] py-[18px] px-[129px] bg-[#001D58] text-white shadow-lg"
            >
              Confirm Order
            </button>
          </div>
        )}
      </div>
      <Toast
        message={toastMessage}
        isVisible={toastVisible}
        onClose={closeToast}
        type={toastType}
      />
    </div>
  );
};

export default ShoppingCart;
