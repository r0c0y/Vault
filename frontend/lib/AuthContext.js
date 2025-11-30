import React, { createContext, useContext, useEffect, useState } from "react";
import api, { refreshToken } from "./api";
import Router from "next/router";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Try to refresh on mount (if refresh cookie exists)
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const data = await refreshToken();
        if (!mounted) return;

        if (data?.accessToken) {
          setAccessToken(data.accessToken);
          setUser(data.user);
          api.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;
        } else {
          setAccessToken(null);
          setUser(null);
          delete api.defaults.headers.common["Authorization"];
        }
      } catch (err) {
        setAccessToken(null);
        setUser(null);
        delete api.defaults.headers.common["Authorization"];
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // Update headers when accessToken changes (e.g. login/signup)
  useEffect(() => {
    if (accessToken) {
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [accessToken]);

  // Login: call backend login endpoint
  async function login(email, password) {
    const res = await api.post("/auth/login", { email, password });
    const { accessToken: at, user: u } = res.data;
    setAccessToken(at);
    setUser(u);
    return res.data;
  }

  // Signup: call backend signup endpoint
  async function signup(name, email, password) {
    const res = await api.post("/auth/signup", { name, email, password });
    const { accessToken: at, user: u } = res.data;
    setAccessToken(at);
    setUser(u);
    return res.data;
  }

  // Logout: clear cookie & remove refresh token from DB
  async function logout() {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      // Ignore errors
    } finally {
      setAccessToken(null);
      setUser(null);
      Router.push("/login");
    }
  }

  // Helper to call protected API endpoints with current access token
  async function authFetch(url, options = {}) {
    const headers = options.headers || {};
    if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;

    try {
      const res = await api({
        url,
        ...options,
        headers,
      });
      return res;
    } catch (err) {
      // If 401, try to refresh once
      if (err.response?.status === 401) {
        const refreshed = await refreshToken();
        if (refreshed?.accessToken) {
          setAccessToken(refreshed.accessToken);
          setUser(refreshed.user);

          // Retry original request with new token
          const headers2 = {
            ...(options.headers || {}),
            Authorization: `Bearer ${refreshed.accessToken}`,
          };
          return api({ url, ...options, headers: headers2 });
        } else {
          // Cannot refresh -> forced logout
          setAccessToken(null);
          setUser(null);
          throw err;
        }
      }
      throw err;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        loading,
        login,
        signup,
        logout,
        authFetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
