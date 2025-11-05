import ImpalntDesignForm from "../../../Common/ImplantDesignForm";
import { SecondaryButton } from "../../../Common/Button";
import PrintInfoCard from "./print-info-card";

function DentalDesignForm({ setOpenModal }) {
  console.log(setOpenModal);
  return (
    // <div className="grid grid-cols-12">
    //   <div className="col-span-8">
    //     <ImpalntDesignForm className="hidden" />
    //   </div>
    //   <div className="col-span-4">
    //     <PrintInfoCard />
    //   </div>
    // </div>
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50 ">
      <div className="bg-[#F8F8F8]  rounded-2xl w-[90%] max-w-6xl h-[90%] overflow-y-auto p-6 scale-[0.99] origin-top shadow-lg">
        <div className="grid grid-cols-12 gap-4">
          <div className="md:col-span-8 col-span-12 bg-white rounded-xl">
            <ImpalntDesignForm className="hidden" />
          </div>
          <div className="md:col-span-4 col-span-12 bg-white rounded-xl font-poppins">
            <PrintInfoCard setOpenModal={setOpenModal} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DentalDesignForm;
