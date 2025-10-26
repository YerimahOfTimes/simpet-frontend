import React from "react";
import { Link } from "react-router-dom";

export default function Events() {
  const events = [
    {
      id: 1,
      title: "Tech Gadget Expo 2025",
      date: "November 12, 2025",
      location: "Lagos, Nigeria",
      image: "/assets/events/tech-expo.jpg",
      description:
        "Explore the latest tech innovations and gadgets from top African creators and brands.",
    },
    {
      id: 2,
      title: "SIMPET Seller Summit",
      date: "December 5, 2025",
      location: "Abuja, Nigeria",
      image: "/assets/events/seller-summit.jpg",
      description:
        "Meet and connect with fellow sellers, attend workshops, and learn eCommerce best practices.",
    },
    {
      id: 3,
      title: "Black Friday Mega Sale",
      date: "November 29, 2025",
      location: "Online Event",
      image: "/assets/events/black-friday.jpg",
      description:
        "Massive discounts across all categories. Don’t miss out on the biggest sale of the year!",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* 🌟 Hero Section */}
      <section className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">Upcoming Events</h1>
        <p className="text-lg md:text-xl">
          Stay updated on the latest fairs, exhibitions, and SIMPET community events.
        </p>
      </section>

      {/* 🎟️ Events Grid */}
      <section className="max-w-7xl mx-auto py-12 px-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden flex flex-col"
          >
            <img
              src={event.image}
              alt={event.title}
              className="h-52 w-full object-cover"
            />
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {event.title}
              </h2>
              <p className="text-gray-500 text-sm mb-1">
                📅 {event.date}
              </p>
              <p className="text-gray-500 text-sm mb-3">
                📍 {event.location}
              </p>
              <p className="text-gray-600 flex-grow">{event.description}</p>
              <Link
                to={`/event/${event.id}`}
                className="mt-4 inline-block text-center bg-indigo-600 text-white py-2 px-4 rounded-xl hover:bg-indigo-700 transition"
              >
                Join Event
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* 🧭 Call to Action */}
      <div className="text-center mt-10 mb-16">
        <p className="text-gray-600 mb-4 text-lg">
          Are you hosting an event? Add it to SIMPET and reach more people.
        </p>
        <Link
          to="/add-event"
          className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition"
        >
          Add Your Event
        </Link>
      </div>
    </div>
  );
}
