import Notification from "../models/Notification.js";

// @desc Get my notifications
export const getMyNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ user: req.user._id }).sort("-createdAt");
    res.json(notifications);
  } catch (error) {
    next(error);
  }
};

// @desc Mark all as read
export const markAsRead = async (req, res, next) => {
  try {
    await Notification.updateMany({ user: req.user._id, isRead: false }, { isRead: true });
    res.json({ message: "Marked all as read" });
  } catch (error) {
    next(error);
  }
};