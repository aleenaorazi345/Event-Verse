import { body, validationResult } from "express-validator";

export const validateEvent = [
  body("title").trim().notEmpty().withMessage("Title is required").escape(),
  body("description").trim().notEmpty().withMessage("Description is required").escape(),
  body("location").trim().notEmpty().withMessage("Location is required").escape(),
  body("capacity").isInt({ min: 1 }).withMessage("Capacity must be a number"),
  body("date").isISO8601().toDate().withMessage("Valid date is required"),
];

export const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  next();
};