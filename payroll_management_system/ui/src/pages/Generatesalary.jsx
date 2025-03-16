import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Generatesalary = () => {
  const [employees, setEmployees] = useState([]);
  const [salaryInputs, setSalaryInputs] = useState({});
  const [leaveDays, setLeaveDays] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const res = await fetch("/api/getemployee");
        if (!res.ok) throw new Error("Failed to fetch employees");
        const data = await res.json();
        setEmployees(data);
        data.forEach((employee) => fetchLeaveDays(employee.EMPID));
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployeeDetails();
  }, []);

  const fetchLeaveDays = async (EMPID) => {
    try {
      const res = await fetch(`/api/getleaves/${EMPID}`);
      if (!res.ok) throw new Error("Failed to fetch leave applications");
      const leaves = await res.json();
      const totalLeaveDays = leaves
        .filter((leave) => leave.status === "Approved")
        .reduce((sum, leave) => sum + leave.leaveDays, 0);
      setLeaveDays((prev) => ({ ...prev, [EMPID]: totalLeaveDays }));
    } catch (error) {
      console.error(`Failed to fetch leave for EMPID ${EMPID}:`, error);
    }
  };

  const calculateNetSalary = (baseSalary, leaveDays) => {
    const base = parseFloat(baseSalary) || 0;
    return leaveDays > 12
      ? (base - (leaveDays - 12) * (base / 30)).toFixed(2)
      : base.toFixed(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSalaryInputs((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmitAll = async () => {
   if (!salaryInputs.month || !salaryInputs.SalaryDate) {
     alert("Please enter Month and Salary Date before submitting.");
     return;
   }

   try {
     for (const employee of employees) {
       const salaryData = {
         EMPID: employee.EMPID,
         name: employee.Name,
         netSalary: calculateNetSalary(
           employee.baseSalary,
           leaveDays[employee.EMPID] || 0
         ),
         Status: "Paid",
         month: salaryInputs.month,
         SalaryDate: salaryInputs.SalaryDate,
       };

       const res = await fetch("/api/addsalary", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(salaryData),
       });

       if (!res.ok) throw new Error("Failed to add salary details");
     }

     alert("Salary details added successfully!");
     navigate("/salaryrecords");
   } catch (error) {
     console.error("Error submitting salary details:", error);
     alert("An unexpected error occurred. Please try again.");
   }
 };
  return (
    <div className="p-6 mt-6">
      <h2 className="text-3xl font-bold text-gray-800">Generate Salary</h2>
      <div className="flex space-x-4 my-4">
        <input
          type="text"
          name="month"
          placeholder="Month"
          className="border p-2"
          value={salaryInputs.month || ""}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="SalaryDate"
          className="border p-2"
          value={salaryInputs.SalaryDate || ""}
          onChange={handleInputChange}
        />
      </div>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Employee ID</th>
            <th className="py-2 px-4 border">Employee Name</th>
            <th className="py-2 px-4 border">Phone Number</th>
            <th className="py-2 px-4 border">Base Salary</th>
            <th className="py-2 px-4 border">Leave Days</th>
            <th className="py-2 px-4 border">Net Salary</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.EMPID}>
              <td className="py-2 px-4 border">{employee.EMPID}</td>
              <td className="py-2 px-4 border">{employee.Name}</td>
              <td className="py-2 px-4 border">{employee.MobileNo}</td>
              <td className="py-2 px-4 border">{employee.baseSalary}</td>
              <td className="py-2 px-4 border">
                {leaveDays[employee.EMPID] || 0}
              </td>
              <td className="py-2 px-4 border">
                {calculateNetSalary(
                  employee.baseSalary,
                  leaveDays[employee.EMPID] || 0
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex space-x-4">
        <button
          onClick={handleSubmitAll}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit All Salaries
        </button>
        <button
          onClick={() => navigate("/home")}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Generatesalary;
