import React from "react";
import { Link } from "react-router-dom";

const Usernavbar = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-blue-500 text-white w-64 h-screen shadow-md fixed p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-4">
          <Link to="/dashboard" className="hover:bg-blue-700 p-2 rounded">
            Dashboard
          </Link>
          <Link to="/addemployee" className="hover:bg-blue-700 p-2 rounded">
            Add Employee
          </Link>
          <Link to="/getemployee" className="hover:bg-blue-700 p-2 rounded">
            View Employee Details
          </Link>
          {/* <Link to="/viewleaves" className="hover:bg-blue-700 p-2 rounded">
            View Leave Requests
          </Link> */}
          <Link
            to="/leaveapplication"
            className="hover:bg-blue-700 p-2 rounded"
          >
            View Leave Requests
          </Link>
          <Link to="/profile" className="hover:bg-blue-700 p-2 rounded">
            My Profile
          </Link>
          <Link to="/salaryreports" className="hover:bg-blue-700 p-2 rounded">
            Salary Reports
          </Link>
          <Link
            to="/logout"
            className="hover:bg-red-700 bg-red-600 p-2 rounded"
          >
            Logout
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Usernavbar;
