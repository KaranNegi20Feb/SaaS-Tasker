import { cn } from "../../lib/utils";
import { ReactNode } from "react";

interface DotBackgroundDemoProps {
  children?: ReactNode;
}

export function DotBackgroundDemo({ children }: DotBackgroundDemoProps) {
  return (
    <div className="relative min-h-screen w-full bg-black">
      {/* Dot grid background */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )}
      />
      {/* Radial mask overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      {/* Content container fills screen and centers */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full text-center">
        {children}
      </div>
    </div>
  );
}
