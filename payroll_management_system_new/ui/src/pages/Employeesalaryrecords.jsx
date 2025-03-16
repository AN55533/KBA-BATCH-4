import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

const Employeesalaryrecords = () => {
  const [salaryRecords, setSalaryRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSalaryRecords = async () => {
      try {
        const res = await fetch(`/api/mysalary/${EMPID}`);
        if (!res.ok) {
          throw new Error("Failed to fetch salary records");
        }
        const data = await res.json();
        setSalaryRecords(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSalaryRecords();
  }, []);

  const generateSalarySlip = (record) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Salary Slip", 20, 20);
    doc.setFontSize(12);
    doc.text(`Employee ID: ${record.EMPID}`, 20, 40);
    doc.text(`Employee Name: ${record.name}`, 20, 50);
    doc.text(`Net Salary: ${record.netSalary}`, 20, 60);
    doc.text(`Status: ${record.Status}`, 20, 70);
    doc.text(`Month: ${record.month}`, 20, 80);
    doc.text(
      `Salary Date: ${new Date(record.SalaryDate).toLocaleDateString()}`,
      20,
      90
    );
    doc.save(`Salary_Slip_${record.EMPID}_${record.month}.pdf`);
  };

  return (
    <div className="p-6 mt-6">
      <h2 className="text-3xl font-bold text-gray-800">Salary Records</h2>

      {loading ? (
        <p className="text-gray-600 mt-4">Loading salary records...</p>
      ) : error ? (
        <p className="text-red-500 mt-4">{error}</p>
      ) : salaryRecords.length === 0 ? (
        <p className="text-gray-600 mt-4">No salary records found.</p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded-lg mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">Employee ID</th>
              <th className="py-2 px-4 border">Employee Name</th>
              <th className="py-2 px-4 border">Net Salary</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Month</th>
              <th className="py-2 px-4 border">Salary Date</th>
              <th className="py-2 px-4 border">Salary Slip</th>
            </tr>
          </thead>
          <tbody>
            {salaryRecords.map((record) => (
              <tr key={record._id}>
                <td className="py-2 px-4 border">{record.EMPID}</td>
                <td className="py-2 px-4 border">{record.name}</td>
                <td className="py-2 px-4 border">{record.netSalary}</td>
                <td className=" text-green-500 py-2 px-4 border ">
                  {record.Status}
                </td>
                <td className="py-2 px-4 border ">{record.month}</td>
                <td className="py-2 px-4 border">
                  {new Date(record.SalaryDate).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => generateSalarySlip(record)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
        onClick={() => navigate("/home1")}
      >
        Back
      </button>
    </div>
  );
};

export default Employeesalaryrecords;
