"use client"
import { cn } from "@/lib/utils"

function CompassO({ size }: { size: number }) {
  const r = size * 0.42
  return (
    <svg
      width={size * 0.82}
      height={size}
      viewBox="0 0 20 24"
      aria-hidden="true"
      style={{ display: "inline-block", verticalAlign: "middle", margin: "0 -1px" }}
    >
      <circle cx="10" cy="12" r="8.5" fill="none" stroke="#1a1024" strokeWidth="2.2" />
      <line x1="10" y1="4.5" x2="10" y2="6.8" stroke="#1a1024" strokeWidth="1.6" />
      <line x1="10" y1="17.2" x2="10" y2="19.5" stroke="#1a1024" strokeWidth="1.6" />
      <line x1="2.5" y1="12" x2="4.8" y2="12" stroke="#1a1024" strokeWidth="1.6" />
      <line x1="15.2" y1="12" x2="17.5" y2="12" stroke="#1a1024" strokeWidth="1.6" />
      {/* North needle (dark) */}
      <polygon points="10,5.5 8.4,12.5 10,11.2 11.6,12.5" fill="#1a1024" />
      {/* South needle (grey) */}
      <polygon points="10,18.5 11.6,11.5 10,12.8 8.4,11.5" fill="#9ca3af" />
    </svg>
  )
}

interface DocuAmigaLogoProps {
  className?: string
  scale?: number
  darkMode?: boolean
}

export function DocuAmigaLogo({ className, scale = 1, darkMode = false }: DocuAmigaLogoProps) {
  const fontSize = Math.round(28 * scale)
  const baseStyle: React.CSSProperties = {
    fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
    fontWeight: 700,
    fontSize: `${fontSize}px`,
    lineHeight: 1,
    letterSpacing: "-0.01em",
    display: "inline",
  }

  const darkColor = darkMode ? "#ffffff" : "#1a1024"

  return (
    <div
      className={cn("flex items-center select-none", className)}
      aria-label="DocuAmiga"
    >
      <span style={{ ...baseStyle, color: darkColor }}>D</span>
      {darkMode ? (
        <span style={{ ...baseStyle, color: "#f5a023" }}>o</span>
      ) : (
        <CompassO size={fontSize} />
      )}
      <span style={{ ...baseStyle, color: darkColor }}>cu</span>
      <span
        style={{
          ...baseStyle,
          background:
            "linear-gradient(90deg, #f5a023 0%, #e84343 33%, #e0197d 66%, #7c3aed 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Amiga
      </span>
    </div>
  )
}
