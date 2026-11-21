import { useState } from "react";
import { Bell } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";
import { Link } from "react-router-dom";

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, handleMarkAsRead, handleMarkAllAsRead } = useNotification();

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="relative p-2 text-gray-600 hover:text-gray-900">
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50 border border-gray-200">
          <div className="flex justify-between items-center p-4 bg-gray-50 border-b">
            <h3 className="font-bold text-gray-800">Notifications</h3>
            {unreadCount > 0 && (
              <button onClick={handleMarkAllAsRead} className="text-xs text-blue-600 hover:underline">
                Mark all as read
              </button>
            )}
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="p-4 text-center text-gray-500 text-sm">No notifications yet.</p>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif._id}
                  onClick={() => handleMarkAsRead(notif._id)}
                  className={`p-4 border-b hover:bg-gray-50 transition cursor-pointer ${!notif.isRead ? "bg-blue-50" : ""}`}
                >
                  <p className="text-sm text-gray-800">{notif.message}</p>
                  <span className="text-xs text-gray-500 mt-1 block">
                    {new Date(notif.createdAt).toLocaleDateString()}
                  </span>
                  {notif.link && (
                    <Link to={notif.link} className="text-xs text-blue-600 hover:underline mt-1 inline-block">
                      View details
                    </Link>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;