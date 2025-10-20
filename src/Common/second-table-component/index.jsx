import { useState } from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";
import Pagination from "../Pagination";
import CheckBox from "../check-box";
import OptionsDots from "../../icon/options-dots";
import { EditDeleteDropdownMenu } from "../DropDown/edit-delete";

export default function SecondTable({
  headings,
  data,
  actions,
  actionHrefKey,
  onActionClick,
  actionButton,
  DropdownComponent,
  onEdit
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const pageSize = 10;

  const totalResults = data.length;
  const totalPages = Math.ceil(totalResults / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const currentData = data.slice(startIndex, startIndex + pageSize);

  return (
    <div className="grid col-span-1 md:col-span-1 lg:col-span-12">
      <div className="overflow-x-auto max-h-[400px] scrollbar-hidden">
        <table className="min-w-[300px] md:min-w-full text-left text-xs md:text-sm ">
          <thead className="sticky top-0 bg-[#F8F8F8] z-10 ">
            <tr className="font-poppins font-medium text-xs text-secondaryText capitalize ">
              {headings.map((col, idx) => (
                <th
                  key={idx}
                  className="py-5 px-3 font-medium text-secondaryText whitespace-nowrap"
                >
                  {/* {col.label} */}
                  {col.key === "pName" ? (
                    <span className="flex items-center gap-2 ml-1">
                      {/* <input type="checkbox" className="h-5 w-5" /> */}
                      <CheckBox />
                      <span>{col.label}</span>
                    </span>
                  ) : (
                    col.label
                  )}
                </th>
              ))}
              {actionButton && <th className="py-5 px-3"></th>}
            </tr>
          </thead>

          <tbody>
            {currentData.map((row, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-200 transition-all font-poppins"
              >
                {headings.map((col, i) => (
                  <td
                    key={i}
                    className={`px-4 py-4 text-[#333333] text-xs ${col.key === "name" ? "font-semibold" : "font-normal"
                      }`}
                  >
                    {/* Name column */}
                    {col.key === "name" ? (
                      <div className="flex items-center gap-2 md:flex-row flex-col">
                        <img
                          src={row.profileURL || "/assets/user.png"}
                          alt={row.name}
                          className="w-9 h-9 rounded-full object-cover border border-[#285772]"
                        />
                        <div className="flex flex-col">
                          <span>{row.name}</span>
                          {onActionClick ? (
                            <button
                              // onClick={() => onActionClick(row)}
                              className="text-secondaryBrand flex items-center gap-1 cursor-pointer text-xs font-normal font-poppins "
                            >
                              View profile
                              <ArrowUpRightIcon className="w-3 h-3 text-secondaryBrand" />
                            </button>
                          ) : actionHrefKey ? (
                            <NavLink
                              to={row[actionHrefKey]}
                              className="text-secondaryBrand flex items-center gap-1 cursor-pointer text-xs font-normal font-poppins"
                            >
                              View detail
                              <ArrowUpRightIcon className="w-3 h-3 text-secondaryBrand" />
                            </NavLink>
                          ) : null}
                        </div>
                      </div>
                    ) : col.key === "doctorName" ? (
                      <div className="flex items-center gap-2 md:flex-row flex-col">
                        <img
                          src={row.image || "/assets/user.png"}
                          alt={row.doctorName}
                          className="w-9 h-9 rounded-full object-cover border border-[#285772]"
                        />
                        <div className="flex flex-col">
                          <span className="font-semibold">
                            {row.doctorName}
                          </span>
                        </div>
                      </div>
                    ) : col.key === "patientName" ? (
                      <div className="flex items-center gap-2 md:flex-row flex-col">
                        <img
                          src={row.image || "/assets/user.png"}
                          alt={row.patientName}
                          className="w-9 h-9 rounded-full object-cover border border-[#285772]"
                        />
                        <div className="flex flex-col">
                          <span className="font-semibold">
                            {row.patientName}
                          </span>
                        </div>
                      </div>
                    ) : col.key === "pName" ? (
                      <div className="flex items-center gap-2 md:flex-row flex-col">
                        <CheckBox />
                        <img
                          src={row.image || "/assets/user.png"}
                          alt={row.name}
                          className="w-9 h-9 object-cover"
                        />
                        <div className="flex flex-col">
                          <span>{row.pName}</span>
                        </div>
                      </div>
                    ) : col.key === "stock" ? (
                      // Styling for if stock=0
                      row[col.key] === "0" ? (
                        <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#FDECEC] text-[#7A0202] text-xs font-medium w-fit">
                          <span className="w-2 h-2 bg-red-600 rounded-full text-[#B71212]"></span>
                          {row[col.key]}
                        </span>
                      ) : (
                        <span>{row[col.key]}</span>
                      )
                    ) : col.key === "totalPrice" ? (
                      // Styling for if stock=0
                      row[col.key] === "free trial" ? (
                        <span className=" text-[#94D3DD]  capitalize ">
                          {row[col.key]}
                        </span>
                      ) : (
                        <span>{row[col.key]}</span>
                      )
                    ) : col.key === "subscriptionPlan" ? (
                      // Styling for if stock=0
                      row[col.key] === "silver" ? (
                        <span className="flex items-center gap-1 px-2 py-1 rounded-full capitalize text-[#56BC27] text-xs font-medium w-fit">
                          <span className="w-2 h-2 bg-[#56BC27] rounded-full text-[#56BC27]"></span>
                          {row[col.key]}
                        </span>
                      ) : row[col.key] === "gold" ? (
                        <span className="flex items-center gap-1 px-2 py-1 rounded-full capitalize text-[#001D58] text-xs font-medium w-fit">
                          <span className="w-2 h-2 bg-[#001D58] rounded-full text-[#001D58]"></span>
                          {row[col.key]}
                        </span>
                      ) : row[col.key] === "platinum" ? (
                        <span className="flex items-center gap-1 px-2 py-1 rounded-full capitalize text-[#94D3DD] text-xs font-medium w-fit">
                          <span className="w-2 h-2 bg-[#94D3DD] rounded-full text-[#94D3DD]"></span>
                          {row[col.key]}
                        </span>
                      ) : (
                        <span>{row[col.key]}</span>
                      )
                    ) : col.key === "status" ? (
                      <span
                        className={`px-3 py-2 rounded-full text-xs font-normal capitalize ${row[col.key] === "active"
                          ? "bg-[#006A670D] text-[#006A67] rounded-none  "
                          : row[col.key] === "pending"
                            ? "bg-[#FF57570D] text-[#FF5757]"
                            : row[col.key] === "completed"
                              ? "bg-[#4ECC530D] text-[#4ECC53]"
                              : row[col.key] === "accepted"
                                ? "bg-[#4ECC530D] text-[#4ECC53]"
                                : row[col.key] === "in progress"
                                  ? "bg-[#EF6A1F1A] text-[#EF6A1F]"
                                  : row[col.key] === "deactivated"
                                    ? "bg-[#FFE30D1A] text-[#D4BE16] rounded-none"
                                    : "bg-[#FF57570D] text-[#FF5757]"
                          }`}
                      >
                        {row[col.key]}
                      </span>
                    ) : col.key === "id" ? (
                      <span className="px-3 py-2 rounded-full text-xs font-semibold capitalize">
                        {row[col.key]}
                      </span>
                    ) : /** substatus */
                      col.key === "subStatus" ? (
                        <span className="px-3 py-2 rounded-md text-xs font-semibold capitalize text-[#FF1D1D] border-2 border-[#F44336]">
                          {row[col.key]}
                        </span>
                      ) : col.key === "action" ? (
                        onActionClick ? (
                          <button
                            onClick={() => onActionClick(row)}
                            className="text-secondaryBrand flex gap-1 items-center"
                          >
                            {row[col.key]}
                            <ArrowUpRightIcon className="w-4 h-4 text-secondaryBrand" />
                          </button>
                        ) : actionHrefKey && row[actionHrefKey] ? (
                          <NavLink
                            to={row[actionHrefKey]}
                            className="text-secondaryBrand flex gap-1 items-center"
                          >
                            {row[col.key]}
                            <ArrowUpRightIcon className="w-4 h-4 text-secondaryBrand" />
                          </NavLink>
                        ) : (
                          row[col.key] || "-"
                        )
                      ) : (
                        row[col.key] || "-"
                      )}
                  </td>
                ))}
                {/* {actionButton && (
                  <td className="px-4 py-2 text-right">
                    <button onClick={() => setOpen((prev) => !prev)}>
                      <OptionsDots />
                    </button>
                  </td>
                )} */}
                {actionButton && (
                  <td className="px-4 py-2 text-right relative">
                    <button
                      onClick={() => setOpen((prev) => (prev === idx ? null : idx))}
                      className="p-2"
                    >
                      <OptionsDots />
                    </button>

                    {open === idx && DropdownComponent && (
                      <DropdownComponent
                        row={row}
                        onClose={() => setOpen(null)}
                        onEdit={onEdit}
                      />
                    )}


                    {/* {open === idx && (
                      <EditDeleteDropdownMenu
                        onEdit={() => {
                          console.log("Edit clicked for:", row);
                          setOpen(null);
                        }}
                        onDelete={() => {
                          console.log("Delete clicked for:", row);
                          setOpen(null);
                        }}
                      />
                    )} */}
                  </td>
                )}

              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalResults={totalResults}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
