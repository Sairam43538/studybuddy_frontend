import { useParams } from "react-router-dom";

export default function StudyRoom() {
  const { id } = useParams();
  return (
    <div>
      <h2 className="text-2xl font-semibold">Study Room: {id}</h2>
      <p>Collaborate and chat with others here.</p>
    </div>
  );
}
