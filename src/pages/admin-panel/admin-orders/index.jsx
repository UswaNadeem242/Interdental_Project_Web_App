import React, { useEffect, useState } from "react";
import Stepper from "../../../Common/TabsStepper/Stepper";
import OrdersTable from "./order-table";
import EcommereceOrders from "./ecommerece-orders";
import { getAllOrders } from "../../../services/admin-order";

function AdminPanelOrders() {
  const [orders, setOrders] = useState([]);
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

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      const response = await getAllOrders();
      setOrders(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
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
