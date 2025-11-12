import React from "react";
import Stepper from "../../../Common/TabsStepper/Stepper";
import OrdersTable from "./order-table";
import EcommereceOrders from "./ecommerece-orders";

function AdminPanelOrders() {
  const steps = [
    {
      name: "Doctor Orders",
      content: <OrdersTable />,
    },
    {
      name: "Ecommerce order",
      content: <EcommereceOrders />,
    },
  ];
  return (
    <div className="bg-white rounded-2xl py-6 px-2 ">
      <Stepper
        steps={steps}
        // className="lg:w-1/3 w-full"
        // selectedColor="bg-white "
        className="w-full   mb-1    bg-[#F8F8F8]  border-none"
      />
    </div>
  );
}

export default AdminPanelOrders;
