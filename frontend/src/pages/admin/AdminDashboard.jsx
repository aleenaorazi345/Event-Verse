import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { LogOut, Users, Calendar, Trash2, ShieldAlert } from "lucide-react";
import * as adminService from "../../services/adminService.js";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState("users"); // "users" or "events"
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "users") {
        const data = await adminService.getAllUsers();
        setUsers(data);
      } else {
        const data = await adminService.getAllEventsAdmin();
        setEvents(data);
      }
    } catch (err) {
      console.error("Failed to load data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      try {
        await adminService.deleteUser(id);
        setUsers(users.filter((u) => u._id !== id));
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete user");
      }
    }
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm("Are you sure you want to remove this event?")) {
      try {
        await adminService.deleteEventAdmin(id);
        setEvents(events.filter((e) => e._id !== id));
      } catch (err) {
        alert("Failed to delete event");
      }
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-ink-800 text-white">
    <nav className="bg-ink-700 border-b border-ink-500 px-6 py-4 flex items-center justify-between">
  <h1 className="text-2xl font-bold neon-text">EventVerse Admin</h1>
  
  <div className="flex items-center gap-6">
    {/* Shortcuts for Admin */}
    <button onClick={() => navigate("/dashboard")} className="text-sm text-ink-200 hover:text-neon-500 transition">
      View Student UI
    </button>
    <button onClick={() => navigate("/organizer")} className="text-sm text-ink-200 hover:text-neon-500 transition">
      View Organizer UI
    </button>
    
    <div className="h-6 w-px bg-ink-500"></div> {/* Divider */}

    <span className="text-xs bg-pink-500/20 text-pink-400 px-3 py-1 rounded-full font-semibold uppercase flex items-center gap-1">
      <ShieldAlert size={12} /> Admin
    </span>
    <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-ink-200 hover:text-red-400 transition">
      <LogOut size={16} /> Logout
    </button>
  </div>
</nav>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p className="text-pink-400 text-sm font-semibold uppercase tracking-wider">Admin Control Panel</p>
          <h2 className="text-3xl font-bold mt-1">Platform Management 🛡️</h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-ink-600 pb-4">
          <button 
            onClick={() => setActiveTab("users")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${activeTab === "users" ? "bg-pink-500/20 text-pink-400" : "text-ink-300 hover:text-white"}`}
          >
            <Users size={18} /> Manage Users
          </button>
          <button 
            onClick={() => setActiveTab("events")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${activeTab === "events" ? "bg-pink-500/20 text-pink-400" : "text-ink-300 hover:text-white"}`}
          >
            <Calendar size={18} /> Manage Events
          </button>
        </div>

        {loading ? (
          <p className="text-ink-300">Loading...</p>
        ) : activeTab === "users" ? (
          /* USERS TABLE */
          <div className="card overflow-hidden p-0">
            <table className="w-full text-left">
              <thead className="bg-ink-600 text-ink-200 text-sm border-b border-ink-500">
                <tr>
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">Role</th>
                  <th className="p-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-b border-ink-600 last:border-0 hover:bg-ink-600/50 transition">
                    <td className="p-4 font-medium">{u.name}</td>
                    <td className="p-4 text-ink-300">{u.email}</td>
                    <td className="p-4">
                      <span className="text-xs uppercase font-bold tracking-wider text-pink-400">{u.role}</span>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => handleDeleteUser(u._id)}
                        disabled={u._id === user._id}
                        className="text-ink-400 hover:text-red-500 transition disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Delete User"
                      >
                        <Trash2 size={18} className="ml-auto" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* EVENTS TABLE */
          <div className="card overflow-hidden p-0">
            <table className="w-full text-left">
              <thead className="bg-ink-600 text-ink-200 text-sm border-b border-ink-500">
                <tr>
                  <th className="p-4 font-medium">Event Title</th>
                  <th className="p-4 font-medium">Organizer</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {events.map((e) => (
                  <tr key={e._id} className="border-b border-ink-600 last:border-0 hover:bg-ink-600/50 transition">
                    <td className="p-4 font-medium">{e.title}</td>
                    <td className="p-4 text-ink-300">{e.organizer?.name || "Unknown"}</td>
                    <td className="p-4 text-ink-300">{new Date(e.date).toLocaleDateString()}</td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => handleDeleteEvent(e._id)}
                        className="text-ink-400 hover:text-red-500 transition"
                        title="Delete Event"
                      >
                        <Trash2 size={18} className="ml-auto" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;