import React from "react";
import { Link } from "react-router-dom";
import Instgram from "../icon/instgram";
import Birbble from "../icon/birbble";
import Twitter from "../icon/twitter";
import Youtube from "../icon/youtube";
import { socialIcons } from "../Constant";

const Footer = () => {
  const year = new Date().getFullYear();
  const socialIcons = [
    { id: 1, icon: <Instgram className="w-5 h-5 text-white" /> },
    { id: 2, icon: <Birbble className="w-5 h-5 text-white" /> },
    { id: 3, icon: <Twitter className="w-5 h-5 text-white" /> },
    { id: 4, icon: <Youtube className="w-5 h-5 text-white" /> },
  ];
  return (
    <div className="w-full bg-secondaryBrand text-white px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {/* Column 1 - Branding */}
        <div className="space-y-4 text-left">
          <h1 className="font-poppins font-medium text-lg text-left">Lab</h1>
          <p className="text-sm text-[#D9DBE1]">Copyright @{year} Interdental</p>
          <p className="text-sm text-[#D9DBE1]">All rights reserved</p>
        </div>

        {/* Column 2 - Company */}
        <div className="space-y-4">
          <h1 className="font-poppins font-medium text-lg">Company</h1>
          <div className="flex flex-col space-y-2 text-sm text-[#D9DBE1]">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/patient">Patient</Link>
            <Link to="/doctor">Doctor</Link>
          </div>
        </div>

        {/* Column 3 - Links */}
        <div className="pt-6">
          <div className="flex flex-col pt-5 text-sm text-[#D9DBE1]">
            <Link to="/about-us">About Us</Link>
            <Link to="/contact-us">Contact Us</Link>
          </div>
        </div>


        {/* Column 4 - Social */}
        <div className="space-y-4">
          <h1 className="font-poppins font-medium text-lg">Follow Us</h1>
          <div className="flex gap-4">
            {socialIcons.map((item) => (
              <div
                key={item.id}
                className="bg-[#193368]  w-10 h-10 rounded-full  shadow-[0px_3.9398081302642822px_3.9398081302642822px_0px_rgba(0,0,0,0.25) flex items-center justify-center"
              >
                {item.icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>







  );
};

export default Footer;
