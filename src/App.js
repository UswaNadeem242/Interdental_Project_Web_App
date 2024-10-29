import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./layout/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Brands from "./pages/Brands";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Shop from "./pages/Shop";
import SingleProduct from "./pages/SingleProduct";
import Signup from "./pages/Signup";
import ForgetPassword from "./pages/ForgetPassword";
// const SingleProduct = React.lazy(() => import("./pages/SingleProduct"));

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
// ]);
const MainLayout = ({ children }) => (
  <div>
    <Header />
    <div>{children}</div>
    <Footer />
  </div>
);

const PlainLayout = ({ children }) => <div>{children}</div>;

function App() {
  return (
    <div>
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          <Route
            path="/shop"
            element={
              <MainLayout>
                <Shop />
              </MainLayout>
            }
          />
          <Route
            path="/brands"
            element={
              <MainLayout>
                <Brands />
              </MainLayout>
            }
          />
          <Route
            path="/categories"
            element={
              <MainLayout>
                <Categories />
              </MainLayout>
            }
          />
          <Route
            path="/aboutus"
            element={
              <MainLayout>
                <About />
              </MainLayout>
            }
          />
          <Route
            path="/product/:productId"
            element={
              <MainLayout>
                <SingleProduct />
              </MainLayout>
            }
          />
          <Route
            path="/login"
            element={
              <PlainLayout>
                <Login />
              </PlainLayout>
            }
          />
          <Route
            path="/signup"
            element={
              <PlainLayout>
                <Signup />
              </PlainLayout>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PlainLayout>
                <ForgetPassword />
              </PlainLayout>
            }
          />
        </Routes>
        {/* <Footer /> */}
      </Router>

      {/* <Layout>
        <RouterProvider router={router} />
      </Layout> */}
    </div>
  );
}

export default App;
