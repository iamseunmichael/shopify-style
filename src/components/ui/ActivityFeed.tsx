"use client";

export default function ActivityFeed() {
  const activities = [
    { id: 1, text: "User registered" },
    { id: 2, text: "Order created" },
    { id: 3, text: "Admin updated product" },
  ];

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="mb-4 font-semibold">Recent Activity</h3>

      <ul className="space-y-2">
        {activities.map((a) => (
          <li key={a.id}>{a.text}</li>
        ))}
      </ul>
    </div>
  );
}