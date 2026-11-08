import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getNotifications, markNotificationsRead } from "../services/eventService.js";
import { Bell, ArrowLeft } from "lucide-react";

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifs = async () => {
      try {
        const data = await getNotifications();
        setNotifications(data);
        if (data.some(n => !n.isRead)) {
          await markNotificationsRead();
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifs();
  }, []);

  return (
    <div className="min-h-screen bg-ink-800 text-white py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2 text-ink-300 hover:text-neon-500 mb-6 transition">
          <ArrowLeft size={18} /> Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold neon-text mb-6 flex items-center gap-3">
          <Bell /> Notifications
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : notifications.length === 0 ? (
          <div className="card text-center py-12 text-ink-300">
            <Bell size={48} className="mx-auto mb-4 text-ink-500" />
            You have no notifications yet.
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((n) => (
              <div key={n._id} className={`p-4 rounded-xl border ${n.isRead ? 'bg-ink-700/50 border-ink-600' : 'bg-ink-700 border-pink-500/50'}`}>
                <p className="text-sm">{n.message}</p>
                <span className="text-xs text-ink-400 mt-2 block">
                  {new Date(n.createdAt).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications; 