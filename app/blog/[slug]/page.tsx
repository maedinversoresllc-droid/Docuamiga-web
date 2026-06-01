"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, Clock, Calendar, Globe } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { LanguageProvider, useLang } from "@/context/language-context"
import { blogPosts, type ContentItem } from "@/lib/blog-posts"
import { t } from "@/lib/i18n"
import { useState } from "react"

const CALENDAR_URL = "https://calendar.app.google/ES2H858yLXX1LF1A9"

/* ── render a content item (paragraph or bullet list) ── */
function ContentBlock({ item }: { item: ContentItem }) {
  if (typeof item === "string") {
    return <p className="text-gray-700 text-lg leading-[1.85] mb-5">{item}</p>
  }
  return (
    <ul className="mb-5 space-y-2.5 pl-1">
      {item.list.map((bullet, i) => (
        <li key={i} className="flex items-start gap-3 text-gray-700 text-lg leading-relaxed">
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#e0197d] shrink-0" />
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  )
}

/* ── main article component ── */
function BlogArticle() {
  const params = useParams()
  const slug = params.slug as string
  const { lang, setLang } = useLang()
  const txNav = t[lang].nav

  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6">
        <h1 className="text-3xl font-bold text-[#1a1024]">Post not found</h1>
        <Link href="/" className="text-[#e0197d] font-semibold hover:underline">
          ← Back to home
        </Link>
      </div>
    )
  }

  const content = post[lang]
  const catColors: Record<string, string> = {
    "EB-1A Tips": "bg-blue-500",
    "Process": "bg-[#e0197d]",
    "News": "bg-purple-500",
    "Consejos EB-1A": "bg-blue-500",
    "Proceso": "bg-[#e0197d]",
    "Noticias": "bg-purple-500",
  }

  return (
    <>
      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/logo-transparent.png"
              alt="DocuAmiga"
              width={160}
              height={48}
              priority
              className="object-contain"
            />
          </Link>
          <div className="flex items-center gap-5">
            <Link
              href="/#blog"
              className="hidden md:flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#1a1024] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {lang === "en" ? "All articles" : "Todos los artículos"}
            </Link>
            <div className="flex items-center gap-2 text-sm">
              <Globe className="w-4 h-4 text-gray-400" />
              <button
                onClick={() => setLang("en")}
                className={cn("font-semibold transition-colors", lang === "en" ? "text-[#e0197d]" : "text-gray-400 hover:text-gray-700")}
              >EN</button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => setLang("es")}
                className={cn("font-semibold transition-colors", lang === "es" ? "text-[#e0197d]" : "text-gray-400 hover:text-gray-700")}
              >ES</button>
            </div>
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#e0197d] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#c4166c] transition-colors"
            >
              {txNav.getStarted}
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero image ── */}
      <div className="relative h-[340px] md:h-[480px] overflow-hidden">
        <Image
          src={post.coverImage}
          alt={content.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1024]/80 via-[#1a1024]/30 to-transparent" />
        <motion.div
          className="absolute bottom-0 left-0 right-0 px-6 pb-10 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <span className={cn("text-xs font-bold text-white px-3 py-1.5 rounded-full mb-4 inline-block", catColors[content.cat] ?? "bg-gray-500")}>
            {content.cat}
          </span>
          <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight mt-2">
            {content.title}
          </h1>
          <div className="flex items-center gap-5 mt-4 text-white/60 text-sm">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> {post.readTime}
            </span>
          </div>
        </motion.div>
      </div>

      {/* ── Article body ── */}
      <main className="max-w-3xl mx-auto px-6 py-14">
        {/* Intro */}
        <motion.p
          className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-12 font-light border-l-4 border-[#e0197d] pl-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {content.intro}
        </motion.p>

        {/* Sections */}
        {content.sections.map((section, si) => (
          <section key={si} className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1024] mb-5 leading-snug">
              {section.heading}
            </h2>
            {section.body.map((item, bi) => (
              <ContentBlock key={bi} item={item} />
            ))}
          </section>
        ))}

        {/* ── CTA box ── */}
        <div className="mt-16 bg-gradient-to-br from-[#1a1024] to-[#2d1b4e] rounded-3xl p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#e0197d]/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          </div>
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 border border-[#e0197d]/40 rounded-full px-4 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 bg-[#e0197d] rounded-full animate-pulse" />
              <span className="text-[#e0197d] text-sm font-semibold uppercase tracking-widest">DocuAmiga</span>
            </span>
            <p className="text-white text-xl md:text-2xl font-semibold leading-snug mb-8 max-w-xl mx-auto">
              {content.ctaText}
            </p>
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#e0197d] text-white font-bold px-10 py-4 rounded-full text-base hover:bg-[#c4166c] hover:scale-105 transition-all shadow-lg shadow-[#e0197d]/30"
            >
              {lang === "en" ? "Get Your Free Consultation" : "Consulta gratuita"}
            </a>
            <p className="text-white/40 text-sm mt-4">
              {lang === "en" ? "No commitment · 100% virtual" : "Sin compromiso · 100% virtual"}
            </p>
          </div>
        </div>

        {/* ── Back link ── */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-[#e0197d] font-semibold hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            {lang === "en" ? "Back to all articles" : "Volver a todos los artículos"}
          </Link>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-[#1a1024] text-white py-10 px-6 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Image src="/logo-transparent.png" alt="DocuAmiga" width={120} height={36} className="object-contain brightness-0 invert" />
            <span className="text-gray-500 text-sm">📍 Miami · New York · Worldwide</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a href="mailto:hello@docuamiga.com" className="hover:text-white transition-colors">hello@docuamiga.com</a>
            <a href="https://www.instagram.com/edithteorienta/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
            <Link href="/" className="hover:text-white transition-colors">
              {lang === "en" ? "Home" : "Inicio"}
            </Link>
          </div>
          <p className="text-gray-600 text-xs">© 2026 DocuAmiga. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}

/* ── page wrapper ── */
export default function BlogPostPage() {
  return (
    <LanguageProvider>
      <BlogArticle />
    </LanguageProvider>
  )
}
