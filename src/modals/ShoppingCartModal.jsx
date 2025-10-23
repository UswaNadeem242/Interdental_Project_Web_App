import React, { useEffect, useRef, useState } from "react";
import CartProduct from "../components/CartProduct";
import axios from "axios";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import Toast from "../components/Toast";
import CartConfirmModel from "./cart-confirm-model";
import { useDispatch } from "react-redux";
import { showToast } from "../store/toast-slice";
import { shoppingCartValidationSchema } from "../services/utils/validationSchemas";
import Icons from "../components/Icons";
import { useFormik } from "formik";
// import product2 from "../assets/product2.png";

const ShoppingCart = ({ isModalOpen, setIsModalOpen }) => {
  const navigate = useNavigate();
  const { fetchCartCount ,fetchUnreadNotificationsCount} = useAuth();
  const [activeTab, setActiveTab] = useState("cart");
  const [openOrders, setOpenOrders] = useState(false);
  const [openPaymentMethod, setOpenPaymentMethod] = useState(true);
  const [openBuyerDetail, setOpenBuyerDetail] = useState(false);
  const [openCartTotal, setOpenCartTotal] = useState(false);
  const [cart, setCart] = useState({});
  const [country, setCountry] = useState("");
  const [showCoutries, setShowCoutries] = useState(false);
  const [isopenCartModel, setIsOpenCartModel] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [toastVisible, setToastVisible] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const dispatch = useDispatch();


  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      country: "",
      state: "",
      city: "",
      street: "",
      recipientName: "",
      paypalUsername: "",
      paypalContact: "",
    },
    validationSchema: shoppingCartValidationSchema,
    validateOnChange: true,   // Validate as user types
    validateOnBlur: true,    // Validate when user leaves field
    onSubmit: async (values) => {
      // Handle form submission
      setActiveTab("review");
    },
  });

  const createOrder = async () => {
    //

    try {
      const payload = {
        userId: user.id,
        name: formik.values.name,
        address: `${formik.values.country},${formik.values.state},${formik.values.city},${formik.values.street}`,
        email: user.email,
        phone: formik.values.phone,
        orderItems: cart.items,
      };

      const response = await axios.post(
        `${BASE_URL}/orders/createOrder`,
        payload,
        {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (response.data.responseCode === "1500") {
        setToastMessage(response.data.responseMessage);
        setToastType("error");
        setToastVisible(true);
      } else if (response.data.responseCode === "0000") {
        // Server should clear cart after successful order creation
        try {
          // Refresh cart data from server to get updated (empty) cart
          await getCart();
          // Update cart count in header
          fetchCartCount();
          fetchUnreadNotificationsCount();
        } catch (refreshError) {
          console.log(
            "Failed to refresh cart from server, clearing locally:",
            refreshError,
          );
          // Fallback: clear cart locally if server refresh fails
          setCart({ items: [], totalAmount: 0 });
          fetchCartCount();
        }
        // Note: activeTab is handled by the confirm modal
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
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
  // Stock validation function
  const validateCartStock = () => {
    if (!cart?.items || cart.items.length === 0) {
      // setToastMessage("Your cart is empty.");
      // setToastType("error");
      // setToastVisible(true);
      return false;
    }

    const outOfStockItems = [];
    const insufficientStockItems = [];

    cart.items.forEach((item) => {
      if (item.stockItem <= 0) {
        outOfStockItems.push(item.productName);
      } else if (item.quantity > item.stockItem) {
        insufficientStockItems.push({
          name: item.productName,
          requested: item.quantity,
          available: item.stockItem,
        });
      }
    });

    if (outOfStockItems.length > 0) {
      setToastMessage(
        `The following items are out of stock: ${outOfStockItems.join(", ")}. Please remove them from your cart.`,
      );
      setToastType("error");
      setToastVisible(true);
      return false;
    }

    if (insufficientStockItems.length > 0) {
      const messages = insufficientStockItems.map(
        (item) =>
          `${item.name} (requested: ${item.requested}, available: ${item.available})`,
      );
      setToastMessage(
        `Insufficient stock for: ${messages.join(", ")}. Please adjust quantities.`,
      );
      setToastType("error");
      setToastVisible(true);
      return false;
    }

    return true;
  };

  const handleCheckoutClick = () => {
    if (validateCartStock()) {
      setActiveTab("checkout");
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const { data } = await axios.get(
          "https://restcountries.com/v3.1/all?fields=cca2,name,flags",
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

  // Retrieve user data from localStorage
  const userData = localStorage.getItem("users");
  const user = userData ? JSON.parse(userData) : null;

  // Preset form fields with user data
  useEffect(() => {
    if (user) {
      // Only set if the fields are empty to allow user to override
      if (user.phoneNumber && !formik.values.phone) {
        formik.setFieldValue("phone", user.phoneNumber);
      }
      // Preset name with firstName + lastName if available
      if (user.firstName && user.lastName && !formik.values.name) {
        formik.setFieldValue("name", `${user.firstName} ${user.lastName}`);
      }
    }
  }, [user]);

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    formik.setFieldValue("country", country.name);
    setShowCoutries(false);
  };

  const handleInputChange = (e) => {
    formik.setFieldValue("country", e);
    setShowCoutries(true);

    // Clear selected country if input doesn't match
    if (selectedCountry && selectedCountry.name !== e) {
      setSelectedCountry(null);
    }
  };

  const closeToast = () => {
    setToastVisible(false);
  };

  // Debugging logs

  // Safely log firstName only if user exists
  if (user && user.firstName) {
    console.log(user.firstName);
  }

  const handleTabClick = (targetTab) => {
    // Check if cart is empty and prevent clicking on other tabs
    const isCartEmpty = !cart?.items || cart.items.length === 0;
    if (isCartEmpty && targetTab !== "cart") {
      dispatch(
        showToast({
          message: "Please add items to your cart before proceeding.",
          type: "error",
        }),
      );
      return;
    }

    const tabOrder = ["cart", "checkout", "review", "order"];
    const currentIndex = tabOrder.indexOf(activeTab);
    const targetIndex = tabOrder.indexOf(targetTab);

    // Allow moving backward freely
    if (targetIndex <= currentIndex) {
      setActiveTab(targetTab);
    }
    // Special handling for checkout tab - validate stock
    else if (targetTab === "checkout") {
      if (validateCartStock()) {
        setActiveTab(targetTab);
      }
    }
    // Special handling for review tab - must complete checkout first
    else if (targetTab === "review") {
      // Check if all required checkout fields are completed
      if (
        formik.values.name &&
        formik.values.phone &&
        formik.values.country &&
        formik.values.state &&
        formik.values.city &&
        formik.values.street &&
        formik.values.recipientName &&
        formik.values.paypalUsername &&
        formik.values.paypalContact
      ) {
        setActiveTab(targetTab);
      } else {
        dispatch(
          showToast({
            message: "Please complete checkout before proceeding to review.",
            type: "error",
          }),
        );
      }
    }
    // Restrict moving forward to other tabs
    else {
      dispatch(
        showToast({
          message: `Sorry, you can't move to this step yet.`,
          type: "error",
        }),
      );
    }
  };

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  // Handle browser autofill for country field
  useEffect(() => {
    if (formik.values.country && !selectedCountry) {
      // Find matching country from the countries list
      const matchingCountry = countries.find(
        (c) => c.name.toLowerCase() === formik.values.country.toLowerCase(),
      );
      if (matchingCountry) {
        setSelectedCountry(matchingCountry);
      }
    }
  }, [formik.values.country, countries, selectedCountry]);

  console.log(user, "USER");

  return (
    <div className="fixed top-0 right-0 inset-0 flex items-center justify-end bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div
        // ref={modalRef}
        className="flex flex-col justify-center items-center bg-[#FAFAFA] p-[32px] gap-[16px] shadow-lg w-[651px] h-full relative overflow-hidden"
      >
        {/* Tabs */}
        <div className="flex justify-around w-[587px] h-[68.69px]  pb-[16px] pt-[8px]">
          <div className="flex justify-around w-[539.02px] h-[44.69px]">
            <div
              onClick={() => handleTabClick("cart")}
              className={`py-2 px-4 font-poppins font-semibold text-[16px] leading-[24px]
                 ${activeTab === "cart"
                  ? "border-b-[4.69px] border-secondaryBrand font-semibold cursor-pointer"
                  : "text-[#949494] border-b-[4.69px] border-cartColor cursor-pointer"
                }`}
            >
              Cart
            </div>
            <div
              onClick={() => handleTabClick("checkout")}
              className={`py-2 px-4 font-poppins font-semibold text-[16px] leading-[24px] ${!cart?.items || cart.items.length === 0
                ? "text-[#C4C4C4] border-b-[4.69px] border-cartColor cursor-not-allowed opacity-50"
                : activeTab === "checkout"
                  ? "border-b-[4.69px] border-secondaryBrand font-semibold cursor-pointer"
                  : "text-[#949494] border-b-[4.69px] border-cartColor cursor-pointer"
                }`}
            >
              Checkout
            </div>
            <div
              onClick={() => handleTabClick("review")}
              className={`py-2 px-4 font-poppins font-semibold text-[16px] leading-[24px] ${!cart?.items || cart.items.length === 0
                ? "text-[#C4C4C4] border-b-[4.69px] border-cartColor cursor-not-allowed opacity-50"
                : activeTab === "review"
                  ? "border-b-[4.69px] border-secondaryBrand font-semibold cursor-pointer"
                  : "text-[#949494] border-b-[4.69px] border-cartColor cursor-pointer"
                }`}
            >
              Review
            </div>
            <div
              onClick={() => handleTabClick("order")}
              className={`py-2 px-4 font-poppins font-semibold text-[16px] leading-[24px] ${!cart?.items || cart.items.length === 0
                ? "text-[#C4C4C4] border-b-[4.69px] border-cartColor cursor-not-allowed opacity-50"
                : activeTab === "order"
                  ? "border-b-[4.69px] border-secondaryBrand font-semibold cursor-pointer"
                  : "text-[#949494] border-b-[4.69px] border-cartColor cursor-pointer"
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
                <div className="flex flex-col justify-start items-start gap-4 mb-36 ">
                  {cart?.items?.map((item) => (
                    <CartProduct item={item} getCart={getCart} />
                  ))}
                  <div className="fixed bottom-0 w-[587px] h-[168px] rounded-[32px] border-[1px] border-cartColor space-y-[24px] py-[24px] px-[32px] bg-[#FFFFFF]">
                    <div className="flex justify-between items-center w-[523px] h-[39px] gap-[16px] border-b-[1px] border-cartColor">
                      <h1 className="font-poppins font-medium text-[16px] leading-[24px] text-[#1A1A1A]">
                        Subtotal
                      </h1>
                      <h1 className="font-poppins font-bold text-[26px] leading-[39px] text-[#1A1A1A]">
                        {cart?.totalAmount} $
                      </h1>
                    </div>
                    <div className="flex justify-between items-center w-[523px] h-[57px] gap-[20px]">
                      <div
                        onClick={handleCheckoutClick}
                        className="flex justify-center items-center cursor-pointer w-[523px] h-[57px] rounded-[32px] gap-[20px] bg-secondaryBrand hover:bg-blue-700 transition-colors"
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
            <div className="flex flex-col justify-start items-center w-[651px] h-auto mb-32 gap-[16px] pb-16">
              {/* Buyer's Details */}
              <div className="flex flex-col justify-start items-start w-[587px] h-auto space-y-[16px]">
                <h1 className="font-inter font-medium text-[14px] leading-[16.94px] text-[#000000]">
                  Buyer's Details
                </h1>
                <div className="flex flex-col justify-center items-center w-[587px] h-auto space-y-[16px]">
                  <div className="flex justify-start items-start w-[587px] h-auto gap-[16px]">
                    {" "}
                    <div className="relative w-full">
                      <input
                        type="text"
                        id="fullName"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder=" "
                        required
                        className={`peer w-[285.5px] h-[53px] rounded-[8px] py-[10px] px-[15px] outline-none text-textFieldHeading border ${formik.errors.name && formik.touched.name
                          ? "border-red-500"
                          : "border-[#FFFFFF]"
                          }`}
                      />
                      <label
                        htmlFor="fullName"
                        className="absolute left-[15px] top-[14px] text-gray-400 text-sm transition-all bg-white px-1
      peer-placeholder-shown:top-[14px] peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryBrand
      peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-secondaryBrand"
                      >
                        Full Name
                      </label>
                      {formik.errors.name && formik.touched.name && (
                        <div className="text-red-600 text-xs mt-1">
                          {formik.errors.name}
                        </div>
                      )}
                    </div>
                    <div className="relative w-full">
                      <input
                        type="text"
                        id="contactNumber"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder=" "
                        className={`peer w-full rounded-md py-3 px-4 text-textFieldHeading outline-none focus:border-secondaryBrand border ${formik.errors.phone && formik.touched.phone
                          ? "border-red-500"
                          : "border-[#FFFFFF]"
                          }`}
                      />
                      <label
                        htmlFor="contactNumber"
                        className="absolute left-[15px] top-[14px] text-gray-400 text-sm transition-all bg-white px-1
        peer-placeholder-shown:top-[14px] peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
        peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryBrand
        peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-secondaryBrand"
                      >
                        Contact Number
                      </label>
                      {formik.errors.phone && formik.touched.phone && (
                        <div className="text-red-600 text-xs mt-1">
                          {formik.errors.phone}
                        </div>
                      )}
                    </div>
                  </div>
                  <input
                    type="text"
                    className="w-[587px] h-[53px] rounded-[8px] outline-none border-[1px] border-[#FFFFFF] gap-[10px] py-[10px] px-[15px] placeholder:text-textFieldHeading"
                    placeholder="Email Address"
                    name=""
                    id=""
                    value={user?.email}
                  // onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              {/* Shipping */}
              <div className="flex flex-col justify-start items-start w-[587px] h-auto space-y-[16px]">
                <h1 className="font-inter font-medium text-[14px] leading-[16.94px] text-[#000000]">
                  Shipping
                </h1>
                <div className="flex flex-col justify-center items-center w-[587px] h-auto space-y-[16px]">
                  <div className="flex justify-start items-start w-[587px] h-auto gap-[16px]">
                    <div className="relative flex flex-col justify-start items-start w-[285.5px]">
                      {/* Input + Flag */}
                      <div
                        className={`relative flex justify-start items-center w-full h-[53px] gap-[10px] py-[10px] px-[15px] rounded-[8px] bg-white border ${formik.errors.country && formik.touched.country
                          ? "border-red-500"
                          : "border-[#FFFFFF]"
                          }`}
                      >
                        {selectedCountry && (
                          <img
                            src={selectedCountry?.flag}
                            alt="flag"
                            className="w-[21px] h-[12.25px] z-10"
                          />
                        )}

                        <input
                          type="text"
                          id="country"
                          name="country"
                          value={formik.values.country}
                          onChange={(e) => {
                            handleInputChange(e.target.value);
                            formik.handleChange(e);
                          }}
                          onBlur={formik.handleBlur}
                          placeholder=" "
                          className="peer w-full h-full bg-transparent outline-none border-none text-textFieldHeading"
                        />

                        {/* Floating Label */}
                        <label
                          htmlFor="country"
                          className={`absolute  text-gray-400 text-sm transition-all px-1 pointer-events-none bg-white
        ${formik.values.country
                              ? "-top-2 text-xs text-secondaryBrand"
                              : "top-[15px] text-gray-400 text-sm"
                            }
        peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryBrand`}
                        >
                          Country
                        </label>
                      </div>

                      {/* Dropdown */}
                      {showCoutries && (
                        <div className="absolute top-12 flex flex-col justify-start items-start space-y-4 bg-white border border-gray-100 w-full max-h-[250px] overflow-auto px-4 py-2 z-20">
                          {countries
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .filter((c) =>
                              c.name
                                .toLowerCase()
                                .includes(formik.values.country.toLowerCase()),
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
                      {formik.errors.country && formik.touched.country && (
                        <div className="text-red-600 text-xs mt-1">
                          {formik.errors.country}
                        </div>
                      )}
                    </div>

                    <div className="relative flex flex-col justify-start items-start w-[285.5px]">
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formik.values.state}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder=" "
                        className={`peer w-full h-[53px] rounded-[8px] border bg-white py-[10px] px-[15px] outline-none text-textFieldHeading transition-all ${formik.errors.state && formik.touched.state
                          ? "border-red-500"
                          : "border-[#FFFFFF]"
                          }`}
                      />

                      <label
                        htmlFor="state"
                        className={`absolute left-4 text-gray-400 text-sm transition-all pointer-events-none bg-white px-1
      ${formik.values.state
                            ? "-top-2 text-xs text-secondaryBrand"
                            : "top-3 text-gray-400 text-sm"
                          }
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryBrand`}
                      >
                        State / Province
                      </label>
                      {formik.errors.state && formik.touched.state && (
                        <div className="text-red-600 text-xs mt-1">
                          {formik.errors.state}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-start items-start w-[587px] h-auto gap-[16px]">
                    <div className="relative w-[285.5px] flex flex-col justify-start items-start">
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder=" "
                        className={`peer w-full h-[53px] rounded-[8px] border bg-white py-[10px] px-[15px] outline-none text-textFieldHeading transition-all ${formik.errors.city && formik.touched.city
                          ? "border-red-500"
                          : "border-[#FFFFFF]"
                          }`}
                      />

                      <label
                        htmlFor="city"
                        className={`absolute left-4 text-gray-400 text-sm transition-all pointer-events-none bg-white px-1
      ${formik.values.city
                            ? "-top-2 text-xs text-secondaryBrand"
                            : "top-3 text-gray-400 text-sm"
                          }
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryBrand`}
                      >
                        City
                      </label>
                      {formik.errors.city && formik.touched.city && (
                        <div className="text-red-600 text-xs mt-1">
                          {formik.errors.city}
                        </div>
                      )}
                    </div>
                    <div className="relative w-[285.5px] flex flex-col justify-start items-start">
                      <input
                        type="text"
                        id="street"
                        name="street"
                        value={formik.values.street}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder=" "
                        className={`peer w-full h-[53px] rounded-[8px] border bg-white py-[10px] px-[15px] outline-none text-textFieldHeading transition-all ${formik.errors.street && formik.touched.street
                          ? "border-red-500"
                          : "border-[#FFFFFF]"
                          }`}
                      />

                      <label
                        htmlFor="street"
                        className={`absolute left-4 text-gray-400 text-sm transition-all pointer-events-none bg-white px-1
      ${formik.values.street
                            ? "-top-2 text-xs text-secondaryBrand"
                            : "top-3 text-gray-400 text-sm"
                          }
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-secondaryBrand`}
                      >
                        Street
                      </label>
                      {formik.errors.street && formik.touched.street && (
                        <div className="text-red-600 text-xs mt-1">
                          {formik.errors.street}
                        </div>
                      )}
                    </div>
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
                  className={`flex flex-col justify-start items-center bg-white w-[587px] ${openPaymentMethod ? "h-[322px]" : ""
                    } rounded-[8px] border-[1px] border-[#FFFFFF0D]`}
                >
                  <div
                    className="flex justify-center items-center w-[587px] h-[53px] border-b-[1px] border-cartColor py-[8px] px-[16px] gap-[8px] cursor-pointer hover:bg-gray-50"
                    onClick={() => setOpenPaymentMethod(!openPaymentMethod)}
                  >
                    <img src="/assets/paypal.png" alt="paypal" />
                    <h1 className="w-[509px] font-poppins font-semibold text-[14px] leading-[21px] text-[#393A44]">
                      PayPal *
                    </h1>
                    <Icons.ChevronDown
                      className={`w-[10px] h-[6px] transform transition-transform ${openPaymentMethod ? "rotate-180" : ""}`}
                    />
                  </div>
                  <div
                    className={`${openPaymentMethod ? "block" : "hidden"
                      } flex flex-col justify-start items-start w-full h-auto p-[16px] space-y-[16px]`}
                  >
                    {/* Recipient Name */}
                    <div className="w-full flex flex-col justify-start items-start space-y-[8px]">
                      <p className="font-poppins font-medium text-[12px] text-[#434343]">
                        Recipient's Name *
                      </p>
                      <div
                        className={`flex justify-center items-center w-[539px] h-[44px] bg-[#F8F8F8] p-[12px] ${formik.errors.recipientName && formik.touched.recipientName
                          ? "border border-red-500"
                          : ""
                          }`}
                      >
                        <input
                          type="text"
                          name="recipientName"
                          value={formik.values.recipientName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="Enter Recipient's Name"
                          className="bg-transparent w-full h-full outline-none font-poppins text-[12px] text-[#434343]"
                        />
                      </div>
                      {formik.errors.recipientName && formik.touched.recipientName && (
                        <div className="text-red-600 text-xs">
                          {formik.errors.recipientName}
                        </div>
                      )}
                    </div>

                    <div className="w-full flex flex-col justify-start items-start space-y-[8px]">
                      <p className="font-poppins font-medium text-[12px] text-[#434343]">
                        PayPal Username *
                      </p>
                      <div
                        className={`flex justify-center items-center w-[539px] h-[44px] bg-[#F8F8F8] p-[12px] ${formik.errors.paypalUsername && formik.touched.paypalUsername
                          ? "border border-red-500"
                          : ""
                          }`}
                      >
                        <input
                          type="text"
                          name="paypalUsername"
                          value={formik.values.paypalUsername}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="Enter PayPal Username"
                          className="bg-transparent w-full h-full outline-none font-poppins text-[12px] text-[#434343]"
                        />
                      </div>
                      {formik.errors.paypalUsername && formik.touched.paypalUsername && (
                        <div className="text-red-600 text-xs">
                          {formik.errors.paypalUsername}
                        </div>
                      )}
                    </div>

                    <div className="w-full flex flex-col justify-start items-start space-y-[8px]">
                      <p className="font-poppins font-medium text-[12px] text-[#434343]">
                        E-mail / Phone Number *
                      </p>
                      <div
                        className={`flex justify-center items-center w-[539px] h-[44px] bg-[#F8F8F8] p-[12px] ${formik.errors.paypalContact && formik.touched.paypalContact
                          ? "border border-red-500"
                          : ""
                          }`}
                      >
                        <input
                          type="text"
                          name="paypalContact"
                          value={formik.values.paypalContact}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="Enter E-mail / Phone Number"
                          className="bg-transparent w-full h-full outline-none font-poppins text-[12px] text-[#434343]"
                        />
                      </div>
                      {formik.errors.paypalContact && formik.touched.paypalContact && (
                        <div className="text-red-600 text-xs">
                          {formik.errors.paypalContact}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Confirm order */}
              <div className="flex justify-start items-center bg-[#FAFAFA] absolute bottom-0 left-0 right-0 h-[80px] gap-[20px] z-[100] pb-[24px] pt-[16px] px-[32px]">
                <div
                  onClick={() => setActiveTab("cart")}
                  className="flex justify-center items-center cursor-pointer w-full h-[55px] rounded-[32px] gap-[8px] bg-[#0137641A]"
                >
                  <h1 className="flex justify-center items-center leading-[21px] font-poppins font-semibold text-[#013764] text-[14px] w-full">
                    Go Back
                  </h1>
                </div>
                <div
                  onClick={() => formik.handleSubmit()}
                  className="flex justify-center items-center cursor-pointer w-full h-[55px] rounded-[32px] gap-[8px] bg-secondaryBrand"
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
                  className={`flex justify-start items-center w-[587px] h-[37px] py-[8px] px-[16px] gap-[8px] cursor-pointer hover:bg-gray-50 ${openOrders && "border-b-[1px] border-cartColor"
                    }`}
                  onClick={() => setOpenOrders(!openOrders)}
                >
                  <h1 className="w-[538px] font-poppins font-semibold text-[14px] leading-[21px] text-[#393A44]">
                    Your Orders
                  </h1>
                  <Icons.ChevronDown
                    className={`w-[10px] h-[6px] transform transition-transform ${openOrders ? "rotate-180" : ""}`}
                  />
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
                              {item.description}
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
                  className={`flex justify-start items-center w-[587px] h-[37px] py-[8px] px-[16px] gap-[8px] ${openPaymentMethod && "border-b-[1px] border-cartColor"
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
                  className={`flex justify-start items-center w-[587px] h-[37px] py-[8px] px-[16px] gap-[8px] cursor-pointer hover:bg-gray-50 ${openBuyerDetail && "border-b-[1px] border-cartColor"
                    }`}
                  onClick={() => setOpenBuyerDetail(!openBuyerDetail)}
                >
                  <h1 className="w-[537px] font-poppins font-semibold text-[14px] leading-[21px] text-[#393A44]">
                    Buyer's Details
                  </h1>
                  <Icons.ChevronDown
                    className={`w-[10px] h-[6px] transform transition-transform ${openBuyerDetail ? "rotate-180" : ""}`}
                  />
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
                      {formik.values.name}
                    </p>
                  </div>

                  <div className="w-[555px] h-[62px] flex flex-col justify-start items-start space-y-[6px]">
                    <p className="font-poppins font-normal h-[18px] text-[12px] leading-[18px] text-[#949494]">
                      Email Address
                    </p>
                    <p className="font-poppins font-normal   h-[40px] text-[14px] leading-[21px] text-[##434343]">
                      {user?.email}
                    </p>
                  </div>

                  <div className="w-[555px] h-[62px] flex flex-col justify-start items-start space-y-[6px]">
                    <p className="font-poppins font-normal h-[18px] text-[12px] leading-[18px] text-[#949494]">
                      Contact Number
                    </p>
                    <p className="font-poppins font-normal h-[40px] text-[14px] leading-[21px] text-[##434343]">
                      {formik.values.phone}
                    </p>
                  </div>

                  <div className="w-[555px] h-[62px] flex flex-col justify-start items-start space-y-[6px]">
                    <p className="font-poppins font-normal h-[18px] text-[12px] leading-[18px] text-[#949494]">
                      Shipping Address
                    </p>
                    <p className="font-poppins font-normal h-[40px] text-[14px] leading-[21px] text-[##434343]">
                      {selectedCountry?.name} , {formik.values.street} , {formik.values.city} , {formik.values.state}
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
                  className={`flex justify-start items-center w-[587px] h-[37px] py-[8px] px-[16px] gap-[8px] cursor-pointer hover:bg-gray-50 ${openCartTotal && "border-b-[1px] border-cartColor"
                    }`}
                  onClick={() => setOpenCartTotal(!openCartTotal)}
                >
                  <h1 className="w-[537px] font-poppins font-semibold text-[14px] leading-[21px] text-[#393A44]">
                    Cart Total
                  </h1>
                  <Icons.ChevronDown
                    className={`w-[10px] h-[6px] transform transition-transform ${openCartTotal ? "rotate-180" : ""}`}
                  />
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
          {activeTab === "review" && (
            <div className="flex justify-center items-center w-[587px] h-[105px] rounded-[32px] py-[24px] px-[32px] gap-[24px]">
              <button
                onClick={() => {
                  // createOrder();
                  setIsOpenCartModel(true);
                }}
                className="flex justify-center items-center w-[523px] h-[57px] rounded-[99px] py-[18px] px-[129px] bg-[#001D58] text-white shadow-lg"
              >
                Confirm Order
              </button>
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
                  console.log("hello");
                  navigate("/shop");
                  window.location.reload();
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
      </div>
      <Toast
        message={toastMessage}
        isVisible={toastVisible}
        onClose={closeToast}
        type={toastType}
      />
      {isopenCartModel && (
        <CartConfirmModel
          isopenCartModel={isopenCartModel}
          setIsOpenCartModel={setIsOpenCartModel}
          createOrder={createOrder}
          activeTab={setActiveTab}
        />
      )}
    </div>
  );
};

export default ShoppingCart;
