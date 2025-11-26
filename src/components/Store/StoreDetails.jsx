import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const StoreDetails = () => {
  const { id } = useParams();
  const [storeData, setStoreData] = useState(null);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/stores/${id}`);
        setStoreData(res.data);
      } catch (error) {
        console.error("Failed to load store:", error);
      }
    };
    fetchStore();
  }, [id]);

  if (!storeData)
    return <p className="text-center mt-10">Loading store details...</p>;

  const { store, products } = storeData;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center gap-6 mb-8">
        <img
          src={
            store.logo
              ? `http://localhost:5000/${store.logo}`
              : "/default-store.png"
          }
          alt={store.name}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-semibold">{store.name}</h2>
          <p className="text-gray-600">{store.description}</p>
          <p className="text-gray-500 text-sm">📍 {store.location}</p>
          <p className="text-gray-500 text-sm">📞 {store.contactPhone}</p>
          <p className="text-gray-500 text-sm">📧 {store.contactEmail}</p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4">Products</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <p>No products available in this store yet.</p>
        ) : (
          products.map((p) => (
            <div
              key={p._id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={`http://localhost:5000/${p.images[0]}`}
                alt={p.name}
                className="w-full h-40 object-cover rounded"
              />
              <h4 className="text-lg font-semibold mt-2">{p.name}</h4>
              <p className="text-gray-600">₦{p.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StoreDetails;
