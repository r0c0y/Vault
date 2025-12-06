import API from "./client";

export const login = (email, password) => API.post("/auth/login", { email, password });
export const signup = (name, email, password) => API.post("/auth/signup", { name, email, password });
export const logout = () => API.post("/auth/logout");
export const getProfile = () => API.get("/auth/me");
export const refreshToken = () => API.post("/auth/refresh").then((res) => res.data);
