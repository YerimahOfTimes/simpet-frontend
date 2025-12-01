import React, { useEffect, useState } from "react";
import axios from "axios";

const AllWithdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async () => {
    try {
      const { data } = await axios.get(
        "https://simpet-backend-1.onrender.com/api/admin/withdrawals",
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setWithdrawals(data.withdrawals || []);
    } catch (err) {
      console.error("Error fetching withdrawals:", err);
      setWithdrawals([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, status) => {
    try {
      await axios.put(
        `https://simpet-backend-1.onrender.com/api/admin/withdrawals/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert(`✅ Withdrawal ${status}`);
      fetchWithdrawals();
    } catch (err) {
      console.error("Error updating:", err);
    }
  };

  if (loading)
    return <p className="text-center text-gray-500 mt-4 animate-pulse">Loading withdrawals...</p>;

  if (!withdrawals.length)
    return <p className="text-center text-gray-500 mt-4">No withdrawals found.</p>;

  return (
    <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">All Withdrawals</h2>

      <table className="w-full border-collapse min-w-[600px] text-sm sm:text-base">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Seller</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Amount (₦)</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {withdrawals.map((w, i) => (
            <tr key={w._id} className="hover:bg-gray-50">
              <td className="p-2 border">{i + 1}</td>
              <td className="p-2 border">{w.seller?.name || "-"}</td>
              <td className="p-2 border">{w.seller?.email || "-"}</td>
              <td className="p-2 border">{w.amount?.toLocaleString() || 0}</td>
              <td className="p-2 border capitalize">{w.status}</td>
              <td className="p-2 border flex gap-2">
                {w.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleAction(w._id, "approved")}
                      className="text-green-600 hover:underline text-xs sm:text-sm"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(w._id, "rejected")}
                      className="text-red-600 hover:underline text-xs sm:text-sm"
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllWithdrawals;

