import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const StorePage = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/stores");
        setStores(res.data);
      } catch (error) {
        console.error("Failed to load stores:", error);
      }
    };
    fetchStores();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Stores</h2>
        <Link
          to="/store/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Create Store
        </Link>
      </div>

      {stores.length === 0 ? (
        <p className="text-gray-600 text-center">No stores have been created yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {stores.map((store) => (
            <Link
              to={`/store/${store._id}`}
              key={store._id}
              className="border rounded-lg p-4 hover:shadow-lg transition"
            >
              <img
                src={
                  store.logo
                    ? `http://localhost:5000/${store.logo}`
                    : "/default-store.png"
                }
                alt={store.name}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-lg font-semibold mt-3">{store.name}</h3>
              <p className="text-gray-500 text-sm mt-1">
                {store.description?.slice(0, 60)}...
              </p>
              <p className="text-gray-400 text-xs mt-1">
                📍 {store.location || "Location not set"}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default StorePage;
