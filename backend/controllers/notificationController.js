import Notification from "../models/Notification.js";
export const getMyNotifications = async (req, res, next) => {
  try {
    console.log("🔍 Requesting Notifications for User ID:", req.user?._id); // 👈 Debugging line

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const notifications = await Notification.find({ recipient: req.user._id })
      .populate("sender", "name role")
      .sort({ createdAt: -1 })
      .limit(20);

    console.log("📦 Found Notifications in DB:", notifications.length); // 👈 Debugging line

    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    next(error);
  }
};

// @desc Mark single as read
export const markNotificationAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      res.status(404);
      throw new Error("Notification not found");
    }
    if (notification.recipient.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized");
    }
    notification.isRead = true;
    await notification.save();
    res.json(notification);
  } catch (error) {
    next(error);
  }
};

// @desc Mark all as read
export const markAllAsRead = async (req, res, next) => {
  try {
    await Notification.updateMany(
      { recipient: req.user._id, isRead: false }, 
      { isRead: true }
    );
    res.json({ message: "Marked all as read" });
  } catch (error) {
    next(error);
  }
};

// HELPER FUNCTION (Call this from Event Controller)
export const createNotification = async (recipientId, senderId, type, message, link = "") => {
  try {
    if(!recipientId || !senderId) return; // Safety check
    await Notification.create({
      recipient: recipientId,
      sender: senderId,
      type,
      message,
      link,
    });
  } catch (error) {
    console.error("Failed to create notification:", error.message);
  }
};