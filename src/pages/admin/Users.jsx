import React, { useEffect, useState } from "react";
// import userpic from "../../assets/users.png";
import axios from "axios";
import { BASE_URL } from "../../config";
import Toast from "../../components/Toast";

const Users = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabs = [
    { value: "all", title: "All" },
    { value: "active", title: "New Users" },
    { value: "INACTIVE", title: "Deactive Users" },
  ];
  const [searchQuery, setSearchQuery] = useState("");
  const [actionsModal, setActionsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const getAllUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/admin/users`, {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const closeToast = () => {
    setToastVisible(false);
  };

  // const handleDeactivateUser = async (id) => {
  //   try {
  //     const response = await axios.delete(
  //       `${BASE_URL}/api/admin/users/${id}/deactivate`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Accept: "*/*",
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     console.log(response);
  //     setToastMessage("User De-Activated successfully!");
  //     setToastType("success");
  //     setToastVisible(true);
  //     // alert("User De-Activated successfully");
  //     setActionsModal(false);
  //     getAllUsers();
  //   } catch (error) {
  //     console.log(error);
  //     setToastMessage(`Error: ${error}`);
  //     setToastType("success");
  //     setToastVisible(true);
  //   }
  // };

  const handleActivatedUser = async (id, status) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/admin/users/changeuserstatus`,
        {
          userId: id,
          status: status,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      setToastMessage("User Activated successfully!");
      setToastType("success");
      setToastVisible(true);
      // alert("User De-Activated successfully");
      setActionsModal(false);
      getAllUsers();
    } catch (error) {
      console.log(error);
      setToastMessage(`Error: ${error}`);
      setToastType("success");
      setToastVisible(true);
    }
  };

  console.log(tabs[selectedIndex]);
  const filteredUsers =
    selectedIndex === 0
      ? users
      : users.filter((user) => user.status === tabs[selectedIndex].value);

  return (
    <div className="flex flex-col justify-center items-start">
      {/* <AdminHeader title="Users" /> */}
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
                index === selectedIndex
                  ? "bg-[#F8F8F8] flex justify-center items-center w-auto h-[34px] rounded-[8px] py-[8px] px-[16px] gap-[10px]"
                  : "flex justify-center items-center cursor-pointer w-auto h-[34px] rounded-[8px] py-[8px] px-[16px] gap-[10px] border-[1px] border-[#0000000D]"
              }`}
            >
              <p
                className={`${
                  selectedIndex === index
                    ? "font-poppins font-normal text-[12px] leading-[18px] text-[#000000]"
                    : "font-poppins font-normal text-[12px] leading-[18px] text-[#949494]"
                }`}
              >
                {tab.title}
              </p>
            </div>
          ))}
          {/* {tabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`${
                index === selectedIndex &&
                "bg-[#F8F8F8] border-b-[1px] border-[#0000001A] "
              } flex justify-center items-center cursor-pointer w-auto h-[40px] rounded-[39px] py-[17px] px-[18px] gap-[8px] border-l-[1px] border-r-[1px] border-b-[1px] border-[#0000001A]`}
            >
              <p className="font-poppins font-bold text-[12px] leading-[18px] text-[#434343]">
                {tab.title}
              </p>
            </div>
          ))} */}
        </div>

        <div className="flex flex-col justify-start items-start w-[1108px] h-[724px] bg-white rounded-[20px]  space-y-[16px]">
          <div className="flex flex-col justify-start items-center w-full overflow-y-auto h-[780px] pt-0">
            {/* Table Headings */}
            <div className="flex justify-between items-center w-full h-[47px] py-[16px] px-[20px] border-b-[1px] border-[#0000000D]">
              <h1 className="w-[200px] font-poppins font-semibold text-[12px] leading-[15.12px] text-[#434343]">
                Name
              </h1>
              <h1 className="w-[200px] font-poppins font-semibold text-[12px] leading-[15.12px] text-[#434343]">
                Email Address
              </h1>
              <h1 className="w-[150px] font-poppins font-semibold text-[12px] leading-[15.12px] text-[#434343]">
                Member Since
              </h1>
              <h1 className="w-[150px] font-poppins font-semibold text-[12px] leading-[15.12px] text-[#434343]">
                Account Status
              </h1>
              <h1 className="w-[50px]"></h1>
            </div>

            {/* Users Listing */}
            {filteredUsers
              .filter((user) =>
                user.email.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((user, index) => (
                <div
                  key={user.id}
                  className="flex justify-between items-center w-full h-[64px] py-[16px] px-[20px] border-b-[1px] border-[#0000000D]"
                >
                  <div className="flex items-center gap-[16px] w-[200px]">
                    <h1 className="font-poppins font-semibold text-[14px] leading-[18px] text-[#434343]">
                      {user.firstName} {user.lastName}
                    </h1>
                  </div>

                  <h1 className="w-[200px] font-poppins font-normal text-[14px] leading-[18px] text-[#434343]">
                    {user.email}
                  </h1>

                  <h1 className="w-[150px] font-poppins font-normal text-[14px] leading-[18px] text-[#434343]">
                    {new Intl.DateTimeFormat("en-US", {
                      month: "long",
                      day: "2-digit",
                      year: "numeric",
                    }).format(new Date(user.createdAt))}
                  </h1>

                  <div className="inline-flex items-center w-[150px]">
                    <div
                      className={`py-[4px] px-[8px] rounded-[33px] ${
                        user.status === "active"
                          ? "bg-[#4ECC530D]"
                          : "bg-[#FF57570D]"
                      }`}
                    >
                      <h1
                        className={`font-poppins font-normal text-[10px] leading-[15px] ${
                          user.status === "active" || user.status === "ACTIVE"
                            ? "text-[#4ECC53]"
                            : "text-[#FF5757]"
                        }`}
                      >
                        {user.status}
                      </h1>
                    </div>
                  </div>

                  <div className="relative w-[50px] flex justify-center items-center">
                    <svg
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="cursor-pointer"
                      onClick={() => {
                        setActionsModal(!actionsModal);
                        setSelectedUser(index);
                      }}
                    >
                      <path
                        d="M10.5 10.8335C10.9603 10.8335 11.3334 10.4604 11.3334 10.0002C11.3334 9.53993 10.9603 9.16683 10.5 9.16683C10.0398 9.16683 9.66669 9.53993 9.66669 10.0002C9.66669 10.4604 10.0398 10.8335 10.5 10.8335Z"
                        stroke="#344054"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10.5 5.00016C10.9603 5.00016 11.3334 4.62707 11.3334 4.16683C11.3334 3.70659 10.9603 3.3335 10.5 3.3335C10.0398 3.3335 9.66669 3.70659 9.66669 4.16683C9.66669 4.62707 10.0398 5.00016 10.5 5.00016Z"
                        stroke="#344054"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10.5 16.6668C10.9603 16.6668 11.3334 16.2937 11.3334 15.8335C11.3334 15.3733 10.9603 15.0002 10.5 15.0002C10.0398 15.0002 9.66669 15.3733 9.66669 15.8335C9.66669 16.2937 10.0398 16.6668 10.5 16.6668Z"
                        stroke="#344054"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {actionsModal && (
                      <div
                        onClick={() => {
                          user.status === "active" || user.status === "ACTIVE"
                            ? handleActivatedUser(user.id, false)
                            : handleActivatedUser(user.id, true);
                        }}
                        className={`absolute top-0 right-10 flex justify-center items-center cursor-pointer w-[136px] h-[54px] rounded-[8px] py-[8px] px-[16px] gap-[8px] bg-white shadow-[0_0_10px_#00000017] ${
                          actionsModal && selectedUser === index
                            ? "block"
                            : "hidden"
                        }`}
                      >
                        <p className="font-poppins font-normal text-[12px] leading-[18px] text-[#434343]">
                          {user.status === "active" || user.status === "ACTIVE"
                            ? "Deactivate User"
                            : "Activate User"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Toast
        message={toastMessage}
        isVisible={toastVisible}
        onClose={closeToast}
        type={toastType}
      />
    </div>
  );
};

export default Users;
