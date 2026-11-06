import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import VerifyOtp from "./pages/VerifyOtp.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import OrganizerDashboard from "./pages/organizer/Dashboard.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import NotFound from "./pages/NotFound.jsx";
import CreateEvent from "./pages/organizer/CreateEvent.jsx";
import EventRegistrations from "./pages/organizer/EventRegistrations.jsx";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route element={<ProtectedRoute allowedRoles={["organizer", "admin"]} />}>
            <Route path="/organizer" element={<OrganizerDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["organizer", "admin"]} />}>
  <Route path="/organizer" element={<OrganizerDashboard />} />
  <Route path="/organizer/create" element={<CreateEvent />} /> {/* NEW ROUTE */}
</Route>
<Route element={<ProtectedRoute allowedRoles={["organizer", "admin"]} />}>
  <Route path="/organizer" element={<OrganizerDashboard />} />
  <Route path="/organizer/create" element={<CreateEvent />} />
  <Route path="/organizer/event/:id" element={<EventRegistrations />} /> {/* NEW ROUTE */}
</Route>

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;