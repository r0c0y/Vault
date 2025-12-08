import { useState } from "react";
import { useAuth } from "../lib/AuthContext";
import Router from "next/router";
import Link from "next/link";
import Button from '../components/shared/Button';
import Input from '../components/shared/Input';

export default function SignupPage() {
  const { signup } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      await signup(form.name, form.email, form.password);
      Router.push("/dashboard");
    } catch (error) {
      setErr(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-background">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/auth-bg-clean.png"
          alt=""
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80"></div>
      </div>

      {/* Decorative Right Brace */}
      <div className="absolute top-1/2 -translate-y-1/2 -right-10 opacity-10 blur-[1px] select-none pointer-events-none z-0">
        <img src="/assets/brace-right.webp" alt="" className="h-[600px] w-auto animate-pulse-slow" />
      </div>

      <div className="w-full max-w-md bg-surface/80 backdrop-blur-xl p-8 rounded-2xl border border-white/10 z-10">
        <h1 className="text-3xl font-heading font-bold mb-6 text-text-primary">Create account</h1>

        {err && <div className="text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-3 mb-4 text-sm">{err}</div>}

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Full name"
            className="w-full p-3 border border-white/10 rounded-lg bg-background/50 text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
          />

          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            className="w-full p-3 border border-white/10 rounded-lg bg-background/50 text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
          />

          <input
            required
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Password"
            className="w-full p-3 border border-white/10 rounded-lg bg-background/50 text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
          />

          <button
            disabled={loading}
            className="w-full py-3 rounded-lg bg-primary text-background font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-glow hover:shadow-glow-lg"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <div className="mt-6 text-sm text-text-secondary text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-medium hover:text-primary/80 transition-colors">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
