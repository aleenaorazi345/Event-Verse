import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { ArrowLeft } from "lucide-react"; 
const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setLoading(true);
    
    try {
      // register() now returns { message, email } from the backend
      const res = await register(form);
      
      // Redirect to Verify Page and pass the email
      navigate("/verify-otp", { state: { email: res.email } });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink-800 px-4">
      <button 
  onClick={() => navigate("/")} 
  className="absolute top-6 left-6 flex items-center gap-2 text-ink-300 hover:text-neon-500 transition font-medium"
>
  <ArrowLeft size={18} /> Back to Home
</button>
      <div className="w-full max-w-md card">
        <h1 className="text-3xl font-bold neon-text mb-1">Create account</h1>
        <p className="text-ink-300 text-sm mb-6">Join EventVerse and start exploring events</p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-pink-500/10 border border-pink-500/30 text-pink-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink-200 mb-1.5">Full name</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Aleena Orazi" className="input-field" required />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-ink-200 mb-1.5">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@university.edu" className="input-field" required />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-ink-200 mb-1.5">Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="••••••••" className="input-field" minLength={6} required />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-ink-200 mb-1.5">I am a...</label>
            <div className="grid grid-cols-2 gap-3">
              {["student", "organizer"].map((r) => (
                <button 
                  type="button" 
                  key={r} 
                  onClick={() => setForm({ ...form, role: r })}
                  className={`py-2.5 rounded-lg border font-medium capitalize transition-all ${
                    form.role === r 
                      ? "border-pink-500 bg-pink-500/10 text-pink-400" 
                      : "border-ink-500 text-ink-300 hover:border-ink-400"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
            {loading ? "Sending OTP..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-sm text-ink-300 text-center">
          Already have an account? <Link to="/login" className="text-pink-400 hover:text-pink-300 font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;