import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const LeaveApplication = () => {
  const navigate = useNavigate();
  const { EMPID } = useParams();

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [reason, setReason] = useState("");
  const [availableLeaves, setAvailableLeaves] = useState(0);
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Employee Leave Data
  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const res = await fetch(
          `api/getemployee/${EMPID}`
        );
        if (!res.ok) throw new Error("Failed to fetch employee data");
        const data = await res.json();
        setAvailableLeaves(data.availableLeaves);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, [EMPID]);

  // Fetch Leave Applications
  useEffect(() => {
    const fetchLeaveApplications = async () => {
      try {
        const res = await fetch(`/api/getleaves/${EMPID}`);
        if (!res.ok) throw new Error("Failed to fetch leave applications");
        const data = await res.json();
        setLeaveApplications(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLeaveApplications();
  }, [EMPID]);

  // Handle Leave Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fromDate || !toDate || !leaveType || !reason) {
      alert("All fields are required!");
      return;
    }

    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);
    const leaveDays =
      Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

    if (leaveDays <= 0) {
      alert("Invalid leave duration!");
      return;
    }

    const newLeave = {
      EMPID,
      fromDate,
      toDate,
      leaveType,
      reason,
      leaveDays,
    };

    try {
      const res = await fetch("/api/applyleave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLeave),
      });

      const updatedData = await res.json();

      if (!res.ok) {
        alert(updatedData.message || "Failed to submit leave application");
        return;
      }

      alert("Leave applied successfully!");

      setAvailableLeaves(updatedData.availableLeaves);

      // Refresh leave applications
      const updatedLeavesData = await fetch(
        `/api/getleaves/${EMPID}`
      ).then((res) => res.json());
      setLeaveApplications(updatedLeavesData);

      // Reset form
      setFromDate("");
      setToDate("");
      setLeaveType("");
      setReason("");
    } catch (error) {
      console.error("Error submitting leave", error);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Leave Application</h2>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/logout")}
        >
          Logout
        </button>
      </div>

      <p className="text-gray-700">Available Leaves: {availableLeaves}</p>

      {/* Leave Application Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded-md">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">From Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-medium">To Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block font-medium">Leave Type</label>
          <select
            className="w-full p-2 border rounded"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            required
          >
            <option value="">Select Leave Type</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Earned Leave">Earned Leave</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="block font-medium">Reason for Leave</label>
          <textarea
            className="w-full p-2 border rounded"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 w-full"
        >
          Submit
        </button>
      </form>

      {/* Leave Applications List */}
      <h2 className="text-2xl font-bold mt-6">Leave Applications</h2>
      <table className="w-full mt-4 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">From Date</th>
            <th className="border p-2">To Date</th>
            <th className="border p-2">Leave Type</th>
            <th className="border p-2">Reason</th>
            <th className="border p-2">Leave Days</th>
            <th className="border p-2">Paid Leaves</th>
            <th className="border p-2">Unpaid Leaves</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {leaveApplications.length > 0 ? (
            leaveApplications.map((leave, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{leave.fromDate}</td>
                <td className="border p-2">{leave.toDate}</td>
                <td className="border p-2">{leave.leaveType || "N/A"}</td>
                <td className="border p-2">{leave.reason}</td>
                <td className="border p-2">{leave.leaveDays}</td>
                <td className="border p-2">{leave.paidLeaves}</td>
                <td className="border p-2">{leave.unpaidLeaves}</td>
                <td className="border p-2">{leave.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="border p-4 text-center text-gray-500">
                No leave applications found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveApplication;
