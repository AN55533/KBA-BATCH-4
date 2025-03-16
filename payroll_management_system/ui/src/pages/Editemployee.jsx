import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Editemployee = () => {
  const { EMPID } = useParams(); // Ensure this matches the route parameter
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    Name: "",
    Email: "",
    MobileNo: "",
    Designation: "",
    monthlySalary: "",
    DateofJoining: "",
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await fetch(`/api/getemployee/${EMPID}`); // Fix: Use EMPID
        if (!res.ok) {
          throw new Error("Failed to fetch employee");
        }
        const data = await res.json();
        setEmployee(data);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };
    fetchEmployee();
  }, [EMPID]); 

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/updateemployeedetails/${EMPID}`, {
        // Fix: Use EMPID
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
      });
      if (!res.ok) {
        throw new Error("Failed to update employee");
      }
      navigate("/getemployee"); // Fix: Ensure correct path
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div className="p-6 mt-6">
      <h2 className="text-3xl font-bold text-gray-800">Edit Employee</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 mt-6 shadow-md rounded-lg"
      >
        <div className="mb-4">
          <label className="block">Name</label>
          <input
            name="Name"
            value={employee.Name}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block">Email</label>
          <input
            name="Email"
            type="email"
            value={employee.Email}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block">Mobile No</label>
          <input
            name="MobileNo"
            value={employee.MobileNo}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block">Designation</label>
          <input
            name="Designation"
            value={employee.Designation}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block">Salary</label>
          <input
            name="monthlySalary"
            value={employee.monthlySalary}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block">Date of Joining</label>
          <input
            name="DateofJoining"
            type="date"
            value={employee.DateofJoining}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update
        </button>
        <button
          type="button"
          className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/getemployee")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Editemployee;
