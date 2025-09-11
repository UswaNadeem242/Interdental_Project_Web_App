import { useState } from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";
import Pagination from "../Pagination";

export default function TableComponent({
  headings,
  data,
  actions,
  actionHrefKey,
  onActionClick,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const totalResults = data.length;
  const totalPages = Math.ceil(totalResults / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const currentData = data.slice(startIndex, startIndex + pageSize);
  return (
    <div className="grid col-span-1 md:col-span-1 lg:col-span-12">
      <div className="overflow-x-auto  max-h-[400px] scrollbar-hidden ">
        <table className="min-w-[300px] md:min-w-full text-left text-xs md:text-sm ">
          <thead className="sticky top-0 bg-gray-100 z-10 ">
            <tr className="font-poppins font-medium text-xs text-secondaryText capitalize ">
              {headings.map((col, idx) => (
                <th
                  key={idx}
                  className="py-5  px-3 font-medium text-secondaryText whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>{" "}
          <tbody>
            {currentData.map((row, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-200  transition-all font-poppins  "
              >
                {headings.map((col, i) => (
                  <td
                    key={i}
                    className={`px-4 py-3 text-[#333333] text-xs   ${col.key === "name" ? "font-semibold" : "font-normal"
                      }`}
                  >
                    {/* Name column */}
                    {col.key === "name" ? (
                      <div className="flex items-center gap-2 md:flex-row  flex-col">
                        <img
                          src={row.image || "/assets/user.png"}
                          alt={row.name}
                          className="w-9 h-9 rounded-full object-cover"
                        />
                        <div className="flex flex-col">
                          <span>{row.name}</span>

                          {onActionClick ? (
                            <button
                              // onClick={() => onActionClick(row)}
                              className="text-secondaryBrand flex items-center gap-1 cursor-pointer text-xs font-normal font-poppins"
                            >
                              View profile
                              <ArrowUpRightIcon className="w-3 h-3 text-secondaryBrand" />
                            </button>
                          ) : actionHrefKey && row[actionHrefKey] ? (
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
                      onActionClick ? (
                        <button
                          onClick={() => onActionClick(row)}
                          className="text-secondaryBrand flex gap-1 items-center "
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
