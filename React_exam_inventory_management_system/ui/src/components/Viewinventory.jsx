import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Viewinventory = () => {
  const [inventory, setInventory] = useState([]);
    const [filteredInventory, setFilteredInventory] = useState([]);
    const [searchId, setSearchId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await fetch("/api/getinventory");
        if (!res.ok) {
          throw new Error("Failed to fetch inventory details");
        }
        const data = await res.json();
        setInventory(data);
        setFilteredInventory(data); 
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };
    fetchInventory();
  }, []);

 const handleSearch = () => {
   if (searchId.trim() === "") {
     setFilteredInventory(inventory); 
   } else {
     const filtered = inventory.filter((inventory) =>
       inventory.Category.toString().includes(searchId)
     );
     setFilteredInventory(filtered);
   }
 };

  return (
    <>
      <div className="ml-64 p-6 w-3/4 mt-6">
        <h2 className="text-3xl font-bold text-gray-800">Inventory Details</h2>

        <div className="mb-5 flex items-center space-x-3">
          <input
            type="text"
            placeholder="Search by Category"
            className="border p-2 rounded w-1/4"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button
            className="bg-blue-200 text-white px-4 py-2 rounded"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <div className="bg-white p-8 mt-6 w-full shadow-md rounded-lg">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-3">ItemName</th>
                <th className="border p-3">Category</th>
                <th className="border p-3">Quantity</th>
                <th className="border p-3">Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.length > 0 ? (
                filteredInventory.map((inventory) => (
                  <tr key={inventory.ItemName} className="text-center">
                    <td className="border p-3">{inventory.ItemName}</td>
                    <td className="border p-3">{inventory.Category}</td>
                    <td className="border p-3">{inventory.Quantity}</td>
                    <td className="border p-3">{inventory.Price}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center p-4 text-gray-500">
                    No inventory details found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Viewinventory;
