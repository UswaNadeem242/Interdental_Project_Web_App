import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, Formik } from "formik";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import { orderService } from "../../../services/order-service/index";
import { showToast } from "../../../store/toast-slice";
import { checkoutValidationSchema } from "../../../services/utils/validationSchemas";

const CheckoutForm = ({ next }) => {
  const [loading, setLoading] = useState(false);
  const [openSections, setOpenSections] = useState(["paypal"]);

  const dispatch = useDispatch();
  const restoration = useSelector((state) => state.restoration);
  const { globalSelections, selectedTeeth, uploadedFiles } = restoration;

  // Retrieve user data from localStorage
  const userData = localStorage.getItem("users");
  const user = userData ? JSON.parse(userData) : null;

  // Calculate total price
  const totalPrice = useMemo(() => {
    return (
      (selectedTeeth?.length || 0) *
      Object.values(globalSelections || {})
        .filter(
          (selection) => selection && selection?.price && selection?.price > 0
        )
        .reduce((sum, selection) => sum + (selection?.price || 0), 0)
    );
  }, [selectedTeeth, globalSelections]);

  const toggleSection = (section) => {
    if (openSections.includes(section)) {
      setOpenSections(openSections.filter((s) => s !== section));
    } else {
      setOpenSections([...openSections, section]);
    }
  };

  const isOpen = (section) => openSections.includes(section);

  // Get initial values with user data preset
  const getInitialValues = () => {
    return {
      name:
        user?.firstName && user?.lastName
          ? `${user.firstName} ${user.lastName}`
          : "",
      phone: user?.phoneNumber || "",
      email: user?.email || "",
      country: "America",
      state: "",
      city: "",
      street: "",
      recipientName: "",
      paypalUsername: "",
      paypalEmailPhone: "",
    };
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);

    try {
      const userData = localStorage.getItem("users");
      const parsedUserData = JSON.parse(userData);
      const userId = parsedUserData.id;

      // Get doctor data
      const doctorData = restoration.doctor?.reduce((acc, item) => {
        acc[item.field] = item.value || "";
        if (item.field === "officeReg" && item.id) {
          acc.id = item.id;
        }
        return acc;
      }, {});

      const formattedDate = doctorData?.dueDate
        ? `${doctorData.dueDate}T00:00:00`
        : null;

      // Build doctor order items
      const flattenedItems = [];
      selectedTeeth.forEach((toothId) => {
        Object.entries(globalSelections).forEach(([fieldName, selection]) => {
          if (fieldName === "shades") {
            // Handle shades - they're stored as an object with group names as keys
            Object.entries(selection).forEach(([shadeGroupName, shadeData]) => {
              if (shadeData && shadeData.id) {
                flattenedItems.push({
                  doctorOrderId: 1,
                  dropdownMasterId: shadeData.id,
                  quantity: 1,
                  unitPrice: shadeData.price || 0,
                });
              }
            });
          } else if (selection && selection.value) {
            // Handle other selections (material, crown, lab, etc.)
            flattenedItems.push({
              doctorOrderId: 1,
              dropdownMasterId: selection.value,
              quantity: 1,
              unitPrice: selection.price || 0,
            });
          }
        });
      });

      const requestData = {
        userId,
        totalAmount: totalPrice,
        transactionId: null,
        expectedDeliveryDate: formattedDate,
        patientId: restoration?.patient?.id || null,
        doctorId: doctorData?.id || null,
        additionalNotes: restoration.note || "Checkout order",
        selectedTooths: selectedTeeth,
        doctorOrderItems: flattenedItems,
        paymentId: 8,
        name: values.name || "",
        address: `${values.street || ""}, ${values.city || ""}, ${
          values.state || ""
        }, ${values.country || ""}`,
        email: values.email || "",
        phone: values.phone || "",
        orderStatus: "PENDING",
        paymentStatus: "Unpaid",
      };

      const apiFormData = new FormData();
      apiFormData.append("request", JSON.stringify(requestData));

      // Append uploaded files
      uploadedFiles.forEach((file, index) => {
        apiFormData.append(`files`, file);
      });

      const res = await orderService.createOrder(apiFormData);
      console.log("✅ Order created successfully:", res.data);

      dispatch(
        showToast({
          message: "Order placed successfully!",
          type: "success",
        })
      );

      next();
    } catch (err) {
      console.error(
        "❌ Error creating order:",
        err.response?.data || err.message
      );
      dispatch(
        showToast({
          message: err.response?.data?.message || "Failed to place order",
          type: "error",
        })
      );
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-bgWhite">
      <div className="pt-5 pb-10">
        <div className="px-4">
          <Formik
            initialValues={getInitialValues()}
            enableReinitialize={true}
            validationSchema={checkoutValidationSchema}
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, errors, touched, isSubmitting }) => (
              <form
                onSubmit={handleSubmit}
                className="grid gap-8 grid-cols-1 lg:grid-cols-12 font-poppins"
              >
                {/* Left Section - Form */}
                <div className="lg:col-span-8 bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                  {/* Buyer's Details */}
                  <div>
                    <h2 className="text-sm mb-3 font-medium font-poppins">
                      Buyer's Details
                    </h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
                      <div className="sm:col-span-6">
                        <Field
                          type="text"
                          name="name"
                          placeholder="Full Name"
                          readOnly
                          className={`border outline-none rounded-lg px-3 py-2 w-full bg-white text-gray-700 placeholder:text-sm placeholder:font-poppins ${
                            errors.name && touched.name
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-600 text-xs mt-1"
                        />
                      </div>

                      <div className="sm:col-span-6">
                        <Field
                          type="tel"
                          name="phone"
                          placeholder="Contact Number"
                          readOnly
                          className={`border outline-none rounded-lg px-3 py-2 w-full bg-white text-gray-700 placeholder:text-sm placeholder:font-poppins ${
                            errors.phone && touched.phone
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
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
                        readOnly
                        className={`border outline-none rounded-lg px-3 py-2 w-full bg-white text-gray-700 placeholder:text-sm placeholder:font-poppins ${
                          errors.email && touched.email
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
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
                        <span className="absolute left-3 top-5 transform -translate-y-1/2">
                          <img
                            src="/assets/doctor/flag.png"
                            alt="US Flag"
                            className="w-5 h-5 rounded-sm"
                          />
                        </span>
                        <Field
                          type="text"
                          name="country"
                          placeholder="Country"
                          readOnly
                          value="America"
                          className="border rounded-lg pl-10 px-3 py-2 w-full outline-none text-gray-700 placeholder:text-sm placeholder:font-poppins placeholder:font-normal bg-gray-100 cursor-not-allowed"
                        />
                      </div>

                      <div>
                        <Field
                          type="text"
                          name="state"
                          placeholder="State/Province"
                          className={`border rounded-lg px-3 py-2 w-full bg-white outline-none text-gray-700 placeholder:text-sm placeholder:font-poppins placeholder:font-normal ${
                            errors.state && touched.state
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
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
                          className={`border rounded-lg px-3 py-2 w-full bg-white outline-none text-gray-700 placeholder:text-sm placeholder:font-poppins placeholder:font-normal ${
                            errors.city && touched.city
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
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
                          className={`border rounded-lg px-3 py-2 w-full bg-white outline-none text-gray-700 placeholder:text-sm placeholder:font-poppins placeholder:font-normal ${
                            errors.street && touched.street
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        <ErrorMessage
                          name="street"
                          component="div"
                          className="text-red-600 text-xs mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="border rounded-lg bg-[#F8F8F8]">
                    <h2 className="text-sm font-semibold mb-3 font-poppins p-4">
                      Payment Method
                    </h2>

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
                          className={`w-5 h-5 transform transition-transform ${
                            isOpen("paypal") ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isOpen("paypal") && (
                        <div className="p-4 border-t">
                          <div className="mb-3">
                            <label className="block text-xs font-medium mb-1 text-primaryText">
                              Recipient's Name
                            </label>
                            <Field
                              type="text"
                              name="recipientName"
                              placeholder="Enter Recipient's Name"
                              className={`border rounded-lg px-3 py-2 w-full outline-none bg-gray-50 text-primaryText placeholder:text-xs placeholder:font-poppins ${
                                errors.recipientName && touched.recipientName
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            />
                            <ErrorMessage
                              name="recipientName"
                              component="div"
                              className="text-red-600 text-xs mt-1"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium mb-1">
                                Paypal Username
                              </label>
                              <Field
                                type="text"
                                name="paypalUsername"
                                placeholder="Enter Paypal Username"
                                className={`border rounded-lg px-3 py-2 w-full outline-none bg-gray-50 text-primaryText placeholder:text-xs placeholder:font-poppins ${
                                  errors.paypalUsername &&
                                  touched.paypalUsername
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }`}
                              />
                              <ErrorMessage
                                name="paypalUsername"
                                component="div"
                                className="text-red-600 text-xs mt-1"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-medium mb-1">
                                E-mail/Phone number
                              </label>
                              <Field
                                type="text"
                                name="paypalEmailPhone"
                                placeholder="Enter E-mail/Phone number"
                                className={`border rounded-lg px-3 py-2 w-full outline-none bg-gray-50 text-primaryText placeholder:text-xs placeholder:font-poppins ${
                                  errors.paypalEmailPhone &&
                                  touched.paypalEmailPhone
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }`}
                              />
                              <ErrorMessage
                                name="paypalEmailPhone"
                                component="div"
                                className="text-red-600 text-xs mt-1"
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
                      {selectedTeeth.map((toothId) => {
                        return (
                          <div key={toothId} className="space-y-2 mb-4">
                            <div className="text-xs text-[#828386] font-normal mb-2">
                              Tooth #{toothId}
                            </div>

                            {Object.entries(globalSelections).map(
                              ([fieldKey, selection]) => {
                                if (
                                  !selection ||
                                  !selection.price ||
                                  selection.price <= 0 ||
                                  fieldKey === "shades"
                                )
                                  return null;

                                return (
                                  <div
                                    key={fieldKey}
                                    className="flex justify-between"
                                  >
                                    <span className="text-xs text-[#828386] font-normal">
                                      {selection.option?.label || fieldKey}
                                    </span>
                                    <span className="text-[#1A1A1A] text-xs font-poppins font-normal">
                                      ${selection.price}
                                    </span>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        );
                      })}

                      {/* Subtotal */}
                      <div className="flex justify-between">
                        <span className="text-xs text-[#828386] font-normal">
                          Subtotal
                        </span>
                        <span className="text-[#1A1A1A] text-xs font-poppins font-normal">
                          ${totalPrice.toFixed(2)}
                        </span>
                      </div>

                      <hr />

                      {/* Shipping */}
                      <div className="flex justify-between">
                        <span className="text-xs text-[#828386] font-normal">
                          Shipping
                        </span>
                        <span className="text-[#1A1A1A] text-xs font-poppins font-normal">
                          Free
                        </span>
                      </div>

                      {/* Total */}
                      <div className="flex justify-between text-secondaryBrand text-base mt-4 pt-2">
                        <span className="font-poppins">Total</span>
                        <span className="font-poppins font-semibold">
                          ${totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-4">
                    <button
                      type="submit"
                      disabled={loading || isSubmitting}
                      className={`mt-6 w-full py-4 rounded-3xl text-white font-medium ${
                        loading || isSubmitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[rgba(0,29,88,1)] hover:bg-blue-800"
                      }`}
                    >
                      {loading || isSubmitting
                        ? "Processing..."
                        : "Place Order"}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
