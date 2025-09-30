import ImpalntDesignForm from "../../../Common/ImplantDesignForm";
import { SecondaryButton } from "../../../Common/Button";
import PrintInfoCard from "./print-info-card";

function DentalDesignForm() {
  return (
    <div className="grid md:grid-cols-12 col-span-6  gap-4 mt-7 ">
      <div className="md:col-span-8 col-span-4 bg-white rounded-2xl">
        <ImpalntDesignForm className="hidden" />
      </div>
      <div className="md:col-span-4 col-span-4 bg-white rounded-2xl font-poppins">
        <PrintInfoCard />
      </div>
    </div>
  );
}

export default DentalDesignForm;
