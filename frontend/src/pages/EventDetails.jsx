import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventDetails, registerForEvent } from "../services/eventService.js";
import { Calendar, MapPin, Users, ArrowLeft } from "lucide-react";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventDetails(id);
        setEvent(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    setRegistering(true);
    setMessage({ type: "", text: "" });
    try {
      const res = await registerForEvent(id);
      setMessage({ type: "success", text: res.message });
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Registration failed" });
    } finally {
      setRegistering(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-ink-800 text-white flex items-center justify-center">Loading...</div>;
  if (!event) return <div className="min-h-screen bg-ink-800 text-white flex items-center justify-center">Event not found</div>;

  return (
    <div className="min-h-screen bg-ink-800 text-white py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-ink-300 hover:text-neon-500 mb-6 transition">
          <ArrowLeft size={18} /> Back to Events
        </button>

        <div className="card p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-pink-400 bg-pink-500/10 px-3 py-1 rounded">
              {event.category}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold neon-text mb-4">{event.title}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-3 text-ink-200 bg-ink-600 p-3 rounded-lg">
              <Calendar className="text-pink-400" /> 
              {new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString([], {timeStyle: 'short'})}
            </div>
            <div className="flex items-center gap-3 text-ink-200 bg-ink-600 p-3 rounded-lg">
              <MapPin className="text-pink-400" /> 
              {event.location}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-2">About this event</h3>
            <p className="text-ink-300 leading-relaxed whitespace-pre-wrap">{event.description}</p>
          </div>

          <div className="border-t border-ink-500 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-ink-300">
              <Users className="text-pink-400" />
              Organized by <span className="font-semibold text-white">{event.organizer?.name}</span>
            </div>
            
            <button 
              onClick={handleRegister} 
              disabled={registering}
              className="btn-primary w-full md:w-auto px-10 disabled:opacity-60"
            >
              {registering ? "Registering..." : "Register Now"}
            </button>
          </div>

          {message.text && (
            <div className={`mt-6 p-4 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/30' : 'bg-pink-500/10 text-pink-400 border border-pink-500/30'}`}>
              {message.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;