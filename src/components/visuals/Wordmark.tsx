/**
 * Official YellowBlocks logo (vector, supplied 9 Nov 2026).
 * public/brand/yellowblocks-logo-light.svg is the variant for dark backgrounds
 * (grey lettering lifted to light grey); yellowblocks-logo-dark.svg is the original for light backgrounds.
 */
export function Wordmark({ className = "", height = 28 }: { tone?: "ink" | "paper"; className?: string; height?: number }) {
  const width = Math.round((height * 1912) / 216);
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static SVG, no optimisation needed
    <img src="/brand/yellowblocks-logo-light.svg" alt="YellowBlocks" width={width} height={height} className={`block h-auto ${className}`} style={{ height, width }} />
  );
}

export function BlockMark({ size = 22 }: { tone?: "ink" | "paper"; size?: number }) {
  // eslint-disable-next-line @next/next/no-img-element -- static SVG
  return <img src="/brand/yellowblocks-mark-light.svg" alt="" aria-hidden="true" width={size} height={size} style={{ width: size, height: size }} />;
}
