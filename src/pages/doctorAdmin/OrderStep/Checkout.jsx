import React, { useState } from "react";

const CheckoutForm = () => {
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
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-bgWhite">
      <div className=" py-10 ">
        <div className=" px-4">
          <form
            onSubmit={handleSubmit}
            className="grid gap-8 grid-cols-1 lg:grid-cols-12  font-poppins"
          >
            {/* Left Section - Form */}
            <div className="lg:col-span-8 bg-white rounded-xl border border-gray-200 p-6 space-y-6">
              {/* Buyer’s Details */}
              <div>
                <h2 className="text-lg  mb-3 font-inter font-medium">
                  Buyer’s Details
                </h2>
                <div className=" grid grid-cols-1  gap-4  sm:grid-cols-12">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="border sm:col-span-6  outline-none rounded-lg px-3 py-2 w-full bg-white text-gray-700"
                  />
                  <input
                    type="text"
                    name="contactNumber"
                    placeholder="Contact Number"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="border sm:col-span-6  outline-none  rounded-lg px-3 py-2 w-full bg-white text-gray-700"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="E-Mail Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="border outline-none  rounded-lg px-3 py-2 w-full mt-3 bg-white text-gray-700"
                />
              </div>

              {/* Shipping */}
              <div>
                <h2 className="text-lg font-medium mb-3 font-inter">
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
                      className="border rounded-lg pl-10 px-3 py-2 w-full outline-none text-gray-700"
                    />
                  </div>
                  <input
                    type="text"
                    name="state"
                    placeholder="State/Province"
                    value={formData.state}
                    onChange={handleChange}
                    className="border  rounded-lg px-3 py-2 w-full bg-white outline-none text-gray-700"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="border  rounded-lg px-3 py-2 w-full bg-white outline-none text-gray-700"
                  />
                  <input
                    type="text"
                    name="street"
                    placeholder="Street"
                    value={formData.street}
                    onChange={handleChange}
                    className="border  rounded-lg px-3 py-2 w-full bg-white outline-none text-gray-700"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="border rounded-lg p-4 bg-white">
                <h2 className="text-lg font-semibold mb-3 font-poppins">
                  Payment Method
                </h2>

                {/* Dropdown */}
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod || ""}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 w-full bg-gray-50 text-gray-700 mb-4 outline-none"
                >
                  <option value="" disabled>
                    Please Select
                  </option>
                  <option value="paypal">PayPal</option>
                  <option value="creditCard">Credit Card</option>
                  <option value="bankTransfer">Bank Transfer</option>
                </select>

                {/* PayPal Section */}
                {formData.paymentMethod === "paypal" && (
                  <div className="border rounded-lg p-4 ">
                    <div className="flex items-center mb-3">
                      <img
                        src="/assets/paypal.jpeg"
                        alt="Paypal Logo"
                        className="w-5 h-5 rounded-sm"
                      />
                      <span className="font-medium ml-2">Paypal</span>
                    </div>
                    <hr className="border-t my-3" />

                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Recipient's Name
                      </label>
                      <input
                        type="text"
                        name="recipientName"
                        placeholder="Enter Recipient's Name"
                        value={formData.recipientName}
                        onChange={handleChange}
                        className="border rounded-lg px-3 py-2 w-full outline-none bg-gray-50 text-gray-700"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                          Paypal Username
                        </label>
                        <input
                          type="text"
                          name="paypalUsername"
                          placeholder="Enter Paypal Username"
                          value={formData.paypalUsername}
                          onChange={handleChange}
                          className="border rounded-lg px-3 py-2 w-full outline-none bg-gray-50 text-gray-700"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                          E-mail/Phone number
                        </label>
                        <input
                          type="text"
                          name="paypalEmailPhone"
                          placeholder="Enter E-mail/Phone number"
                          value={formData.paypalEmailPhone}
                          onChange={handleChange}
                          className="border rounded-lg px-3 py-2 w-full outline-none bg-gray-50 text-gray-700"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Credit Card Section */}
                {formData.paymentMethod === "creditCard" && (
                  <div className="border rounded-lg p-4 space-y-3">
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Enter Card Number"
                      value={formData.cardNumber || ""}
                      onChange={handleChange}
                      className="border rounded-lg px-3 py-2 w-full bg-gray-50 outline-none text-gray-700"
                    />
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate || ""}
                      onChange={handleChange}
                      className="border rounded-lg px-3 py-2 w-full outline-none bg-gray-50 text-gray-700"
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
                      className="border rounded-lg px-3 py-2 w-full bg-gray-50 outline-none text-gray-700"
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
                      className="border rounded-lg px-3 py-2 w-full bg-gray-50 outline-none text-gray-700"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right Section - Order Summary */}
            <div className="md:col-span-4 bg-white rounded-xl border border-gray-200 p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Order Summary
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Emax x4</span>
                    <span>$80.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Argen ST x3</span>
                    <span>$90.00</span>
                  </div>

                  <div className="flex justify-between ">
                    <span>Subtotal</span>
                    <span className="font-semibold">$180.00</span>
                  </div>
                  <hr />
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between  text-[rgba(0, 29, 88, 1)] text-base mt-4  pt-2 text-secondaryBrand">
                    <span>Total</span>
                    <span className="font-bold">$180.00</span>
                  </div>
                </div>
              </div>
              <button className="mt-6 w-full py-4 rounded-3xl bg-[rgba(0,29,88,1)] hover:bg-blue-800 text-white font-medium">
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
