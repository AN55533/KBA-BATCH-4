import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

const ViewEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchId, setSearchId] = useState(""); // Employee ID search field
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch("/api/getemployee");
        if (!res.ok) {
          throw new Error("Failed to fetch employees");
        }
        const data = await res.json();
        setEmployees(data);
        setFilteredEmployees(data); // Initialize filtered list with all employees
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  const handleSearch = () => {
    if (searchId.trim() === "") {
      setFilteredEmployees(employees); // Reset to full list
    } else {
      const filtered = employees.filter((emp) =>
        emp.EMPID.toString().includes(searchId)
      );
      setFilteredEmployees(filtered);
    }
  };

  const handleDelete = async (EMPID) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    try {
      const res = await fetch(`/api/deleteemployee/${EMPID}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete employee");
      }

      setEmployees((prevEmployees) =>
        prevEmployees.filter((emp) => emp.EMPID !== EMPID)
      );

      setFilteredEmployees((prevEmployees) =>
        prevEmployees.filter((emp) => emp.EMPID !== EMPID)
      );

      alert(`Employee ${EMPID} deleted successfully`);
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Error deleting employee. Please try again.");
    }
  };

  return (
    <>
      <Hero />
      <Navbar />
      <div className="ml-64 p-6 w-3/4 mt-6">
        <h2 className="text-3xl font-bold text-gray-800">Employee Details</h2>

        <div className="mb-5 flex items-center space-x-3">
          <input
            type="text"
            placeholder="Search by Employee ID"
            className="border p-2 rounded w-1/4"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <div className="bg-white p-8 mt-6 w-full shadow-md rounded-lg">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-3">ID No</th>
                <th className="border p-3">Name</th>
                <th className="border p-3">Email</th>
                <th className="border p-3">Mobile No</th>
                <th className="border p-3">Designation</th>
                <th className="border p-3">Salary</th>
                <th className="border p-3">Date of Joining</th>
                <th className="border p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr key={employee.EMPID} className="text-center">
                    <td className="border p-3">{employee.EMPID}</td>
                    <td className="border p-3">{employee.Name}</td>
                    <td className="border p-3">{employee.Email}</td>
                    <td className="border p-3">{employee.MobileNo}</td>
                    <td className="border p-3">{employee.Designation}</td>
                    <td className="border p-3">{employee.baseSalary}</td>
                    <td className="border p-3">
                      {new Date(employee.dateOfJoining).toLocaleDateString(
                        "en-GB"
                      )}
                    </td>
                    <td className="border p-3">
                      <button
                        className="bg-yellow-500 text-white px-3 py-1 mr-2 rounded"
                        onClick={() =>
                          navigate(`/editemployee/${employee.EMPID}`)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => handleDelete(employee.EMPID)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center p-4 text-gray-500">
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="mt-4 flex space-x-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => navigate(`/generatesalary`)}
            >
              Generate Salary
            </button>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewEmployee;
