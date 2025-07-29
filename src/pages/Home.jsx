import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div>
      <h1>Welcome to StudyBuddy</h1>
      <Link to="/upload">Upload Notes</Link>
      <Link to="/search">Search Notes</Link>
      <Link to="/roadmaps">Roadmaps</Link>
      <Link to="/admin">Admin Panel</Link>
    </div>
  );
}
