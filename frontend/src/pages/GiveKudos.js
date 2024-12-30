import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { api } from "../services/api";

function GiveKudos() {
  const [receiver, setReceiver] = useState("");
  const [badge, setBadge] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { user } = useUser(); // Get current logged-in user

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await api.get("/auth/users"); // Fetch all users
        const filteredUsers = response.data.filter(
          (u) => u.email !== user?.email
        ); // Exclude current user
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Failed to fetch users.");
      }
    }

    if (user?.email) {
      fetchUsers();
    }
  }, [user]);

  const handleSendKudos = async () => {
    if (!receiver || !badge || !message) {
      alert("Please fill all the fields.");
      return;
    }

    try {
      await api.post("/kudos/send", {
        sender: user.email,
        receiver,
        badge,
        message,
      });
      alert("Kudos sent successfully!");
      navigate("/landing");
    } catch (error) {
      console.error("Error sending kudos:", error);
      alert("Failed to send kudos. Please try again.");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Top Section - Back Button */}
      <div className="w-full max-w-2xl flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/landing")}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
        >
          ← Back to Dashboard
        </button>
        <h1 className="text-2xl font-bold">Give Kudos</h1>
      </div>

      {/* Form Section */}
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        {/* Receiver Dropdown */}
        <label className="block font-medium mb-2">Select Receiver:</label>
        <select
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        >
          <option value="">-- Select User --</option>
          {users.map((u) => (
            <option key={u.email} value={u.email}>
              {u.name}
            </option>
          ))}
        </select>

        {/* Badge Dropdown */}
        <label className="block font-medium mb-2">Select Badge:</label>
        <select
          value={badge}
          onChange={(e) => setBadge(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        >
          <option value="">-- Select Badge --</option>
          <option value="Team Player">Team Player</option>
          <option value="Leadership">Leadership</option>
          <option value="Hard Worker">Hard Worker</option>
        </select>

        {/* Message Textarea */}
        <label className="block font-medium mb-2">Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write a thoughtful message..."
          className="border p-2 rounded w-full h-32 resize-none mb-6"
        />

        {/* Submit Button */}
        <button
          onClick={handleSendKudos}
          className="w-full bg-slate-950 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded"
        >
          Send Kudos
        </button>
      </div>
    </div>
  );
}

export default GiveKudos;
