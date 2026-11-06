import Event from "../models/Event.js";

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
      organizer: req.user._id, // Taken from the logged-in user
    });

    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

// @desc Get events created by the logged-in organizer
export const getMyEvents = async (req, res, next) => {
  try {
    const events = await Event.find({ organizer: req.user._id }).sort("-createdAt");
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

// @desc Get all registrations for a specific event
export const getEventAttendees = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Make sure the organizer owns this event
    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to view attendees" });
    }

    // For now, return empty until we build the Registration model
    res.json([]); 
  } catch (error) {
    next(error);
  }
};

// @desc Delete an event
export const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: "Event not found" });

    // Make sure the organizer owns this event
    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to delete this event" });
    }

    await event.deleteOne();
    res.json({ message: "Event removed" });
  } catch (error) {
    next(error);
  }
};