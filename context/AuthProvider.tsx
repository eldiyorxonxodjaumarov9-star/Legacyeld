"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { PublicUser } from "@/lib/types/user";

const TOKEN_KEY = "legacy-auth-token";

type AuthContextValue = {
  user: PublicUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    message?: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  getToken: () => string | null;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [loading, setLoading] = useState(true);

  const getToken = useCallback(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  }, []);

  const fetchMe = useCallback(async (token: string) => {
    const res = await fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      clearToken();
      setUser(null);
      return;
    }
    const data = await res.json();
    setUser(data.user);
  }, []);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    fetchMe(token).finally(() => setLoading(false));
  }, [fetchMe, getToken]);

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed.");
    saveToken(data.token);
    setUser(data.user);
  }, []);

  const register = useCallback(
    async (formData: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      message?: string;
    }) => {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed.");
      saveToken(data.token);
      setUser(data.user);
    },
    []
  );

  const logout = useCallback(async () => {
    const token = getToken();
    if (token) {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {});
    }
    clearToken();
    setUser(null);
  }, [getToken]);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, getToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
