import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [empid, setEmpid] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ EMPID: empid, Password: password }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.msg || "Login failed");
      }

      const data = await response.json(); 
      localStorage.setItem("EMPID", data.EMPID); 

      navigate(`/userdashboard`); 
    } catch (err) {
      setError(err.message || "Invalid credentials: Please try again!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Employee ID</label>
            <input
              type="text"
              id="empid"
              name="empid"
              className="w-full p-2 border rounded mt-1"
              value={empid}
              onChange={(e) => setEmpid(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="Password"
              value={password}
              className="w-full p-2 border rounded mt-1"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
