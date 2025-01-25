import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-8 z-50 rounded-full mx-16 flex justify-between items-center px-8 py-4 bg-white shadow-md">
      <div className="flex items-center space-x-2">
        <NavLink to="/" className="text-2xl font-bold text-blue-900">
          Interdental <span className="text-blue-300">Lab</span>
        </NavLink>
      </div>
      <nav className="hidden md:flex space-x-6 text-lg">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-blue-100 text-blue-500 px-4 py-2 rounded-full"
              : "hover:text-blue-500 px-4 py-2 hover:bg-blue-100 rounded-full"
          }>
          Home
        </NavLink>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            isActive
              ? "bg-blue-100 text-blue-500 px-4 py-2 rounded-full"
              : "hover:text-blue-500 px-4 py-2 hover:bg-blue-100 rounded-full"
          }>
          Shop
        </NavLink>
        <NavLink
          to="/patient"
          className={({ isActive }) =>
            isActive
              ? "bg-blue-100 text-blue-500 px-4 py-2 rounded-full"
              : "hover:text-blue-500 px-4 py-2 hover:bg-blue-100 rounded-full"
          }>
          Patient
        </NavLink>
        <NavLink
          to="/doctor"
          className={({ isActive }) =>
            isActive
              ? "bg-blue-100 text-blue-500 px-4 py-2 rounded-full"
              : "hover:text-blue-500 px-4 py-2 hover:bg-blue-100 rounded-full"
          }>
          Doctor
        </NavLink>
        <NavLink
          to="/about-us"
          className={({ isActive }) =>
            isActive
              ? "bg-blue-100 text-blue-500 px-4 py-2 rounded-full"
              : "hover:text-blue-500 px-4 py-2 hover:bg-blue-100 rounded-full"
          }>
          About Us
        </NavLink>
        <NavLink
          to="/contact-us"
          className={({ isActive }) =>
            isActive
              ? "bg-blue-100 text-blue-500 px-4 py-2 rounded-full"
              : "hover:text-blue-500 px-4 py-2 hover:bg-blue-100 rounded-full"
          }>
          Contact Us
        </NavLink>
      </nav>
      <div className="space-x-4">
        <button className="hidden md:inline-block px-4 py-2 font-semibold border bg-gray-100 text-gray-500 rounded-full border-2 hover:bg-blue-100">
          Log In
        </button>
        <button className="px-4 py-2 bg-blue-900 text-white font-semibold rounded-full hover:bg-blue-600">
          Register Now
        </button>
      </div>
    </header>
  );
};

export default Header;
