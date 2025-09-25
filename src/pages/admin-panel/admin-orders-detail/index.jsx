import React from "react";
import { ProgressBar } from "../../../Common/ProgressBar";

import AdminOrderDetailForm from "./AdminOrderDetailForm";

function AdminOrdersDetail() {
  return (
    <div className="">
      <div className="bg-bgWhite col-span-12 border border-borderPrimary p-4 rounded-lg">
        <h3 className="text-tertiaryBrand text-sm font-poppins capitalize font-semibold border-b-2 pb-3">
          order status
        </h3>
        <div>
          <div className="mt-4 ">
            <ProgressBar />
          </div>
        </div>
      </div>
      <AdminOrderDetailForm />
    </div>
  );
}

export default AdminOrdersDetail;
