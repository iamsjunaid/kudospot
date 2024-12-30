import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { api } from "../services/api";
import LogoutButton from "../components/LogoutButton";

function Landing() {
  const [kudos, setKudos] = useState([]);
  const { user, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserKudos() {
      try {
        const response = await api.get(`/kudos/${user.email}`);
        setKudos(response.data.kudos);
      } catch (error) {
        console.error("Failed to fetch user kudos:", error);
      }
    }

    if (user) {
      fetchUserKudos();
    }
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please log in first.</p>;

  return (
    <div className="p-6 min-h-screen flex flex-col justify-between bg-gray-50">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
        <div className="flex gap-4">
          <LogoutButton />
          <button
            onClick={() => navigate("/give-kudos")}
            className="bg-slate-950 hover:bg-slate-600 text-white rounded-md py-1 px-8"
          >
            Give Kudos
          </button>
        </div>
      </div>

      {/* Kudos List Section */}
      <div className="flex-grow overflow-auto mb-4">
        <h2 className="text-xl font-semibold mb-2">Your Kudos:</h2>
        {kudos.length > 0 ? (
          <ul className="space-y-2">
            {kudos.map((kudo, index) => (
              <li
                key={index}
                className="p-4 border rounded-md shadow-sm bg-white"
              >
                <p>
                  <strong>From:</strong> {kudo.sender}
                </p>
                <p>
                  <strong>Badge:</strong> {kudo.badge}
                </p>
                <p>
                  <strong>Message:</strong> {kudo.message}
                </p>
                <p className="text-gray-500 text-sm">
                  <strong>Date:</strong>{" "}
                  {new Date(kudo.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No kudos received yet!</p>
        )}
      </div>

      {/* Footer Section */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => navigate("/analytics")}
          className="bg-slate-950 hover:bg-slate-600 text-white rounded-md py-1 px-8"
        >
          View Analytics
        </button>
      </div>
    </div>
  );
}

export default Landing;
