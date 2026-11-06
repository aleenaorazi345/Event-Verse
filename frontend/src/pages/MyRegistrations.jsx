import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyRegistrations } from "../services/eventService.js";
import { Calendar, ArrowLeft, Ticket, MapPin } from "lucide-react";

const MyRegistrations = () => {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const data = await getMyRegistrations();
        setRegistrations(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRegistrations();
  }, []);

  return (
    <div className="min-h-screen bg-ink-800 text-white py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2 text-ink-300 hover:text-neon-500 mb-6 transition">
          <ArrowLeft size={18} /> Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold neon-text mb-6 flex items-center gap-3">
          <Ticket /> My Registered Events
        </h1>

        {loading ? (
          <p>Loading your tickets...</p>
        ) : registrations.length === 0 ? (
          <div className="card text-center py-12">
            <h3 className="text-xl font-bold mb-2">No registrations yet</h3>
            <p className="text-ink-300">Go back and discover some events!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {registrations.map((reg) => {
              const event = reg.event;
              if (!event) return null; // In case the event was deleted
              
              return (
                <div key={reg._id} className="card relative group border-pink-500/20 hover:border-pink-500/50 transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-green-400 bg-green-500/10 px-2 py-1 rounded">
                      Confirmed
                    </span>
                    <span className="text-xs text-ink-400">{new Date(reg.createdAt).toLocaleDateString()}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                  
                  <div className="space-y-2 text-sm text-ink-200 mt-4 pt-4 border-t border-ink-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-pink-400" /> 
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-pink-400" /> 
                      {event.location}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRegistrations;