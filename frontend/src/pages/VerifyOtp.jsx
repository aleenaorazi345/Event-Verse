import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const VerifyOtp = () => {
  const { verify } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const user = await verify(email, otp);
      if (user.role === "organizer") navigate("/organizer");
      else if (user.role === "admin") navigate("/admin");
      else navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink-800 px-4">
      <div className="w-full max-w-md card">
        <h1 className="text-3xl font-bold neon-text mb-1 text-center">Verify Email</h1>
        <p className="text-ink-300 text-sm mb-6 text-center">
          We sent a 6-digit code to <strong className="text-white">{email}</strong>
        </p>

        {error && <div className="mb-4 p-3 rounded-lg bg-pink-500/10 border border-pink-500/30 text-pink-400 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="123456"
              className="input-field text-center text-3xl tracking-[0.5em] font-mono"
              required
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
            {loading ? "Verifying..." : "Verify Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;