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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">
        <h1 className="text-2xl font-semibold mb-6 text-blue-800">Create account</h1>

        {err && <div className="text-red-600 mb-4 text-sm">{err}</div>}

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Full name"
            className="w-full p-3 border rounded text-slate-900"
          />

          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            className="w-full p-3 border rounded text-slate-900"
          />

          <input
            required
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Password"
            className="w-full p-3 border rounded text-slate-900"
          />

          <button
            disabled={loading}
            className="w-full py-3 rounded bg-slate-800 text-white disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <div className="mt-4 text-sm text-slate-600">
          Already have an account?{" "}
          <Link href="/login" className="text-slate-800 font-medium">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
