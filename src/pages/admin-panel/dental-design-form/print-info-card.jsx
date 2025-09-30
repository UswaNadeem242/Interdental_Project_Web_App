import React from "react";
import { SecondaryButton } from "../../../Common/Button";
import { useState } from "react";
import AreYouSureModel from "../../../modals/AreYouSureModel";

function PrintInfoCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className=" bg-white p-6 flex flex-col h-full justify-between rounded-2xl ">
      <div className="text-primaryText">
        {/* Destination */}
        <div className="my-4  ">
          <label className="block text-sm text-primaryText font-normal mb-1 ">
            Destination
          </label>
          <select className="w-full border  rounded-lg px-4 py-4 focus:outline-none text-sm font-normal  ">
            <option className="">Hpougvy7u</option>
          </select>
        </div>

        {/* Pages */}
        <div className="mb-4">
          <label className="block text-sm text-primaryText font-normal mb-1">
            Pages
          </label>
          <select className="w-full border rounded-lg px-4 py-4 focus:outline-none text-sm font-normal">
            <option>All</option>
          </select>
        </div>

        {/* Copies */}
        <div className="mb-4">
          <label className="block text-sm text-primaryText font-normal mb-1">
            Copies
          </label>
          <select className="w-full border rounded-lg px-4 py-4 focus:outline-none text-sm font-normal">
            <option>2</option>
          </select>
        </div>

        {/* Layout */}
        <div className="mb-4">
          <label className="block text-sm text-primaryText font-normal mb-1">
            Layout
          </label>
          <select className="w-full border rounded-lg px-4 py-4 focus:outline-none text-sm font-normal">
            <option>portrait</option>
          </select>
        </div>

        {/* Colour */}
        <div className="mb-6">
          <label className="block text-sm text-primaryText font-normal mb-1">
            Colour
          </label>
          <select className="w-full border rounded-lg px-4 py-4 focus:outline-none text-sm font-normal">
            <option>colour</option>
          </select>
        </div>
      </div>

      <div>
        {/* Buttons */}
        <div className="flex gap-2 justify-center ">
          <SecondaryButton
            title="Cancel"
            className="w-full  bg-[#F8F8F8] text-primaryText font-medium text-xs border-secondaryBrand rounded-full  px-16 py-3"
          />
          <SecondaryButton
            title="Print"
            className="w-full  bg-[#001D58] text-[#F8F8F8] font-medium text-xs border-secondaryBrand rounded-full  px-16 py-3"
            onClick={() => setIsModalOpen(true)}
          />
          {isModalOpen && (
            <AreYouSureModel
              setIsModalOpen={setIsModalOpen}
              title="Are You Sure"
              desc="You can not undo the action"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default PrintInfoCard;
