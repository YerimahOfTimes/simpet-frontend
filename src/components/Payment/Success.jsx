import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h2 className="text-3xl font-bold text-green-600 mb-3">Payment Successful!</h2>
      <p className="text-gray-700 mb-5">
        Thank you for your payment. Your transaction details have been recorded.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
      >
        Back to Shop
      </Link>
    </div>
  );
};

export default Success;
