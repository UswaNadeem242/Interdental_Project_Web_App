import { useState } from "react";
import { Orders } from "../../Constant";
import { PrimaryButtonUI, SecondaryButton } from "../Button";
import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import Drawers from "../Drawers";
import { NavLink } from "react-router-dom";
import ClaimDetailForm from "../../pages/doctorAdmin/ClaimRequest/ClaimDetailForm";

export default function TableComponent({ headings, data, actions }) {

  const [isOpen, setIsOpen] = useState(false);


  return (
    <div className="">
      {/* p-6 bg-white rounded-2xl shadow-md */}
      {/* Header */}
      {/* <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-poppins font-semibold text-primaryText">
          Recent Orders
        </h2>
        <div className="flex gap-4">
          <PrimaryButtonUI className='py-4 px-8 font-poppins font-light text-xs bg-secondaryBrand text-white  rounded-lg shadow' title=' Place New Order' />
          <SecondaryButton className='py-0.5 px-4 font-poppins font-light text-xs border border-brand bg-white text-brand  rounded-lg shadow' title='View All' />

        </div>
      </div> */}

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-full  w-full text-left text-sm">
          <thead>
            <tr className="font-poppins font-medium text-xs text-secondaryText capitalize">
              {headings.map((col, idx) => (
                <th key={idx} className="px-4 py-2 text-[#949494]">
                  {col.label}
                </th>
              ))}
              {actions?.length > 0 && (
                <th className="px-4 py-2 text-[#949494]">Actions</th>
              )}
            </tr>
          </thead>

          <tbody>
            {data.map((row, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-200 transition-all"
              >
                {headings.map((col, i) => (
                  <td
                    key={i}
                    className={`px-4 py-3 text-[#333333] text-sm ${col.key === "name" ? "font-semibold" : "font-normal"
                      }`}
                  >
                    {/* Name column with image + text */}
                    {col.key === "name" ? (

                      <div className="flex items-center gap-2">
                        <img
                          src={row.image || "/assets/user.png"} // fallback if no image
                          alt={row.name}
                          className="w-9 h-9 rounded-full object-cover"
                        />
                        <div className="flex flex-col">

                          <span>{row.name}</span>
                          <span className="text-secondaryBrand flex item-center gap-1 cursor-pointer text-xs font-normal font-poppins">View detail <ArrowUpRightIcon className="w-3 h-3 text-secondaryBrand" /></span>
                        </div>

                      </div>


                    ) : col.key === "status" ? (
                      <span
                        className={`px-3 py-2 rounded-full text-xs font-semibold ${row[col.key] === "active"
                          ? "bg-green-500/5 text-[#4ECC53]"
                          : row[col.key] === "pending"
                            ? "bg-blue-700/5 text-[#1F27EF]"
                            : "bg-rose-500/5 text-[#FF5757]"
                          }`}
                      >
                        {row[col.key]}
                      </span>
                    ) : col.key === "action" ? (
                      <NavLink
                        onClick={() => setIsOpen(true)}
                        href="#"
                        className="text-secondaryBrand flex gap-1 items-center"
                      >
                        {row[col.key]}
                        <ArrowUpRightIcon className="w-4 h-4 text-secondaryBrand" />
                      </NavLink>
                    ) : (
                      row[col.key] || "-"
                    )}
                  </td>
                ))}


                {/* Optional action icons */}
                {/* {actions && actions.length > 0 && (
                  <td className="px-4 py-3 flex gap-2 text-gray-600">
                    {actions.includes("edit") && (
                      <FiEdit
                        className="cursor-pointer hover:text-yellow-500"
                        onClick={() => console.log("Edit", row)}
                      />
                    )}
                    {actions.includes("delete") && (
                      <FiTrash2
                        className="cursor-pointer hover:text-red-500"
                        onClick={() => console.log("Delete", row)}
                      />
                    )}
                  </td>
                )} */}





                {/* call the dawer page  */}
                {/* <PrimaryButtonUI title='Add Claim' onClick={() => setIsOpen(true)} className='rounded-md px-8 py-4' /> */}
                <Drawers
                  isOpen={isOpen}
                  onClose={() => setIsOpen(false)}
                  title='Claim Details'
                  status='pending'
                  Content={<ClaimDetailForm />}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
