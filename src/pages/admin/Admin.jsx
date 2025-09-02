import React from "react";
import { json, NavLink, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Orders from "./Orders";
import Users from "./Users";
import Products from "../../components/admin/Products";
import ListProduct from "./ListProduct";
import OrderDetails from "./OrderDetails";
import ProductDetails from "./ProductDetails";
import UpdateProduct from "./UpdateProduct";
import DoctorOrder from "../doctorAdmin/OrderStep/RestorationDesignForm";

const Admin = () => {
  return (
    <div className="flex justify-start items-start w-full h-[982px]">
      {/*  */}
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/users" element={<Users />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/list-product" element={<ListProduct />} />
        <Route path="/update-product/:productId" element={<UpdateProduct />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        {/* <Route path="/doctorAdmin/doctor" element={<DoctorOrder />} /> */}
        <Route path="/doctor" element={<DoctorOrder />} />
      </Routes>
    </div>
  );
};

export default Admin;
