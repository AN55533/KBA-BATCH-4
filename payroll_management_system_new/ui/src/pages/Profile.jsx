import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate
import Navbar from "../components/Navbar";

const Profile = () => {
  const { EMPID } = useParams();
  const navigate = useNavigate(); 
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await fetch(`/api/getemployee/${EMPID}`);
        if (!res.ok) {
          throw new Error("Failed to fetch employee details");
        }
        const data = await res.json();
        setEmployee(data);
      } catch (error) {
        console.error("Error fetching employee details:", error);
        setError("Failed to load profile.");
      }
    };

    fetchEmployee();
  }, [EMPID]);

  const handleDelete = async (EMPID) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this profile?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/deleteemployee/${EMPID}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete employee.");
      }

      alert("Employee deleted successfully.");
      navigate("/getemployee"); // Redirect after deletion
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Failed to delete employee.");
    }
  };

  if (error) {
    return <p className="text-center mt-6 text-red-500">{error}</p>;
  }

  if (!employee) {
    return <p className="text-center mt-6">Loading profile...</p>;
  }

  return (
    <>
      <Navbar />

      <div className="ml-64 p-8 mt-6">
        <div className="bg-white p-8 shadow-lg rounded-lg w-3/4 mx-auto">
          <div className="flex items-center space-x-6 mb-6">
            {/* Profile Image Placeholder */}
            <div className="w-24 h-24 bg-gray-300 flex items-center justify-center text-xl font-bold text-white rounded-full">
              {employee.Name.charAt(0)}
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {employee.Name}
              </h1>
              <p className="text-gray-600">{employee.Designation}</p>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Personal Information
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li className="flex justify-between py-2">
                <p>Employee ID:</p>
                <p className="font-bold">{employee.EMPID}</p>
              </li>
              <li className="flex justify-between py-2">
                <p>Email:</p>
                <p className="font-bold">{employee.Email}</p>
              </li>
              <li className="flex justify-between py-2">
                <p>Mobile No:</p>
                <p className="font-bold">{employee.MobileNo}</p>
              </li>
              <li className="flex justify-between py-2">
                <p>Designation:</p>
                <p className="font-bold">{employee.Designation}</p>
              </li>
              <li className="flex justify-between py-2">
                <p>Base Salary:</p>
                <p className="font-bold">${employee.baseSalary}</p>
              </li>
              <li className="flex justify-between py-2">
                <p>Date of Joining:</p>
                <p className="font-bold">
                  {new Date(employee.dateOfJoining).toLocaleDateString()}
                </p>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end mt-6 space-x-4">
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded"
              onClick={() => navigate(`/editemployee/${employee.EMPID}`)}
            >
              Edit Profile
            </button>

            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => handleDelete(employee.EMPID)}
            >
              Delete Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
