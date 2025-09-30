import React, { useState } from "react";
import { SecondaryButton } from "../Button";

function ImpalntDesignForm({ className }) {
  //   const [selected, setSelected] = useState("");
  const [selectedTeeth, setSelectedTeeth] = useState([]);
  const toggleTooth = (id) => {
    setSelectedTeeth(
      (prev) =>
        prev.includes(id)
          ? prev.filter((tooth) => tooth !== id) // unselect
          : [...prev, id] // select
    );
  };
  return (
    <div className=" bg-bgWhite p-4 rounded-2xl">
      <div className="flex justify-between items-center pb-4">
        <div>
          <h4 className="text-[#1A1A1A] font-semibold text-sm font-poppins">
            Implant Design Form:
          </h4>
        </div>
        <div className={`flex gap-2 ${className}`}>
          <div>
            <SecondaryButton
              title="Download Form"
              className="border text-secondaryBrand font-medium text-xs border-secondaryBrand rounded-full  px-6 py-3"
            />
          </div>

          <div>
            <SecondaryButton
              href="/admin-panel/dental-design-form"
              title="Print Rx"
              className="border text-[#F8F8F8] font-medium text-xs border-secondaryBrand bg-[#001D58] rounded-full  px-6 py-3"
            />
          </div>
        </div>
      </div>

      <div>
        <div className="border border-gray-200  rounded-lg p-4 sm:p-5 ">
          <h3 className="font-semibold mb-2 text-sm sm:text-base font-poppins text-primaryText">
            Doctor Info
          </h3>
          <hr className="border-gray-200 my-2" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm sm:text-base text-start">
            <div className="">
              <p className="text-secondaryText mb-2  font-normal md:text-sm text-xs font-poppins">
                Doctor's Name
              </p>
              <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins ">
                Doctor
              </p>
            </div>
            <div>
              <p className="text-secondaryText mb-2  font-normal md:text-sm text-xs font-poppins whitespace-nowrap ">
                Office Registration No#
              </p>
              <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">
                466437#
              </p>
            </div>

            <div>
              <p className="text-secondaryText mb-2 font-normal md:text-sm text-xs font-poppins">
                Create Date
              </p>
              <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">
                createDate
              </p>
            </div>
            <div>
              <p className="text-secondaryText mb-2 font-normal md:text-sm text-xs font-poppins">
                Case Expected Due Date:
              </p>
              <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">
                dueDate
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="border border-gray-200  rounded-lg p-4 sm:p-6">
          <h3 className="font-semibold mb-2 text-sm sm:text-base font-poppins text-primaryText">
            Patient Information
          </h3>
          <hr className="border-gray-200 my-2" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm sm:text-base">
            <div>
              <p className="text-secondaryText mb-2 font-normal md:text-sm text-xs font-poppins">
                First Name:
              </p>
              <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">
                Miles
              </p>
            </div>
            <div>
              <p className="text-secondaryText mb-2 font-normal md:text-sm text-xs font-poppins">
                Last Name:
              </p>
              <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">
                Esther
              </p>
            </div>

            <div>
              <p className="text-secondaryText mb-2 font-normal md:text-sm text-xs font-poppins">
                Subscription ID:
              </p>
              <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">
                466437#
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        {/* tooth selection  */}
        <div className="border border-gray-200  rounded-lg p-4 mt-4">
          <p className="text-sm font-medium font-poppins text-primaryText">
            Tooth Selection : {selectedTeeth.sort((a, b) => a - b).join(", ")}
          </p>
          <div className="py-4">
            <img
              src="/assets/doctor/teeth.png"
              alt="Teeth Chart"
              className="w-full h-auto rounded-md border border-gray-300"
            />
            {/* <TeethSelection selectedTeeth={selectedTeeth} setSelectedTeeth={setSelectedTeeth} toggleTooth={toggleTooth} /> */}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2   gap-4 md:text-sm text-base">
            <div>
              <p className="text-secondaryText  font-normal   text-xs font-poppins pb-2">
                Abutment Type
              </p>
              <p className="font-medium text-secondaryBrand  text-xs  font-poppins">
                Titanium Standard Abutment
              </p>
            </div>
            <div>
              <p className="text-secondaryText  font-normal text-xs font-poppins pb-2">
                Crown Type
              </p>
              <p className="font-medium text-secondaryBrand  text-xs  font-poppins">
                full contour crown
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="border border-gray-200  rounded-lg p-4 sm:p-6">
          <h3 className="font-semibold mb-2 text-sm sm:text-base font-poppins text-primaryText">
            Customization Details
          </h3>
          <hr className="border-gray-200 my-2" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm sm:text-base pb-2 ">
            <div>
              <p className="text-secondaryText mb-2  font-normal md:text-sm text-xs font-poppins">
                Material:
              </p>
              <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">
                Miles
              </p>
            </div>
            <div>
              <p className="text-secondaryText mb-2 font-normal md:text-sm text-xs font-poppins">
                Colour:
              </p>
              <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">
                Esther
              </p>
            </div>

            <div>
              <p className="text-secondaryText mb-2 font-normal md:text-sm text-xs font-poppins">
                Digital Model Type:
              </p>
              <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">
                466437#
              </p>
            </div>
            <div>
              <p className="text-secondaryText mb-2 font-normal md:text-sm text-xs font-poppins">
                Participating Lab:
              </p>
              <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">
                466437#
              </p>
            </div>
          </div>
        </div>
        <div className="border border-gray-200  rounded-lg p-4 sm:p-6 mt-4">
          <h3 className="font-semibold mb-2 text-sm sm:text-base font-poppins text-primaryText">
            Notes
          </h3>
          <hr className="border-gray-200 my-2" />
          <div className=" text-sm sm:text-base pb-2">
            <div>
              <p className="text-secondaryText  font-normal md:text-sm text-xs font-poppins">
                Dr,weed bran:
              </p>
              <p className="font-normal text-secondaryBrand  text-sm sm:text-base font-poppins">
                kindly Use strong material for the upper teeth for better
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImpalntDesignForm;
