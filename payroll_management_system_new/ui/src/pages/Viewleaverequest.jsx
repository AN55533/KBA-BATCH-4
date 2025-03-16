import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

const Viewleaverequest = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      const res = await fetch("/api/allleaves");
      if (!res.ok) throw new Error("Failed to fetch leave requests");

      const data = await res.json();
      setLeaveRequests(data);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

  const updateLeaveStatus = async (leaveId, status) => {
    try {
      const res = await fetch(`/api/updateleave/${leaveId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        alert(`Leave ${status} successfully!`);
        fetchLeaveRequests(); // Refresh leave requests
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Failed to update leave request");
      }
    } catch (error) {
      console.error("Error updating leave status:", error);
    }
  };

    return (
      <>
        <Hero />
        <Navbar />
        <div className="ml-64 p-6 w-3/4">
          <h2 className="text-2xl font-bold mb-4"> Leave Requests</h2>

          <table className="w-full  border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">EMPID</th>
                <th className="border p-2">From</th>
                <th className="border p-2">To</th>
                {/* <th className="border p-2">Leave Type</th> */}
                <th className="border p-2">Reason</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.length > 0 ? (
                leaveRequests.map((leave) => (
                  <tr key={leave._id} className="text-center">
                    <td className="border p-2">{leave.EMPID}</td>
                    <td className="border p-2">{leave.fromDate}</td>
                    <td className="border p-2">{leave.toDate}</td>
                    {/* <td className="border p-2">{leave.leaveType}</td> */}
                    <td className="border p-2">{leave.reason}</td>
                    <td className="border p-2">{leave.status}</td>
                    <td className="border p-2">
                      {leave.status === "Pending" ? (
                        <>
                          <button
                            className="bg-green-500 text-white px-3 py-1 mr-2"
                            onClick={() =>
                              updateLeaveStatus(leave._id, "Approved")
                            }
                          >
                            Approve
                          </button>
                          <button
                            className="bg-red-500 text-white px-3 py-1"
                            onClick={() =>
                              updateLeaveStatus(leave._id, "Rejected")
                            }
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className="text-gray-600">{leave.status}</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="border p-4 text-center text-gray-500"
                  >
                    No leave requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </>
    );
};

export default Viewleaverequest;
