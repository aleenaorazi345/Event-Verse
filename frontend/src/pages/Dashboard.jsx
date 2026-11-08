import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { Calendar, LogOut, MapPin, Search, Ticket } from "lucide-react";
import { getAllEvents } from "../services/eventService.js";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getAllEvents();
      setEvents(data);
    } catch (err) {
      console.error("Failed to load events", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Filter events based on search
  const filteredEvents = events.filter((e) => 
    e.title.toLowerCase().includes(search.toLowerCase()) || 
    e.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-ink-800 text-white">
      <nav className="bg-ink-700 border-b border-ink-500 px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold neon-text">EventVerse</h1>
        
        <div className="flex items-center gap-6">
          {/* MY TICKETS BUTTON */}
          <button 
            onClick={() => navigate("/my-registrations")} 
            className="flex items-center gap-2 text-sm text-pink-400 hover:text-pink-300 transition font-semibold"
          >
            <Ticket size={16} /> My Tickets
          </button>
          <button 
  onClick={() => navigate("/notifications")} 
  className="relative text-ink-200 hover:text-neon-500 transition"
  title="Notifications"
>
  <Bell size={20} />
  {/* Red dot for unread could go here */}
</button>
          <span className="text-sm text-ink-200 border-l border-ink-500 pl-6">
            Hi, <span className="text-pink-400 font-semibold">{user?.name}</span>
          </span>
          
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-2 text-sm text-ink-200 hover:text-neon-500 transition"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-pink-400 text-sm font-semibold uppercase tracking-wider">Student Dashboard</p>
            <h2 className="text-3xl font-bold mt-1">Discover Events 🎓</h2>
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" size={18} />
            <input 
              type="text" 
              placeholder="Search events..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>

        {loading ? (
          <p className="text-ink-300">Loading events...</p>
        ) : filteredEvents.length === 0 ? (
          <div className="card text-center py-12">
            <Calendar size={48} className="mx-auto text-ink-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">No events found</h3>
            <p className="text-ink-300">Check back later for new events!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredEvents.map((event) => (
              <div 
                key={event._id} 
                onClick={() => navigate(`/event/${event._id}`)}
                className="card group hover:border-pink-500/50 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-pink-400 bg-pink-500/10 px-2 py-1 rounded">
                      {event.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                  <p className="text-sm text-ink-300 mb-4 line-clamp-2">{event.description}</p>
                </div>
                
                <div className="space-y-2 text-sm text-ink-200 mt-4 border-t border-ink-600 pt-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-pink-400" /> 
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-pink-400" /> 
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-ink-400">By {event.organizer?.name || "Organizer"}</span>
                  </div>
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