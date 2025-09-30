import React from "react";
import { ProgressBar } from "../../../Common/ProgressBar";

import AdminOrderDetailForm from "./admin-order-detail-form";
import { SecondaryButton } from "../../../Common/Button";
import ChevronRightIcon from "../../../icon/ChevronRight";

function AdminOrdersDetail() {
  return (
    <div className="">
      <div className="bg-bgWhite col-span-12 border border-borderPrimary p-4 rounded-lg">
        <h3 className="text-tertiaryBrand text-sm font-poppins capitalize font-semibold border-b-2 pb-3">
          order status
        </h3>
        <div className="">
          <div className="mt-4 flex  ">
            <span className="flex-1">
              <ProgressBar />
            </span>

            <div className="">
              <SecondaryButton
                title="Move Order To Delivered"
                icon={""}
                className="bg-[#001D58] text-[#FFFFFF] text-xs font-light font-poppins px-6 py-3 rounded-xl "
              />
            </div>
          </div>
        </div>
      </div>
      <AdminOrderDetailForm />
    </div>
  );
}

export default AdminOrdersDetail;
