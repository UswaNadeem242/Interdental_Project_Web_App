export default function PatientClaimForm() {
  return (
    <div className="bg-bgWhite">
      <div className="font-poppins text-sm  font-normal text-primaryText pb-3">Claim ID: <span className="font-bold">#12345</span></div>
      <div className="space-y-3 font-poppins">
        {/* Product Name */}
        <div>
          <h6 className="block text-sm mb-1  text-secondaryText  font-normal">
            Patient name
          </h6>
          <p className="text-sm   text-primaryText  font-semibold pt-2"> Varga Dóra</p>
        </div>

        {/* Purchase Date */}
        <div className="border-t-2 border-background ">
          <h6 className="block text-sm mb-1  text-secondaryText pt-3 font-normal">
            Patient Email Address
          </h6>
          <p className="text-sm mb-1  text-primaryText  font-semibold pt-2"> VargaDóra123@gmail.com</p>
        </div>

        {/* Quantity */}
        <div className="border-t-2 border-background ">
          <h6 className="block text-sm mb-1 pt-3  text-secondaryText  font-normal">
            Claim Submitted On
          </h6>
          <p className="text-sm mb-1  text-primaryText  font-semibold pt-2">12 Mar 2025</p>
        </div>

        {/* Reason for Claim */}
        <div className="border-t-2 border-background">
          <h6 className="block text-sm mb-1  pt-3 text-secondaryText  font-normal">
            Warranty Options
          </h6>
          <p className="text-sm mb-1  text-primaryText  font-semibold pt-2">Crown and Bridges, Onlays/Inlays & Veneers</p>
          <div className="bg-[#94D3DD] w-7 h-7 flex justify-center items-center rounded-md ">2</div>
        </div>

        <div className="border-t-2 border-background ">

          <p className="text-sm mb-1  pt-3 text-primaryText  font-semibold ">Implant Related Crown & Bridges:</p>
          <div className="bg-[#94D3DD] w-7 h-7 flex justify-center items-center rounded-md ">2</div>
        </div>




      </div>
    </div>
  );
}
