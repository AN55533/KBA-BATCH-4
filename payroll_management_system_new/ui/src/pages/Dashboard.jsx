import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalPayroll, setTotalPayroll] = useState(0);
  const [pendingLeaves, setPendingLeaves] = useState(0);
  const [employeesalary, setSalaries] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("/api/employees", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Unauthorized Access");
        }

        const data = await response.json();
        setTotalEmployees(data.length);
      } catch (err) {
        setError(err.message || "Error fetching employees");
        navigate("/login");
      }
    };

    fetchEmployees();
  }, [navigate]);

  useEffect(() => {
    const fetchSalaryRecords = async () => {
      try {
        const res = await fetch("/api/salaries");
        if (!res.ok) {
          throw new Error("Failed to fetch salary records");
        }
        const data = await res.json();

        const totalNetSalary = data.reduce(
          (sum, record) => sum + record.netSalary,
          0
        );
        setTotalPayroll(totalNetSalary);
        setSalaries(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchSalaryRecords();
  }, []);

  useEffect(() => {
    const fetchPendingLeaves = async () => {
      try {
        const res = await fetch("/api/allleaves");
        if (!res.ok) {
          throw new Error("Failed to fetch leave requests");
        }
        const data = await res.json();

        const pendingCount = data.filter(
          (leave) => leave.status === "pending"
        ).length;
        setPendingLeaves(pendingCount);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPendingLeaves();
  }, []);

  return (
    <main className="ml-64 p-6 w-3/4">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Dashboard Overview</h2>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow-lg p-4 rounded-lg text-center">
          <h3 className="text-lg font-bold text-gray-600">Total Employees</h3>
          <p className="text-3xl font-semibold text-blue-900 mt-2">
            {totalEmployees}
          </p>
        </div>
        <div className="bg-white shadow-lg p-4 rounded-lg text-center">
          <h3 className="text-lg font-bold text-gray-600">Monthly Payroll</h3>
          <p className="text-3xl font-semibold text-blue-900 mt-2">
            ${totalPayroll}
          </p>
        </div>
        <div className="bg-white shadow-lg p-4 rounded-lg text-center">
          <h3 className="text-lg font-bold text-gray-600">
            Pending Leave Requests
          </h3>
          <p className="text-3xl font-semibold text-blue-900 mt-2">
            {pendingLeaves}
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-bold text-gray-700 mb-4">
          Employee Salary Details
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Emp ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Net Salary</th>
                <th className="py-3 px-6 text-left">Bill date</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {employeesalary.map((salary, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">{salary.EMPID}</td>
                  <td className="py-3 px-6 text-left">{salary.name}</td>
                  <td className="py-3 px-6 text-left">${salary.netSalary}</td>
                  <td className="py-3 px-6 text-left">
                    {new Date(salary.SalaryDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </main>
  );
};

export default Dashboard;
