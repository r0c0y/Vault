import API from "./client";

export const getUserProfile = (id) => API.get(`/auth/users/${id}`);
export const followUser = (userId) => API.post(`/auth/users/${userId}/follow`);
export const unfollowUser = (userId) => API.delete(`/auth/users/${userId}/follow`);
export const updateProfile = (data) => API.put('/auth/profile', data);
