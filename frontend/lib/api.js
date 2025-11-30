import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api",
  withCredentials: true,
});

export const login = (email, password) => API.post("/auth/login", { email, password });
export const signup = (name, email, password) => API.post("/auth/signup", { name, email, password });
export const logout = () => API.post("/auth/logout");
export const getProfile = () => API.get("/auth/me");
export const refreshToken = () => API.post("/auth/refresh").then((res) => res.data);

// Project APIs
export const getProjects = (params) => API.get("/projects", { params });
export const getProjectById = (id) => API.get(`/projects/${id}`);
export const createProject = (data) => API.post("/projects", data);
export const updateProject = (id, data) => API.put(`/projects/${id}`, data);
export const deleteProject = (id) => API.delete(`/projects/${id}`);
export const getMyProjects = (params) => API.get("/projects/user/me", { params });
export const getUserProfile = (id) => API.get(`/auth/users/${id}`);
export const getUserProjects = (userId, params) => API.get(`/projects/user/${userId}`, { params });
export const followUser = (userId) => API.post(`/auth/users/${userId}/follow`);
export const unfollowUser = (userId) => API.delete(`/auth/users/${userId}/follow`);
export const updateProfile = (data) => API.put('/auth/profile', data);
export const getRandomProjects = () => API.get('/projects/match');
export const voteProject = (id) => API.post(`/projects/${id}/vote`);

export default API;
