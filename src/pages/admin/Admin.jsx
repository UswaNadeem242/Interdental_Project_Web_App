import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Orders from "./Orders";
import Users from "./Users";
import Products from "../../components/admin/Products";
import ListProduct from "./ListProduct";
import OrderDetails from "./OrderDetails";

const Admin = () => {
  return (
    <div className="flex justify-start items-start w-full h-[982px]">
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/users" element={<Users />} />
        <Route path="/products" element={<Products />} />
        <Route path="/list-product" element={<ListProduct />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
      </Routes>
    </div>
  );
};

export default Admin;
