import React, { useState } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import userpic from "../../assets/users.png";

const Users = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabs = ["All", "New Users", "Deactive"];
  const users = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      name: "Gloria",
      since: "11/22/2026",
      email: "gloria@me.com",
      status: "active",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      name: "Gloria",
      since: "11/22/2026",
      email: "gloria@me.com",
      status: "deactive",
    },
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      name: "Gloria",
      since: "11/22/2026",
      email: "gloria@me.com",
      status: "active",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      name: "Gloria",
      since: "11/22/2026",
      email: "gloria@me.com",
      status: "deactive",
    },
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      name: "Gloria",
      since: "11/22/2026",
      email: "gloria@me.com",
      status: "active",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      name: "Gloria",
      since: "11/22/2026",
      email: "gloria@me.com",
      status: "deactive",
    },
  ];
  return (
    <div className="flex flex-col justify-center items-start">
      <AdminHeader title="Users" />
      <div className="flex flex-col justify-start items-start mt-6 w-full h-[887px] rounded-[20px] p-[24px] gap-[20px] bg-[#FFFFFF]">
        <div className="flex justify-between items-center w-full h-[49px] bg-[#F8F8F8] rounded-[8px] py-[8px] pl-[16px] pr-[8px] gap-[8px]">
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.5 21.5C16.7467 21.5 21 17.2467 21 12C21 6.75329 16.7467 2.5 11.5 2.5C6.25329 2.5 2 6.75329 2 12C2 17.2467 6.25329 21.5 11.5 21.5Z"
              stroke="#434343"
              stroke-width="1.5"
            />
            <path
              d="M18.5 19L22 22.5"
              stroke="#434343"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Search here..."
            className="w-[918px] h-[18px] py-4 bg-[#F8F8F8] outline-none"
          />
          <div className="flex w-[77px] h-[33px] bg-[#FFFFFF] rounded-[8px] py-[6px] px-[8px] gap-[8px]">
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 10.5H15M2.5 5.5H17.5M7.5 15.5H12.5"
                stroke="#344054"
                stroke-width="1.67"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="font-poppins font-normal text-[14px] leading-[21px] text-[#344054]">
              Filter
            </p>
          </div>
        </div>
        <div className="w-[529px] h-[40px] gap-[8px] flex justify-start items-center">
          {tabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`${
                index === selectedIndex &&
                "bg-[#F8F8F8] border-b-[1px] border-[#0000001A] "
              } flex justify-center items-center w-auto h-[40px] rounded-[39px] py-[17px] px-[18px] gap-[8px] border-l-[1px] border-r-[1px] border-b-[1px] border-[#0000001A]`}
            >
              <p className="font-poppins font-bold text-[12px] leading-[18px] text-[#434343]">
                {tab}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-start items-start w-[1108px] h-[724px] bg-white rounded-[20px]  space-y-[16px]">
          <div className="flex flex-col justify-start items-center w-full overflow-y-auto h-[780px] pt-4">
            {/* Table Headings */}
            <div className=" flex justify-start items-center w-full mt-2 h-[47px] py-[16px] px-[20px] gap-[97px]">
              <h1 className="w-[116.84px] h-[88px] font-poppins font-semibold text-[12px] leading-[15.12px] text-[#434343]">
                Name
              </h1>
              <h1 className="w-[116.84px] h-[88px] font-poppins font-semibold text-[12px] leading-[15.12px] text-[#434343]">
                Email Address
              </h1>
              <h1 className="w-[116.84px] h-[88px] font-poppins font-semibold text-[12px] leading-[15.12px] text-[#434343]">
                Member Since
              </h1>
              <h1 className="w-[116.84px] h-[88px] font-poppins font-semibold text-[12px] leading-[15.12px] text-[#434343]">
                Account Status
              </h1>
              <h1 className="w-[116.84px] h-[88px] font-poppins font-semibold text-[12px] leading-[15.12px] text-[#434343]"></h1>
            </div>
            {/* Orders Listing */}
            {users.map((user) => (
              <div className="w-full h-[50px] border-b-[1px] border-[#0000000D] mb-[16px] py-[16px] px-[20px] gap-[97px] flex justify-start items-center">
                <div className="w-[116.84px] h-[32px] gap-[16px] flex justify-start items-center">
                  {/* <img
                    src={userpic}
                    alt="img"
                    className="w-[32px] h-[32px] rounded-full"
                  /> */}
                  <h1 className="w-[116.84px] h-[88px] font-poppins font-semibold text-[14px] leading-[17.64px] text-[#434343]">
                    {user.name}
                  </h1>
                </div>
                <h1 className="w-[116.84px] h-[88px] font-poppins font-normal text-[14px] leading-[17.64px] text-[#434343]">
                  {user.email}
                </h1>
                <h1 className="w-[116.84px] h-[88px] font-poppins font-normal text-[14px] leading-[17.64px] text-[#434343]">
                  {user.since}
                </h1>
                <div className="w-[116.84px] h-[88px] font-poppins font-semibold text-[12px] leading-[18px] text-[#949494]">
                  <div
                    className={`w-[57px] h-[23px] py-[4px] px-[8px] gap-[8px]  rounded-[33px] ${
                      user.status === "active"
                        ? "bg-[#4ECC530D]"
                        : "bg-[#FF57570D]"
                    }`}
                  >
                    <h1
                      className={`font-poppins font-normal text-[10px] leading-[15px] ${
                        user.status === "active"
                          ? "text-[#4ECC53]"
                          : "text-[#FF5757]"
                      }`}
                    >
                      {user.status}
                    </h1>
                  </div>
                </div>
                <span className="pb-20 w-[85px] h-[20px] gap-[10px]">
                  <svg
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.5 10.8335C10.9603 10.8335 11.3334 10.4604 11.3334 10.0002C11.3334 9.53993 10.9603 9.16683 10.5 9.16683C10.0398 9.16683 9.66669 9.53993 9.66669 10.0002C9.66669 10.4604 10.0398 10.8335 10.5 10.8335Z"
                      stroke="#344054"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10.5 5.00016C10.9603 5.00016 11.3334 4.62707 11.3334 4.16683C11.3334 3.70659 10.9603 3.3335 10.5 3.3335C10.0398 3.3335 9.66669 3.70659 9.66669 4.16683C9.66669 4.62707 10.0398 5.00016 10.5 5.00016Z"
                      stroke="#344054"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10.5 16.6668C10.9603 16.6668 11.3334 16.2937 11.3334 15.8335C11.3334 15.3733 10.9603 15.0002 10.5 15.0002C10.0398 15.0002 9.66669 15.3733 9.66669 15.8335C9.66669 16.2937 10.0398 16.6668 10.5 16.6668Z"
                      stroke="#344054"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
