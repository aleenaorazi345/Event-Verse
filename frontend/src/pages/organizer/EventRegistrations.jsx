import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api.js";
import { ArrowLeft, Users } from "lucide-react";

const EventRegistrations = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const res = await api.get(`/events/${id}/attendees`);
        setAttendees(res.data);
      } catch (err) {
        console.error("Failed to load attendees");
      } finally {
        setLoading(false);
      }
    };
    fetchAttendees();
  }, [id]);

  return (
    <div className="min-h-screen bg-ink-800 text-white py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate("/organizer")} className="flex items-center gap-2 text-ink-300 hover:text-neon-500 mb-6 transition">
          <ArrowLeft size={18} /> Back to Dashboard
        </button>

        <div className="card">
          <h1 className="text-3xl font-bold neon-text mb-6 flex items-center gap-3">
            <Users /> Event Attendees
          </h1>

          {loading ? (
            <p>Loading attendees...</p>
          ) : attendees.length === 0 ? (
            <p className="text-ink-300">No one has registered for this event yet.</p>
          ) : (
            <ul className="space-y-3">
              {attendees.map((a) => (
                <li key={a._id} className="bg-ink-600 p-4 rounded-lg flex justify-between">
                  <span>{a.student.name}</span>
                  <span className="text-ink-300">{a.student.email}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventRegistrations;