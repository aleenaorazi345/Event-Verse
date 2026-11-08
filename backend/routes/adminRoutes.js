import express from "express";
import { 
  getAllUsers, 
  deleteUser, 
  getAllEventsAdmin, 
  deleteEventAdmin 
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Apply protect and authorize to ALL routes in this file
router.use(protect, authorize("admin"));

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.get("/events", getAllEventsAdmin);
router.delete("/events/:id", deleteEventAdmin);

export default router;