import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosConfig"; // ✅ import Axios instance

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Load cart from backend or localStorage
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axiosInstance.get("/cart", {
          headers: { Authorization: `Bearer ${token}` }, // send token
        });
        setCart(response.data);
      } catch (err) {
        console.error(err);
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
      }
    };

    fetchCart();
  }, [token]);

  // Remove item from cart
  const removeFromCart = async (id) => {
    try {
      await axiosInstance.delete(`/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedCart = cart.filter((item) => item._id !== id);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (err) {
      console.error(err);
      alert("Error removing item");
    }
  };

  const handleChat = (sellerId) => {
    navigate(`/chat/${sellerId}`);
  };

  const totalAmount = cart.reduce((sum, item) => sum + Number(item.price || 0), 0);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cart.map((item) => (
              <div
                key={item._id}
                className="border rounded-lg p-4 shadow hover:shadow-lg transition"
              >
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
                <p className="text-gray-700 font-medium">₦{item.price}</p>
                <p className="text-sm text-gray-500 mb-2">
                  Seller: {item.sellerName}
                </p>

                <div className="flex justify-between mt-3">
                  <button
                    onClick={() => handleChat(item.sellerId)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Chat with Seller
                  </button>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 border-t pt-4">
            <h3 className="text-xl font-semibold mb-4">
              Total: ₦{totalAmount.toLocaleString()}
            </h3>
            <button
              onClick={() => navigate("/payment")}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Proceed to Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
