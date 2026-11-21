import { createNotification } from "./notificationController.js";

// ... apne register logic ke andar, registration save hone ke baad:
await createNotification(
  event.organizer, // Organizer ID
  req.user._id,    // Student ID
  "event_registration",
  `${req.user.name} registered for your event: ${event.title}`,
  `/organizer/events/${event._id}/registrations`
);