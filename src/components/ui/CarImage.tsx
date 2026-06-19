"use client";

/**
 * src/components/ui/CarImage.tsx
 * Araç fotoğrafı + hata durumunda gizlenme (onError).
 * Bu küçük parça client component çünkü onError bir event handler'dır
 * ve server component prop'u olarak geçirilemez.
 */

export default function CarImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  );
}
