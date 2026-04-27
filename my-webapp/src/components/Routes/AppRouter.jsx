import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import LoginPage from "../../pages/LoginPage";
import Layout from "../Layouts/Layout";
import Otp from "../../pages/Otp";
import ProtectedContext from "../Authentication/ProtectedContext";
import CardsItems from "../Cart/CardsItems";
import AdminLogin from "../../pages/AdminPages/AdminLogin";
import AdminRegister from "../../pages/AdminPages/AdminRegister";
import Contact from "../../pages/Contact";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/otp" element={<ProtectedContext><Otp /></ProtectedContext>} />
      <Route path="/cart" element={<ProtectedContext><CardsItems /></ProtectedContext>} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/register" element={<AdminRegister />} />
    </Routes>
  );
};

export default AppRouter;
