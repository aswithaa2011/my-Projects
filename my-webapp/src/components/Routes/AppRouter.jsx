import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import LoginPage from "../../pages/LoginPage";
import Layout from "../Layouts/Layout";
import Otp from "../../pages/Otp";
import ProtectedContext from "../Authentication/ProtectedContext";
import CardsItems from "../Cart/CardsItems";
import AdminLogin from "../../pages/AdminPages/AdminLogin";
import Contact from "../../pages/Contact";
import AdminDashboard from "../../pages/AdminPages/AdminDashboard";
import Wishlist from "../../pages/Wishlist";
import Offers from "../../pages/Offers";
import About from "../../pages/About";
import ProductDetails from "../../pages/ProductDetails";
import AdminRegister from "../../pages/AdminPages/AdminRegister";
import MyOrders from "../../pages/MyOrders";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<ProtectedContext><CardsItems /></ProtectedContext>} />
        <Route path="/wishlist" element={<ProtectedContext><Wishlist /></ProtectedContext>} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:name" element={<ProductDetails />} />
        <Route path="/my-orders" element={<ProtectedContext><MyOrders /></ProtectedContext>} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/otp" element={<ProtectedContext><Otp /></ProtectedContext>} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/register" element={<AdminRegister />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
};

export default AppRouter;
