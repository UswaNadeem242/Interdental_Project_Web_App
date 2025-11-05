import React from "react";
import { SecondaryButton } from "../../../Common/Button";
import { useState } from "react";
import AreYouSureModel from "../../../modals/AreYouSureModel";
import DropDownOptions from "../../../Common/drop-down-options";
import { dentalDropDownOpts } from "../../../Constant";

function PrintInfoCard({ setOpenModal }) {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className=" bg-white p-6 flex flex-col h-full justify-between rounded-2xl ">
      <div className="text-primaryText">
        {/* Destination */}
        <div className="my-4  ">
          <label className="block text-sm text-primaryText font-normal mb-2 ">
            Destination
          </label>
          <DropDownOptions
            options={dentalDropDownOpts}
            placeholder="2"
            buttonClassName="hidden"
            className="text-[#3a3939] py-4"
          />
        </div>

        {/* Pages */}
        <div className="mb-4">
          <label className="block text-sm text-primaryText font-normal mb-2">
            Pages
          </label>

          <DropDownOptions
            options={dentalDropDownOpts}
            placeholder="2"
            buttonClassName="hidden"
            className="text-[#3a3939] py-4"
          />
        </div>

        {/* Copies */}
        <div className="mb-4">
          <label className="block text-sm text-primaryText font-normal mb-2">
            Copies
          </label>
          <DropDownOptions
            options={dentalDropDownOpts}
            placeholder="2"
            buttonClassName="hidden"
            className="text-[#3a3939] py-4"
          />
        </div>

        {/* Layout */}
        <div className="mb-4">
          <label className="block text-sm text-primaryText font-normal mb-2">
            Layout
          </label>
          <DropDownOptions
            options={dentalDropDownOpts}
            placeholder="2"
            buttonClassName="hidden"
            className="text-[#3a3939] py-4"
          />
        </div>

        {/* Colour */}
        <div className="mb-6">
          <label className="block text-sm text-primaryText font-normal mb-2">
            Colour
          </label>
          <DropDownOptions
            options={dentalDropDownOpts}
            placeholder="2"
            buttonClassName="hidden"
            className="text-[#3a3939] py-4"
          />
        </div>
      </div>

      <div>
        {/* Buttons */}
        <div className="flex gap-2 justify-center ">
          <SecondaryButton
            onClick={() => setOpenModal(false)}
            title="Cancel"
            className="w-full  bg-[#F8F8F8] text-primaryText font-medium text-xs border-secondaryBrand rounded-full  px-16 py-3"
          />
          <SecondaryButton
            title="Print"
            className="w-full  bg-[#001D58] text-[#F8F8F8] font-medium text-xs border-secondaryBrand rounded-full  px-16 py-3"
            // onClick={() => setIsModalOpen(true)}
          />
          {/* {isModalOpen && (
            <AreYouSureModel
              setIsModalOpen={setIsModalOpen}
              title="Are You Sure"
              desc="You can not undo the action"
            />
          )} */}
        </div>
      </div>
    </div>
  );
}

export default PrintInfoCard;
