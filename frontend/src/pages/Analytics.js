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

const data = {
  labels: ["Helping Hand", "Excellence", "Above and Beyond", "Client Focus"],
  datasets: [
    {
      label: "Kudos given",
      data: [11, 8, 3, 5],
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: false, text: "Kudos Given" },
  },
};

export default function AnalyticsPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [badgeAnalytics, setBadgeAnalytics] = useState([]);
  const [mostLikedPost, setMostLikedPost] = useState({});

  useEffect(() => {
    const fetchAnalytics = async () => {
      const response = await fetch("http://localhost:5000/api/kudos/analytics");
      const data = await response.json();

      setLeaderboard(data.leaderboard);
      setBadgeAnalytics(data.badgeAnalytics);
      setMostLikedPost(data.mostLikedPost);
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between">
        <div className="w-1/2">
          <Bar data={data} options={options} />
        </div>

        {/* Leaderboard Table */}
        <div>
          <h3 className="text-lg font-semibold">Kudo Leaderboard</h3>
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
                  <td className="border px-4 py-2">{user._id}</td>
                  <td className="border px-4 py-2">{user.totalKudos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Most Liked Post */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold">Most Liked Post</h3>
        {mostLikedPost ? (
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
