import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-ink-800 text-white px-4">
    <h1 className="text-7xl font-bold text-pink-400">404</h1>
    <p className="text-ink-300 mt-3 mb-6">This page doesn't exist.</p>
    <Link to="/dashboard" className="btn-primary">Go Home</Link>
  </div>
);

export default NotFound;