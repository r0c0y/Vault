import React, { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import { Trash2, Users, Folder, Eye, ThumbsUp, Shield, Activity, Lock, Zap } from "lucide-react";

export default function SecretDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminSecret, setAdminSecret] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Ghost Mode: Always use local bridge because Render does not have admin code
  const API_URL = "http://localhost:5001/api";

  const headers = { "x-admin-secret": adminSecret };

  const handleLogin = (e) => {
    e.preventDefault();
    if (adminSecret) {
      setIsAuthenticated(true);
      fetchStats();
    }
  };

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/admin/stats`, { headers });
      setStats(res.data);
      setError("");
    } catch (err) {
      setError("Connection Failed. Ensure Local Backend is running (npm run dev).");
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/admin/users`, { headers });
      setUsers(res.data);
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/admin/projects`, { headers });
      setProjects(res.data);
    } catch (err) {
      setError("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure? This will delete the user and ALL their data.")) return;
    try {
      await axios.delete(`${API_URL}/admin/users/${id}`, { headers });
      setUsers(users.filter(u => u.id !== id));
      alert("User deleted");
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure? This cannot be undone.")) return;
    try {
      await axios.delete(`${API_URL}/admin/projects/${id}`, { headers });
      setProjects(projects.filter(p => p.id !== id));
      alert("Project deleted");
    } catch (err) {
      alert("Failed to delete project");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === "overview") fetchStats();
      if (activeTab === "users") fetchUsers();
      if (activeTab === "projects") fetchProjects();
    }
  }, [isAuthenticated, activeTab]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0D0F12] flex items-center justify-center text-white">
        <Head><title>Ghost Admin</title></Head>
        <form onSubmit={handleLogin} className="bg-white/5 p-8 rounded-xl border border-white/10 w-96 backdrop-blur-md">
          <div className="flex justify-center mb-6">
            <Shield className="w-12 h-12 text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-center mb-2">Ghost Protocol</h1>
          <p className="text-slate-400 text-xs text-center mb-6">Secure Local Bridge to Production</p>
          
          <input
            type="password"
            placeholder="Enter Admin Secret"
            className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 mb-4 focus:outline-none focus:border-blue-500 transition-colors"
            value={adminSecret}
            onChange={(e) => setAdminSecret(e.target.value)}
          />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded transition-colors">
            Access System
          </button>
          {error && <p className="text-red-400 text-sm mt-4 text-center">{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0F12] text-slate-200 font-sans">
      <Head><title>Admin Dashboard</title></Head>
      
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-black/40 border-r border-white/5 p-6 backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-10 text-blue-400">
          <Shield className="w-8 h-8" />
          <span className="text-xl font-bold tracking-wider">VAULT ADMIN</span>
        </div>
        
        <div className="mb-6 px-4 py-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-center gap-2 text-blue-400 mb-1">
            <Zap className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Bridge Active</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed">
            You are controlling the <span className="text-white font-medium">Production Database</span> via your local secure connection.
          </p>
        </div>
        
        <nav className="space-y-2">
          <button onClick={() => setActiveTab("overview")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === "overview" ? "bg-blue-500/20 text-blue-400" : "hover:bg-white/5"}`}>
            <Activity className="w-5 h-5" /> Overview
          </button>
          <button onClick={() => setActiveTab("users")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === "users" ? "bg-blue-500/20 text-blue-400" : "hover:bg-white/5"}`}>
            <Users className="w-5 h-5" /> Users
          </button>
          <button onClick={() => setActiveTab("projects")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === "projects" ? "bg-blue-500/20 text-blue-400" : "hover:bg-white/5"}`}>
            <Folder className="w-5 h-5" /> Projects
          </button>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button onClick={() => setIsAuthenticated(false)} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all">
            <Lock className="w-4 h-4" /> Lock System
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-10">
        {activeTab === "overview" && stats && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold text-white mb-8">System Overview</h2>
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400"><Users className="w-6 h-6" /></div>
                  <span className="text-xs text-slate-400 bg-white/5 px-2 py-1 rounded">Total</span>
                </div>
                <div className="text-3xl font-bold text-white">{stats.users}</div>
                <div className="text-sm text-slate-400 mt-1">Registered Developers</div>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400"><Folder className="w-6 h-6" /></div>
                  <span className="text-xs text-slate-400 bg-white/5 px-2 py-1 rounded">Total</span>
                </div>
                <div className="text-3xl font-bold text-white">{stats.projects}</div>
                <div className="text-sm text-slate-400 mt-1">Projects Showcased</div>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-green-500/20 rounded-lg text-green-400"><Eye className="w-6 h-6" /></div>
                  <span className="text-xs text-slate-400 bg-white/5 px-2 py-1 rounded">Total</span>
                </div>
                <div className="text-3xl font-bold text-white">{stats.views}</div>
                <div className="text-sm text-slate-400 mt-1">Project Views</div>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-pink-500/20 rounded-lg text-pink-400"><ThumbsUp className="w-6 h-6" /></div>
                  <span className="text-xs text-slate-400 bg-white/5 px-2 py-1 rounded">Total</span>
                </div>
                <div className="text-3xl font-bold text-white">{stats.votes}</div>
                <div className="text-sm text-slate-400 mt-1">Community Votes</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold text-white mb-8">User Management</h2>
            <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-slate-400 text-sm uppercase">
                  <tr>
                    <th className="px-6 py-4 font-medium">User</th>
                    <th className="px-6 py-4 font-medium">Email</th>
                    <th className="px-6 py-4 font-medium">Joined</th>
                    <th className="px-6 py-4 font-medium">Projects</th>
                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {users.map(user => (
                    <tr key={user.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-white font-medium">{user.name}</td>
                      <td className="px-6 py-4 text-slate-400">{user.email}</td>
                      <td className="px-6 py-4 text-slate-400">{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-slate-400">{user._count.projects}</td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => handleDeleteUser(user.id)} className="p-2 hover:bg-red-500/20 text-red-400 rounded transition-colors" title="Delete User">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold text-white mb-8">Project Management</h2>
            <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-slate-400 text-sm uppercase">
                  <tr>
                    <th className="px-6 py-4 font-medium">Project</th>
                    <th className="px-6 py-4 font-medium">Owner</th>
                    <th className="px-6 py-4 font-medium">Stats</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {projects.map(project => (
                    <tr key={project.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-white font-medium">{project.title}</td>
                      <td className="px-6 py-4 text-slate-400">
                        <div className="flex flex-col">
                          <span className="text-white">{project.user.name}</span>
                          <span className="text-xs">{project.user.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-sm">
                        {project.viewCount} views • {project.voteCount} votes
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs ${project.isPublished ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                          {project.isPublished ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => handleDeleteProject(project.id)} className="p-2 hover:bg-red-500/20 text-red-400 rounded transition-colors" title="Delete Project">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
