import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosConfig"; // ✅ import Axios

const Chat = () => {
  const { sellerId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axiosInstance.get(`/chat/${sellerId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data);
      } catch (err) {
        console.error(err);
        const storedMessages = JSON.parse(localStorage.getItem(`chat_${sellerId}`)) || [];
        setMessages(storedMessages);
      }
    };

    fetchMessages();
  }, [sellerId, token]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessage = {
      text: input,
      sender: "buyer",
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    try {
      await axiosInstance.post(
        `/chat/${sellerId}`,
        newMessage,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col h-[80vh] max-w-3xl mx-auto border rounded-lg shadow-md">
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <h2 className="text-xl font-semibold">Chat with Seller ({sellerId})</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-[70%] ${
              msg.sender === "buyer"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-300 text-gray-800"
            }`}
          >
            <p>{msg.text}</p>
            <small className="text-xs block mt-1 text-gray-200">{msg.time}</small>
          </div>
        ))}
      </div>

      <div className="p-3 border-t flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border rounded-lg px-3 py-2 outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
