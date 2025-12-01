import React, { useEffect, useState } from "react";
import axios from "axios";

const AllSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      const { data } = await axios.get(
        "https://simpet-backend-1.onrender.com/api/admin/sellers",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setSellers(data.sellers || []);
    } catch (err) {
      console.error("Error fetching sellers:", err);
      setSellers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (id) => {
    try {
      await axios.put(
        `https://simpet-backend-1.onrender.com/api/admin/sellers/${id}/verify`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("✅ Seller verified!");
      fetchSellers();
    } catch (err) {
      console.error("Error verifying seller:", err);
    }
  };

  if (loading)
    return <p className="text-center text-gray-500 mt-4 animate-pulse">Loading sellers...</p>;

  if (!sellers.length)
    return <p className="text-center text-gray-500 mt-4">No sellers found.</p>;

  return (
    <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">All Sellers</h2>

      <table className="w-full border-collapse min-w-[600px] text-sm sm:text-base">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Verified</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((s, i) => (
            <tr key={s._id} className="hover:bg-gray-50">
              <td className="p-2 border">{i + 1}</td>
              <td className="p-2 border">{s.name}</td>
              <td className="p-2 border">{s.email}</td>
              <td className="p-2 border">{s.phone || "-"}</td>
              <td className="p-2 border">{s.verified ? "✅ Yes" : "❌ No"}</td>
              <td className="p-2 border flex gap-2">
                {!s.verified && (
                  <button
                    onClick={() => handleVerify(s._id)}
                    className="text-blue-600 hover:underline text-xs sm:text-sm"
                  >
                    Verify
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllSellers;

