import React from "react";

const ProductOrder = ({ orders, setIsmodelShow }) => {
  return (
    <>
      <div className="pr-6  min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Products Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
            {orders.orderStatus === "DELIVERD" ? (
              <></>
            ) : (
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-[#1A1A1A]">
                  Products
                </h2>
                <button
                  onClick={() => {
                    setIsmodelShow(true);
                  }}
                  className="bg-secondaryBrand text-white px-8 py-4 rounded-full shadow font-poppins"
                >
                  Move to Delivered
                </button>
              </div>
            )}

            <table className="w-full text-left">
              <thead>
                <tr className="border-b ">
                  <th className="py-2 text-[#434343] font-poppins font-normal">
                    Products
                  </th>
                  <th className="py-2 text-[#434343] font-poppins font-normal">
                    Price
                  </th>
                  <th className="py-2 text-[#434343] font-poppins font-normal">
                    Quantity
                  </th>
                  <th className="py-2 text-[#434343] font-poppins font-normal ">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders?.orderItems.map((item, idx) => (
                    <tr key={idx} className="border-b last:border-0">
                      <td className="py-2 flex items-center gap-2">
                        <img
                          src={item.imageUrl[0]}
                          alt={item.name}
                          className="w-10 h-10 rounded"
                        />
                        <span>{item.productName}</span>
                      </td>
                      <td className="py-2">${item.unitPrice}</td>
                      <td className="py-2">{item.quantity}</td>
                      <td className="py-2">${item.unitPrice}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Right Side */}
          <div className="space-y-6">
            {/* Cart Total */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="font-semibold text-lg mb-4 text-[#1A1A1A]">
                Cart Total
              </h3>
              <div className="flex justify-between py-2">
                <span className="text-[#434343]">Subtotal:</span>
                <span className="font-medium">${orders.totalAmount}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#434343] font-poppins">Shipping:</span>
                <span className="font-medium text-[#434343] font-poppins">
                  Free
                </span>
              </div>
              <div className="flex justify-between py-2 border-t mt-2 pt-2 text-lg font-semibold">
                <span>Total:</span>
                <span>${orders.totalAmount}</span>
              </div>
            </div>

            {/* Buyer’s Details */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="font-semibold text-lg mb-4 text-[#1A1A1A]">
                Buyer’s Details
              </h3>
              <div className="flex flex-col justify-between">
                <p className="font-medium text-[#949494]">Full name:</p>
                <p>{orders.name}</p>
              </div>
              <div className="flex flex-col mt-[12px]">
                <p className="  font-medium text-[#949494]">Email:</p>
                <p className="text-[#434343] pt-2">{orders.email}</p>
              </div>
              <div className="flex flex-col  mt-[12px]">
                <p className="  font-medium text-[#949494]">Contact number:</p>
                <p className="text-[#434343] pt-2 ">{orders.phone}</p>
              </div>
              <div className="flex flex-col mt-[12px]">
                <p className="font-medium text-[#949494] ">Contact number:</p>
                <p className="text-[#434343] pt-2">0325 4382345</p>
              </div>

              <div className="flex flex-col mt-[12px]">
                <p className="font-medium text-[#949494] ">Shipping Address:</p>
                <p className="text-[#434343]  pt-2">{orders.shippingAddress}</p>
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="font-semibold text-lg mb-4">Payment Detail</h3>
              <label className="flex items-center gap-2">
                {/* <input type="radio" name="payment" defaultChecked /> */}
                <svg
                  width="24"
                  height="26"
                  viewBox="0 0 24 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 12.7273C2 8.72748 2 6.72759 3.17157 5.48501C4.34315 4.24243 6.22876 4.24243 10 4.24243H14C17.7712 4.24243 19.6569 4.24243 20.8284 5.48501C22 6.72759 22 8.72748 22 12.7273C22 16.7271 22 18.727 20.8284 19.9696C19.6569 21.2121 17.7712 21.2121 14 21.2121H10C6.22876 21.2121 4.34315 21.2121 3.17157 19.9696C2 18.727 2 16.7271 2 12.7273Z"
                    stroke="#434343"
                    stroke-width="1.09091"
                  />
                  <path
                    d="M10 16.9697H6"
                    stroke="#434343"
                    stroke-width="1.09091"
                    stroke-linecap="round"
                  />
                  <path
                    d="M14 16.9697H12.5"
                    stroke="#434343"
                    stroke-width="1.09091"
                    stroke-linecap="round"
                  />
                  <path
                    d="M2 10.606L22 10.606"
                    stroke="#434343"
                    stroke-width="1.09091"
                    stroke-linecap="round"
                  />
                </svg>

                <span>Credit or debit card</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductOrder;
