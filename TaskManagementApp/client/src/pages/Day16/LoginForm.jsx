import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {

  const [data, setData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(data);

    localStorage.setItem("user", JSON.stringify(data));

    navigate("/loginpage")
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">

        <div className="bg-white p-8 rounded-2xl shadow-lg w-80">

          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Create Account
          </h1>

          <input
            type="text"
            placeholder="Enter Name"
            name="username"
            value={data.username}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={data.password}
            onChange={handleChange}
            className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 hover:scale-105 transition"
          >
            Submit
          </button>

        </div>
      </div>
    </form>
  );
};

export default LoginForm;