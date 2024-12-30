import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function AnalyticsPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [badgeAnalytics, setBadgeAnalytics] = useState([]);
  const [mostLikedPost, setMostLikedPost] = useState({});

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(
          "https://kudospot-r8os.onrender.com/api/kudos/analytics"
        );
        const data = await response.json();

        setLeaderboard(data.leaderboard || []);
        setBadgeAnalytics(data.badgeAnalytics || []);
        setMostLikedPost(data.mostLikedPost || {});
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchAnalytics();
  }, []);

  // Dynamic Bar Chart Data for Badge Analytics
  const badgeData = {
    labels: badgeAnalytics.map((item) => item.badge || "Unknown Badge"), // Dynamic badge names
    datasets: [
      {
        label: "Number of Kudos by Badge",
        data: badgeAnalytics.map((item) => item.count || 0), // Dynamic badge counts
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        borderColor: "#ffffff",
        borderWidth: 1,
      },
    ],
  };

  const badgeOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Kudos Badge Distribution" },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Badge Names",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Kudos",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between gap-8">
        {/* Bar Chart for Badge Analytics */}
        <div className="w-full md:w-1/2 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Badge Analytics</h3>
          <Bar data={badgeData} options={badgeOptions} />
        </div>

        {/* Leaderboard Table */}
        <div className="w-full md:w-1/2 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Kudo Leaderboard</h3>
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Number of Kudos Received</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{user._id || "Unknown"}</td>
                  <td className="border px-4 py-2">{user.totalKudos || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Most Liked Post */}
      <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">Most Liked Post</h3>
        {mostLikedPost?.sender ? (
          <p>
            <strong>{mostLikedPost.sender}</strong> gave{" "}
            <strong>{mostLikedPost.badge}</strong> badge to{" "}
            <strong>{mostLikedPost.receiver}</strong>: "{mostLikedPost.message}"
          </p>
        ) : (
          <p>No liked posts found</p>
        )}
      </div>
    </div>
  );
}
