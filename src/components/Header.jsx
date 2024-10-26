import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import vector from "../assets/Vector.png";
import search from "../assets/Search.png";

const Header = () => {
  const NavMenu = [
    {
      id: 1,
      title: "Home",
    },
    {
      id: 1,
      title: "Shop",
    },
    {
      id: 1,
      title: "Brands",
    },
    {
      id: 1,
      title: "Categories",
    },
    {
      id: 1,
      title: "About us",
    },
  ];
  return (
    <div className="flex flex-col justify-center items-center h-[110.77px] w-full bg-[#FFFFFF] rounded-[8px] gap-[8px] pt-[20px] shadow-[0_4px_8px_0_rgba(0,0,0,0.05)]">
      <div className="flex w-full h-[45.77px] px-[100px] gap-[94px]">
        <img src={logo} alt="logo" className="w-[200px] h-[45.77px]" />
        <div className="flex w-[665.83px] gap-[32px]">
          <div className="flex justify-center items-center w-[126px] h-[42px] gap-[8px] px-[16px] py-[8px] rounded-[50px] border-[1px] border-[#0000001A]">
            <h1>Categories</h1>
            <img src={vector} alt="vector" />
          </div>
          <div className="relative w-[531.83px]">
            <input
              type="text"
              name=""
              id=""
              placeholder="Search"
              className="w-[531.83px] h-[42px] border-[1px] border-[#0000001A] rounded-[53px] gap-[8px] px-[16px] py-[4px] placeholder:font-poppins placeholder:font-normal placeholder:text-14px"
            />
            <div className="absolute right-[8px] top-[20px] transform -translate-y-1/2 w-[34px] h-[34px] rounded-[22px] p-[8px] gap-[8px] bg-secondaryBrand">
              <img src={search} alt="search" className="w-[18px] h-[18px]" />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center w-[258.17px] h-[34px] gap-[20.39px]">
          <div className="flex gap-[20.39px]">
            <svg
              width="26"
              height="25"
              viewBox="0 0 26 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.1654 17.2964H11.5597C10.7765 17.2908 10.018 17.022 9.40607 16.5333C8.79415 16.0445 8.36441 15.3641 8.18594 14.6015L6.81452 9.02667C6.68834 8.50903 6.68187 7.96943 6.7956 7.44891C6.90933 6.92839 7.14027 6.44066 7.47084 6.02282C7.80142 5.60497 8.22292 5.26802 8.70331 5.03757C9.18369 4.80713 9.7103 4.68927 10.2431 4.69295H21.5574C22.0902 4.68927 22.6168 4.80713 23.0972 5.03757C23.5775 5.26802 23.999 5.60497 24.3296 6.02282C24.6602 6.44066 24.8911 6.92839 25.0049 7.44891C25.1186 7.96943 25.1121 8.50903 24.9859 9.02667L23.6145 14.6152C23.4293 15.3873 22.9869 16.0734 22.3601 16.5606C21.7333 17.0479 20.9593 17.3074 20.1654 17.2964ZM10.2019 6.40724C9.9309 6.40807 9.66356 6.47021 9.41995 6.58902C9.17633 6.70782 8.96275 6.88021 8.79521 7.09326C8.62766 7.30632 8.5105 7.55452 8.45249 7.81929C8.39448 8.08405 8.39712 8.3585 8.46023 8.6221L9.83166 14.2107C9.92454 14.6023 10.1472 14.951 10.4634 15.2C10.7797 15.449 11.1709 15.5837 11.5734 15.5821H20.1654C20.5679 15.5837 20.9591 15.449 21.2753 15.2C21.5915 14.951 21.8142 14.6023 21.9071 14.2107L23.2785 8.6221C23.343 8.35839 23.3467 8.08347 23.2892 7.81815C23.2317 7.55282 23.1147 7.30405 22.9469 7.09065C22.7791 6.87725 22.5649 6.70483 22.3206 6.58643C22.0763 6.46803 21.8083 6.40675 21.5368 6.40724H10.2019Z"
                fill="#434343"
              />
              <path
                d="M7.82186 10.4877C7.62603 10.4854 7.4369 10.4161 7.28595 10.2913C7.13499 10.1665 7.0313 9.99385 6.99215 9.80196L5.76472 4.47396C5.65138 3.9886 5.37666 3.55608 4.98553 3.24716C4.59439 2.93823 4.10999 2.7712 3.61158 2.77339H2.49386C2.26653 2.77339 2.04852 2.68309 1.88777 2.52234C1.72702 2.36159 1.63672 2.14358 1.63672 1.91625C1.63672 1.68892 1.72702 1.4709 1.88777 1.31016C2.04852 1.14941 2.26653 1.05911 2.49386 1.05911H3.61158C4.49738 1.05601 5.35806 1.35338 6.05303 1.90263C6.748 2.45188 7.23619 3.22056 7.43786 4.08311L8.65843 9.41111C8.68485 9.52055 8.68927 9.63414 8.67144 9.74531C8.65361 9.85647 8.61387 9.96299 8.55455 10.0587C8.49522 10.1544 8.41748 10.2373 8.32585 10.3027C8.23421 10.3681 8.13049 10.4147 8.02072 10.4397C7.95629 10.4626 7.88964 10.4787 7.82186 10.4877ZM11.6961 24.7162C11.1537 24.7162 10.6234 24.5554 10.1723 24.254C9.72124 23.9526 9.36968 23.5242 9.16208 23.023C8.95448 22.5218 8.90016 21.9703 9.00599 21.4383C9.11183 20.9062 9.37306 20.4175 9.75666 20.0339C10.1403 19.6503 10.629 19.3891 11.161 19.2832C11.6931 19.1774 12.2446 19.2317 12.7458 19.4393C13.247 19.6469 13.6754 19.9985 13.9767 20.4495C14.2781 20.9006 14.439 21.4309 14.439 21.9734C14.439 22.7008 14.15 23.3985 13.6356 23.9129C13.1213 24.4273 12.4236 24.7162 11.6961 24.7162ZM11.6961 20.9174C11.49 20.9174 11.2885 20.9785 11.1171 21.093C10.9457 21.2076 10.8121 21.3704 10.7332 21.5608C10.6543 21.7513 10.6337 21.9608 10.6739 22.163C10.7141 22.3652 10.8134 22.5509 10.9591 22.6967C11.1049 22.8424 11.2906 22.9417 11.4928 22.9819C11.695 23.0222 11.9046 23.0015 12.095 22.9226C12.2855 22.8437 12.4482 22.7101 12.5628 22.5387C12.6773 22.3673 12.7384 22.1658 12.7384 21.9597C12.7384 21.6832 12.6286 21.4181 12.4332 21.2227C12.2377 21.0272 11.9726 20.9174 11.6961 20.9174ZM21.1727 24.7162C20.6302 24.7162 20.0999 24.5554 19.6489 24.254C19.1978 23.9526 18.8463 23.5242 18.6386 23.023C18.431 22.5218 18.3767 21.9703 18.4826 21.4383C18.5884 20.9062 18.8496 20.4175 19.2332 20.0339C19.6168 19.6503 20.1056 19.3891 20.6376 19.2832C21.1697 19.1774 21.7212 19.2317 22.2224 19.4393C22.7236 19.6469 23.1519 19.9985 23.4533 20.4495C23.7547 20.9006 23.9156 21.4309 23.9156 21.9734C23.9156 22.7008 23.6266 23.3985 23.1122 23.9129C22.5978 24.4273 21.9002 24.7162 21.1727 24.7162ZM21.1727 20.9174C20.9669 20.9187 20.766 20.981 20.5955 21.0964C20.425 21.2117 20.2925 21.375 20.2147 21.5655C20.1368 21.7561 20.1172 21.9655 20.1582 22.1672C20.1991 22.3689 20.299 22.554 20.445 22.6991C20.591 22.8442 20.7768 22.9427 20.9787 22.9824C21.1807 23.0221 21.39 23.001 21.58 22.9219C21.7701 22.8429 21.9324 22.7093 22.0467 22.538C22.1609 22.3668 22.2219 22.1655 22.2219 21.9597C22.2219 21.8222 22.1947 21.6861 22.1419 21.5592C22.0891 21.4323 22.0117 21.3171 21.9142 21.2202C21.8167 21.1234 21.7009 21.0467 21.5737 20.9948C21.4464 20.9428 21.3102 20.9165 21.1727 20.9174Z"
                fill="#434343"
              />
              <path
                d="M21.1735 20.9174H9.74946C9.04201 20.9174 8.36354 20.6363 7.8633 20.1361C7.36306 19.6359 7.08203 18.9574 7.08203 18.2499C7.08203 17.5425 7.36306 16.864 7.8633 16.3638C8.36354 15.8636 9.04201 15.5825 9.74946 15.5825H11.5666C11.7939 15.5825 12.0119 15.6728 12.1727 15.8336C12.3334 15.9943 12.4237 16.2123 12.4237 16.4397C12.4237 16.667 12.3334 16.885 12.1727 17.0458C12.0119 17.2065 11.7939 17.2968 11.5666 17.2968H9.74946C9.49667 17.2968 9.25424 17.3972 9.07549 17.576C8.89674 17.7547 8.79632 17.9972 8.79632 18.2499C8.79632 18.5027 8.89674 18.7452 9.07549 18.9239C9.25424 19.1027 9.49667 19.2031 9.74946 19.2031H21.1735C21.4008 19.2031 21.6188 19.2934 21.7796 19.4541C21.9403 19.6149 22.0306 19.8329 22.0306 20.0602C22.0306 20.2876 21.9403 20.5056 21.7796 20.6663C21.6188 20.8271 21.4008 20.9174 21.1735 20.9174Z"
                fill="#434343"
              />
            </svg>
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.8407 21.6973C12.5007 21.8173 11.9407 21.8173 11.6007 21.6973C8.7007 20.7073 2.2207 16.5773 2.2207 9.5773C2.2207 6.4873 4.7107 3.9873 7.7807 3.9873C9.6007 3.9873 11.2107 4.8673 12.2207 6.2273C13.2307 4.8673 14.8507 3.9873 16.6607 3.9873C19.7307 3.9873 22.2207 6.4873 22.2207 9.5773C22.2207 16.5773 15.7407 20.7073 12.8407 21.6973Z"
                stroke="#292D32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.3595 10.5968V9.89217C19.3595 6.02344 16.3378 2.88721 12.6104 2.88721C8.88291 2.88721 5.86122 6.02344 5.86122 9.89217V10.5968C5.86122 11.4424 5.62007 12.269 5.16815 12.9726L4.06071 14.6967C3.04918 16.2716 3.8214 18.4121 5.58071 18.9101C10.1831 20.2129 15.0376 20.2129 19.64 18.9101C21.3993 18.4121 22.1715 16.2716 21.16 14.6967L20.0526 12.9726C19.6006 12.269 19.3595 11.4424 19.3595 10.5968Z"
                stroke="#434343"
                stroke-width="1.5"
              />
              <path
                d="M8.11035 19.8872C8.76538 21.635 10.5328 22.8872 12.6104 22.8872C14.6879 22.8872 16.4553 21.635 17.1104 19.8872"
                stroke="#434343"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <div className="flex justify-between items-center w-[125px]">
            <div className="flex justify-center items-center  w-[65px] h-[34px] rounded-[37px] gap-[8px] bg-secondaryBrand">
              <h1 className="flex justify-center items-center leading-[18px] font-poppins font-normal text-white text-[12px] w-full">
                Log in
              </h1>
            </div>
            <h1 className="flex justify-center items-center leading-[18px] font-poppins font-normal text-black text-[12px] w-[60px]">
              Sign Up
            </h1>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full h-[37px] p-[8px] gap-[64px] bg-[#FAFAFA]">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "font-poppins font-bold text-secondaryBrand leading-[21px]"
              : "font-poppins font-normal text-tertiaryBrand leading-[21px]"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            isActive
              ? "font-poppins font-bold text-secondaryBrand leading-[21px]"
              : "font-poppins font-normal text-tertiaryBrand leading-[21px]"
          }
        >
          Shop
        </NavLink>
        <NavLink
          to="/brands"
          className={({ isActive }) =>
            isActive
              ? "font-poppins font-bold text-secondaryBrand leading-[21px]"
              : "font-poppins font-normal text-tertiaryBrand leading-[21px]"
          }
        >
          Brands
        </NavLink>
        <NavLink
          to="/categories"
          className={({ isActive }) =>
            isActive
              ? "font-poppins font-bold text-secondaryBrand leading-[21px]"
              : "font-poppins font-normal text-tertiaryBrand leading-[21px]"
          }
        >
          Categories
        </NavLink>
        <NavLink
          to="/aboutus"
          className={({ isActive }) =>
            isActive
              ? "font-poppins font-bold text-secondaryBrand leading-[21px]"
              : "font-poppins font-normal text-tertiaryBrand leading-[21px]"
          }
        >
          About us
        </NavLink>
        {/* {NavMenu.map((item) => (
          <nav className="">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "font-poppins font-bold text-green-700 leading-[21px]"
                  : "font-poppins font-bold text-primary leading-[21px]"
              }
            >
              {item.title}
            </NavLink>
          </nav>
        ))} */}
      </div>
    </div>
  );
};

export default Header;
