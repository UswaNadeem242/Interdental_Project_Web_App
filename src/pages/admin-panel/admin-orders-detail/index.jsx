import React, { useState } from "react";
import { ProgressBar } from "../../../Common/ProgressBar";

import AdminOrderDetailForm from "./admin-order-detail-form";
import { SecondaryButton } from "../../../Common/Button";
import ChevronRightIcon from "../../../icon/ChevronRight";
import AreYouSureModel from "../../../modals/AreYouSureModel";
import { stepsDefault } from "../../../Constant";
import TrackingOrder from "../../doctorAdmin/DoctorOrder/DoctorOrderDetail/TrackingOrder";
import TrackingOrderAdmin from "./tracking-order";

function AdminOrdersDetail() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="">
      {/* <ProgressBar steps={stepsDefault} /> */}
      <TrackingOrderAdmin setIsModalOpen={setIsModalOpen} />

      {/* <SecondaryButton
                title="Move Order To Delivered"
                icon={""}
                className="bg-[#001D58] text-[#FFFFFF] text-xs font-light font-poppins px-6 py-3 rounded-xl "
                onClick={() => setIsModalOpen(true)}
              /> */}

      <AdminOrderDetailForm />
      <div>
        {isModalOpen && (
          <AreYouSureModel
            setIsModalOpen={setIsModalOpen}
            title="Are You Sure"
            desc="You can not undo the action"
          />
        )}
      </div>
    </div>
  );
}

export default AdminOrdersDetail;
