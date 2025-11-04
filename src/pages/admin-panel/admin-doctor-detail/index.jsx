import Stepper from "../../../Common/TabsStepper/Stepper";
import SubscriptionForm from "./subscription-form";
import BasicInfo from "./basic-info";
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
  ];
  return (
    <div className=" p-4 ">
      <div className="grid md:grid-cols-12 grid-cols-1 gap-4 bg-bgWhite rounded-2xl">
        <div className="bg-bgWhite px-6 py-5  font-poppins  md:col-span-4 col-span-1 rounded-2xl">
          <AccountDetailForm
            name="Huynam Moinon"
            icon="/assets/user01.png"
            email="hunammoinon@gmail.com"
            buttonText="Deactivate Account"
          />
        </div>

        <div className="bg-bgWhite p-6  font-poppins  md:col-span-8 col-span-1 rounded-2xl">
          <SubscriptionForm
            title="Subscription Plan"
            para="will be expired on 23 march 2023"
            text="Number of patients"
            number="10/20"
          />
        </div>
      </div>

      <div className="md:col-span-8 col-span-1 bg-bgWhite rounded-2xl mt-5">
        <div className="py-6 px-2">
          <Stepper
            steps={stepss}
            className="md:w-1/3 mb-4 bg-[#F8F8F8]  border-none"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPanelDoctorDetail;
