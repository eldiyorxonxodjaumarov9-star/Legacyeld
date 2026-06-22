import { Phone, Mail, MapPin } from "lucide-react";
import Logo from "@/components/Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-navy-900/80">
      {/* Highway line background */}
      <div className="absolute inset-0 highway-line opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/90 to-navy-900/80" />

      {/* Truck silhouette */}
      <svg
        className="pointer-events-none absolute bottom-0 right-0 h-32 w-64 opacity-[0.04] sm:h-40 sm:w-80"
        viewBox="0 0 200 80"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="20" y="30" width="100" height="30" rx="4" />
        <rect x="120" y="38" width="50" height="22" rx="3" />
        <circle cx="45" cy="62" r="10" />
        <circle cx="85" cy="62" r="10" />
        <circle cx="145" cy="62" r="10" />
      </svg>

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <Logo variant="footer" />
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-text-muted">
              Delivering FMCSA-compliant ELD solutions and fleet management
              tools for carriers nationwide.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Navigation</h4>
            <nav className="flex flex-col gap-2.5">
              {["Services", "Features", "About", "Integrations", "FAQ", "Support"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-text-muted transition-colors hover:text-accent-primary"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Contact</h4>
            <div className="space-y-3">
              <a
                href="tel:9377412543"
                className="flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-accent-primary"
              >
                <Phone className="h-3.5 w-3.5 shrink-0" />
                937-741-2543 ext 989
              </a>
              <a
                href="mailto:support@legacyeld.com"
                className="flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-accent-primary"
              >
                <Mail className="h-3.5 w-3.5 shrink-0" />
                support@legacyeld.com
              </a>
              <p className="flex items-start gap-2 text-sm text-text-muted">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                Carson City, NV 89701
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-text-muted/70">
            &copy; {currentYear} Legacy Safety Solutions Inc. All rights reserved.
          </p>
          <p className="text-xs text-text-muted/70">
            FMCSA Compliant Electronic Logging Device Provider
          </p>
        </div>
      </div>
    </footer>
  );
}
