import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const user = await login(form.email, form.password);
      if (user.role === "organizer") navigate("/organizer");
      else if (user.role === "admin") navigate("/admin");
      else navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink-800 px-4">
      <div className="w-full max-w-md card">
        <h1 className="text-3xl font-bold text-pink-400 mb-1">Welcome back</h1>
        <p className="text-ink-300 text-sm mb-6">Sign in to EventVerse</p>

        {error && <div className="mb-4 p-3 rounded-lg bg-pink-500/10 border border-pink-500/30 text-pink-300 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink-200 mb-1.5">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@university.edu" className="input-field" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-200 mb-1.5">Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="••••••••" className="input-field" required />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-sm text-ink-300 text-center">
          Don't have an account? <Link to="/register" className="text-pink-400 hover:text-pink-300 font-medium">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;