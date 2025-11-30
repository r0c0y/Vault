import { useState } from "react";
import { useAuth } from "../lib/AuthContext";
import Link from "next/link";
import Router from "next/router";

export default function LoginPage() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      await login(form.email, form.password);
      Router.push("/dashboard");
    } catch (error) {
      setErr(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">
        <h1 className="text-2xl font-semibold mb-7">Sign in</h1>

        {err && <div className="text-red-600 mb-4 text-sm">{err}</div>}

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            className="w-full p-3 border rounded"
          />

          <input
            required
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Password"
            className="w-full p-3 border rounded"
          />

          <button
            disabled={loading}
            className="w-full py-3 rounded bg-slate-800 text-white disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-4 text-sm text-slate-600">
          Don't have an account?{" "}
          <Link href="/signup" className="text-slate-800 font-medium">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}
