import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/logout");
  };

  if (loading)
    return (
      <p className="text-center text-lg font-semibold text-gray-600">
        Loading profile...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 font-semibold">Error: {error}</p>
    );

  return (
    <div className="w-3/4 mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <div className="flex items-center mb-6">
        <div className="w-34 h-24 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-xl font-semibold text-white">
            {user?.Name?.charAt(0)}
          </span>
        </div>

        <div className="ml-4">
          <h1 className="text-2xl font-bold text-gray-800">{user?.Name}</h1>
          <p className="text-gray-600">{"Employee"}</p>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Personal Information
        </h3>
        <ul>
          <li className="flex justify-between py-2 text-gray-600">
            <span>Employee Id:</span>
            <span className="font-semibold">{user?.EMPID}</span>
          </li>
          <li className="flex justify-between py-2 text-gray-600">
            <span>Email:</span>
            <span className="font-semibold">{user?.Email}</span>
          </li>
          <li className="flex justify-between py-2 text-gray-600">
            <span>Phone Number:</span>
            <span className="font-semibold">{user?.MobileNo || "N/A"}</span>
          </li>
          <li className="flex justify-between py-2 text-gray-600">
            <span>Address:</span>
            <span className="font-semibold">{user?.Address || "N/A"}</span>
          </li>
          <li className="flex justify-between py-2 text-gray-600">
            <span>Password:</span>
            <span className="font-semibold">{user?.Password || "N/A"}</span>
          </li>
        </ul>
      </div>

      <div className="mt-8 flex justify-end space-x-4">
        <button
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
          onClick={() => navigate("/usereditprofile")}
        >
          Edit
        </button>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-gray-400 text-white font-semibold rounded-lg shadow hover:bg-gray-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
