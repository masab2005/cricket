import React, { useEffect, useState } from "react";
import service from "./appwrite/conf"; // adjust path if needed

function PlayerCard({ slug }) {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function fetchPlayer() {
    console.log("Fetching player with slug:", slug); // log this
    const data = await service.getPlayer(slug);
    console.log("Fetched player data:", data); // see what comes back
    if (data) setPlayer(data);
    setLoading(false);
  }

  fetchPlayer();
}, [slug]);

  if (loading) return <p className="text-center text-gray-500">Loading player info...</p>;
  if (!player) return <p className="text-center text-red-500">Player not found.</p>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-xl rounded-xl overflow-hidden p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">{player.playerName}</h2>

      <img
        src={service.getFilePreview(player.imageID)}
        alt={player.playerName}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />

      <h3 className="text-lg font-semibold text-gray-700 mb-2">Hints:</h3>
      <ul className="list-disc list-inside text-gray-600 space-y-1">
        {player.hints.map((hint, i) => (
          <li key={i}>{hint}</li>
        ))}
      </ul>
    </div>
  );
}

export default PlayerCard;
