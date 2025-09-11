import { useState } from "react";
import TextInput from "../../../Common/Input";
import PenIcon from "../../../icon/PenIcon";
import ChangePasswordModel from "../../../modals/ChangePasswordModel";
import ChevronRightIcon from "../../../icon/ChevronRight";
import LockIcon from "../../../icon/LockIcon";

const ProfileSettings = () => {
  const [isModalPassword, setIsModalPassword] = useState(false);
  return (
    <>
      <div className="grid md:grid-cols-12 grid-cols-1 gap-4 bg-white md:p-8 p-4 rounded-2xl items-center ">
        {/* Left side */}
        <div className="col-span-12 md:col-span-6 flex gap-4 items-center">
          <img
            src="/assets/user.png"
            className="md:w-20 md:h-20 w-12 h-12 object-contain"
          />
          <div>
            <h3 className="text-2xl font-bold font-poppins">Bransim hanry</h3>
            <p className="text-docText font-poppins text-sm">
              hanry463@gmail.com
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="col-span-12 md:col-span-6 flex md:justify-end justify-start">
          <div>
            <input
              type="file"
              id="fileUpload"
              className="hidden"
              onChange={(e) => console.log(e.target.files[0])} // handle file here
            />
            <label
              htmlFor="fileUpload"
              className="cursor-pointer bg-textField text-textColor1 text-sm py-5 px-6 rounded-full font-semibold font-poppins inline-block"
            >
              Upload new picture
            </label>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl md:p-8 p-4   mt-10">
        <div className="grid md:grid-cols-12 grid-cols-6 gap-4  items-center">
          <div className="md:col-span-6 col-span-3">
            <h3 className="text-primaryText text-lg font-poppins font-semibold  capitalize">
              Account info
            </h3>{" "}
          </div>
          <div className="md:col-span-6 col-span-3  md:flex  md:justify-end">
            <button className="bg-secondaryBrand text-white md:px-8 px-4  md:py-4 md:text-md text-sm py-2 rounded-full">
              Save Changes
            </button>
          </div>
        </div>
        <form className="grid md:grid-cols-12 grid-cols-6 gap-4 bg-white ">
          <div className="col-span-12  space-y-4">
            <TextInput
              id="username"
              name="username"
              label="First Name"
              placeholder="Bransim"
              icon={<PenIcon size={18} />}
            />
          </div>

          <div className="md:col-span-6 col-span-12">
            <TextInput
              id="email"
              name="email"
              label="Email"
              placeholder="hanry463@gmail.com"
              type="email"
              icon={<PenIcon size={18} />}
            />
          </div>
          <div className="md:col-span-6 col-span-12">
            <TextInput
              id="phone"
              name="phone"
              label="Phone Number"
              placeholder="+92 457 765 456"
              type="text"
              icon={<PenIcon size={18} />}
            />
          </div>
        </form>
        <button
          onClick={() => setIsModalPassword(true)}
          className="w-full flex items-center justify-between py-3 px-4 border-b border-borderPrimary text-left hover:border-borderPrimary transition mt-7"
        >
          <div className="flex items-center gap-3">
            <LockIcon size={18} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              Change password
            </span>
          </div>

          <ChevronRightIcon size={10} className="text-gray-400" />
        </button>

        {isModalPassword && (
          <ChangePasswordModel
            isModalPassword={isModalPassword}
            setIsModalPassword={setIsModalPassword}
          />
        )}
      </div>
    </>
  );
};

export default ProfileSettings;
