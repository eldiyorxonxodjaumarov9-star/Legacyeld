"use client";

import Image from "next/image";

const integrations = [
  {
    name: "Trucker Tools",
    logo: "/images/integrations/trucker-tools.jpg",
    width: 96,
    height: 96,
    description:
      "Digital load tracking, freight matching, and real-time visibility for brokers and carriers.",
    href: "https://www.truckertools.com/",
    logoPad: true,
  },
  {
    name: "Trucker Cloud",
    logo: "/images/integrations/trucker-cloud.png",
    width: 220,
    height: 48,
    description:
      "Unified telematics data platform connecting ELD and camera systems for fleet risk insights.",
    href: "https://www.truckercloud.com/",
  },
  {
    name: "Axle",
    logo: "/images/integrations/axle.svg",
    width: 140,
    height: 44,
    description:
      "Universal telematics API that standardizes ELD and fleet data across logistics platforms.",
    href: "https://www.drumkit.ai/blog/introducing-axle-how-weve-built-atlas-and-apollo",
  },
  {
    name: "RMIS Telematics",
    logo: "/images/integrations/rmis.png",
    width: 88,
    height: 88,
    description:
      "Automated carrier onboarding, insurance monitoring, and compliance management for brokers.",
    href: "https://truckstop.com/product/carrier-onboarding/",
    logoPad: true,
  },
  {
    name: "Highway",
    logo: "/images/integrations/highway.svg",
    width: 160,
    height: 24,
    description:
      "Carrier identity verification, secure onboarding, and automated compliance monitoring.",
    href: "https://highway.com/",
  },
];

export default function Integrations() {
  return (
    <section id="integrations" className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 section-glow" />
      <div className="absolute inset-0 grid-pattern opacity-25" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-950 via-transparent to-navy-950" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="mb-3 inline-block text-xs font-semibold tracking-[0.3em] text-accent-secondary">
            INTEGRATIONS
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Integrations
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-text-muted sm:text-base">
            Connect your essential third-party apps to benefit from real-time
            data, improve efficiencies, and reduce operational costs.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-5">
          {integrations.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card glass-card-hover group flex w-full max-w-[340px] flex-col items-center rounded-2xl border border-white/10 px-6 py-8 text-center transition-all duration-300 sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.875rem)]"
            >
              <div
                className={`mb-6 flex h-28 w-full items-center justify-center rounded-xl border border-white/10 ${
                  item.logoPad
                    ? "bg-white/90 p-4"
                    : "bg-white/[0.04] px-4 py-5"
                }`}
              >
                <Image
                  src={item.logo}
                  alt={`${item.name} logo`}
                  width={item.width}
                  height={item.height}
                  className="max-h-16 w-auto object-contain"
                />
              </div>

              <h3 className="mb-3 text-lg font-semibold text-white">
                {item.name}
              </h3>
              <p className="max-w-[280px] text-sm leading-relaxed text-text-muted">
                {item.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
