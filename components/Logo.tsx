import Image from "next/image";

type LogoIconProps = {
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
};

/** Faqat logo rasmi — matnsiz */
export function LogoIcon({
  width = 120,
  height = 78,
  className = "",
  priority = false,
}: LogoIconProps) {
  return (
    <Image
      src="/images/logo.png"
      alt="Legacy Safety Solutions"
      width={width}
      height={height}
      className={`h-auto w-auto object-contain ${className}`}
      priority={priority}
    />
  );
}

type LogoProps = {
  variant?: "default" | "footer" | "auth";
  showText?: boolean;
  className?: string;
};

const iconSizes = {
  default: { className: "h-10 w-auto max-w-[4.5rem]", width: 100, height: 65 },
  footer: { className: "h-11 w-auto max-w-[5rem]", width: 110, height: 72 },
  auth: { className: "h-16 w-auto max-w-[7rem] sm:h-[4.5rem] sm:max-w-[8rem]", width: 160, height: 104 },
};

/** Footer / auth — logo + matn */
export default function Logo({
  variant = "default",
  showText = true,
  className = "",
}: LogoProps) {
  const { className: iconClass, width, height } = iconSizes[variant];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`relative shrink-0 ${iconClass}`}>
        <LogoIcon width={width} height={height} className="h-full w-full" />
      </div>
      {showText && (
        <div className="min-w-0">
          <span className="block text-xs font-bold tracking-wider text-white sm:text-sm">
            LEGACY SAFETY SOLUTIONS
          </span>
          <span className="hidden text-[10px] font-medium text-text-muted sm:block">
            FMCSA Certified ELD & Fleet Management
          </span>
        </div>
      )}
    </div>
  );
}
