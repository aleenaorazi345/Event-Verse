import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api"; // Humne yahan seedha api import kiya hai taake service ka masla na ho

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    if (!user) return;
    try {
      // Seedha API call (axios instance ke zariye)
      const response = await api.get("/notifications");
      const data = response.data;
      
      console.log("🔔 Notifications fetched:", data); // Debugging ke liye

      setNotifications(data);
      setUnreadCount(data.filter((n) => !n.isRead).length);
    } catch (error) {
      console.error("❌ Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [user]);

  const handleMarkAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await api.put("/notifications/read-all");
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        fetchNotifications,
        handleMarkAsRead,
        handleMarkAllAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};