import React, { useEffect, useState } from "react";
import { orderService } from "../../../services/order-service/index";
import { useSelector } from "react-redux";
import { CheckoutvalidationSchema } from "../../../Common/FormsValidation/order-validation";
import { ErrorMessage, Field, Formik } from "formik";

const CheckoutForm = ({ next }) => {
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


  const restoration = useSelector((state) => state.restoration);
  const { toothSelections, selectedTooth } = restoration; // destructure from Redux
  const flattenedItems = (restoration.doctorOrderItems || []).map((item, index) => ({
    id: index + 1, // or your API might auto-generate
    doctorOrderId: 1, // assuming this is fixed or can come from somewhere
    dropdownMasterId: typeof item.dropdownMasterId === "object" ? item.dropdownMasterId.value : item.dropdownMasterId,
    quantity: item.quantity || 1,
    unitPrice: item.unitPrice || 0,
  }));
  const storedUser = localStorage.getItem("user");
  const userId = storedUser ? JSON.parse(storedUser).id : 5;
  const buildRequestData = (data) => {
    const doctorData = {};
    (restoration.doctor || []).forEach(d => {
      doctorData[d.field] = d.value;
    });

    const patientData = {};
    (restoration.patient || []).forEach(p => {
      patientData[p.field] = p.value;
    });

    const selectedTeeth = restoration.selectedTeeth || [12, 13];

    return {
      userId,
      totalAmount: restoration.totalPrice || 250.0,
      transactionId: null,
      expectedDeliveryDate: "2025-09-30T00:00:00",
      doctorName: doctorData.doctorName || "Dr. Default",
      doctorRegNumber: doctorData.officeReg || "REG-0000",
      patientFirstName: patientData.patientFirstName || "John",
      patientLastName: patientData.patientLastName || "Doe",
      subscriptionId: patientData.subscriptionId || "SUB-0000",
      additionalNotes: restoration.note || "Checkout order",
      selectedTooths: selectedTeeth,
      doctorOrderItems: flattenedItems,
      paymentId: 8,
      name: data.fullName || "",
      address: `${data.street || ""}, ${data.city || ""}, ${data.state || ""}, ${data.country || ""}`,
      email: data.email || "",
      phone: data.contactNumber || "+1-555-123-4567",
      orderStatus: "PENDING",
      paymentStatus: "Unpaid",
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Required fields validation
    const requiredFields = ["fullName", "contactNumber", "email", "state", "city", "street", "paymentMethod"];
    for (let field of requiredFields) {
      if (!formData[field] || formData[field].trim() === "") {
        alert(`Please fill ${field}`);
        setLoading(false);
        return;
      }
    }

    try {
      // Pass formData explicitly
      const requestData = buildRequestData(formData);
      console.log("🟢 Final requestData:", requestData);

      const apiFormData = new FormData();
      apiFormData.append("request", JSON.stringify(requestData));

      const res = await orderService.createOrder(apiFormData);
      console.log("✅ Order created successfully:", res.data);
      next();
    } catch (err) {
      console.error("❌ Error creating order:", err.response?.data || err.message);
      setError(err.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  const currentTooth = toothSelections.find((t) => t.toothId === selectedTooth);
  const totalPrice = currentTooth
    ? Object.values(currentTooth)
      .filter((field) => field && typeof field === "object" && field.price)
      .reduce((sum, field) => sum + field.price, 0)
    : 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="min-h-screen bg-bgWhite">
      <div className=" pt-5  pb-10">
        <div className=" px-4">
          <Formik
            initialValues={
              {
                fullName: "",
                contactNumber: "",
                email: "",
                country: "America",
                state: "",
                city: "",
                street: "",
                paymentMethod: "",
                recipientName: "",
                paypalUsername: "",
                paypalEmailPhone: "",
                cardNumber: "",
                expiryDate: "",
                accountNumber: "",
                bankName: ""
              }}
            validationSchema={CheckoutvalidationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (

              <>
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
                        {/* <input
                          type="text"
                          name="fullName"
                          placeholder="Full Name"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="border sm:col-span-6 space-y-4  outline-none rounded-lg px-3 py-2 w-full bg-white text-gray-700 placeholder:text-sm placeholder:font-poppins placeholder:font-normal"
                        /> */}


                        <Field
                          type="text"
                          name="fullName"
                          placeholder="Full Name"
                        
                          onChange={handleChange}
                          
                          className="border rounded-lg px-3 py-2 w-full"
                        />
                        <ErrorMessage
                          name="fullName"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                        <input
                          type="text"
                          name="contactNumber"
                          placeholder="Contact Number"
                          value={formData.contactNumber}
                          onChange={handleChange}
                          className="border sm:col-span-6 space-y-4  outline-none rounded-lg px-3 py-2 w-full bg-white text-gray-700 placeholder:text-sm placeholder:font-poppins placeholder:font-normal"
                        />
                      </div>
                      <input
                        type="email"
                        name="email"
                        placeholder="E-Mail Address"
                        value={formData.email}
                        onChange={handleChange}
                        className={
                          "border outline-none  rounded-lg px-3 py-2 w-full mt-3 bg-white text-gray-700 placeholder:text-sm placeholder:font-poppins placeholder:font-normal"
                        }
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
                        <option
                          value=""
                          className="text-xs font-normal  font-poppins"
                        >
                          Select the Option
                        </option>
                        <option
                          value="paypal"
                          className="text-xs font-normal  font-poppins"
                        >
                          PayPal
                        </option>
                        <option
                          value="creditCard"
                          className="text-xs font-normal  font-poppins"
                        >
                          Credit Card
                        </option>
                        <option
                          value="bankTransfer"
                          className="text-xs font-normal  font-poppins"
                        >
                          Bank Transfer
                        </option>
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
                        {(restoration.selectedTeeth || []).map((toothId) => {
                          const tooth = restoration.toothSelections.find(t => t.toothId === toothId) || {};
                          const optionFields = Object.keys(tooth).filter((key) => key.endsWith("Option"));

                          return (
                            <div key={toothId} className="space-y-2 mb-4">
                              {/* Render Option fields with price > 0 */}
                              {optionFields.map((fieldKey) => {
                                const option = tooth[fieldKey];
                                if (!option) return null;

                                const baseKey = fieldKey.replace("Option", "");
                                const quantity = tooth.quantity || 1;
                                const price = tooth[`${baseKey}Price`] || option.price || 0;

                                if (price <= 0) return null; // skip zero-price options

                                return (
                                  <div key={fieldKey} className="flex justify-between">
                                    <span className="text-xs text-[#828386] font-normal">{option.label}</span>
                                    <span className="text-[#1A1A1A] text-xs font-poppins font-normal">
                                      ${price * quantity}
                                    </span>
                                  </div>
                                );
                              })}

                              {/* Render Crown if selected and price > 0 */}
                              {tooth.crown && (tooth.crown.price || 0) > 0 && (
                                <div className="flex justify-between">
                                  <span className="text-xs text-[#828386] font-normal">{tooth.crown.label}</span>
                                  <span className="text-[#1A1A1A] text-xs font-poppins font-normal">
                                    ${(tooth.crown.price || 0) * (tooth.quantity || 1)}
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })}


                        {/* Subtotal */}
                        <div className="flex justify-between">
                          <span className="text-xs text-[#828386] font-normal">Subtotal</span>
                          <span className="text-[#1A1A1A] text-xs font-poppins font-normal">
                            $
                            {restoration.selectedTeeth.reduce((sum, toothId) => {
                              const tooth = restoration.toothSelections.find(t => t.toothId === toothId) || {};
                              const optionFields = Object.keys(tooth).filter((key) => key.endsWith("Option"));

                              const toothTotal = optionFields.reduce((toothSum, fieldKey) => {
                                const option = tooth[fieldKey];
                                if (!option) return toothSum;
                                const baseKey = fieldKey.replace("Option", "");
                                const quantity = tooth.quantity || 1;
                                const price = tooth[`${baseKey}Price`] || option.price || 0;
                                return toothSum + price * quantity;
                              }, 0);

                              const crownTotal = tooth.crown ? (tooth.crown.price || 0) * (tooth.quantity || 1) : 0;

                              return sum + toothTotal + crownTotal;
                            }, 0)}
                          </span>
                        </div>

                        <hr />

                        {/* Shipping */}
                        <div className="flex justify-between">
                          <span className="text-xs text-[#828386] font-normal">Shipping</span>
                          <span className="text-[#1A1A1A] text-xs font-poppins font-normal">Free</span>
                        </div>

                        {/* Total */}
                        <div className="flex justify-between text-secondaryBrand text-base mt-4 pt-2">
                          <span className="font-poppins">Total</span>
                          <span className="font-poppins font-semibold">
                            $
                            {restoration.selectedTeeth.reduce((sum, toothId) => {
                              const tooth = restoration.toothSelections.find(t => t.toothId === toothId) || {};
                              const optionFields = Object.keys(tooth).filter((key) => key.endsWith("Option"));

                              const toothTotal = optionFields.reduce((toothSum, fieldKey) => {
                                const option = tooth[fieldKey];
                                if (!option) return toothSum;
                                const baseKey = fieldKey.replace("Option", "");
                                const quantity = tooth.quantity || 1;
                                const price = tooth[`${baseKey}Price`] || option.price || 0;
                                return toothSum + price * quantity;
                              }, 0);

                              const crownTotal = tooth.crown ? (tooth.crown.price || 0) * (tooth.quantity || 1) : 0;

                              return sum + toothTotal + crownTotal;
                            }, 0)}
                          </span>
                        </div>
                      </div>

                    </div>
                    <button
                      type="submit"

                      className="mt-6 w-full py-4 rounded-3xl bg-[rgba(0,29,88,1)] hover:bg-blue-800 text-white font-medium"
                    >
                      Place Order
                    </button>
                  </div>
                </form>
              </>
            )}
          </Formik>

        </div>
      </div>
    </div >
  );
};

export default CheckoutForm;
