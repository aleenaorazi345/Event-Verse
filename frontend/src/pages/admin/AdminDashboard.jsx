import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { LogOut, Users, Calendar, ShieldCheck } from "lucide-react";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-ink-800 text-white">
      <nav className="bg-ink-700 border-b border-ink-500 px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-pink-400">EventVerse</h1>
        <div className="flex items-center gap-4">
          <span className="text-xs bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full font-semibold uppercase">Admin</span>
          <span className="text-sm text-ink-200"><span className="text-pink-300 font-semibold">{user?.name}</span></span>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-ink-200 hover:text-pink-300 transition">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p className="text-pink-400 text-sm font-semibold uppercase tracking-wider">Admin Control Panel</p>
          <h2 className="text-3xl font-bold mt-1">Welcome, {user?.name} 🛡️</h2>
          <p className="text-ink-300 mt-2">Manage users, moderate events, and keep EventVerse clean.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <StatCard icon={<Users />} label="Total Users" value="0" />
          <StatCard icon={<Calendar />} label="Total Events" value="0" />
          <StatCard icon={<ShieldCheck />} label="Flagged Content" value="0" />
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="card hover:border-pink-500/50 transition-all cursor-pointer">
    <div className="flex items-center justify-between">
      <div className="text-pink-400">{icon}</div>
      <span className="text-3xl font-bold text-white">{value}</span>
    </div>
    <p className="text-ink-300 mt-3 text-sm">{label}</p>
  </div>
);

export default AdminDashboard;