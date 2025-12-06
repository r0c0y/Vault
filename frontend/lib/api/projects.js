import API from "./client";

export const getProjects = (params) => API.get("/projects", { params });
export const getProjectById = (id) => API.get(`/projects/${id}`);
export const createProject = (data) => API.post("/projects", data);
export const updateProject = (id, data) => API.put(`/projects/${id}`, data);
export const deleteProject = (id) => API.delete(`/projects/${id}`);
export const getMyProjects = (params) => API.get("/projects/user/me", { params });
export const getUserProjects = (userId, params) => API.get(`/projects/user/${userId}`, { params });
export const getRandomProjects = () => API.get('/projects/match');
export const voteProject = (id) => API.post(`/projects/${id}/vote`);
