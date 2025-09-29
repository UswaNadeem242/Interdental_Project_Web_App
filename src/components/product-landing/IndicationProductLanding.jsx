import React from "react";

function IndicationProductLanding({ Indication }) {
  return (
    <div className="p-12 border-2 border-[#0000000D] rounded-2xl  ">
      <h1 className="text-2xl font-bold text-[#001D58] mb-6">Indication</h1>
      <div>
        {
          Indication?.map((item, idx) => {
            return (
              <ul key={idx}>
                <li className="before:content-['•'] before:mr-2 text-[#000000] py-4 px-6 mb-8  bg-[#F8F8F8] font-semibold text-lg">
                  {item?.title}
                </li>

              </ul>
            )
          })
        }

      </div>
    </div>
  );
}

export default IndicationProductLanding;
