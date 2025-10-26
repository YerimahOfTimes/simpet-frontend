// src/components/Admin/AllEvents.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/admin/events");
      setEvents(data.events || []);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/admin/events", newEvent);
      alert("✅ Event created!");
      setNewEvent({ title: "", description: "", startDate: "", endDate: "", location: "" });
      fetchEvents();
    } catch (err) {
      console.error("Error creating event:", err);
      alert("❌ Failed to create event.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/events/${id}`);
      setEvents(events.filter((e) => e._id !== id));
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">All Events</h2>

      {/* Event Form */}
      <form
        onSubmit={handleCreate}
        className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-3"
      >
        <input
          className="border rounded px-3 py-2"
          placeholder="Title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          required
        />
        <input
          className="border rounded px-3 py-2"
          placeholder="Location"
          value={newEvent.location}
          onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
        />
        <input
          type="date"
          className="border rounded px-3 py-2"
          value={newEvent.startDate}
          onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
          required
        />
        <input
          type="date"
          className="border rounded px-3 py-2"
          value={newEvent.endDate}
          onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
        />
        <textarea
          className="border rounded px-3 py-2 md:col-span-2"
          placeholder="Description"
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 md:col-span-2">
          Create Event
        </button>
      </form>

      {/* Events Table */}
      <table className="w-full border-collapse min-w-[600px] text-sm sm:text-base">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Location</th>
            <th className="p-2 border">Start Date</th>
            <th className="p-2 border">End Date</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {events.map((ev, i) => (
            <tr key={ev._id} className="hover:bg-gray-50">
              <td className="p-2 border">{i + 1}</td>
              <td className="p-2 border">{ev.title}</td>
              <td className="p-2 border">{ev.location}</td>
              <td className="p-2 border">{ev.startDate?.slice(0, 10)}</td>
              <td className="p-2 border">{ev.endDate?.slice(0, 10) || "-"}</td>
              <td className="p-2 border">
                <button
                  onClick={() => handleDelete(ev._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllEvents;
