import React from "react";

function CompositionProductLanding({ data, title }) {
  return (
    <div className="p-12 border-2 border-[#0000000D] rounded-2xl">
      <h2 className="text-2xl font-bold text-[#001D58] mb-4">{title}</h2>
      <div className="divide-y divide-gray-200">
        {data.map((item, id) => (
          <div
            key={id}
            className="flex items-center justify-between py-3 text-[#434343] text-lg font-normal"
          >
            <span>{item.name}</span>
            <span className="font-normal text-lg text-[#434343]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompositionProductLanding;
