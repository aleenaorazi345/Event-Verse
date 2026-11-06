import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { sendEmail } from "../utils/sendEmail.js";

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

    // 1. Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 2. Save user (unverified)
    const user = await User.create({
      name, email, password,
      role: role === "organizer" ? "organizer" : "student",
      otp,
      otpExpire: Date.now() + 10 * 60 * 1000, // Expires in 10 mins
    });

    // 3. Send Email
    const message = `Welcome to EventVerse!\n\nYour verification code is: ${otp}\n\nIt expires in 10 minutes.`;
    
    try {
      await sendEmail({
        email: user.email,
        subject: "EventVerse - Verify your Email",
        message,
      });
      res.status(201).json({ message: "OTP sent to email", email: user.email });
    } catch (err) {
      // If email fails, delete the user so they can try again
      await User.findByIdAndDelete(user._id);
      return res.status(500).json({ message: "Email could not be sent" });
    }
  } catch (error) { next(error); }
};

export const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.isVerified) return res.status(400).json({ message: "User already verified" });
    
    if (user.otp !== otp || user.otpExpire < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Mark verified and clear OTP
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpire = undefined;
    await user.save();

    // Log them in
    const token = generateToken(user._id, user.role);
    res.cookie("token", token, cookieOptions);
    
    res.json({ 
      _id: user._id, name: user.name, email: user.email, role: user.role 
    });
  } catch (error) { next(error); }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    if (!user.isVerified) {
      return res.status(401).json({ message: "Please verify your email first" });
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