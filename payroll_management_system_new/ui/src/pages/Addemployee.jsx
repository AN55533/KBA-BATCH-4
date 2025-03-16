import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
const AddEmployee = () => {
  const [name, setName] = useState("");
  const [empId, setEmpId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [address, setAddress] = useState("");
  const [designation, setDesignation] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const [baseSalary, setBaseSalary] = useState("");

  const navigate = useNavigate();

  const handleAddEmployee = async (e) => {
    e.preventDefault();

    const newEmployee = {
      Name: name,
      EMPID: empId,
      Email: email,
      Password: password,
      MobileNo: mobileNo,
      Address: address,
      Designation: designation,
      dateOfJoining: dateOfJoining,
      baseSalary: baseSalary,
    };

    try {
      const res = await fetch("/api/addemployee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmployee),
      });

      if (res.ok) {
        navigate("/getemployee");
      } else {
        const errorData = await res.json();
        console.error("Failed to add employee:", errorData);
      }
    } catch (error) {
      console.error("Error adding employee details", error);
    }
  };

  return (
    <>
      <Hero />
     

      <div className="p-6 mt-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Add Employee Details
        </h2>
        <form
          onSubmit={handleAddEmployee}
          className="bg-white p-8 mt-6 w-full shadow-md rounded-lg"
        >
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                type="text"
                className="mt-2 w-full p-3 border"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">ID No</label>
              <input
                type="text"
                className="mt-2 w-full p-3 border"
                value={empId}
                onChange={(e) => setEmpId(e.target.value)}
                required
              />
            </div>
          </div>
          

          <div className="grid grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                className="mt-2 w-full p-3 border"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Password
              </label>
              <input
                type="password"
                className="mt-2 w-full p-3 border"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Mobile No & Address */}
          <div className="grid grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block text-gray-700 font-medium">
                Mobile No
              </label>
              <input
                type="text"
                className="mt-2 w-full p-3 border"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Address</label>
              <input
                type="text"
                className="mt-2 w-full p-3 border"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block text-gray-700 font-medium">
                Designation
              </label>
              <select
                className="mt-2 w-full p-3 border"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Designation
                </option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="HR Manager">HR Manager</option>
                <option value="Accountant">Accountant</option>
                <option value="Marketing Manager">Marketing Manager</option>
                <option value="Sales Executive">Sales Executive</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Salary</label>
              <input
                type="number"
                className="mt-2 w-full p-3 border"
                value={baseSalary}
                onChange={(e) => setBaseSalary(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 font-medium">
              Date of Joining
            </label>
            <input
              type="date"
              className="mt-2 w-full p-3 border"
              value={dateOfJoining}
              onChange={(e) => setDateOfJoining(e.target.value)}
              required
            />
          </div>

          <div className="flex mt-6">
            <button
              type="submit"
              className="w-1/4 bg-blue-600 text-white p-3 hover:bg-blue-700"
            >
              Register
            </button>
            <button
              type="button"
              className=" w-1/4 ml-2 bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => navigate("/home")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddEmployee;
