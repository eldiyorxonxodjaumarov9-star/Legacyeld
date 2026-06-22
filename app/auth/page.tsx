"use client";

import { Suspense, useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, AlertCircle, UserPlus, LogIn } from "lucide-react";
import { useAuth } from "@/context/AuthProvider";
import { LogoIcon } from "@/components/Logo";

function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const { login, register } = useAuth();

  const [mode, setMode] = useState<"register" | "login">(
    from === "chat" ? "register" : "register"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      if (mode === "login") {
        await login(
          formData.get("email") as string,
          formData.get("password") as string
        );
      } else {
        await register({
          firstName: formData.get("firstName") as string,
          lastName: formData.get("lastName") as string,
          email: formData.get("email") as string,
          password: formData.get("password") as string,
          message: (formData.get("message") as string) || undefined,
        });
      }

      if (from === "chat") {
        router.push("/?chat=open");
      } else {
        router.push("/");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-navy-950 px-4 py-12">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />

      <div className="relative mx-auto max-w-md">
        <Link href="/" className="mb-8 flex justify-center">
          <LogoIcon width={180} height={117} className="h-14 w-auto sm:h-16" />
        </Link>

        <div className="glass-card rounded-2xl p-6 sm:p-8">
          <h1 className="mb-2 text-center text-2xl font-bold text-white">
            {mode === "register" ? "Create Account" : "Sign In"}
          </h1>
          <p className="mb-6 text-center text-sm text-text-muted">
            {from === "chat"
              ? "Register or sign in to use live chat support."
              : mode === "register"
                ? "Register to access live chat and support."
                : "Sign in with your registered email."}
          </p>

          <div className="mb-6 flex rounded-xl border border-white/10 bg-white/[0.03] p-1">
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setError(null);
              }}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all ${
                mode === "register"
                  ? "bg-accent-primary/15 text-accent-primary"
                  : "text-text-muted hover:text-white"
              }`}
            >
              <UserPlus className="h-4 w-4" />
              Register
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError(null);
              }}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all ${
                mode === "login"
                  ? "bg-accent-primary/15 text-accent-primary"
                  : "text-text-muted hover:text-white"
              }`}
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </button>
          </div>

          {error && (
            <div className="mb-4 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-1.5 block text-xs font-medium text-text-muted"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      disabled={loading}
                      className="w-full rounded-xl border border-white/10 bg-[#020817]/50 px-4 py-3 text-sm text-white outline-none focus:border-accent-primary/50 focus:ring-2 focus:ring-accent-primary/15 disabled:opacity-50"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-1.5 block text-xs font-medium text-text-muted"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      disabled={loading}
                      className="w-full rounded-xl border border-white/10 bg-[#020817]/50 px-4 py-3 text-sm text-white outline-none focus:border-accent-primary/50 focus:ring-2 focus:ring-accent-primary/15 disabled:opacity-50"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-xs font-medium text-text-muted"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    disabled={loading}
                    className="w-full resize-none rounded-xl border border-white/10 bg-[#020817]/50 px-4 py-3 text-sm text-white outline-none focus:border-accent-primary/50 focus:ring-2 focus:ring-accent-primary/15 disabled:opacity-50"
                    placeholder="How can we help your fleet?"
                  />
                </div>
              </>
            )}

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-xs font-medium text-text-muted"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                disabled={loading}
                className="w-full rounded-xl border border-white/10 bg-[#020817]/50 px-4 py-3 text-sm text-white outline-none focus:border-accent-primary/50 focus:ring-2 focus:ring-accent-primary/15 disabled:opacity-50"
                placeholder="john@company.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-medium text-text-muted"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                disabled={loading}
                className="w-full rounded-xl border border-white/10 bg-[#020817]/50 px-4 py-3 text-sm text-white outline-none focus:border-accent-primary/50 focus:ring-2 focus:ring-accent-primary/15 disabled:opacity-50"
                placeholder={mode === "register" ? "Min. 6 characters" : "Your password"}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {mode === "register" ? "Registering..." : "Signing in..."}
                </>
              ) : mode === "register" ? (
                "Create Account"
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-text-muted">
            <Link href="/" className="text-accent-primary hover:text-accent-secondary">
              ← Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-navy-950">
          <Loader2 className="h-8 w-8 animate-spin text-accent-primary" />
        </div>
      }
    >
      <AuthForm />
    </Suspense>
  );
}
