import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Addinventory = () => {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");


  const navigate = useNavigate();

  const handleAddInventory = async (e) => {
    e.preventDefault();

    const newInventory = {
      ItemName: itemName,
      Category: category,
      Quantity: quantity,
      Price: price,
    };

    try {
      const res = await fetch("/api/adddata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newInventory),
      });

      if (res.ok) {
        navigate("/getinventory");
      } else {
        const errorData = await res.json();
        console.error("Failed to add employee:", errorData);
      }
    } catch (error) {
      console.error("Error adding employee details", error);
    }
  };

  return (
    <>
      <div className="p-6 mt-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Add Inventory Details
        </h2>
        <form
          onSubmit={handleAddInventory}
          className="bg-white p-8 mt-6 w-full shadow-md rounded-lg"
        >
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium">
                ItemName
              </label>
              <input
                type="text"
                className="mt-2 w-full p-3 border"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Category
              </label>
              <input
                type="text"
                className="mt-2 w-full p-3 border"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block text-gray-700 font-medium">
                Quantity
              </label>
              <input
                type="text"
                className="mt-2 w-full p-3 border"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Price</label>
              <input
                type="text"
                className="mt-2 w-full p-3 border"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex mt-6">
            <button
              type="submit"
              className="w-1/4 bg-blue-600 text-white p-3 hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Addinventory;
