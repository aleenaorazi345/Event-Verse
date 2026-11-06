import express from "express";
import { register, login, logout, getMe } from "../controllers/authController.js";
import { validateRegister, validateLogin, handleValidation } from "../validators/authValidator.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", validateRegister, handleValidation, register);
router.post("/login", validateLogin, handleValidation, login);
router.post("/logout", logout);
router.get("/me", protect, getMe);

export default router;