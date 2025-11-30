import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { Trash2, Users, Folder, Eye, EyeOff, ThumbsUp, Shield, Activity, Lock, Zap, Ban, CheckCircle, Star, BarChart2, X, ExternalLink, Github, FileText } from 'lucide-react';

export default function GhostDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminSecret, setAdminSecret] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedProject, setSelectedProject] = useState(null); // For modal

  // Use the deployed API URL or local if running locally
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

  const headers = { 'x-admin-secret': adminSecret };

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
      setError('');
    } catch (err) {
      setError('Connection Failed. Invalid Secret?');
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
      setError('Failed to fetch users');
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
      setError('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const fetchProjectDetails = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/admin/projects/${id}`, { headers });
      setSelectedProject(res.data);
    } catch (err) {
      alert('Failed to fetch project details');
    }
  };

  // Actions
  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure? This will delete the user and ALL their data.')) return;
    try {
      await axios.delete(`${API_URL}/admin/users/${id}`, { headers });
      setUsers(users.filter(u => u.id !== id));
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  const handleToggleBan = async (id) => {
    try {
      const res = await axios.put(`${API_URL}/admin/users/${id}/ban`, {}, { headers });
      setUsers(users.map(u => u.id === id ? { ...u, isBanned: res.data.isBanned } : u));
    } catch (err) {
      alert('Failed to toggle ban');
    }
  };

  const handleToggleVerify = async (id) => {
    try {
      const res = await axios.put(`${API_URL}/admin/users/${id}/verify`, {}, { headers });
      setUsers(users.map(u => u.id === id ? { ...u, isVerified: res.data.isVerified } : u));
    } catch (err) {
      alert('Failed to toggle verification');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure? This cannot be undone.')) return;
    try {
      await axios.delete(`${API_URL}/admin/projects/${id}`, { headers });
      setProjects(projects.filter(p => p.id !== id));
      if (selectedProject?.id === id) setSelectedProject(null);
    } catch (err) {
      alert('Failed to delete project');
    }
  };

  const handleToggleFeature = async (id) => {
    try {
      const res = await axios.put(`${API_URL}/admin/projects/${id}/feature`, {}, { headers });
      const updated = projects.map(p => p.id === id ? { ...p, isFeatured: res.data.isFeatured } : p);
      setProjects(updated);
      if (selectedProject?.id === id) setSelectedProject({ ...selectedProject, isFeatured: res.data.isFeatured });
    } catch (err) {
      alert('Failed to toggle feature');
    }
  };

  const handleTogglePublish = async (id) => {
    try {
      const res = await axios.put(`${API_URL}/admin/projects/${id}/publish`, {}, { headers });
      const updated = projects.map(p => p.id === id ? { ...p, isPublished: res.data.isPublished } : p);
      setProjects(updated);
      if (selectedProject?.id === id) setSelectedProject({ ...selectedProject, isPublished: res.data.isPublished });
    } catch (err) {
      alert('Failed to toggle publish status');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === 'overview') fetchStats();
      if (activeTab === 'users') fetchUsers();
      if (activeTab === 'projects') fetchProjects();
    }
  }, [isAuthenticated, activeTab]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white font-mono">
        <Head><title>System Access</title></Head>
        <form onSubmit={handleLogin} className="bg-white/5 p-8 rounded-none border border-red-500/30 w-96 backdrop-blur-md shadow-[0_0_50px_rgba(220,38,38,0.1)]">
          <div className="flex justify-center mb-6">
            <Shield className="w-16 h-16 text-red-500 animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold text-center mb-2 tracking-widest text-red-500">GOD MODE</h1>
          <p className="text-red-400/50 text-xs text-center mb-8 uppercase tracking-widest">Restricted Access Level 5</p>

          <input
            type="password"
            placeholder="ENTER ACCESS KEY"
            className="w-full bg-black border border-red-900/50 rounded-none px-4 py-3 mb-4 focus:outline-none focus:border-red-500 text-red-500 placeholder-red-900/50 text-center tracking-widest"
            value={adminSecret}
            onChange={(e) => setAdminSecret(e.target.value)}
          />
          <button type="submit" className="w-full bg-red-600/20 hover:bg-red-600/40 border border-red-500/50 text-red-500 font-bold py-3 rounded-none transition-all uppercase tracking-widest hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]">
            Authenticate
          </button>
          {error && <p className="text-red-500 text-xs mt-4 text-center">{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-red-500/30">
      <Head><title>God Mode | Vault</title></Head>

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-black border-r border-white/10 p-6 z-10">
        <div className="flex items-center gap-3 mb-12 text-red-500">
          <Shield className="w-8 h-8" />
          <span className="text-xl font-bold tracking-widest">GOD MODE</span>
        </div>

        <nav className="space-y-2">
          <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-all ${activeTab === 'overview' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'hover:bg-white/5 hover:text-white'}`}>
            <Activity className="w-5 h-5" /> Overview
          </button>
          <button onClick={() => setActiveTab('users')} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-all ${activeTab === 'users' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'hover:bg-white/5 hover:text-white'}`}>
            <Users className="w-5 h-5" /> Users
          </button>
          <button onClick={() => setActiveTab('projects')} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-all ${activeTab === 'projects' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'hover:bg-white/5 hover:text-white'}`}>
            <Folder className="w-5 h-5" /> Projects
          </button>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button onClick={() => setIsAuthenticated(false)} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded border border-white/10 hover:bg-white/5 transition-all text-xs uppercase tracking-widest">
            <Lock className="w-3 h-3" /> Terminate Session
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-10 relative">
        {activeTab === 'overview' && stats && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">System Status</h2>
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-white/5 p-6 rounded border border-white/10 hover:border-red-500/30 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-500/10 rounded text-blue-400"><Users className="w-6 h-6" /></div>
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Total Users</span>
                </div>
                <div className="text-3xl font-bold text-white">{stats.users}</div>
              </div>
              <div className="bg-white/5 p-6 rounded border border-white/10 hover:border-red-500/30 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-purple-500/10 rounded text-purple-400"><Folder className="w-6 h-6" /></div>
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Projects</span>
                </div>
                <div className="text-3xl font-bold text-white">{stats.projects}</div>
              </div>
              <div className="bg-white/5 p-6 rounded border border-white/10 hover:border-red-500/30 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-green-500/10 rounded text-green-400"><Eye className="w-6 h-6" /></div>
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Views</span>
                </div>
                <div className="text-3xl font-bold text-white">{stats.views}</div>
              </div>
              <div className="bg-white/5 p-6 rounded border border-white/10 hover:border-red-500/30 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-pink-500/10 rounded text-pink-400"><ThumbsUp className="w-6 h-6" /></div>
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Votes</span>
                </div>
                <div className="text-3xl font-bold text-white">{stats.votes}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-red-900/10 p-6 rounded border border-red-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <Ban className="w-5 h-5 text-red-500" />
                  <span className="text-red-400 font-bold uppercase tracking-wider">Banned Users</span>
                </div>
                <div className="text-2xl font-bold text-white">{stats.bannedUsers || 0}</div>
              </div>
              <div className="bg-blue-900/10 p-6 rounded border border-blue-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                  <span className="text-blue-400 font-bold uppercase tracking-wider">Verified Users</span>
                </div>
                <div className="text-2xl font-bold text-white">{stats.verifiedUsers || 0}</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">User Control</h2>
            <div className="bg-white/5 rounded border border-white/10 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-black text-slate-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-medium">Identity</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Joined</th>
                    <th className="px-6 py-4 font-medium text-right">Controls</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {users.map(user => (
                    <tr key={user.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-white font-medium flex items-center gap-2">
                            {user.name}
                            {user.isVerified && <CheckCircle className="w-3 h-3 text-blue-400" />}
                          </span>
                          <span className="text-xs text-slate-500">{user.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {user.isBanned ? (
                          <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded border border-red-500/20">BANNED</span>
                        ) : (
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded border border-green-500/20">ACTIVE</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-sm">{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleToggleVerify(user.id)}
                            className={`p-2 rounded transition-colors ${user.isVerified ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30' : 'bg-white/5 text-slate-400 hover:bg-blue-500/20 hover:text-blue-400'}`}
                            title={user.isVerified ? "Revoke Verification" : "Verify User"}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleToggleBan(user.id)}
                            className={`p-2 rounded transition-colors ${user.isBanned ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-white/5 text-slate-400 hover:bg-red-500/20 hover:text-red-400'}`}
                            title={user.isBanned ? "Unban User" : "Ban User"}
                          >
                            <Ban className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDeleteUser(user.id)} className="p-2 hover:bg-red-900/50 text-red-700 rounded transition-colors" title="Delete Permanently">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">Project Control</h2>
            <div className="bg-white/5 rounded border border-white/10 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-black text-slate-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-medium">Project</th>
                    <th className="px-6 py-4 font-medium">Owner</th>
                    <th className="px-6 py-4 font-medium">Metrics</th>
                    <th className="px-6 py-4 font-medium text-right">Controls</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {projects.map(project => (
                    <tr key={project.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-white font-medium flex items-center gap-2">
                            {project.title}
                            {project.isFeatured && <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />}
                          </span>
                          <span className={`text-xs ${project.isPublished ? 'text-green-400' : 'text-yellow-400'}`}>
                            {project.isPublished ? 'PUBLISHED' : 'HIDDEN'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-sm">{project.user.name}</td>
                      <td className="px-6 py-4 text-slate-500 text-sm">
                        {project.viewCount} views • {project.voteCount} votes
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => fetchProjectDetails(project.id)}
                            className="p-2 bg-white/5 text-slate-400 hover:bg-purple-500/20 hover:text-purple-400 rounded transition-colors"
                            title="Analytics & Details"
                          >
                            <BarChart2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleTogglePublish(project.id)}
                            className={`p-2 rounded transition-colors ${project.isPublished ? 'bg-white/5 text-slate-400 hover:bg-yellow-500/20 hover:text-yellow-400' : 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'}`}
                            title={project.isPublished ? "Hide Project (Shadowban)" : "Publish Project"}
                          >
                            {project.isPublished ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => handleToggleFeature(project.id)}
                            className={`p-2 rounded transition-colors ${project.isFeatured ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' : 'bg-white/5 text-slate-400 hover:bg-yellow-500/20 hover:text-yellow-400'}`}
                            title={project.isFeatured ? "Unfeature" : "Feature Project"}
                          >
                            <Star className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDeleteProject(project.id)} className="p-2 hover:bg-red-900/50 text-red-700 rounded transition-colors" title="Delete Permanently">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Project Details Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#0D0F12] border border-white/10 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="sticky top-0 bg-[#0D0F12] border-b border-white/10 p-6 flex justify-between items-center z-10">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    {selectedProject.title}
                    {selectedProject.isFeatured && <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />}
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">by {selectedProject.user.name} ({selectedProject.user.email})</p>
                </div>
                <button onClick={() => setSelectedProject(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <div className="p-8 space-y-8">
                {/* Analytics Cards */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <div className="flex items-center gap-3 mb-2 text-green-400">
                      <Eye className="w-5 h-5" />
                      <span className="font-bold uppercase tracking-wider text-xs">Total Views</span>
                    </div>
                    <div className="text-4xl font-bold text-white">{selectedProject.viewCount}</div>
                  </div>
                  <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <div className="flex items-center gap-3 mb-2 text-pink-400">
                      <ThumbsUp className="w-5 h-5" />
                      <span className="font-bold uppercase tracking-wider text-xs">Total Votes</span>
                    </div>
                    <div className="text-4xl font-bold text-white">{selectedProject.voteCount}</div>
                  </div>
                </div>

                {/* Status & Controls */}
                <div className="flex items-center justify-between bg-white/5 p-6 rounded-xl border border-white/10">
                  <div className="flex items-center gap-4">
                    <div className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${selectedProject.isPublished ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {selectedProject.isPublished ? 'Published' : 'Hidden'}
                    </div>
                    <div className="text-slate-400 text-sm">
                      Created: {new Date(selectedProject.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleTogglePublish(selectedProject.id)}
                      className={`px-4 py-2 rounded font-medium text-sm transition-colors flex items-center gap-2 ${selectedProject.isPublished ? 'bg-white/5 text-slate-300 hover:bg-yellow-500/20 hover:text-yellow-400' : 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'}`}
                    >
                      {selectedProject.isPublished ? <><EyeOff className="w-4 h-4" /> Hide Project</> : <><Eye className="w-4 h-4" /> Publish Project</>}
                    </button>
                    <button
                      onClick={() => handleToggleFeature(selectedProject.id)}
                      className={`px-4 py-2 rounded font-medium text-sm transition-colors flex items-center gap-2 ${selectedProject.isFeatured ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' : 'bg-white/5 text-slate-300 hover:bg-yellow-500/20 hover:text-yellow-400'}`}
                    >
                      <Star className="w-4 h-4" /> {selectedProject.isFeatured ? "Unfeature" : "Feature"}
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="grid grid-cols-3 gap-8">
                  <div className="col-span-2 space-y-6">
                    <div>
                      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Description</h3>
                      <p className="text-slate-300 leading-relaxed">{selectedProject.description}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Tech Stack</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.techStack.map((tech, i) => (
                          <span key={i} className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm border border-blue-500/20">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    {selectedProject.images && selectedProject.images.length > 0 && (
                      <div>
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Gallery</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {selectedProject.images.map((img, i) => (
                            <img key={i} src={img} alt={`Project ${i}`} className="rounded-lg border border-white/10 w-full h-48 object-cover" />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Links</h3>
                      <div className="space-y-3">
                        {selectedProject.repoUrl && (
                          <a href={selectedProject.repoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 bg-white/5 rounded hover:bg-white/10 transition-colors text-slate-300">
                            <Github className="w-5 h-5" /> Repository
                          </a>
                        )}
                        {selectedProject.liveUrl && (
                          <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 bg-white/5 rounded hover:bg-white/10 transition-colors text-slate-300">
                            <ExternalLink className="w-5 h-5" /> Live Demo
                          </a>
                        )}
                        {selectedProject.documentUrl && (
                          <a href={selectedProject.documentUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 bg-white/5 rounded hover:bg-white/10 transition-colors text-slate-300">
                            <FileText className="w-5 h-5" /> Documentation
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
