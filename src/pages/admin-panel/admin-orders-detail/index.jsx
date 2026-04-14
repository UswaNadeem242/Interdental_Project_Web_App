import React, { useState } from "react";
import AdminOrderDetailForm from "./admin-order-detail-form"; 
import AreYouSureModel from "../../../modals/AreYouSureModel"; 
import TrackingOrderAdmin from "./tracking-order";
import { useSearchParams } from "react-router-dom";

function AdminOrdersDetail() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const fetchOrderDetails = async () => {
   
    
  };
  return (
    <div className="">
      {/* <ProgressBar steps={stepsDefault} /> */}
      <TrackingOrderAdmin id={id} isadmin={true} refresh={() => fetchOrderDetails()}/>

      {/* <SecondaryButton
                title="Move Order To Delivered"
                icon={""}
                className="bg-[#001D58] text-[#FFFFFF] text-xs font-light font-poppins px-6 py-3 rounded-xl "
                onClick={() => setIsModalOpen(true)}
              /> */}

      <AdminOrderDetailForm id={id}/>
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










// function AdminOrdersDetail() {
//   const [searchParams] = useSearchParams();
//   const id = searchParams.get("id");

//   const steps = [
//     {
//       name: "Order detail",
//       content: <AdminOrderDetailForm id={id} />,
//     },
//     {
//       name: "track order",
//       content: <TrackingOrderAdmin id={id} />,
//     },
//   ];

//   return (
//     <div>
//       <Stepper
//         steps={steps}
//         className="lg:w-1/3 w-full"
//         selectedColor="bg-white "
//       />
//     </div>
//   );
// }

// export default AdminOrdersDetail;

