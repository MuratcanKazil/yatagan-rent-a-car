/**
 * components/ui/Container.tsx
 * Tüm bölümlerde aynı maksimum genişlik + yatay boşluğu sağlayan
 * tekrar kullanılabilir sarmalayıcı. Sayfa genelinde tutarlılık için.
 */
import type { ReactNode } from "react";

export default function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}
