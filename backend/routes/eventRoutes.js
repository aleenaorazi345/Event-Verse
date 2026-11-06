import express from "express";
import { 
  createEvent, 
  getMyEvents, 
  deleteEvent, 
  getAllEvents, 
  getEventAttendees 
} from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// PUBLIC ROUTE: Anyone can see all events
router.get("/", getAllEvents);

// PROTECTED ROUTES: Only organizers/admin
router.post("/", protect, authorize("organizer", "admin"), createEvent);
router.get("/my-events", protect, authorize("organizer", "admin"), getMyEvents);
router.get("/:id/attendees", protect, authorize("organizer", "admin"), getEventAttendees);
router.delete("/:id", protect, authorize("organizer", "admin"), deleteEvent);

export default router;