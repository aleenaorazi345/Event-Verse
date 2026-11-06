import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

// Auth Pages
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import VerifyOtp from "./pages/VerifyOtp.jsx";

// Student Pages
import Dashboard from "./pages/Dashboard.jsx";
import EventDetails from "./pages/EventDetails.jsx";
import MyRegistrations from "./pages/MyRegistrations.jsx";

// Organizer Pages
import OrganizerDashboard from "./pages/organizer/Dashboard.jsx";
import CreateEvent from "./pages/organizer/CreateEvent.jsx";
import EventRegistrations from "./pages/organizer/EventRegistrations.jsx";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";

// Fallback
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />

          {/* STUDENT ROUTES (Protected - any logged in user) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/my-registrations" element={<MyRegistrations />} />
          </Route>

          {/* ORGANIZER ROUTES (Protected - organizer and admin only) */}
          <Route element={<ProtectedRoute allowedRoles={["organizer", "admin"]} />}>
            <Route path="/organizer" element={<OrganizerDashboard />} />
            <Route path="/organizer/create" element={<CreateEvent />} />
            <Route path="/organizer/event/:id" element={<EventRegistrations />} />
          </Route>

          {/* ADMIN ROUTES (Protected - admin only) */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          {/* FALLBACKS */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;