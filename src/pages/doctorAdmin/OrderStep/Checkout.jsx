import React, { useState } from "react";
import { orderService } from "../../../services/orderService";

const CheckoutForm = ({ next }) => {
  // const [formData, setFormData] = useState({
  //   fullName: "",
  //   contactNumber: "",
  //   email: "",
  //   country: "America",
  //   state: "",
  //   city: "",
  //   street: "",
  //   recipientName: "",
  //   paypalUsername: "",
  //   paypalEmailPhone: "",
  //   paymentMethod: "",
  // });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    country: "America",
    state: "",
    city: "",
    street: "",
    recipientName: "",
    paypalUsername: "",
    paypalEmailPhone: "",
    paymentMethod: "",
    cardNumber: "",
    expiryDate: "",
    accountNumber: "",
    bankName: "",
  });
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const buildRequestData = () => {
    const saved = localStorage.getItem("restorationForm");
    const storedData = saved ? JSON.parse(saved) : {};

    return {
      userId: 5,
      totalAmount: 200,
      transactionId: Date.now(),
      expectedDeliveryDate: "2025-09-30T00:00:00",

      // 🟢 localStorage data
      doctorName: storedData?.doctorName || "Dr. Default",
      doctorRegNumber: storedData?.doctorRegNumber || "REG-0000",
      patientLastName:
        storedData?.patientLastName ||
        formData.fullName.split(" ").slice(-1)[0] ||
        "Doe",
      patientFirstName:
        storedData?.patientFirstName ||
        formData.fullName.split(" ")[0] ||
        "John",
      subscriptionId: storedData?.subscriptionId || "SUB-0000",
      additionalNotes: storedData?.additionalNotes || "Checkout order",
      selectedTooths: storedData?.selectedTooths || [],

      // 🟢 example order items
      doctorOrderItems: [
        { id: 1, doctorOrderId: 1, dropdownMasterId: 10, quantity: 2, unitPrice: 50 },
        { id: 2, doctorOrderId: 1, dropdownMasterId: 12, quantity: 3, unitPrice: 50 },
      ],
      // 🟢 payment (static for now)
      paymentId: 8,
      // 🟢 buyer details
      name: formData.fullName,
      address: `${formData.street}, ${formData.city}, ${formData.state}, ${formData.country}`,
      email: formData.email,
      phone: formData.contactNumber,
    };
  };

  // ✅ submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const requestData = buildRequestData();
      console.log("🟢 Final requestData:", requestData);
      const apiFormData = new FormData();
      apiFormData.append("request", JSON.stringify(requestData));
      // ✅ API CALL
      const res = await orderService.createOrder(apiFormData);
      console.log("✅ Order created successfully:", res.data);
      if (next) next(); // move to next step
    } catch (err) {
      console.error("❌ Error creating order:", err.response?.data || err.message);
      setError(err.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Form Submitted:", formData);
  // };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     // 🔹 1. Request object (API ke structure ke mutabiq)
  //     const requestData = {
  //       userId: 5,
  //       totalAmount: 180.0,
  //       transactionId: Date.now(), // random id
  //       expectedDeliveryDate: "2025-09-30T00:00:00",
  //       doctorName: "Dr. Emily Smith",
  //       doctorRegNumber: "REG-56789",
  //       patientLastName: formData.fullName.split(" ").slice(-1)[0] || "Doe",
  //       patientFirstName: formData.fullName.split(" ")[0] || "Jane",
  //       subscriptionId: "SUB-12345",
  //       additionalNotes: "Checkout form order",
  //       doctorOrderItems: [
  //         { id: 1, doctorOrderId: 1, dropdownMasterId: 10, quantity: 2, unitPrice: 50.0 },
  //         { id: 2, doctorOrderId: 1, dropdownMasterId: 12, quantity: 3, unitPrice: 50.0 },
  //       ],
  //       paymentId: 8,
  //       selectedTooths: [12, 13, 32],
  //       name: formData.fullName,
  //       address: `${formData.street}, ${formData.city}, ${formData.state}, ${formData.country}`,
  //       email: formData.email,
  //       phone: formData.contactNumber,
  //     };

  //     // 🔹 2. FormData for multipart
  //     const apiFormData = new FormData();
  //     apiFormData.append("request", JSON.stringify(requestData));

  //     // agar file upload karna ho (e.g. input[type=file])
  //     // const file = document.querySelector("#fileInput")?.files[0];
  //     // if (file) apiFormData.append("image", file);

  //     // 🔹 3. Axios POST
  //     const res = await axios.post("http://localhost:8080/api/doctororder", apiFormData, {
  //       headers: {
  //         Authorization:
  //           "Bearer dDBlL3U1UFJCVEZRaVNLbWVyM2pTci9welBYUUJZQzVJbmVZU2dsS0ZPeHpZR1RrdlVzWUdKaEs3WVozSGdBLy9McmxKRENEZ0JmWkdnWXNwOE1rOUk1OWozelpwcy83NERhTzFBTzlTZDB5bUIrU2RPdjEwVEw3bWxTc2p3MXdneCtrTlF5MlJJUXF6TWFnUmNQZG5uZHROZkhSMzBQK1hFZlVweWpVZFpjYXlvTVBaZUgyNk52NHprWHROQlpXSCtFbmZNaWhBN3dKQSsyQ0MvdC9HdHY1ZkxMZ3ZiVlVPUXdTNjdpdzJqeDFPU0Jpalg1ZGFOWmtKSElEc0lRa0VMUjN1cld3TEpMck9Ya1Y0VVE9PX50cnVl",
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     console.log("✅ Order Created:", res.data);
  //     setLoading(false);

  //     // agay step pe le jana
  //     if (next) next();
  //   } catch (err) {
  //     console.error("❌ API Error:", err.response?.data || err.message);
  //     setError(err.response?.data || "Something went wrong");
  //     setLoading(false);
  //   }
  // };




  // const handleSubmit = async () => {
  //   try {
  //     const saved = localStorage.getItem("restorationForm");
  //     if (!saved) {
  //       console.error("⚠ No saved data found in localStorage!");
  //       return;
  //     }

  //     const storedData = JSON.parse(saved);

  //     // yahan tum apni backend API format ke hisab se final request build karo
  //     const requestData = {
  //       userId: 5,
  //       totalAmount: 200,
  //       transactionId: Date.now(),
  //       expectedDeliveryDate: "2025-09-30T00:00:00",

  //       // 🟢 LocalStorage se inject kiya hua data
  //       doctorName: storedData.doctorName,
  //       doctorRegNumber: storedData.doctorRegNumber,
  //       patientLastName: storedData.patientLastName,
  //       patientFirstName: storedData.patientFirstName,
  //       subscriptionId: storedData.subscriptionId,
  //       additionalNotes: storedData.additionalNotes,
  //       selectedTooths: storedData.selectedTooths,

  //       // baki fields static / calculated
  //       doctorOrderItems: [
  //         { id: 1, doctorOrderId: 1, dropdownMasterId: 10, quantity: 2, unitPrice: 50 },
  //       ],
  //       paymentId: 8,
  //       name: "John Doe",
  //       address: "123 Main Street, NY",
  //       email: "john@example.com",
  //       phone: "+1-555-1234",
  //     };
  //     console.log("🟢 Final requestData to send:", requestData);

  //     const formData = new FormData();
  //     formData.append("request", JSON.stringify(requestData));

  //     // file agar select ho
  //     // formData.append("image", file);

  //     const res = await orderService.createOrder(formData);
  //     console.log("✅ Order created successfully:", res.data);
  //   } catch (err) {
  //     console.error("❌ Error creating order:", err.response?.data || err.message);
  //   }
  // };




  return (
    <div className="min-h-screen bg-bgWhite" >
      <div className=" pt-5  pb-10">
        <div className=" px-4">
          <form
            onSubmit={handleSubmit}
            className="grid gap-8 grid-cols-1 lg:grid-cols-12  font-poppins"
          >
            {/* Left Section - Form */}
            <div className="lg:col-span-8 bg-white rounded-xl border border-gray-200 p-6 space-y-6">
              {/* Buyer’s Details */}
              <div>
                <h2 className="text-sm  mb-3 font-medium  font-poppins">
                  Buyer’s Details
                </h2>
                <div className=" grid grid-cols-1  gap-4  sm:grid-cols-12">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className='border sm:col-span-6 space-y-4  outline-none rounded-lg px-3 py-2 w-full bg-white text-gray-700 placeholder:text-sm placeholder:font-poppins placeholder:font-normal'
                  />
                  <input
                    type="text"
                    name="contactNumber"
                    placeholder="Contact Number"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className='border sm:col-span-6 space-y-4  outline-none rounded-lg px-3 py-2 w-full bg-white text-gray-700 placeholder:text-sm placeholder:font-poppins placeholder:font-normal'
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="E-Mail Address"
                  value={formData.email}
                  onChange={handleChange}
                  className={"border outline-none  rounded-lg px-3 py-2 w-full mt-3 bg-white text-gray-700 placeholder:text-sm placeholder:font-poppins placeholder:font-normal"}
                />
              </div>

              {/* Shipping */}
              <div>
                <h2 className="text-sm font-medium mb-3 font-inter">
                  Shipping
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <img
                        src="/assets/doctor/flag.png" // Replace with actual flag image path
                        alt="US Flag"
                        className="w-5 h-5 rounded-sm"
                      />
                    </span>
                    <input
                      type="text"
                      name="country"
                      placeholder="Country"
                      value={formData.country}
                      readOnly
                      className="border rounded-lg pl-10 px-3 py-2 w-full outline-none text-gray-700  placeholder:text-sm placeholder:font-poppins placeholder:font-normal"
                    />
                  </div>
                  <input
                    type="text"
                    name="state"
                    placeholder="State/Province"
                    value={formData.state}
                    onChange={handleChange}
                    className="border  rounded-lg px-3 py-2 w-full bg-white outline-none text-gray-700  placeholder:text-sm placeholder:font-poppins placeholder:font-normal"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="border  rounded-lg px-3 py-2 w-full bg-white outline-none text-gray-700  placeholder:text-sm placeholder:font-poppins placeholder:font-normal "
                  />
                  <input
                    type="text"
                    name="street"
                    placeholder="Street"
                    value={formData.street}
                    onChange={handleChange}
                    className="border  rounded-lg px-3 py-2 w-full bg-white outline-none text-gray-700   placeholder:text-sm placeholder:font-poppins placeholder:font-normal"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="border rounded-lg p-4 bg-white">
                <h2 className="text-sm font-semibold mb-3 font-poppins">
                  Payment Method
                </h2>

                {/* Dropdown */}
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod || ""}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 w-full bg-gray-50 text-gray-700 mb-4 outline-none text-xs font-normal  font-poppins"
                >
                  <option value="" className="text-xs font-normal  font-poppins">Select the Option</option>
                  <option value="paypal" className="text-xs font-normal  font-poppins">PayPal</option>
                  <option value="creditCard" className="text-xs font-normal  font-poppins">Credit Card</option>
                  <option value="bankTransfer" className="text-xs font-normal  font-poppins">Bank Transfer</option>
                </select>

                {/* PayPal Section */}
                {formData.paymentMethod === "paypal" && (
                  <div className="border rounded-lg p-4 ">
                    <div className="flex items-center mb-3">
                      <img
                        src="/assets/doctor/paypal.png"
                        alt="Paypal Logo"
                        className="w-5 h-5 rounded-sm"
                      />
                      <span className="font-medium ml-2">Paypal</span>
                    </div>
                    <hr className="border-t my-3" />

                    <div className="mb-3">
                      <label className="block text-xs font-medium mb-1 text-primaryText  ">
                        Recipient's Name
                      </label>
                      <input
                        type="text"
                        name="recipientName"
                        placeholder="Enter Recipient's Name"
                        value={formData.recipientName}
                        onChange={handleChange}
                        className="border rounded-lg px-3 py-2 w-full outline-none bg-gray-50 text-primaryText  placeholder:text-xs placeholder:font-poppins"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium mb-1  ">
                          Paypal Username
                        </label>
                        <input
                          type="text"
                          name="paypalUsername"
                          placeholder="Enter Paypal Username"
                          value={formData.paypalUsername}
                          onChange={handleChange}
                          className="border rounded-lg px-3 py-2 w-full outline-none bg-gray-50 text-primaryText placeholder:text-xs placeholder:font-poppins"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1  ">
                          E-mail/Phone number
                        </label>
                        <input
                          type="text"
                          name="paypalEmailPhone"
                          placeholder="Enter E-mail/Phone number"
                          value={formData.paypalEmailPhone}
                          onChange={handleChange}
                          className="border rounded-lg px-3 py-2 w-full outline-none bg-gray-50 text-primaryText placeholder:text-xs placeholder:font-poppins"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Credit Card Section */}
                {formData.paymentMethod === "creditCard" && (
                  <div className="border rounded-lg p-4 space-y-3">
                    <label className="block text-sm font-medium mb-1 text-primaryText">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Enter Card Number"
                      value={formData.cardNumber || ""}
                      onChange={handleChange}
                      className="border rounded-lg px-3 py-2 w-full bg-gray-50 outline-none text-primaryText placeholder:text-xs placeholder:font-poppins"
                    />
                    <label className="block text-sm font-medium mb-1 text-primaryText ">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate || ""}
                      onChange={handleChange}
                      className="border rounded-lg px-3 py-2 w-full outline-none bg-gray-50 text-primaryText placeholder:text-xs placeholder:font-poppins"
                    />
                  </div>
                )}

                {/* Bank Transfer Section */}
                {formData.paymentMethod === "bankTransfer" && (
                  <div className="border rounded-lg p-4 space-y-3">
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Account Number
                    </label>
                    <input
                      type="text"
                      name="accountNumber"
                      placeholder="Enter Account Number"
                      value={formData.accountNumber || ""}
                      onChange={handleChange}
                      className="border rounded-lg px-3 py-2 w-full bg-gray-50 outline-none text-primaryText placeholder:text-xs placeholder:font-poppins
"
                    />
                    <label className="block text-sm font-medium mb-1 outline-none text-gray-700">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      name="bankName"
                      placeholder="Enter Bank Name"
                      value={formData.bankName || ""}
                      onChange={handleChange}
                      className="border rounded-lg px-3 py-2 w-full bg-gray-50 outline-none text-primaryText placeholder:text-xs placeholder:font-poppins"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right Section - Order Summary */}
            <div className="md:col-span-4 bg-white rounded-xl border border-gray-200 p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-medium text-gray-800 mb-4">
                  Order Summary
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-xs text-[#828386] font-normal ">Emax <span className="text-[#1A1A1A] text-xs font-poppins font-normal">x4</span></span>
                    <span className="text-[#1A1A1A] text-xs font-poppins font-normal">$80.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-[#828386] font-normal">Argen ST <span className="text-[#1A1A1A] text-xs font-poppins font-normal">x3</span></span>
                    <span className="text-[#1A1A1A] text-xs font-poppins font-normal">$90.00</span>
                  </div>

                  <div className="flex justify-between ">
                    <span className="text-xs text-[#828386] font-normal">Subtotal</span>
                    <span className="text-[#1A1A1A] text-xs font-poppins font-normal">$180.00</span>
                  </div>
                  <hr />
                  <div className="flex justify-between">
                    <span className="text-xs text-[#828386] font-normal">Shipping</span>
                    <span className="text-[#1A1A1A] text-xs font-poppins font-normal">Free</span>
                  </div>
                  <div className="flex justify-between  text-[rgba(0, 29, 88, 1)] text-base mt-4  pt-2 text-secondaryBrand">
                    <span className="text-secondaryBrand text-base font-normal font-poppins">Total</span>
                    <span className="text-secondaryBrand text-base font-semibold font-poppins">$180.00</span>
                  </div>
                </div>
              </div>
              <button type="submit" className="mt-6 w-full py-4 rounded-3xl bg-[rgba(0,29,88,1)] hover:bg-blue-800 text-white font-medium" >
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div >
  );
};

export default CheckoutForm;
