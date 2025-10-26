import React, { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate sending reset link
    setSubmitted(true);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Reset Password</h2>

      {!submitted ? (
        <>
          <p className="text-sm text-gray-600 mb-4 text-center">
            Enter your email and we’ll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Send Reset Link
            </button>
          </form>
        </>
      ) : (
        <p className="text-green-600 text-center">
          A password reset link has been sent to <strong>{email}</strong>
        </p>
      )}
    </div>
  );
}
