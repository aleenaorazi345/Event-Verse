import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const user = await User.create({
      name, email, password,
      role: role === "organizer" ? "organizer" : "student",
    });

    const token = generateToken(user._id, user.role);
    res.cookie("token", token, cookieOptions);
    res.status(201).json({ _id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (error) { next(error); }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = generateToken(user._id, user.role);
    res.cookie("token", token, cookieOptions);
    res.json({ _id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (error) { next(error); }
};

export const logout = (req, res) => {
  res.cookie("token", "", { ...cookieOptions, maxAge: 0 });
  res.json({ message: "Logged out" });
};

export const getMe = async (req, res) => {
  res.json({ _id: req.user._id, name: req.user.name, email: req.user.email, role: req.user.role });
};