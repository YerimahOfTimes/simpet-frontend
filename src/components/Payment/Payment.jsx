import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosConfig"; // ✅ import Axios

const Payment = () => {
  const [method, setMethod] = useState("");
  const [paymentInfo, setPaymentInfo] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    if (!method) return alert("Please select a payment method");

    try {
      const res = await axiosInstance.post(
        "/payment",
        { method, ...paymentInfo },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(`Payment via ${method} successful!`);
      navigate("/success");
    } catch (err) {
      console.error(err);
      alert("Error processing payment. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Choose Payment Method</h2>

      <div className="space-y-4 mb-6">
        {["Bank Transfer", "Bank Card", "Pay on Meeting"].map((type) => (
          <label
            key={type}
            className="block border rounded-lg p-4 cursor-pointer hover:bg-blue-50"
          >
            <input
              type="radio"
              name="method"
              value={type}
              onChange={(e) => setMethod(e.target.value)}
              checked={method === type}
              className="mr-2"
            />
            {type === "Pay on Meeting" ? (
              <strong>Pay when you meet the seller personally</strong>
            ) : (
              <>Pay using <strong>{type}</strong></>
            )}
          </label>
        ))}
      </div>

      {method === "Bank Transfer" && (
        <div className="border rounded-lg p-4 mb-4">
          <h3 className="text-lg font-semibold mb-2">Bank Transfer Details</h3>
          {["bankName", "accountNumber", "accountName", "amount"].map((field) => (
            <input
              key={field}
              type={field === "amount" ? "number" : "text"}
              name={field}
              placeholder={field.replace(/([A-Z])/g, " $1")}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-2"
            />
          ))}
        </div>
      )}

      {method === "Bank Card" && (
        <div className="border rounded-lg p-4 mb-4">
          <h3 className="text-lg font-semibold mb-2">Card Payment</h3>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            onChange={handleChange}
            className="w-full border p-2 rounded mb-2"
          />
          <div className="flex gap-2">
            <input
              type="text"
              name="expiryDate"
              placeholder="MM/YY"
              onChange={handleChange}
              className="w-1/2 border p-2 rounded mb-2"
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              onChange={handleChange}
              className="w-1/2 border p-2 rounded mb-2"
            />
          </div>
          <input
            type="text"
            name="cardHolder"
            placeholder="Cardholder Name"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
      )}

      {method === "Pay on Meeting" && (
        <div className="border rounded-lg p-4 mb-4 bg-green-50">
          <p className="text-gray-700">
            You’ve chosen to pay in person. You will meet the seller and make
            payment physically after confirming the product.
          </p>
        </div>
      )}

      <button
        onClick={handlePayment}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 block mx-auto"
      >
        Confirm Payment
      </button>
    </div>
  );
};

export default Payment;
