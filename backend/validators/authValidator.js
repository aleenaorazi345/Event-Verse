import { body, validationResult } from "express-validator";

export const validateRegister = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 4 }).withMessage("Password must be at least 4 characters"),
  body("role").optional().isIn(["student", "organizer"]).withMessage("Role must be student or organizer"),
];

export const validateLogin = [
  body("email").isEmail().withMessage("Valid email required"),
  body("password").notEmpty().withMessage("Password required"),
];

export const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
  }
  next(); // <--- THIS is the critical part
};