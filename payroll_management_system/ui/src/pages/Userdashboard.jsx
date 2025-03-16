import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Hero from "../components/Hero";

const UserDashboard = () => {
  const { EMPID } = useParams();
  const [employee, setEmployee] = useState(null);
  const [leaveCount, setLeaveCount] = useState(0);
  const [loading, setLoading] = useState(true);
   const [user, setUser] = useState(null);
   const [error, setError] = useState("");
   const navigate = useNavigate();



  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profile", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch profile");
        }

        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);


  return (
    <>
      <Hero />
      <div className="flex min-h-screen bg-gray-100">
        <aside className="w-64 bg-gray-800 text-white p-6 space-y-6">
          <h2 className="text-2xl font-bold text-center">User Dashboard</h2>
          <nav>
            <ul className="space-y-4">
              <li>
                <Link to="/userprofile" className="hover:text-gray-400">
                  Userprofile
                </Link>
              </li>
              <li>
                <Link to={`/salaryrecords`} className="hover:text-gray-400">
                  Salary Details
                </Link>
              </li>
              {user && (
                <div className="mt-6">
                  <Link
                    to={`/leaveapplication/${user.EMPID}`}
                    className="hover:text-gray-400"
                  >
                    Apply Leave
                  </Link>
                </div>
              )}

              <li>
                <Link to="/logout" className="text-red-400 hover:text-red-600">
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          {loading ? (
            <p className="text-xl text-gray-700">Loading...</p>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Welcome,{user?.Name}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-gray-700">
                    Salary
                  </h2>
                  <p className="text-2xl font-bold text-green-500">
                    ₹{user?.baseSalary || "0"}
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-gray-700">
                    Leaves Taken
                  </h2>
                  <p className="text-2xl font-bold text-red-500">
                    {user?.leaveDays || "0"}
                  </p>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default UserDashboard;
