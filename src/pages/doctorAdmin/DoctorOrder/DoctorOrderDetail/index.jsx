 
import Stepper from "../../../../Common/TabsStepper/Stepper";
import OrderDetailsForm from "./OrderDetailsForm";
import TrackingOrder from "./TrackingOrder";
import { useParams } from "react-router-dom"; 

function DoctorDeailsPage() {
  const { id } = useParams();
  console.log("Tcasd:", id);
  const steps = [
    {
      name: "Order detail",
      content: <OrderDetailsForm id={id} />,
    },
    {
      name: "track order",
      content: <TrackingOrder id={id} />,
    },
  ];
  return (
    <div>
      <Stepper
        steps={steps}
        className="lg:w-1/3 w-full"
        selectedColor="bg-white "
      />
    </div>
  );
}

export default DoctorDeailsPage;
