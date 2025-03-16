import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [user, setUser] = useState({
    Name: "",
    Email: "",
    MobileNo: "",
    Address: "",
    Password: "",
  });
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

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      navigate("/profile");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading)
    return <p className="text-center text-lg font-semibold">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="Name"
          value={user.Name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="Email"
          value={user.Email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="MobileNo"
          value={user.MobileNo}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Phone Number"
        />
        <input
          type="text"
          name="Address"
          value={user.Address}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Address"
        />
        <input
          type="password"
          name="Password"
          value={user.Password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="New Password (leave blank if not changing)"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
