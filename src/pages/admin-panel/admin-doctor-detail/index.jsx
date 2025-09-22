import Stepper from "../../../Common/TabsStepper/Stepper";
import SubscriptionForm from "./SubscriptionForm";
import BasicInfo from "./BasicInfo";
import PaymentDetail from "./PaymentDetail";
import AccountDetailForm from "./AccountDetailForm";

const AdminPanelDoctorDetail = () => {
  const stepss = [
    {
      name: "Basic Info",
      content: <BasicInfo />,
    },
    {
      name: "Patients",
      // content: <TrackingOrder />,
    },
    {
      name: "Payment Detail",
      content: <PaymentDetail />,
    },
  ];
  return (
    <div className=" p-4 ">
      <div className="grid grid-cols-12 gap-4">
        <div className="bg-bgWhite p-6  font-poppins  col-span-4 rounded-2xl ">
          <AccountDetailForm />

          <SubscriptionForm />
        </div>

        <div className="col-span-8 bg-bgWhite rounded-2xl">
          <div className="py-6 px-2">
            <Stepper
              steps={stepss}
              className="md:w-2/3 bg-[#F8F8F8]  border-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelDoctorDetail;
