import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { LogOut, Plus, Users, Calendar, Trash2, Eye } from "lucide-react";
import { getMyEvents, deleteEvent } from "../../services/eventService.js";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getMyEvents();
      setEvents(data);
    } catch (err) {
      console.error("Failed to load events", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEvent(id);
        setEvents(events.filter((e) => e._id !== id)); // Remove from UI instantly
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
        <h1 className="text-2xl font-bold neon-text">EventVerse</h1>
        <div className="flex items-center gap-4">
          <span className="text-xs bg-pink-500/20 text-pink-400 px-3 py-1 rounded-full font-semibold uppercase">Organizer</span>
          <span className="text-sm text-ink-200"><span className="text-pink-400 font-semibold">{user?.name}</span></span>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-ink-200 hover:text-neon-500 transition">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-pink-400 text-sm font-semibold uppercase tracking-wider">Organizer Dashboard</p>
            <h2 className="text-3xl font-bold mt-1">Welcome, {user?.name} 🎤</h2>
          </div>
          <button onClick={() => navigate("/organizer/create")} className="btn-primary flex items-center gap-2">
            <Plus size={18} /> Create Event
          </button>
        </div>

        {loading ? (
          <p className="text-ink-300">Loading your events...</p>
        ) : events.length === 0 ? (
          <div className="card text-center py-12">
            <Calendar size={48} className="mx-auto text-ink-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">No events yet</h3>
            <p className="text-ink-300">Click "Create Event" to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {events.map((event) => (
              <div key={event._id} className="card relative group hover:border-pink-500/50 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-pink-400 bg-pink-500/10 px-2 py-1 rounded">
                    {event.category}
                  </span>
                  <button onClick={() => handleDelete(event._id)} className="text-ink-400 hover:text-red-500 transition">
                    <Trash2 size={18} />
                  </button>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                <p className="text-sm text-ink-300 mb-4 line-clamp-2">{event.description}</p>
                
                <div className="space-y-2 text-sm text-ink-200 mt-4 border-t border-ink-600 pt-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-pink-400" /> 
                    {new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString([], {timeStyle: 'short'})}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-pink-400" /> 
                    Capacity: {event.capacity}
                  </div>
                  
                  {/* NEW BUTTON HERE */}
                  <button 
                    onClick={() => navigate(`/organizer/event/${event._id}`)}
                    className="w-full mt-4 bg-ink-600 hover:bg-ink-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors border border-ink-500"
                  >
                    <Eye size={16} /> View Attendees
                  </button>
                  
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;