"use client";

import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { LogoIcon } from "@/components/Logo";
import { SIGN_IN_URL } from "@/lib/site-config";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
  { label: "Integrations", href: "#integrations" },
  { label: "FAQ", href: "#faq" },
  { label: "Support", href: "#support" },
];

const signInClassName =
  "hidden rounded-lg border border-accent-primary/30 bg-accent-primary/10 px-5 py-2 text-sm font-semibold text-accent-primary transition-all hover:border-accent-primary/60 hover:bg-accent-primary/20 sm:inline-block";

function getSectionId(href: string) {
  return href.replace("#", "");
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("services");

  const updateActiveSection = useCallback(() => {
    const scrollPos = window.scrollY + 120;

    let current = getSectionId(navLinks[0].href);

    for (const link of navLinks) {
      const id = getSectionId(link.href);
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollPos) {
        current = id;
      }
    }

    setActiveSection(current);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && navLinks.some((link) => getSectionId(link.href) === hash)) {
      setActiveSection(hash);
    }

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("hashchange", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("hashchange", updateActiveSection);
    };
  }, [updateActiveSection]);

  function handleNavClick(href: string) {
    setActiveSection(getSectionId(href));
    setMobileOpen(false);
  }

  function desktopLinkClass(isActive: boolean) {
    return [
      "relative pb-1 text-sm transition-colors",
      isActive
        ? "font-semibold text-accent-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded-full after:bg-accent-primary"
        : "font-medium text-text-muted hover:text-accent-primary",
    ].join(" ");
  }

  function mobileLinkClass(isActive: boolean) {
    return [
      "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
      isActive
        ? "bg-accent-primary/10 text-accent-primary"
        : "text-slate-300 hover:bg-white/5 hover:text-accent-primary",
    ].join(" ");
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-navy-950/85 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:gap-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 shrink-0 items-center gap-3 sm:gap-4">
          <a
            href="#"
            className="flex shrink-0 items-center justify-center"
            aria-label="Legacy Safety Solutions"
          >
            <LogoIcon
              width={200}
              height={130}
              priority
              className="h-11 w-auto sm:h-12 lg:h-14"
            />
          </a>

          <div className="hidden min-w-0 border-l border-white/10 pl-3 sm:block sm:pl-4">
            <span className="block text-xs font-bold tracking-wider text-white lg:text-sm">
              LEGACY SAFETY SOLUTIONS
            </span>
            <span className="block text-[10px] font-medium text-text-muted">
              FMCSA Certified ELD & Fleet Management
            </span>
          </div>
        </div>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === getSectionId(link.href);
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={desktopLinkClass(isActive)}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a href={SIGN_IN_URL} className={signInClassName}>
            Sign In
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-text-muted transition-colors hover:bg-white/5 hover:text-white lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/5 bg-navy-900/98 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-1 px-4 py-4">
            <div className="mb-2 px-4 py-2 sm:hidden">
              <span className="block text-xs font-bold tracking-wider text-white">
                LEGACY SAFETY SOLUTIONS
              </span>
              <span className="text-[10px] text-text-muted">
                FMCSA Certified ELD & Fleet Management
              </span>
            </div>
            {navLinks.map((link) => {
              const isActive = activeSection === getSectionId(link.href);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={mobileLinkClass(isActive)}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </a>
              );
            })}
            <a
              href={SIGN_IN_URL}
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-lg border border-accent-primary/30 bg-accent-primary/10 px-4 py-3 text-center text-sm font-semibold text-accent-primary"
            >
              Sign In
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
