import { useSelector } from "react-redux";

const ReviewOrder = ({ next }) => {
  const restoration = useSelector((state) => state.restoration);

  // Map doctor and patient arrays to objects for easier access
  const doctor = restoration.doctor.reduce((acc, d) => {
    acc[d.field] = d.value || "N/A";
    return acc;
  }, {});
  const patient = restoration.patient.reduce((acc, p) => {
    acc[p.field] = p.value || "N/A";
    return acc;
  }, {});

  const toothSelections = restoration.toothSelections || [];
  const selectedTeeth = restoration.selectedTeeth || [];
  const note = restoration.note || "";

  // Map toothSelections array into an object for easier lookup
  const teeth = toothSelections.reduce((acc, t) => {
    acc[t.toothId] = t;
    return acc;
  }, {});
  // Calculate totalPrice for all selected teeth
  const totalPrice = selectedTeeth.reduce((sum, toothId) => {
    const tooth = teeth[toothId] || {};
    return (
      sum +
      (tooth.materialPrice || 0) +
      (tooth.digitalOptionsPrice || 0) +
      (tooth.surgical_guidePrice || 0) +
      (tooth.labPrice || 0) +
      (tooth.crownPrice || tooth.crown?.price || 0)
    );
  }, 0);

  return (
    <div className="">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Panel */}
        <div className="md:col-span-7 bg-white rounded-xl border border-gray-200 p-4 sm:p-6 space-y-6">
          <h2 className="text-sm font-poppins text-primaryText">
            Implant Design Details:{" "}
          </h2>
          {/* Doctor Info */}
          <div className="border border-gray-200 p-4 sm:p-6">
            <h3 className="font-medium mb-2 text-sm sm:text-base font-poppins text-[#434343]">
              Doctor Info
            </h3>
            <hr className="border-gray-200 my-2" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm sm:text-base">
              <div>
                <p className="text-[#949494] font-normal md:text-sm text-xs font-poppins">
                  Doctor’s Name
                </p>
                <p className="font-normal text-secondaryBrand text-sm sm:text-base font-poppins">
                  {doctor?.doctorName}
                </p>
              </div>
              <div>
                <p className="text-[#949494] font-normal md:text-sm text-xs font-poppins">
                  Office Registration#
                </p>
                <p className="font-normal text-secondaryBrand text-sm sm:text-base font-poppins">
                  {doctor?.officeReg}
                </p>
              </div>
              <div>
                <p className="text-[#949494] font-normal md:text-sm text-xs font-poppins">
                  Create Date
                </p>
                <p className="font-normal text-secondaryBrand text-sm sm:text-base font-poppins">
                  {doctor?.createDate}
                </p>
              </div>
              <div>
                <p className="text-[#949494] font-normal md:text-sm text-xs font-poppins">
                  Due Date
                </p>
                <p className="font-normal text-secondaryBrand text-sm sm:text-base font-poppins">
                  {doctor?.dueDate}
                </p>
              </div>
            </div>
          </div>

          {/* Patient Info */}
          <div className="border border-gray-200 p-4 font-poppins">
            <h3 className="font-medium mb-2 text-[#434343]">Patient Information</h3>
            <hr className="border-gray-200 my-2" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-[#949494]">First Name</p>
                <p className="font-normal text-secondaryBrand md:text-sm text-base font-poppins">
                  {patient?.patientFirstName}
                </p>
              </div>
              <div>
                <p className="text-[#949494]">Last Name</p>
                <p className="font-normal text-secondaryBrand md:text-sm text-base font-poppins">
                  {patient?.patientLastName}
                </p>
              </div>
              <div>
                <p className="text-[#949494]">Subscription ID</p>
                <p className="font-normal text-secondaryBrand md:text-sm text-base font-poppins">
                  {patient?.subscriptionId}
                </p>
              </div>
            </div>
          </div>

          {/* Selected Teeth */}
          <div className="border border-gray-200 p-4">
            <p className="text-sm font-medium font-poppins text-black mb-2">
              Selected Teeth:{" "}
              <span className="font-semibold">
                {selectedTeeth.length > 0
                  ? selectedTeeth.map((t) => `#${t}`).join(", ")
                  : "None"}
              </span>
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 md:text-sm text-base">
              <div>
                <p className="text-[#949494] font-normal text-xs font-poppins pb-2">
                  Abutment Type
                </p>
                <p className="font-medium text-secondaryBrand text-xs font-poppins">
                  Titanium Standard Abutment
                </p>
              </div>
              <div>
                <p className="text-[#949494] font-normal text-xs font-poppins pb-2">
                  Crown Type
                </p>
                {selectedTeeth.map((toothId) => {
                  const tooth = teeth[toothId];
                  return (
                    <p key={toothId} className="font-medium text-secondaryBrand text-xs font-poppins">
                      {tooth?.crown?.label || "No Crown"}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Customization Details */}
          <div className="border border-gray-200 font-poppins p-4">
            <h3 className="font-medium mb-3 text-[#000000]">Customization Details</h3>
            <hr className="border-gray-200 my-2" />
            <div className="space-y-4">
              {selectedTeeth.map((toothId) => {
                const tooth = teeth[toothId] || {};
 
                return (
                  <div
                    key={toothId}
                    className="border border-gray-200 p-3 rounded-lg"
                  >
                    <h4 className="font-semibold text-sm mb-2 text-secondaryBrand">
                      Tooth #{toothId}
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-[#949494] text-xs font-poppins">Material:</p>
                        <p className="font-bold text-secondaryBrand font-poppins text-xs">
                          {tooth.materialOption?.label ||
                            tooth.material ||
                            "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#949494] text-xs font-poppins">Scanner Type:</p>
                        <p className="font-bold text-secondaryBrand font-poppins text-xs">
                          {tooth.scannerTypeOption?.label ||
                            tooth.scannerType ||
                            "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#949494] text-xs font-poppins">Digital Denture:</p>
                        <p className="font-bold text-secondaryBrand font-poppins text-xs">
                          {tooth?.digitalOptionsOption?.label || tooth?.digitalOptions || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#949494] text-xs font-poppins">Surgical Guide:</p>
                        <p className="font-bold text-secondaryBrand font-poppins text-xs">
                          {tooth?.surgical_guideOption?.label || tooth?.surgical_guide || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#949494] text-xs font-poppins">Digital Model:</p>
                        <p className="font-bold text-secondaryBrand font-poppins text-xs">
                          {tooth?.digitalOptionsOption?.label || tooth?.digitalOptionsOption || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#949494] text-xs font-poppins">Laboratory:</p>
                        <p className="font-bold text-secondaryBrand font-poppins text-xs">
                          {tooth?.labOption?.label || tooth?.labOption || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#949494] text-xs font-poppins">Photogrammetry:</p>
                        <p className="font-bold text-secondaryBrand font-poppins text-xs">
                          {tooth?.photogrammetryfilesOption?.label || tooth?.photogrammetryfilesOption || "N/A"}
                        </p>
                      </div>
                      {/* <div>
                        <p className="text-[#949494] text-xs font-poppins">Price:</p>
                        <p className="font-bold text-secondaryBrand font-poppins text-xs">
                          ${tooth.materialPrice || 0}
                        </p>
                      </div> */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Note */}
          <div className="border border-gray-200 p-4 sm:p-6">
            <h3 className="font-medium mb-2 text-sm sm:text-base font-poppins text-[#434343]">Note</h3>
            <hr className="border-gray-200 my-2" />
            <div className="grid grid-cols-1 gap-4 text-sm sm:text-base">
              <div>
                <p className="text-[#949494] font-normal text-xs font-poppins pb-2">{doctor?.doctorName}</p>
                <p className="font-normal text-secondaryBrand text-xs font-poppins">{note}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel / Order Summary */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-gray-200 p-6 flex flex-col justify-between font-poppins">
          <div>
            <h2 className="text-lg font-semibold mb-4 text-[#1A1A1A]">Order Summary</h2>
            <div className="space-y-3 text-sm">
              {selectedTeeth?.map((toothId) => {
                const tooth = teeth[toothId] || {};
                return (
                  <div key={toothId} className="border-b border-gray-200 pb-2">
                    <p className="font-semibold text-[#1A1A1A]">Tooth #{toothId}</p>
                    <div className="flex justify-between">
                      <span className="text-[#828386] font-poppins text-sm">{tooth?.materialOption?.label}</span>
                      <span className="text-[#1A1A1A] font-poppins text-sm">${tooth?.materialPrice || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#828386] font-poppins text-sm">{tooth?.digitalOptionsOption?.label}</span>
                      <span className="text-[#1A1A1A] font-poppins text-sm">${tooth?.digitalOptionsPrice || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#828386] font-poppins text-sm">{tooth?.surgical_guideOption?.label}</span>
                      <span className="text-[#1A1A1A] font-poppins text-sm">${tooth?.surgical_guidePrice || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#828386] font-poppins text-sm">{tooth?.labOption?.label}</span>
                      <span className="text-[#1A1A1A] font-poppins text-sm">${tooth?.labPrice || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#828386] font-poppins text-sm">{tooth?.crown?.label}</span>
                      <span className="text-[#1A1A1A] font-poppins text-sm">${tooth?.crown?.price || 0}</span>
                    </div>
                  </div>
                );
              })}

              <div className="flex justify-between">
                <span className="text-[#828386] font-poppins text-sm">Subtotal :</span>
                <span className="font-semibold text-[#1A1A1A]">${totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#828386] font-poppins text-sm">Shipping :</span>
                <span className="text-[#1A1A1A]">Free</span>
              </div>
              <div className="flex justify-between font-normal text-secondaryBrand text-lg mt-4 border-t border-gray-200 pt-2">
                <span>Total</span>
                <span>${totalPrice}</span>
              </div>
            </div>
          </div>

          <button className="mt-6 w-full py-3 rounded-3xl bg-secondaryBrand text-white font-medium" onClick={next}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewOrder;
