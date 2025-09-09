import { PatientDashboard } from "../../Constant";
import { TiltedArrowBlue } from "../../icon/TiltedArrowBlue";
import { SecondaryButton } from "../Button";
import { NavLink } from "react-router-dom";

export const PatientCard = ({
  title,
  name,
  email,
  linkName,
  icon,
  

}) => {
  return (
    <div className="p-4">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="font-poppins text-sm font-semibold text-gray-700">
          {title}
        </h2>
        <SecondaryButton title='View All' className='py-1 px-4 font-poppins font-light text-xs border border-brand bg-white text-brand  rounded-lg' href='/doctorAdmin/Patient' />
      </div>
      <div className="flex-1 overflow-y-auto mt-3 space-y-4">

        {PatientDashboard?.map((item) => {
          return (

            <div className="flex gap-4 p-3 rounded-md border border-black/5 mb-5 items-center">
              {/* Left section: user info */}
              <div className="flex gap-2 flex-1 items-center">
                <img
                  src="/assets/users.png"
                  alt="image"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col min-w-0">
                  <h2 className="font-poppins text-xs font-semibold text-gray-700 truncate">
                    {item?.name}
                  </h2>
                  <p className="font-poppins text-xs text-secondaryText truncate">
                    {item?.email}
                  </p>
                </div>
              </div>

              {/* Right section: link */}
              <NavLink
                to="#"
                className="text-[#278AE5] font-normal text-xs font-poppins flex items-center flex-shrink-0"
              >
                <span className="mr-1">{item?.linkName}</span>
                <TiltedArrowBlue />
              </NavLink>
            </div>

          );
        })}
      </div>

    </div>
  );
};
