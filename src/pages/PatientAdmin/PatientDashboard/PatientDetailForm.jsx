import React from "react";
import FileIcon from "../../../icon/FileIcon";

export default function PatientDetailForm({ warranties }) {

  const getRewarrentlyById = (warranties, id) => {
    return warranties.find(item => item.id === id)?.rewarrently || null;
  };

  console.log(getRewarrentlyById(warranties, "#41")); // "98.69926389997437"


  return (
    <div className="bg-bgWhite">
      <div className="bg-card p-4 rounded-2xl">
        <p className="text-black font-poppins font-semibold text-sm ">
          Warranty
          <p className="text-xs font-poppins font-light  pt-6 text-primaryText">
            will be expired on 23 march 2023
          </p>
        </p>















        <div className=" pt-3 pb-3 pr-5">
          <div className="pb-4">
            <div className="w-full px-1 py-1  bg-bgWhite rounded-full  ">
              <div
                className="bg-secondaryBrand h-2.5 rounded-full "
                style={{ width: `${getRewarrentlyById}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border rounded-lg px-3 py-2 bg-bgWhite">
          <span className="text-sm text-primaryText font-poppins">
            Quantity
          </span>
          <span className="text-sm font-semibold text-[#001D58]">2</span>
        </div>
      </div>
    </div>
  );
}
