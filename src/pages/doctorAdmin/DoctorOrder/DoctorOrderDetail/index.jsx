import React from "react";
import TabsStepper from "../../../../Common/TabsStepper";
import TableComponent from "../../../../Common/Table";
import { dataOrder, headingsOrder } from "../../../../Constant";
import Stepper from "../../../../Common/TabsStepper/Stepper";
import OrderDetailsForm from "./OrderDetailsForm";
import TrackingOrder from "./TrackingOrder";

function DoctorDeailsPage() {
  const steps = [
    {
      name: "Order detail",
      content: <OrderDetailsForm />,
    },
    {
      name: "track order",
      content: <TrackingOrder />,
    },
  ];
  return (
    <div>
      <Stepper steps={steps} />
    </div>
  );
}

export default DoctorDeailsPage;
