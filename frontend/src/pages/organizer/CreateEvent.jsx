import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../services/eventService.js";
import { ArrowLeft } from "lucide-react";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "Workshop",
    capacity: 50,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

   const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // FIX: Ensure date is sent as a valid ISO string
      const eventData = {
        ...form,
        date: new Date(form.date).toISOString(),
      };
      
      await createEvent(eventData);
      navigate("/organizer"); 
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-ink-800 text-white py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate("/organizer")} className="flex items-center gap-2 text-ink-300 hover:text-neon-500 mb-6 transition">
          <ArrowLeft size={18} /> Back to Dashboard
        </button>

        <div className="card">
          <h1 className="text-3xl font-bold neon-text mb-6">Create New Event</h1>
          
          {error && <div className="mb-4 p-3 rounded-lg bg-pink-500/10 border border-pink-500/30 text-pink-400 text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink-200 mb-1.5">Event Title</label>
              <input name="title" value={form.title} onChange={handleChange} className="input-field" required />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-ink-200 mb-1.5">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} className="input-field h-24 resize-none" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ink-200 mb-1.5">Date & Time</label>
                <input type="datetime-local" name="date" value={form.date} onChange={handleChange} className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink-200 mb-1.5">Location / Venue</label>
                <input name="location" value={form.location} onChange={handleChange} className="input-field" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ink-200 mb-1.5">Category</label>
                <select name="category" value={form.category} onChange={handleChange} className="input-field bg-ink-700">
                  <option value="Workshop">Workshop</option>
                  <option value="Competition">Competition</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Sports">Sports</option>
                  <option value="Society">Society</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-ink-200 mb-1.5">Capacity (Seats)</label>
                <input type="number" name="capacity" value={form.capacity} onChange={handleChange} className="input-field" min="1" required />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full mt-4 disabled:opacity-60">
              {loading ? "Creating..." : "Publish Event"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;