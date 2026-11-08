import User from "../models/User.js";
import Event from "../models/Event.js";

// @desc Get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort("-createdAt");
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// @desc Delete a user
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "You cannot delete yourself" });
    }

    await user.deleteOne();
    res.json({ message: "User removed" });
  } catch (error) {
    next(error);
  }
};

// @desc Get all events for moderation
export const getAllEventsAdmin = async (req, res, next) => {
  try {
    const events = await Event.find().populate("organizer", "name email").sort("-createdAt");
    res.json(events);
  } catch (error) {
    next(error);
  }
};

// @desc Admin delete an event (moderation)
export const deleteEventAdmin = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    await event.deleteOne();
    res.json({ message: "Event removed by admin" });
  } catch (error) {
    next(error);
  }
};