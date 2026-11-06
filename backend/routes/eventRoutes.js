import express from "express";
import { 
  createEvent, 
  getMyEvents, 
  deleteEvent, 
  getAllEvents, 
  getEventAttendees,
  registerForEvent,
  getMyRegistrations,
  getEventDetails
} from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// 1. PUBLIC ROUTES
router.get("/", getAllEvents);

// 2. SPECIFIC PROTECTED ROUTES (Must be above /:id)
router.get("/my-registrations", protect, getMyRegistrations);
router.get("/my-events", protect, authorize("organizer", "admin"), getMyEvents);
router.get("/:id/attendees", protect, authorize("organizer", "admin"), getEventAttendees);

// 3. ACTIONS ON SPECIFIC EVENT
router.post("/:id/register", protect, registerForEvent);
router.post("/", protect, authorize("organizer", "admin"), createEvent);
router.delete("/:id", protect, authorize("organizer", "admin"), deleteEvent);

// 4. DYNAMIC ROUTE (Must be at the very bottom)
router.get("/:id", getEventDetails);

export default router;