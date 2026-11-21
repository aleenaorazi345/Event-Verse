import Event from "../models/Event.js";
import Registration from "../models/Registration.js";
import User from "../models/User.js";
// Import the helper function we created
import { createNotification } from "./notificationController.js"; 

// @desc Create a new event
export const createEvent = async (req, res, next) => {
  try {
    const { title, description, date, location, category, capacity } = req.body;

    const event = await Event.create({
      title,
      description,
      date,
      location,
      category,
      capacity,
      organizer: req.user._id,
    });

    // 🔔 NOTIFICATIONS: Notify all students using our helper function
    try {
      const students = await User.find({ role: "student" }).select("_id");
      if (students.length > 0) {
        // Using Promise.all for faster processing
        const notificationPromises = students.map((student) =>
          createNotification(
            student._id,          // recipient
            req.user._id,         // sender
            "event_created",      // type
            `New event posted: ${event.title}`, // message
            `/events/${event._id}` // link
          )
        );
        await Promise.all(notificationPromises);
      }
    } catch (notifError) {
      console.error("⚠️ Notification Error (Create Event):", notifError.message);
    }

    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

// @desc Register logged-in student for an event
export const registerForEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Check if already registered
    const existingReg = await Registration.findOne({
      student: req.user._id,
      event: event._id,
    });
    
    if (existingReg) {
      return res.status(400).json({ message: "You are already registered for this event" });
    }

    // Create registration
    const registration = await Registration.create({
      student: req.user._id,
      event: event._id,
    });

    // 🔔 NOTIFICATIONS
    try {
      // 1. Notify the STUDENT
      await createNotification(
        req.user._id,          // recipient
        req.user._id,          // sender
        "event_registration",  // type
        `You successfully registered for ${event.title}.`, // message
        `/my-registrations`    // link
      );

      // 2. Notify the ORGANIZER (Only if the organizer is NOT the one registering)
      if (event.organizer.toString() !== req.user._id.toString()) {
        await createNotification(
          event.organizer,       // recipient
          req.user._id,          // sender
          "event_registration",  // type
          `${req.user.name} registered for your event: ${event.title}`, // message
          `/organizer/events/${event._id}/registrations` // link
        );
      }
    } catch (notifError) {
      console.error("⚠️ Notification Error (Register):", notifError.message);
    }

    res.status(201).json({ message: "Successfully registered!", registration });
  } catch (error) {
    next(error);
  }
};

// @desc Get events created by the logged-in organizer
export const getMyEvents = async (req, res, next) => {
  try {
    const events = await Event.find({ organizer: req.user._id }).sort("date");
    res.json(events);
  } catch (error) {
    next(error);
  }
};

// @desc Get ALL events (for students)
export const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find().populate("organizer", "name email").sort("date"); 
    res.json(events);
  } catch (error) {
    next(error);
  }
};

// @desc Get Attendees
export const getEventAttendees = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to view attendees" });
    }

    const attendees = await Registration.find({ event: event._id })
      .populate("student", "name email")
      .sort("-createdAt");

    res.json(attendees);
  } catch (error) {
    next(error);
  }
};

// @desc Delete an event
export const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to delete this event" });
    }

    // 🔔 NOTIFICATIONS: Notify registered students before deleting
    try {
      const registrations = await Registration.find({ event: event._id });
      const notificationPromises = registrations.map((reg) =>
        createNotification(
          reg.student,           // recipient
          req.user._id,          // sender
          "event_cancelled",     // type
          `Cancelled: The event "${event.title}" has been cancelled.`, // message
          `/events`              // link
        )
      );
      await Promise.all(notificationPromises);
    } catch (notifError) {
      console.error("⚠️ Notification Error (Delete Event):", notifError.message);
    }

    // Delete registrations and event
    await Registration.deleteMany({ event: event._id });
    await event.deleteOne();
    
    res.json({ message: "Event removed and students notified" });
  } catch (error) {
    next(error);
  }
};

// @desc Get a single event by ID
export const getEventDetails = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate("organizer", "name email");
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    next(error);
  }
};

// @desc Get My Registrations
export const getMyRegistrations = async (req, res, next) => {
  try {
    const registrations = await Registration.find({ student: req.user._id })
      .populate({
        path: "event",
        populate: { path: "organizer", select: "name email" },
      })
      .sort("-createdAt");
      
    res.json(registrations);
  } catch (error) {
    next(error);
  }
};