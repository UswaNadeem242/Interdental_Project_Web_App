import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const [isDasboardSelected, setIsDashboardSelected] = useState(true);
  const [isOrdersSelected, setIsOrdersSelected] = useState(false);
  const [isProductsSelected, setIsProductsSelected] = useState(false);
  const [isUsersSelected, setIsUsersSelected] = useState(false);
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="flex flex-col justify-start items-start rounded-[16px] space-y-[32px] w-[220px] h-[1105px] bg-[#FFFFFF]">
      <div className="flex flex-col justify-start items-start gap-[32px] space-y-[28px] w-[220px] h-[1105px] rounded-[16px] bg-[#FFFFFF]">
        <div className="w-[220px] h-[72px] py-[16px] px-[24px] gap-[12px]">
          <img
            src="/assets/logo.png"
            alt="logo"
            className="w-[200px] h-[45.77px]"
          />
        </div>
        <div className="flex flex-col justify-start items-start w-[220px] h-[845px] p-[24px] space-y-4">
          <NavLink
            to="/admin/dashboard"
            onClick={() => {
              setIsDashboardSelected(true);
              setIsOrdersSelected(false);
              setIsProductsSelected(false);
              setIsUsersSelected(false);
            }}
            className={({ isActive }) =>
              isActive
                ? "flex justify-start items-center font-poppins font-normal  w-[172px] text-white h-[44px] rounded-[8px]  bg-[#001D58] py-[16px] px-[12px] gap-[10px] text-[14px] leading-[21px]"
                : "flex justify-start items-center font-poppins font-normal  w-[172px]  h-[44px] py-[16px] px-[12px] gap-[10px] text-[#949494] text-[14px] leading-[21px]"
            }
          >
            {isDasboardSelected ? (
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.08325 5.91668C2.08325 4.07573 3.57564 2.58334 5.41659 2.58334C7.25753 2.58334 8.74992 4.07573 8.74992 5.91668C8.74992 7.75763 7.25753 9.25001 5.41659 9.25001C3.57564 9.25001 2.08325 7.75763 2.08325 5.91668Z"
                  stroke="white"
                  stroke-width="1.25"
                />
                <path
                  d="M11.25 15.0833C11.25 13.2424 12.7424 11.75 14.5833 11.75C16.4243 11.75 17.9167 13.2424 17.9167 15.0833C17.9167 16.9243 16.4243 18.4167 14.5833 18.4167C12.7424 18.4167 11.25 16.9243 11.25 15.0833Z"
                  stroke="white"
                  stroke-width="1.25"
                />
                <path
                  d="M17.9166 5.91668C17.9166 4.34533 17.9166 3.55965 17.4284 3.0715C16.9403 2.58334 16.1546 2.58334 14.5833 2.58334C13.0119 2.58334 12.2262 2.58334 11.7381 3.0715C11.2499 3.55965 11.2499 4.34533 11.2499 5.91668C11.2499 7.48803 11.2499 8.2737 11.7381 8.76185C12.2262 9.25001 13.0119 9.25001 14.5833 9.25001C16.1546 9.25001 16.9403 9.25001 17.4284 8.76185C17.9166 8.2737 17.9166 7.48803 17.9166 5.91668Z"
                  stroke="white"
                  stroke-width="1.25"
                />
                <path
                  d="M8.74992 15.0833C8.74992 13.512 8.74992 12.7263 8.26176 12.2382C7.77361 11.75 6.98793 11.75 5.41659 11.75C3.84524 11.75 3.05956 11.75 2.57141 12.2382C2.08325 12.7263 2.08325 13.512 2.08325 15.0833C2.08325 16.6547 2.08325 17.4404 2.57141 17.9285C3.05956 18.4167 3.84524 18.4167 5.41659 18.4167C6.98793 18.4167 7.77361 18.4167 8.26176 17.9285C8.74992 17.4404 8.74992 16.6547 8.74992 15.0833Z"
                  stroke="white"
                  stroke-width="1.25"
                />
              </svg>
            ) : (
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.08331 5.91671C2.08331 4.07576 3.5757 2.58337 5.41665 2.58337C7.2576 2.58337 8.74998 4.07576 8.74998 5.91671C8.74998 7.75766 7.2576 9.25004 5.41665 9.25004C3.5757 9.25004 2.08331 7.75766 2.08331 5.91671Z"
                  stroke="#949494"
                  stroke-width="1.25"
                />
                <path
                  d="M11.25 15.0833C11.25 13.2424 12.7424 11.75 14.5833 11.75C16.4243 11.75 17.9167 13.2424 17.9167 15.0833C17.9167 16.9243 16.4243 18.4167 14.5833 18.4167C12.7424 18.4167 11.25 16.9243 11.25 15.0833Z"
                  stroke="#949494"
                  stroke-width="1.25"
                />
                <path
                  d="M17.9166 5.91671C17.9166 4.34536 17.9166 3.55968 17.4285 3.07153C16.9403 2.58337 16.1547 2.58337 14.5833 2.58337C13.012 2.58337 12.2263 2.58337 11.7381 3.07153C11.25 3.55968 11.25 4.34536 11.25 5.91671C11.25 7.48806 11.25 8.27373 11.7381 8.76189C12.2263 9.25004 13.012 9.25004 14.5833 9.25004C16.1547 9.25004 16.9403 9.25004 17.4285 8.76189C17.9166 8.27373 17.9166 7.48806 17.9166 5.91671Z"
                  stroke="#949494"
                  stroke-width="1.25"
                />
                <path
                  d="M8.74998 15.0834C8.74998 13.512 8.74998 12.7264 8.26182 12.2382C7.77367 11.75 6.98799 11.75 5.41665 11.75C3.8453 11.75 3.05962 11.75 2.57147 12.2382C2.08331 12.7264 2.08331 13.512 2.08331 15.0834C2.08331 16.6547 2.08331 17.4404 2.57147 17.9286C3.05962 18.4167 3.8453 18.4167 5.41665 18.4167C6.98799 18.4167 7.77367 18.4167 8.26182 17.9286C8.74998 17.4404 8.74998 16.6547 8.74998 15.0834Z"
                  stroke="#949494"
                  stroke-width="1.25"
                />
              </svg>
            )}
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/orders"
            onClick={() => {
              setIsOrdersSelected(true);
              setIsDashboardSelected(false);
              setIsProductsSelected(false);
              setIsUsersSelected(false);
            }}
            className={({ isActive }) =>
              isActive
                ? "flex justify-start items-center font-poppins font-normal w-[172px] text-white h-[44px] bg-[#001D58] rounded-[8px]  py-[16px] px-[12px] gap-[10px] text-[14px] leading-[21px]"
                : "flex justify-start items-center font-poppins font-normal  w-[172px]  h-[44px] py-[16px] px-[12px] gap-[10px] text-[#949494] text-[14px] leading-[21px]"
            }
          >
            {isOrdersSelected ? (
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.64166 6.69995L9.99998 10.9583L17.3083 6.72492"
                  stroke="white"
                  stroke-width="1.28571"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.0001 18.5083V10.95"
                  stroke="white"
                  stroke-width="1.28571"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.27495 2.56663L3.82496 5.04165C2.81662 5.59999 1.99164 6.99997 1.99164 8.14997V12.8583C1.99164 14.0083 2.81662 15.4083 3.82496 15.9666L8.27495 18.4417C9.22495 18.9667 10.7833 18.9667 11.7333 18.4417L16.1833 15.9666C17.1916 15.4083 18.0166 14.0083 18.0166 12.8583V8.14997C18.0166 6.99997 17.1916 5.59999 16.1833 5.04165L11.7333 2.56663C10.7749 2.03329 9.22495 2.03329 8.27495 2.56663Z"
                  stroke="#949494"
                  stroke-width="1.28571"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.1667 11.5333V8.48333L6.25836 3.91663"
                  stroke="#949494"
                  stroke-width="1.28571"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.6416 6.20001L9.99992 10.4583L17.3082 6.22499"
                  stroke="#949494"
                  stroke-width="1.28571"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 18.0083V10.45"
                  stroke="#949494"
                  stroke-width="1.28571"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.27501 2.06669L3.82502 4.54171C2.81668 5.10005 1.9917 6.50003 1.9917 7.65003V12.3584C1.9917 13.5084 2.81668 14.9084 3.82502 15.4667L8.27501 17.9417C9.22501 18.4667 10.7833 18.4667 11.7333 17.9417L16.1834 15.4667C17.1917 14.9084 18.0167 13.5084 18.0167 12.3584V7.65003C18.0167 6.50003 17.1917 5.10005 16.1834 4.54171L11.7333 2.06669C10.775 1.53335 9.22501 1.53335 8.27501 2.06669Z"
                  stroke="#949494"
                  stroke-width="1.28571"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.1666 11.0333V7.98333L6.2583 3.41663"
                  stroke="#949494"
                  stroke-width="1.28571"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            )}
            Orders
          </NavLink>
          <NavLink
            to="/admin/products"
            onClick={() => {
              setIsProductsSelected(true);
              setIsDashboardSelected(false);
              setIsOrdersSelected(false);
              setIsUsersSelected(false);
            }}
            className={({ isActive }) =>
              isActive
                ? "flex justify-start items-center font-poppins font-normal w-[172px] text-white h-[44px] bg-[#001D58] rounded-[8px] py-[16px] px-[12px] gap-[10px] text-[14px] leading-[21px]"
                : "flex justify-start items-center font-poppins font-normal w-[172px] h-[44px] py-[16px] px-[12px] gap-[10px] text-[#949494] text-[14px] leading-[21px]"
            }
          >
            {isProductsSelected ? (
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.66675 3L1.88751 3.07359C2.98754 3.44026 3.53756 3.6236 3.85215 4.06008C4.16675 4.49656 4.16675 5.07633 4.16675 6.23586V8.41667C4.16675 10.7737 4.16675 11.9522 4.89898 12.6844C5.63121 13.4167 6.80973 13.4167 9.16675 13.4167H15.8334"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M6.25 15.5C6.94036 15.5 7.5 16.0596 7.5 16.75C7.5 17.4404 6.94036 18 6.25 18C5.55964 18 5 17.4404 5 16.75C5 16.0596 5.55964 15.5 6.25 15.5Z"
                  stroke="white"
                  stroke-width="1.5"
                />
                <path
                  d="M13.75 15.5001C14.4404 15.5001 15 16.0597 15 16.7501C15 17.4404 14.4404 18.0001 13.75 18.0001C13.0596 18.0001 12.5 17.4404 12.5 16.7501C12.5 16.0597 13.0596 15.5001 13.75 15.5001Z"
                  stroke="#949494"
                  stroke-width="1.5"
                />
                <path
                  d="M4.16675 5.5H13.7087C15.4212 5.5 16.2775 5.5 16.648 6.06189C17.0185 6.62377 16.6812 7.41078 16.0066 8.9848L15.6495 9.81813C15.3345 10.553 15.177 10.9204 14.864 11.1269C14.5509 11.3333 14.1511 11.3333 13.3516 11.3333H4.16675"
                  stroke="#949494"
                  stroke-width="1.5"
                />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.66675 2.5L1.88751 2.57359C2.98754 2.94026 3.53756 3.1236 3.85215 3.56008C4.16675 3.99656 4.16675 4.57633 4.16675 5.73586V7.91667C4.16675 10.2737 4.16675 11.4522 4.89898 12.1844C5.63121 12.9167 6.80973 12.9167 9.16675 12.9167H15.8334"
                  stroke="#949494"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M6.25 15C6.94036 15 7.5 15.5596 7.5 16.25C7.5 16.9404 6.94036 17.5 6.25 17.5C5.55964 17.5 5 16.9404 5 16.25C5 15.5596 5.55964 15 6.25 15Z"
                  stroke="#949494"
                  stroke-width="1.5"
                />
                <path
                  d="M13.75 15.0001C14.4404 15.0001 15 15.5597 15 16.2501C15 16.9404 14.4404 17.5001 13.75 17.5001C13.0596 17.5001 12.5 16.9404 12.5 16.2501C12.5 15.5597 13.0596 15.0001 13.75 15.0001Z"
                  stroke="#949494"
                  stroke-width="1.5"
                />
                <path
                  d="M4.16675 5H13.7087C15.4212 5 16.2775 5 16.648 5.56189C17.0185 6.12377 16.6812 6.91078 16.0066 8.4848L15.6495 9.31813C15.3345 10.053 15.177 10.4204 14.864 10.6269C14.5509 10.8333 14.1511 10.8333 13.3516 10.8333H4.16675"
                  stroke="#949494"
                  stroke-width="1.5"
                />
              </svg>
            )}
            Products
          </NavLink>
          <NavLink
            to="/admin/users"
            onClick={() => {
              setIsUsersSelected(true);
              setIsOrdersSelected(false);
              setIsProductsSelected(false);
              setIsDashboardSelected(false);
            }}
            className={({ isActive }) =>
              isActive
                ? "flex justify-start items-center font-poppins font-normal w-[172px] text-white h-[44px] bg-[#001D58] rounded-[8px] py-[16px] px-[12px] gap-[10px] text-[14px] leading-[21px]"
                : "flex justify-start items-center font-poppins font-normal w-[172px] h-[44px] py-[16px] px-[12px] gap-[10px] text-[#949494] text-[14px] leading-[21px]"
            }
          >
            {isUsersSelected ? (
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="10.0001"
                  cy="5.49984"
                  r="3.33333"
                  stroke="white"
                  stroke-width="1.5"
                />
                <path
                  d="M15 8.00016C16.3807 8.00016 17.5 7.06742 17.5 5.91683C17.5 4.76624 16.3807 3.8335 15 3.8335"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M5 8.00016C3.61929 8.00016 2.5 7.06742 2.5 5.91683C2.5 4.76624 3.61929 3.8335 5 3.8335"
                  stroke="#949494"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <ellipse
                  cx="10"
                  cy="14.6668"
                  rx="5"
                  ry="3.33333"
                  stroke="#949494"
                  stroke-width="1.5"
                />
                <path
                  d="M16.6667 16.3332C18.1286 16.0126 19.1667 15.2007 19.1667 14.2498C19.1667 13.2989 18.1286 12.4871 16.6667 12.1665"
                  stroke="#949494"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M3.33325 16.3332C1.87138 16.0126 0.833252 15.2007 0.833252 14.2498C0.833252 13.2989 1.87138 12.4871 3.33325 12.1665"
                  stroke="#949494"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="10.0001"
                  cy="5"
                  r="3.33333"
                  stroke="#949494"
                  stroke-width="1.5"
                />
                <path
                  d="M15 7.5C16.3807 7.5 17.5 6.56726 17.5 5.41666C17.5 4.26607 16.3807 3.33333 15 3.33333"
                  stroke="#949494"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M5 7.5C3.61929 7.5 2.5 6.56726 2.5 5.41666C2.5 4.26607 3.61929 3.33333 5 3.33333"
                  stroke="#949494"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <ellipse
                  cx="10"
                  cy="14.1667"
                  rx="5"
                  ry="3.33333"
                  stroke="#949494"
                  stroke-width="1.5"
                />
                <path
                  d="M16.6667 15.8333C18.1286 15.5128 19.1667 14.7009 19.1667 13.75C19.1667 12.7991 18.1286 11.9873 16.6667 11.6667"
                  stroke="#949494"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M3.33325 15.8333C1.87138 15.5128 0.833252 14.7009 0.833252 13.75C0.833252 12.7991 1.87138 11.9873 3.33325 11.6667"
                  stroke="#949494"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            )}
            Users
          </NavLink>



          
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
