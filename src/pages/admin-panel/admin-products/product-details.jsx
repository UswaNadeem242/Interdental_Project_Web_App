// import ProductDetailsCard from "../../../components/product-details-card";
// import CustomerFeedback from "../../../components/customer-feedback";
// import { feedbackData, productDetailsData } from "../../../Constant";
// import { useState } from "react";

// function ProductDetails() {
//   let total = 5;
//   let activeIndex = 0;
//   const sideImages = [
//     "/assets/product.png",
//     "/assets/product.png",
//     "/assets/product.png",
//     "/assets/product2.png",
//     "/assets/product2.png",
//   ];

//   const [selectedImage, setSelectedImage] = useState(sideImages[0]);

//   return (
//     <div className=" ">
//       <div className="flex flex-col gap-6 md:flex md:flex-row md:justify-between bg-bgWhite p-14 rounded-xl">
//         {/* Left Side: Images */}
//         <div className=" flex flex-row gap-4">
//           {/* Image List */}
//           <div className="flex flex-col gap-3">
//             {sideImages.map((img, key) => (
//               <img
//                 key={key}
//                 src={img}
//                 alt={`sideImage-${key}`}
//                 onClick={() => setSelectedImage(img)}
//                 className={` w-16  h-16  object-cover cursor-pointer border-2 border-[#0000000D] rounded-2xl`}
//               />
//             ))}
//           </div>

//           {/* Main Image */}
//           <div className="ml-4">
//             <img
//               src={selectedImage}
//               alt="mainProduct"
//               className="w-80 h-80 mt-6 ml-4 object-cover rounded-lg"
//             />
//           </div>
//         </div>

//         {/* Right Side: Product Details */}
//         <div className="mr-14">
//           <ProductDetailsCard data={productDetailsData} className="max-w-xl" />
//         </div>
//       </div>

//       {/* Customer Feedback Section */}
//       <div className="mt-8">
//         <CustomerFeedback title="Customer Feedback" data={feedbackData} />
//       </div>
//     </div>
//   );
// }

// export default ProductDetails;

import ProductDetailsCard from "../../../components/product-details-card";
import CustomerFeedback from "../../../components/customer-feedback";
import { feedbackData, productDetailsData } from "../../../Constant";
import { useState } from "react";

function ProductDetails() {
  const sideImages = [
    "/assets/product.png",
    "/assets/product.png",
    "/assets/product.png",
    "/assets/product2.png",
    "/assets/product2.png",
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(sideImages[0]);

  return (
    <div className="">
      <div className="flex flex-col gap-6 sm:flex sm:flex-row sm:justify-between bg-bgWhite p-14 rounded-xl">
        {/* Left Side: Images */}
        <div className="flex flex-row gap-4">
          {/* Image List */}
          <div className="flex flex-col gap-3">
            {sideImages.map((img, key) => (
              <img
                key={key}
                src={img}
                alt={`sideImage-${key}`}
                onClick={() => {
                  setSelectedImage(img);
                  setSelectedIndex(key);
                }}
                className={`w-16 h-16 object-cover cursor-pointer border-2 rounded-2xl ${
                  selectedIndex === key
                    ? "border-gray-400"
                    : "border-[#0000000D]"
                }`}
              />
            ))}
          </div>

          {/* Main Image  */}
          <div className="ml-4 flex flex-col items-center">
            <img
              src={selectedImage}
              alt="mainProduct"
              className="w-80 h-80 mt-6 ml-4 object-cover rounded-lg"
            />

            {/* Circle Progress Bar */}
            <div className="flex items-center justify-between bg-[#0000000D] rounded-full px-2 py-1 mt-4 w-16">
              {sideImages.map((img, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setSelectedIndex(i);
                    setSelectedImage(img);
                  }}
                  className={`w-[5px] h-[5px] rounded-full transition-colors duration-300 ${
                    i === selectedIndex ? "bg-[#001D58]" : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="">
          <ProductDetailsCard data={productDetailsData} className="max-w-xl" />
        </div>
      </div>

      {/* Customer Feedback */}
      <div className="mt-8">
        <CustomerFeedback title="Customer Feedback" data={feedbackData} />
      </div>
    </div>
  );
}

export default ProductDetails;
