import { useState } from "react";
import logo from "../../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const [formdata, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formdata.name.trim() || !formdata.email.trim() || !formdata.password.trim()) {
      alert("Please fill all fields");
      return;
    }

    localStorage.setItem("Register", JSON.stringify(formdata));
    alert("Registered Successfully");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <img src={logo} className="w-52 mb-6" alt="logo" />

      <div className="bg-white shadow-lg rounded-xl p-8 w-96 text-center">
        <h2 className="text-gray-700 font-bold text-2xl mb-2">Admin Register</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formdata.name}
            onChange={handleChange}
            placeholder="Enter Name"
            required
            className="border w-full p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#8E1C9D] transition"
          />

          <input
            type="email"
            name="email"
            value={formdata.email}
            onChange={handleChange}
            placeholder="Enter Admin Email"
            required
            className="border w-full p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#8E1C9D] transition"
          />

          <input
            type="password"
            name="password"
            value={formdata.password}
            onChange={handleChange}
            placeholder="Create a Password"
            required
            className="border w-full p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#8E1C9D] transition"
          />

          <button
            type="submit"
            className="bg-[#8E1C9D] hover:bg-[#7a1787] text-white w-full p-3 rounded-lg font-semibold transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
