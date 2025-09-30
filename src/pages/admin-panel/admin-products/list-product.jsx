import React from "react";
import { SecondaryButton } from "../../../Common/Button";
import DropDownArrow from "../../../icon/DropDownArrow";
import TextInput from "../../../Common/Input";

function ListProduct() {
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between font-poppins items-center">
        <h3 className="text-[#1A2D33] text-3xl font-semibold">List Product</h3>
        <span className="flex gap-6">
          <div>
            <SecondaryButton
              title="Discard"
              className=" text-[#013764] border border-[#013764] px-8 py-3 rounded-3xl text-sm font-semibold"
            />
          </div>
          <div>
            <SecondaryButton
              title="Save"
              className="bg-[#001D58] text-[#F8F8F8] px-8 py-3 rounded-3xl text-sm font-normal"
            />
          </div>
        </span>
      </div>
      {/* Main */}
      <div className="pt-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 ">
          <div className="col-span-1 md:col-span-6 ">
            {/* Left Section */}
            <div className="bg-bgWhite rounded-xl  p-6 font-poppins">
              <div className="mb-6 ">
                <label className=" text-primaryText text-base font-semibold mb-2">
                  Title
                </label>
                <TextInput
                  type="text"
                  id="title"
                  placeholder="Brainsm"
                  className2="border-2 mt-2 p-2"
                />
              </div>
              <div>
                <label className=" text-primaryText text-base font-semibold mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Bransim"
                  className="w-full p-3 text-secondaryText text-sm font-normal  rounded-lg border-2 border-borderPrimary mt-2 resize-none
                  "
                ></textarea>
              </div>
            </div>

            {/* Media Upload Section */}
            <div className="bg-bgWhite rounded-xl  p-6 mt-4 font-poppins">
              <h2 className="text-base font-semibold text-primaryText mb-4">
                Media
              </h2>
              <div className="border-2  border-borderPrimary rounded-lg py-12 text-center flex flex-col items-center justify-center">
                <span className="text-[#001D58] font-medium text-sm mb-1">
                  upload file / URL
                </span>
                <span className="text-secondaryText text-xs font-normal">
                  accept image,3d ,JPG
                </span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="bg-bgWhite rounded-xl  p-6 mt-4 font-poppins">
              <label className=" text-primaryText text-base font-semibold mb-2">
                Pricing
              </label>
              <TextInput
                type="text"
                id="pricing"
                placeholder="000"
                className2="border-2 mt-2"
              />
            </div>
          </div>
          {/* Right Section */}
          <div className="col-span-1 md:col-span-6">
            {/* Total Stock */}
            <div className="bg-bgWhite rounded-xl  p-6  font-poppins">
              <label className=" text-primaryText text-base font-semibold mb-2">
                Total Stock
              </label>

              <TextInput
                type="text"
                id=""
                placeholder="000"
                className2="border-2 mt-2"
              />
            </div>

            {/*Category and Brand */}
            <div className=" bg-bgWhite p-6 font-poppins mt-4 rounded-xl">
              <div className="w-full  space-y-6">
                <div>
                  <label className="text-sm font-semibold text-[#000000] mb-2">
                    Category
                  </label>
                  <div className="relative mt-2">
                    <select
                      id="category"
                      className="w-full p-3 text-secondaryText text-sm font-normal bg-white rounded-lg border-2 border-borderPrimary appearance-none pr-10"
                    >
                      <option value="">Select Category</option>
                      <option>C1</option>
                      <option>C2</option>
                      <option>C3</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <DropDownArrow />
                    </div>
                  </div>
                </div>

                {/* Brand Section */}
                <div>
                  <label
                    htmlFor="brand"
                    className="text-sm font-semibold text-[#000000] mb-2"
                  >
                    Brand
                  </label>
                  <div className="relative mt-2">
                    <select
                      id="brand"
                      className="w-full p-3 text-secondaryText text-sm font-normal bg-white rounded-lg border-2 border-borderPrimary focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm appearance-none pr-10"
                    >
                      <option value="" disabled selected>
                        Select Brand
                      </option>
                      <option>B1</option>
                      <option>B2</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <DropDownArrow />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*Options */}
            <div className="bg-bgWhite rounded-xl  p-6 font-poppins mt-4">
              <div className="mb-6 ">
                <label className=" text-[#000000] text-base font-semibold mb-2">
                  Options
                </label>
                <div className="my-2 flex gap-2 items-center">
                  <input type="checkbox" name="agree" className="w-4 h-4" />
                  <span className="text-[#000000] text-sm font-normal">
                    is this product include size or colour
                  </span>
                </div>
                <TextInput
                  type="text"
                  id=""
                  placeholder="Total Stock"
                  className2="border-2 mt-2 p-1"
                />
                <TextInput
                  type="text"
                  id=""
                  placeholder="Total Stock"
                  className2="border-2 mt-2 p-1"
                />
                <div>
                  <button className="flex items-center mt-6 space-x-2 font-normal text-sm text-[#001D58]">
                    <span>+</span>
                    <span>Add another</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListProduct;
