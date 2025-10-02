import Stepper from "../../../Common/TabsStepper/Stepper";
import SubscriptionForm from "./subscription-form";
import BasicInfo from "./basic-info";
import PaymentDetail from "./payment-detail";
import AccountDetailForm from "./account-detail-form";
import PatientsTable from "./patients-table";

const AdminPanelDoctorDetail = () => {
  const stepss = [
    {
      name: "Basic Info",
      content: <BasicInfo />,
    },
    {
      name: "Patients",
      content: <PatientsTable />,
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
          <AccountDetailForm
            name="Huynam Moinon"
            icon="/assets/user01.png"
            email="hunammoinon@gmail.com"
            buttonText="Deactivate Account"
          />

          <SubscriptionForm
            title="Subscription Plan"
            para="will be expired on 23 march 2023"
            text="Number of patients"
            number="10/20"
          />
        </div>

        <div className="col-span-8 bg-bgWhite rounded-2xl">
          <div className="py-6 px-2">
            <Stepper
              steps={stepss}
              className="md:w-2/3 mb-4 bg-[#F8F8F8]  border-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelDoctorDetail;
