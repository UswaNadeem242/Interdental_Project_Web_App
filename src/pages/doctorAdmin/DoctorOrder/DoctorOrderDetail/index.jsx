import React from "react";
import TabsStepper from "../../../../Common/TabsStepper";
import TableComponent from "../../../../Common/Table";
import { dataOrder, headingsOrder } from "../../../../Constant";
import Stepper from "../../../../Common/TabsStepper/Stepper";
import OrderDetailsForm from "./OrderDetailsForm";
import TrackingOrder from "./TrackingOrder";
import { useParams } from "react-router-dom";

function DoctorDeailsPage() {
  const { id } = useParams();
  const steps = [
    {
      name: "Order detail",
      content: <OrderDetailsForm id={id} />,
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
