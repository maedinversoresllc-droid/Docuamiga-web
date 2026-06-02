import type { Metadata } from "next"
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["700", "800", "900"],
})

export const metadata: Metadata = {
  title: "DocuAmiga — Your Documentation, Organized. Your Case, Stronger.",
  description:
    "For professionals applying to EB-1A, EB-2 NIW, and O/P visas. Because immigration shouldn't add stress.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable,
        playfair.variable
      )}
    >
      <body>{children}</body>
    </html>
  )
}
