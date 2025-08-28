import React from 'react'

const ProductOrder = () => {
    const products = [
        { name: "Green Capsicum", price: 25, qty: 4, subtotal: 100 },
        { name: "Green Capsicum", price: 50, qty: 1, subtotal: 50 },
        { name: "Green Capsicum", price: 50, qty: 2, subtotal: 100 },
        { name: "Green Capsicum", price: 20, qty: 3, subtotal: 60 },
        { name: "Green Capsicum", price: 30, qty: 3, subtotal: 90 },
        { name: "Green Capsicum", price: 25, qty: 4, subtotal: 100 },
        { name: "Green Capsicum", price: 25, qty: 4, subtotal: 100 },
        { name: "Green Capsicum", price: 50, qty: 1, subtotal: 50 },
        { name: "Green Capsicum", price: 50, qty: 2, subtotal: 100 },
        { name: "Green Capsicum", price: 30, qty: 3, subtotal: 90 },
    ];
    return (

        <>
            <div className="pr-6  min-h-screen">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Products Table */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-[#1A1A1A]">Products</h2>
                            <button className="bg-secondaryBrand text-white px-8 py-4 rounded-full shadow font-poppins">
                                Move to Delivered
                            </button>
                        </div>

                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b ">
                                    <th className="py-2 text-[#434343] font-poppins font-normal">Products</th>
                                    <th className="py-2 text-[#434343] font-poppins font-normal">Price</th>
                                    <th className="py-2 text-[#434343] font-poppins font-normal">Quantity</th>
                                    <th className="py-2 text-[#434343] font-poppins font-normal ">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((item, idx) => (
                                    <tr key={idx} className="border-b last:border-0">
                                        <td className="py-2 flex items-center gap-2">
                                            <img
                                                src="https://via.placeholder.com/40"
                                                alt={item.name}
                                                className="w-10 h-10 rounded"
                                            />
                                            <span>{item.name}</span>
                                        </td>
                                        <td className="py-2">${item.price}</td>
                                        <td className="py-2">{item.qty}</td>
                                        <td className="py-2">${item.subtotal}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Right Side */}
                    <div className="space-y-6">

                        {/* Cart Total */}
                        <div className="bg-white rounded-2xl shadow p-6">
                            <h3 className="font-semibold text-lg mb-4 text-[#1A1A1A]">Cart Total</h3>
                            <div className="flex justify-between py-2">
                                <span className='text-[#434343]'>Subtotal:</span>
                                <span className="font-medium">$350.00</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className='text-[#434343] font-poppins'>Shipping:</span>
                                <span className="font-medium text-[#434343] font-poppins">Free</span>
                            </div>
                            <div className="flex justify-between py-2 border-t mt-2 pt-2 text-lg font-semibold">
                                <span>Total:</span>
                                <span>$350.00</span>
                            </div>
                        </div>

                        {/* Buyer’s Details */}
                        <div className="bg-white rounded-2xl shadow p-6">
                            <h3 className="font-semibold text-lg mb-4 text-[#1A1A1A]">Buyer’s Details</h3>
                            <div className='flex flex-col justify-between'>

                                <p className="font-medium text-[#949494]">Full name:</p>
                                <p>
                                    Varga Dóra
                                </p>
                            </div>
                            <div className='flex flex-col'>
                                <span className="  font-medium text-[#949494] font-poppins">Email:</span>
                                <p className='text-[#434343] pt-2 font-poppins'> dihec134@gmail.com</p>
                            </div>
                            <div className='flex flex-col'>
                                <span className="  font-medium text-[#949494] font-poppins">Contact number:</span>
                                <p className='text-[#434343] pt-2 font-poppins'> 0325 4382345</p>
                            </div>
                            <div className='flex flex-col'>
                                <span className="font-medium text-[#949494] font-poppins">Contact number:</span>
                                <p className='text-[#434343] pt-2'>0325 4382345</p></div>

                            <div className='flex flex-col'>
                                <span className="font-medium text-[#949494] font-poppins">Shipping Address:</span>
                                <p className='text-[#434343] pt-2 font-poppins'>
                                    1801 Thornridge Cir, Shiloh, Hawaii 81063
                                </p>
                            </div>

                        </div>

                        {/* Payment Details */}
                        <div className="bg-white rounded-2xl shadow p-6">
                            <h3 className="font-semibold text-lg mb-4">Payment Detail</h3>
                            <label className="flex items-center gap-2">
                                <input type="radio" name="payment" defaultChecked />
                                <span>Credit or debit card</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductOrder