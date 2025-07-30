// src/pages/Roadmaps.jsx
import { useEffect, useState } from "react";
import { getRoadmaps } from "../services/roadmapService";
import { Link } from "react-router-dom";

export default function Roadmaps() {
  const [roadmaps, setRoadmaps] = useState([]);

  useEffect(() => {
    getRoadmaps().then(setRoadmaps);
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Available Roadmaps</h2>
      {roadmaps.map((roadmap) => (
        <div key={roadmap._id} className="bg-white p-4 mb-2 rounded shadow flex justify-between">
          <div>
            <h3 className="font-semibold">{roadmap.title}</h3>
            <p className="text-gray-600">{roadmap.creator_type}</p>
          </div>
          <Link
            to={`/roadmaps/${roadmap._id}`}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            View
          </Link>
        </div>
      ))}
    </div>
  );
}
