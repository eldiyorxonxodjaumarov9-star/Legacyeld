"use client";

import { Phone, Mail, MapPin, Send, Building2, Loader2, AlertCircle } from "lucide-react";
import { useState, FormEvent } from "react";
import GpsMapIllustration from "./GpsMapIllustration";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="support" className="relative isolate overflow-hidden py-20 sm:py-28">
      {/* Background image */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/contact-bg.png')" }}
        />
        <div className="absolute inset-0 bg-[#020817]/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020817]/70 via-[#020817]/50 to-[#020817]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020817]/75 via-[#020817]/40 to-[#020817]/20" />
      </div>

      {/* Subtle grid overlay */}
      <div className="pointer-events-none absolute inset-0 z-[1] grid-pattern opacity-20" />
      <div className="absolute bottom-0 left-0 right-0 z-[1] h-px bg-gradient-to-r from-transparent via-accent-primary/30 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center sm:mb-16">
          <span className="mb-3 inline-block text-xs font-semibold tracking-[0.3em] text-accent-secondary">
            SUPPORT
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-text-muted sm:text-base">
            Reach our fleet compliance team for ELD setup, support, and onboarding.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Contact info */}
          <div className="lg:col-span-4">
            <div className="contact-panel h-full rounded-2xl p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-accent-secondary/15 p-3 ring-1 ring-accent-secondary/20">
                  <Building2 className="h-6 w-6 text-accent-secondary" />
                </div>
                <div>
                  <p className="text-xs text-text-muted">Company</p>
                  <p className="font-semibold text-white">
                    Legacy Safety Solutions Inc
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href="tel:9377412543"
                  className="group flex items-center gap-4 rounded-xl border border-white/8 bg-white/[0.04] p-4 backdrop-blur-sm transition-all hover:border-accent-primary/35 hover:bg-white/[0.07]"
                >
                  <div className="rounded-lg bg-accent-primary/15 p-2.5">
                    <Phone className="h-5 w-5 text-accent-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Phone</p>
                    <p className="font-medium text-white group-hover:text-accent-primary">
                      937-741-2543 ext 989
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:support@legacyeld.com"
                  className="group flex items-center gap-4 rounded-xl border border-white/8 bg-white/[0.04] p-4 backdrop-blur-sm transition-all hover:border-accent-secondary/35 hover:bg-white/[0.07]"
                >
                  <div className="rounded-lg bg-accent-secondary/15 p-2.5">
                    <Mail className="h-5 w-5 text-accent-secondary" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Email</p>
                    <p className="font-medium text-white group-hover:text-accent-secondary">
                      support@legacyeld.com
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4 rounded-xl border border-white/8 bg-white/[0.04] p-4 backdrop-blur-sm">
                  <div className="rounded-lg bg-accent-primary/15 p-2.5">
                    <MapPin className="h-5 w-5 text-accent-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Head Office</p>
                    <p className="font-medium text-white">Carson City, NV 89701</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-5">
            <div className="contact-panel h-full rounded-2xl p-6 sm:p-8">
              {submitted ? (
                <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                  <div className="mb-4 rounded-full bg-accent-primary/20 p-4 ring-1 ring-accent-primary/30">
                    <Send className="h-8 w-8 text-accent-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    Thanks for submitting!
                  </h3>
                  <p className="text-sm text-text-muted">
                    Our team will get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm text-accent-primary transition-colors hover:text-accent-secondary"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                      <p className="text-sm text-red-300">{error}</p>
                    </div>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="mb-1.5 block text-xs font-medium text-text-muted">
                        First Name
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        disabled={loading}
                        className="w-full rounded-xl border border-white/10 bg-[#020817]/50 px-4 py-3 text-sm text-white placeholder-text-muted/50 outline-none backdrop-blur-sm transition-all focus:border-accent-primary/50 focus:ring-2 focus:ring-accent-primary/15 disabled:opacity-50"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="mb-1.5 block text-xs font-medium text-text-muted">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        disabled={loading}
                        className="w-full rounded-xl border border-white/10 bg-[#020817]/50 px-4 py-3 text-sm text-white placeholder-text-muted/50 outline-none backdrop-blur-sm transition-all focus:border-accent-primary/50 focus:ring-2 focus:ring-accent-primary/15 disabled:opacity-50"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-text-muted">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      disabled={loading}
                      className="w-full rounded-xl border border-white/10 bg-[#020817]/50 px-4 py-3 text-sm text-white placeholder-text-muted/50 outline-none backdrop-blur-sm transition-all focus:border-accent-primary/50 focus:ring-2 focus:ring-accent-primary/15 disabled:opacity-50"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-text-muted">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      disabled={loading}
                      className="w-full resize-none rounded-xl border border-white/10 bg-[#020817]/50 px-4 py-3 text-sm text-white placeholder-text-muted/50 outline-none backdrop-blur-sm transition-all focus:border-accent-primary/50 focus:ring-2 focus:ring-accent-primary/15 disabled:opacity-50"
                      placeholder="How can we help your fleet?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary group flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* GPS Map illustration */}
          <div className="lg:col-span-3">
            <GpsMapIllustration className="contact-panel h-64 lg:h-full lg:min-h-[420px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
