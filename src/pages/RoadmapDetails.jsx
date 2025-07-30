// src/pages/RoadmapDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRoadmapDetails, getCertification } from "../services/roadmapService";

export default function RoadmapDetails() {
  const { id } = useParams();
  const [roadmap, setRoadmap] = useState(null);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    getRoadmapDetails(id).then((res) => {
      setRoadmap(res.roadmap);
      setProgress(res.progress);
    });
  }, [id]);

  const handleComplete = async (stepId) => {
    await markStepComplete(stepId);
    const updated = await getRoadmapDetails(id);
    setProgress(updated.progress);
  };

  const handleCertificate = async () => {
    const cert = await getCertification(id);
    window.open(cert.link, "_blank");
  };

  if (!roadmap) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{roadmap.title}</h2>
      <ul>
        {roadmap.steps.map((step, idx) => (
          <li key={step._id} className="flex justify-between items-center bg-white p-3 mb-2 rounded shadow">
            <span>{idx + 1}. {step.title}</span>
            <button
              onClick={() => handleComplete(step._id)}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Mark Complete
            </button>
          </li>
        ))}
      </ul>
      {progress.length === roadmap.steps.length && (
        <button
          onClick={handleCertificate}
          className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Get Certificate
        </button>
      )}
    </div>
  );
}
