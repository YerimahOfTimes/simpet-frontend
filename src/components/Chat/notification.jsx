import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosConfig";

const Notifications = () => {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axiosInstance.get("/chat/all/chats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChats(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setChats([]);
      }
    };
    fetchChats();
  }, [token]);

  const openChat = (chat) => {
    const otherUserId =
      chat.buyerId._id === JSON.parse(localStorage.getItem("user"))._id
        ? chat.sellerId._id
        : chat.buyerId._id;
    navigate(`/chat/${otherUserId}`);
  };

  if (!chats.length)
    return <div className="p-4 text-center text-gray-500">No messages yet.</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      {chats.map((chat) => {
        const lastMsg = chat.messages[chat.messages.length - 1];
        const otherUser =
          chat.buyerId._id === JSON.parse(localStorage.getItem("user"))._id
            ? chat.sellerId
            : chat.buyerId;
        return (
          <div
            key={chat._id}
            className="border rounded p-3 mb-2 cursor-pointer hover:bg-gray-100"
            onClick={() => openChat(chat)}
          >
            <p>
              <strong>{otherUser.name}</strong>
            </p>
            <p className="text-gray-700 text-sm">
              {lastMsg ? lastMsg.text : "No messages yet"}
            </p>
            <p className="text-gray-400 text-xs">
              {lastMsg ? new Date(lastMsg.time).toLocaleString() : ""}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Notifications;



