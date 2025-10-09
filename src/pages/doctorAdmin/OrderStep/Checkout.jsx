import React, { useEffect, useState } from "react";
import { orderService } from "../../../services/order-service/index";
import { useDispatch, useSelector } from "react-redux";
import { CheckoutvalidationSchema } from "../../../Common/FormsValidation/order-validation";
import { ErrorMessage, Field, Formik } from "formik";
import { showToast } from "../../../store/toast-slice";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const CheckoutForm = ({ next }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    country: "America",
    state: "",
    city: "",
    street: "",
    recipientName: "",
    paypalUsername: "",
    paypalEmailPhone: "",
    paymentMethod: "",
    // cardNumber: "",
    // expiryDate: "",
    // accountNumber: "",
    // bankName: "",
  });
  const dispatch = useDispatch();
  const restoration = useSelector((state) => state.restoration);
  console.log('restoration', restoration);

  const { toothSelections, selectedTooth } = restoration; // destructure from Redux
  const flattenedItems = (restoration.doctorOrderItems || []).map((item, index) => ({
    id: index + 1, // or your API might auto-generate
    doctorOrderId: 1, // assuming this is fixed or can come from somewhere
    dropdownMasterId: typeof item.dropdownMasterId === "object" ? item.dropdownMasterId.value : item.dropdownMasterId,
    quantity: item.quantity || 1,
    unitPrice: item.unitPrice || 0,
  }));
  const storedUser = localStorage.getItem("user");
  const userId = JSON.parse(localStorage.getItem("user"))?.id;
  const buildRequestData = (data) => {
    // const doctorData = {};
    // (restoration.doctor || []).forEach(d => {
    //   doctorData[d.field] = d.value;
    // });
    const doctorData = restoration.doctor?.reduce((acc, item) => {
      acc[item.field] = item.value || "";

      // Extract doctor ID from the officeReg field
      if (item.field === "officeReg" && item.id) {
        acc.id = item.id;
      }

      return acc;
    }, {});

    // Get only the doctor ID
    const doctorId = doctorData?.id;

    console.log('doctorData', doctorId);
    const patientId = restoration?.patient?.id || null;

    console.log('patientData', patientId);
    // const patientData = {};
    // (restoration.patient || []).forEach(p => {
    //   patientData[p.field] = p.value;
    // });
    const selectedTeeth = restoration.selectedTeeth || [12, 13];

    return {
      userId,
      totalAmount: restoration.totalPrice || 250.0,
      transactionId: null,
      expectedDeliveryDate: "2025-09-30T00:00:00",
      // doctorName: doctorData.doctorName || "Dr. Default",
      // doctorRegNumber: doctorData.officeReg || "REG-0000",
      patientId: patientId,
      doctorId: doctorId,
      // patientFirstName: patientData.patientFirstName || "John",
      // patientLastName: patientData.patientLastName || "Doe",
      // subscriptionId: patientData.subscriptionId || "SUB-0000",
      additionalNotes: restoration.note || "Checkout order",
      selectedTooths: selectedTeeth,
      doctorOrderItems: flattenedItems,
      paymentId: 8,
      name: data.name || "",
      address: `${data.street || ""}, ${data.city || ""}, ${data.state || ""}, ${data.country || ""}`,
      email: data.email || "",
      phone: data.phone || "+1-555-123-4567",
      orderStatus: "PENDING",
      paymentStatus: "Unpaid",
    };
  };
  const handleSubmit = async (values) => {
    setLoading(true);
    setError(null);
    const requiredFields = ["name", "phone", "email", "state", "city", "street"];
    for (let field of requiredFields) {
      if (!values[field] || values[field].trim() === "") {
        dispatch(showToast({ message: `Please fill ${field}`, type: "error" }));
        setLoading(false);
        return;
      }
    }
    try {
      const requestData = buildRequestData(values);
      const apiFormData = new FormData();
      apiFormData.append("request", JSON.stringify(requestData));

      const res = await orderService.createOrder(apiFormData);
      console.log("✅ Order created successfully:", res.data);
      next();
    } catch (err) {
      console.error("❌ Error creating order:", err.response?.data || err.message);
      // setError(err.response?.data || "Something went wrong");
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

  const [openSections, setOpenSections] = useState([
    "paypal",

  ]);
  const toggleSection = (section) => {
    if (openSections.includes(section)) {
      setOpenSections(openSections.filter((s) => s !== section));
    } else {
      setOpenSections([...openSections, section]);
    }
  };

  const isOpen = (section) => openSections.includes(section);

  return (
    <div className="min-h-screen bg-bgWhite">
      <div className=" pt-5  pb-10">
        <div className=" px-4">
          <Formik
            initialValues={
              {
                name: "",
                phone: "",
                email: "",
                country: "America",
                state: "",
                city: "",
                street: "",
                // paymentMethod: "",
                // recipientName: "",
                // paypalUsername: "",
                // paypalEmailPhone: "",
                // cardNumber: "",
                // expiryDate: "",
                // accountNumber: "",
                // bankName: ""
              }}
            validationSchema={CheckoutvalidationSchema}
            onSubmit={(values) => handleSubmit(values)}

          >
            {({ values, setFieldValue, handleSubmit }) => (

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


                        <div className="sm:col-span-6">
                          <Field
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            className="border rounded-lg px-3 py-2 w-full"
                          />
                          <ErrorMessage name="name" component="div" className="text-red-600 text-xs mt-1" />
                        </div>
                        {/* <input
                          type="text"
                          name="contactNumber"
                          placeholder="Contact Number"
                          value={formData.contactNumber}
                          onChange={handleChange}
                          className="border sm:col-span-6 space-y-4  outline-none rounded-lg px-3 py-2 w-full bg-white text-gray-700 placeholder:text-sm placeholder:font-poppins placeholder:font-normal"
                        /> */}
                        <div className="sm:col-span-6">
                          <Field
                            type="tel"
                            name="phone"
                            placeholder="Contact Number"
                            className="border outline-none rounded-lg px-3 py-2 w-full bg-white text-gray-700 placeholder:text-sm placeholder:font-poppins"
                          />
                          <ErrorMessage
                            name="phone"
                            component="div"
                            className="text-red-600 text-xs mt-1"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <Field
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          className="border outline-none rounded-lg px-3 py-2 w-full bg-white text-gray-700 placeholder:text-sm placeholder:font-poppins"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-600 text-xs mt-1"
                        />
                      </div>
                    </div>

                    {/* Shipping */}
                    <div>
                      <h2 className="text-sm font-medium mb-3 font-inter">
                        Shipping
                      </h2>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative">
                          <span className="absolute left-3 top-5  transform -translate-y-1/2">
                            <img
                              src="/assets/doctor/flag.png" // Replace with actual flag image path
                              alt="US Flag"
                              className="w-5 h-5 rounded-sm"
                            />
                          </span>
                          <Field
                            type="text"
                            name="country"
                            placeholder="Country"
                            readOnly
                            value="America" // default value, or set from Formik initialValues
                            className="border rounded-lg pl-10 px-3 py-2 w-full outline-none text-gray-700 placeholder:text-sm placeholder:font-poppins placeholder:font-normal bg-gray-100 cursor-not-allowed"
                          />
                        </div>
                        <div>
                          <Field
                            type="text"
                            name="state"
                            placeholder="State/Province"
                            className="border rounded-lg px-3 py-2 w-full bg-white outline-none text-gray-700 placeholder:text-sm placeholder:font-poppins placeholder:font-normal"
                          />
                          <ErrorMessage
                            name="state"
                            component="div"
                            className="text-red-600 text-xs mt-1"
                          />
                        </div>

                        <div>
                          <Field
                            type="text"
                            name="city"
                            placeholder="City"
                            className="border rounded-lg px-3 py-2 w-full bg-white outline-none text-gray-700 placeholder:text-sm placeholder:font-poppins placeholder:font-normal"
                          />
                          <ErrorMessage
                            name="city"
                            component="div"
                            className="text-red-600 text-xs mt-1"
                          />
                        </div>

                        <div>
                          <Field
                            type="text"
                            name="street"
                            placeholder="Street"
                            className="border rounded-lg px-3 py-2 w-full bg-white outline-none text-gray-700 placeholder:text-sm placeholder:font-poppins placeholder:font-normal"
                          />
                          <ErrorMessage
                            name="street"
                            component="div"
                            className="text-red-600 text-xs mt-1"
                          />
                        </div>


                      </div>
                    </div>

                    <div className="border rounded-lg  bg-[#F8F8F8]">
                      {/* <div className="flex  justify-between items-center">
                        <h2 className="text-sm font-semibold mb-3 font-poppins">
                          Payment Method
                        </h2>
                        <div>
                          <ChevronDownIcon className='w-5 h-5' />
                        </div>
                      </div> */}

                      {/* <div className="border rounded-lg p-4 ">
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
                      </div> */}

                      <h2 className="text-sm font-semibold mb-3 font-poppins p-4">Payment Method</h2>

                      {/* PayPal Section */}
                      <div className="border rounded-lg bg-white">
                        <button
                          type="button"
                          className="w-full flex justify-between items-center p-3"
                          onClick={() => toggleSection("paypal")}
                        >
                          <div className="flex items-center">
                            <img
                              src="/assets/doctor/paypal.png"
                              alt="Paypal Logo"
                              className="w-5 h-5 rounded-sm"
                            />
                            <span className="font-medium ml-2">PayPal</span>
                          </div>
                          <ChevronDownIcon
                            className={`w-5 h-5 transform transition-transform ${isOpen("paypal") ? "rotate-180" : ""
                              }`}
                          />
                        </button>
                        {isOpen("paypal") && (
                          <div className="p-4 border-t">
                            <div className="mb-3">
                              <label className="block text-xs font-medium mb-1 text-primaryText">
                                Recipient's Name
                              </label>
                              <input
                                type="text"
                                name="recipientName"
                                placeholder="Enter Recipient's Name"
                                value={formData.recipientName}
                                onChange={handleChange}
                                className="border rounded-lg px-3 py-2 w-full outline-none bg-gray-50 text-primaryText placeholder:text-xs placeholder:font-poppins"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-medium mb-1">
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
                                <label className="block text-xs font-medium mb-1">
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
                      </div>
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
                    <div className="md:col-span-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className={`mt-6 w-full py-4 rounded-3xl text-white font-medium ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[rgba(0,29,88,1)] hover:bg-blue-800"
                          }`}
                      >
                        {loading ? "Processing..." : "Place Order"}
                      </button>
                      {error && <div className="text-red-600 mt-2 text-sm">{error}</div>}
                    </div>
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
