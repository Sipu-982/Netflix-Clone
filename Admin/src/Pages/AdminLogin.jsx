import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Admin.css'
const AdminLogin = () => {
  const [admin, setAdmin] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin((form) => ({
      ...form,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/api/admin/admin-login", {
        email: admin.email,
        password: admin.password,
      });
      alert(response.data.message);
      const { token } = response.data;
      localStorage.setItem("authenticateUser", token);
      setTimeout(() => navigate('/Upload'), 2000);
    } catch (error) {
      alert(error.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl border-1 border-gray-400 p-8  lg:w-[450px] md:w-[450px] sm:w-[350px]">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Signin</h2>

        <div className="mb-4 input-field">
          <label className="block text-gray-600 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={admin.email}
            onChange={handleChange}
            placeholder="Enter admin email"
            className="w-full px-4 py-2 rounded-lg"
          />
        </div>

        <div className="mb-6 input-field">
          <label className="block text-gray-600 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={admin.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full px-4 py-2 rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-900 cursor-pointer text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Signin
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
