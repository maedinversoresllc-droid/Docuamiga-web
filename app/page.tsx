"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import {
  Search, FolderOpen, CheckCircle, Clock, ArrowRight,
  Globe, ChevronDown, Menu, X, MessageCircle,
  Sparkles, FileSearch, LayoutGrid, PackageCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { LanguageProvider, useLang } from "@/context/language-context"
import { t } from "@/lib/i18n"

/* ── constants ── */
const CALENDAR_URL = "https://calendar.app.google/ES2H858yLXX1LF1A9"

const stepColors = [
  { badge: "bg-blue-600", bg: "bg-blue-50", text: "text-blue-600" },
  { badge: "bg-orange-500", bg: "bg-orange-50", text: "text-orange-500" },
  { badge: "bg-[#e0197d]", bg: "bg-pink-50", text: "text-[#e0197d]" },
  { badge: "bg-violet-600", bg: "bg-violet-50", text: "text-violet-600" },
]

const stepIcons = [
  <Sparkles key="s" className="w-6 h-6" />,
  <FileSearch key="f" className="w-6 h-6" />,
  <LayoutGrid key="l" className="w-6 h-6" />,
  <PackageCheck key="p" className="w-6 h-6" />,
]

const stepImages = [
  // Step 1 – Discovery: warm consultation, two people with laptops at the coast
  "https://images.pexels.com/photos/7476194/pexels-photo-7476194.jpeg?auto=compress&cs=tinysrgb&w=1200&q=85",
  // Step 2 – Search: hands on documents + laptop, active document recovery
  "https://images.pexels.com/photos/8428063/pexels-photo-8428063.jpeg?auto=compress&cs=tinysrgb&w=1200&q=85",
  // Step 3 – Organization: woman organizing binders/files — from chaos to clarity
  "https://images.pexels.com/photos/8296972/pexels-photo-8296972.jpeg?auto=compress&cs=tinysrgb&w=1200&q=85",
  // Step 4 – Delivery: tidy desk with laptop and folders — complete, ready to file
  "https://images.pexels.com/photos/8297022/pexels-photo-8297022.jpeg?auto=compress&cs=tinysrgb&w=1200&q=85",
]

const blogSlugs = [
  "understanding-eb1a-criteria",
  "organizing-evidence",
  "niw-requirements-2026",
]

const blogImages = [
  "https://images.unsplash.com/photo-1568667256549-094345857637?w=600&q=80",
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
]
const blogCatColors = ["bg-blue-500", "bg-[#e0197d]", "bg-purple-500"]

/* ── animated counter ── */
function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const steps = 60
    const increment = target / steps
    const timer = setInterval(() => {
      start += increment
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 33)
    return () => clearInterval(timer)
  }, [target])
  return <>{count}</>
}

/* ══════════════════════════════════════ NAVBAR ══ */
function Navbar() {
  const { lang, setLang } = useLang()
  const tx = t[lang].nav
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Image src="/logo-transparent.png" alt="DocuAmiga" width={180} height={54} priority className="object-contain" />

        <div className="hidden md:flex items-center gap-8">
          {(["services","howItWorks","blog","questions"] as const).map((k) => (
            <a key={k} href={`#${k}`} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              {tx[k]}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-5">
          <div className="flex items-center gap-2 text-sm">
            <Globe className="w-4 h-4 text-gray-400" />
            <button onClick={() => setLang("en")} className={cn("font-semibold transition-colors", lang==="en" ? "text-[#e0197d]" : "text-gray-400 hover:text-gray-700")}>EN</button>
            <span className="text-gray-300">|</span>
            <button onClick={() => setLang("es")} className={cn("font-semibold transition-colors", lang==="es" ? "text-[#e0197d]" : "text-gray-400 hover:text-gray-700")}>ES</button>
          </div>
          <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="bg-[#e0197d] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#c4166c] transition-colors">
            {tx.getStarted}
          </a>
        </div>

        <button className="md:hidden p-1" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-gray-100 px-6 overflow-hidden"
          >
            <div className="py-4 flex flex-col gap-4">
              {(["services","howItWorks","blog","questions"] as const).map((k) => (
                <a key={k} href={`#${k}`} className="text-sm font-medium text-gray-700" onClick={() => setOpen(false)}>{tx[k]}</a>
              ))}
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-gray-400" />
                <button onClick={() => setLang("en")} className={cn("text-sm font-semibold", lang==="en"?"text-[#e0197d]":"text-gray-400")}>EN</button>
                <span className="text-gray-300">|</span>
                <button onClick={() => setLang("es")} className={cn("text-sm font-semibold", lang==="es"?"text-[#e0197d]":"text-gray-400")}>ES</button>
              </div>
              <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="bg-[#e0197d] text-white text-sm font-semibold px-5 py-2.5 rounded-full text-center" onClick={() => setOpen(false)}>{tx.getStarted}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

/* ══════════════════════════════════════ HERO — FULL BLEED PARALLAX ══ */
function HeroSection() {
  const { lang } = useLang()
  const tx = t[lang].hero
  const { scrollY } = useScroll()
  const imgY = useTransform(scrollY, [0, 800], [0, 220])
  const textY = useTransform(scrollY, [0, 600], [0, 90])
  const fade = useTransform(scrollY, [0, 500], [1, 0])

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Parallax background image */}
      <motion.div className="absolute inset-0" style={{ y: imgY, scale: 1.15 }}>
        <Image
          src="https://images.pexels.com/photos/8152740/pexels-photo-8152740.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop"
          alt="Professional immigration consultation"
          fill className="object-cover" priority
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a1024]/92 via-[#1a1024]/55 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1024]/70 via-transparent to-transparent" />

      {/* Content */}
      <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 h-full max-w-7xl mx-auto px-8 flex flex-col justify-center gap-7">
        <div className="flex flex-col gap-3 w-fit">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 w-fit">
            <span className="w-2 h-2 bg-[#e0197d] rounded-full animate-pulse" />
            <span className="text-white/80 text-sm font-medium">EB-1A · EB-2 NIW · O/P Visas</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/15 rounded-full px-4 py-2 w-fit">
            <span className="text-white/55 text-sm">📍 Miami · New York · Worldwide</span>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.05] max-w-2xl">
          {tx.heading}
        </h1>

        <p className="text-lg md:text-xl text-white/75 max-w-lg leading-relaxed">
          {tx.sub}
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#e0197d] text-white font-semibold px-8 py-4 rounded-full text-base hover:bg-[#c4166c] hover:scale-105 hover:shadow-lg hover:shadow-[#e0197d]/30 transition-all"
          >
            {tx.cta1}
          </a>
          <a href="#howItWorks" className="border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-full text-base hover:bg-white/10 hover:border-white transition-all backdrop-blur-sm">
            {tx.cta2}
          </a>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div style={{ opacity: fade }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }} className="flex flex-col items-center gap-2">
          <div className="w-0.5 h-12 bg-gradient-to-b from-white/60 to-transparent" />
          <span className="text-white/40 text-xs uppercase tracking-widest">scroll</span>
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ══════════════════════════════════════ CHALLENGE ══ */
const CINEMATIC_WORDS = {
  en: [
    { text: "Your", hl: "" },
    { text: "immigration", hl: "pink" },
    { text: "journey", hl: "" },
    { text: "deserves", hl: "" },
    { text: "organized", hl: "pink" },
    { text: "evidence.", hl: "" },
    { text: "Your", hl: "" },
    { text: "case,", hl: "gold" },
    { text: "stronger.", hl: "gold" },
  ],
  es: [
    { text: "Tu", hl: "" },
    { text: "proceso", hl: "" },
    { text: "migratorio", hl: "pink" },
    { text: "merece", hl: "" },
    { text: "evidencia", hl: "pink" },
    { text: "organizada.", hl: "" },
    { text: "Tu", hl: "" },
    { text: "caso,", hl: "gold" },
    { text: "más", hl: "gold" },
    { text: "fuerte.", hl: "gold" },
  ],
}

function ChallengeSection() {
  const { lang } = useLang()
  const tx = t[lang].challenge
  const icons = [
    <FolderOpen key="fo" className="w-6 h-6" />,
    <Search key="sr" className="w-6 h-6" />,
    <Clock key="cl" className="w-6 h-6" />,
  ]

  return (
    <section className="py-32 px-6 bg-[#0d0a16] relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-[#e0197d]/7 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-40 w-[600px] h-[600px] bg-[#4169e1]/7 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 border border-[#e0197d]/35 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 bg-[#e0197d] rounded-full animate-pulse" />
            <span className="text-[#e0197d] text-sm font-semibold uppercase tracking-widest">
              {lang === "en" ? "The Challenge" : "El Desafío"}
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white leading-[1.05] mb-5">
            {tx.heading}
          </h2>
          <p className="text-gray-400 text-xl max-w-xl">
            {lang === "en"
              ? "These are the obstacles every applicant faces."
              : "Estos son los obstáculos que enfrenta todo solicitante."}
          </p>
        </motion.div>

        {/* Challenge items — editorial horizontal list */}
        <div>
          {tx.cards.map((card, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-8 md:gap-16 py-10 md:py-12 border-t border-white/8 group cursor-default"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Oversized number */}
              <span className="text-[4.5rem] md:text-[6rem] font-black text-white/[0.06] leading-none shrink-0 w-20 md:w-28 select-none group-hover:text-[#e0197d]/18 transition-colors duration-500">
                0{i + 1}
              </span>
              {/* Text */}
              <div className="flex-1 pt-2 md:pt-4">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-[#e0197d] transition-colors duration-300 leading-snug">
                  {card.title}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed max-w-xl">{card.desc}</p>
              </div>
              {/* Icon */}
              <div className="hidden md:flex w-14 h-14 rounded-2xl border border-white/10 items-center justify-center text-white/20 shrink-0 mt-4 group-hover:border-[#e0197d]/40 group-hover:text-[#e0197d]/60 transition-all duration-300">
                {icons[i]}
              </div>
            </motion.div>
          ))}
          <div className="border-t border-white/8" />
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════ CINEMATIC WORD-REVEAL STRIP ══ */
function CinematicStrip() {
  const { lang } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const [litCount, setLitCount] = useState(0)

  useEffect(() => {
    const words = CINEMATIC_WORDS[lang]
    const unsub = scrollYProgress.on("change", (v) => {
      setLitCount(Math.floor(v * (words.length + 3)))
    })
    return unsub
  }, [scrollYProgress, lang])

  const words = CINEMATIC_WORDS[lang]

  return (
    <div ref={ref} style={{ height: "260vh" }} className="relative bg-[#0d0a16]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Radial glow background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#e0197d]/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#7c3aed]/10 rounded-full blur-[80px]" />
        </div>
        {/* Subtle decorative lines */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
        {/* Word-by-word reveal text */}
        <p className="relative z-10 text-[clamp(2rem,4.5vw,4rem)] font-bold leading-[1.55] text-center max-w-4xl px-8 md:px-16">
          {words.map((word, i) => (
            <span
              key={`${lang}-${i}`}
              className={cn(
                "inline-block mr-[0.25em] transition-all duration-500",
                i < litCount
                  ? word.hl === "pink"
                    ? "text-[#e0197d]"
                    : word.hl === "gold"
                    ? "text-[#f5a623]"
                    : "text-white"
                  : "text-white/12"
              )}
            >
              {word.text}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════ DIFFERENTIATOR ══ */
function DifferentiatorSection() {
  const { lang } = useLang()
  const tx = t[lang].diff
  const icons = [<Search key="s" className="w-5 h-5" />, <FolderOpen key="f" className="w-5 h-5" />, <CheckCircle key="c" className="w-5 h-5" />]
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section ref={ref} className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]"
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <motion.div className="absolute inset-0" style={{ y: imgY, scale: 1.12 }}>
            <Image src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=85" alt="DocuAmiga team" fill className="object-cover" />
          </motion.div>
        </motion.div>
        <motion.div className="flex flex-col gap-8" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1a1024] leading-tight">{tx.heading}</h2>
          <div className="flex flex-col gap-6">
            {tx.points.map((p, i) => (
              <motion.div key={i} className="flex items-start gap-4" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center text-[#f5a023]">{icons[i]}</div>
                <div>
                  <h3 className="font-bold text-[#1a1024] mb-1">{p.title}</h3>
                  <p className="text-gray-500 text-base">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════ STATS ══ */
function StatsSection() {
  const { lang } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  const stats = lang === "en"
    ? [
        { n: 200, suffix: "+", label: "Cases Organized" },
        { n: 98, suffix: "%", label: "Attorney Satisfaction" },
        { n: 3, suffix: "x", label: "Faster Filing" },
        { n: 5, suffix: "★", label: "Average Rating" },
      ]
    : [
        { n: 200, suffix: "+", label: "Casos Organizados" },
        { n: 98, suffix: "%", label: "Satisfacción del Abogado" },
        { n: 3, suffix: "x", label: "Archivado más Rápido" },
        { n: 5, suffix: "★", label: "Calificación Promedio" },
      ]

  return (
    <section ref={ref} className="py-20 px-6 bg-[#1a1024] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-[#e0197d]/12 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 w-[500px] h-[500px] bg-[#7c3aed]/12 rounded-full blur-3xl" />
      </div>
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x md:divide-white/10">
          {stats.map((s, i) => (
            <motion.div key={i} className="text-center px-4"
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}>
              <div className="text-5xl md:text-6xl font-black text-white mb-2 tabular-nums">
                {inView && <Counter target={s.n} />}
                {!inView && 0}
                {s.suffix}
              </div>
              <p className="text-gray-400 text-sm font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════ HOW IT WORKS — STICKY SCROLL ══ */
function HowItWorksSection() {
  const { lang } = useLang()
  const tx = t[lang].how
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] })
  const [activeStep, setActiveStep] = useState(0)
  const barWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      setActiveStep(Math.min(tx.steps.length - 1, Math.floor(v * tx.steps.length)))
    })
    return unsub
  }, [scrollYProgress, tx.steps.length])

  return (
    <section id="howItWorks" ref={containerRef} style={{ height: `${tx.steps.length * 100}vh` }} className="relative">
      <div className="sticky top-16 overflow-hidden" style={{ height: "calc(100vh - 64px)" }}>

        {/* Gradient progress bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-200 z-20">
          <motion.div className="h-full bg-gradient-to-r from-blue-500 via-[#e0197d] to-violet-600" style={{ width: barWidth }} />
        </div>

        {/* ── Mobile layout: full-screen image bg ── */}
        <div className="md:hidden h-full relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={`mob-img-${activeStep}`} className="absolute inset-0"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <Image src={stepImages[activeStep]} fill className="object-cover" alt="" />
              <div className="absolute inset-0 bg-[#1a1024]/78" />
            </motion.div>
          </AnimatePresence>
          <div className="relative z-10 h-full flex flex-col justify-end p-8 pb-16">
            <div className="flex gap-2 mb-6">
              {tx.steps.map((_, i) => (
                <div key={i} className={cn("h-1 rounded-full transition-all duration-500", i === activeStep ? "w-8 bg-[#e0197d]" : "w-2 bg-white/25")} />
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={`mob-${lang}-${activeStep}`}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }} className="flex flex-col gap-4">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg", stepColors[activeStep].badge)}>
                  {activeStep + 1}
                </div>
                <h2 className="text-3xl font-bold text-white leading-tight">{tx.steps[activeStep].title}</h2>
                <p className="text-white/70 text-base leading-relaxed">{tx.steps[activeStep].desc}</p>
                <p className="text-white/50 text-sm font-semibold">⏱ {tx.steps[activeStep].time}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Desktop layout: 2-column ── */}
        <div className="hidden md:grid md:grid-cols-2 h-full">

          {/* Left — text panel */}
          <div className="flex flex-col justify-center p-12 lg:p-16 bg-[#fdf4f8] overflow-hidden">
            <p className="text-xs font-bold uppercase tracking-widest text-[#e0197d] mb-6">{tx.heading}</p>

            {/* Step pills */}
            <div className="flex gap-2 mb-10">
              {tx.steps.map((_, i) => (
                <motion.div key={i} className="h-1.5 rounded-full"
                  animate={{ width: i === activeStep ? 32 : 6, backgroundColor: i === activeStep ? "#e0197d" : "#d1d5db" }}
                  transition={{ duration: 0.4 }}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${lang}-${activeStep}`}
                initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -22 }}
                transition={{ duration: 0.38, ease: "easeOut" }}
                className="flex flex-col gap-5"
              >
                <div className="flex items-center gap-3">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-lg", stepColors[activeStep].badge)}>
                    {activeStep + 1}
                  </div>
                  <span className={cn("text-xs font-bold px-3 py-1.5 rounded-full text-white", stepColors[activeStep].badge)}>
                    {tx.steps[activeStep].badge}
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-[#1a1024] leading-tight">{tx.steps[activeStep].title}</h2>
                <p className="text-gray-500 text-lg leading-relaxed whitespace-pre-line">{tx.steps[activeStep].desc}</p>

                <div className={cn("flex items-center gap-2 text-sm font-semibold", stepColors[activeStep].text)}>
                  <Clock className="w-4 h-4" />{tx.steps[activeStep].time}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right — image panel */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${lang}-${activeStep}`}
                className="absolute inset-0"
                initial={{ scale: 1.08, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.55, ease: "easeInOut" }}
              >
                <Image src={stepImages[activeStep]} fill className="object-cover" alt={tx.steps[activeStep].title} />
                <div className={cn("absolute inset-0 opacity-20", stepColors[activeStep].bg)} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1024]/55 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Floating info card */}
            <div className="absolute bottom-8 left-8 right-8 z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`card-${activeStep}`}
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.32 }}
                  className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl px-5 py-4"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0", stepColors[activeStep].badge)}>
                      {stepIcons[activeStep]}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{tx.steps[activeStep].title}</p>
                      <p className="text-white/55 text-xs">{tx.steps[activeStep].time}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════ PRICING ══ */
function PricingSection() {
  const { lang } = useLang()
  const tx = t[lang].pricing
  const featured = [false, true, false]

  return (
    <section id="services" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1a1024] mb-3">{tx.heading}</h2>
          <p className="text-gray-500">{tx.sub}</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {tx.plans.map((plan, i) => (
            <motion.div
              key={i}
              className={cn("relative rounded-2xl border-2 p-8", featured[i] ? "border-[#f5a623] shadow-2xl scale-[1.02]" : "border-gray-200 shadow-sm")}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
              whileHover={{ y: featured[i] ? -4 : -6 }}
            >
              {featured[i] && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-[#f5a623] text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">{tx.recommended}</span>
                </div>
              )}
              <h3 className="text-xl font-bold text-[#1a1024] mb-2">{plan.name}</h3>
              <p className="text-4xl font-bold text-[#4169e1] mb-5">{plan.price}</p>
              <div className="flex flex-col gap-1 text-sm text-gray-500 border-b border-gray-100 pb-5 mb-5">
                <div className="flex items-center gap-2"><Clock className="w-4 h-4 shrink-0" />{plan.time}</div>
                <div>📋 {plan.sessions}</div>
                <div className="text-xs text-gray-400 mt-1">{plan.note}</div>
              </div>
              <ul className="flex flex-col gap-2.5 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-[#e0197d] shrink-0 mt-0.5" />{f}
                  </li>
                ))}
              </ul>
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn("w-full py-3 rounded-xl font-semibold text-sm transition-colors text-center block", featured[i] ? "bg-[#e0197d] text-white hover:bg-[#c4166c]" : "border-2 border-[#e0197d] text-[#e0197d] hover:bg-pink-50")}
              >
                {tx.choosePlan}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════ BLOG ══ */
function BlogSection() {
  const { lang } = useLang()
  const tx = t[lang].blog

  return (
    <section id="blog" className="py-24 px-6 bg-[#fdf4f8]">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1a1024] mb-3">{tx.heading}</h2>
          <p className="text-gray-500">{tx.sub}</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {tx.posts.map((post, i) => (
            <motion.article
              key={i}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer"
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
              whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
            >
              <Link href={`/blog/${blogSlugs[i]}`} className="block">
                <div className="relative h-48 overflow-hidden">
                  <Image src={blogImages[i]} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <span className={cn("text-xs font-semibold text-white px-2.5 py-1 rounded-full", blogCatColors[i])}>{post.cat}</span>
                  <h3 className="text-lg font-bold text-[#1a1024] mt-3 mb-2 leading-snug">{post.title}</h3>
                  <p className="text-base text-gray-500 mb-4 leading-relaxed">{post.desc}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                    <span>{post.date}</span><span>{post.read}</span>
                  </div>
                  <span className="flex items-center gap-1.5 text-[#e0197d] font-semibold text-sm group-hover:gap-2.5 transition-all">
                    {tx.readMore} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════ FAQ ══ */
function FaqSection() {
  const { lang } = useLang()
  const tx = t[lang].faq
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section id="questions" className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1a1024] mb-3">{tx.heading}</h2>
          <p className="text-gray-500">{tx.sub}</p>
        </motion.div>
        <div className="flex flex-col gap-3">
          {tx.items.map((faq, i) => (
            <motion.div
              key={i} className="border border-gray-200 rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <span className="font-semibold text-[#1a1024] pr-4 text-sm md:text-base">{faq.q}</span>
                <motion.div animate={{ rotate: openIdx === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }} className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-gray-600 text-base leading-relaxed">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════ FOOTER ══ */
function Footer() {
  const { lang } = useLang()
  const tx = t[lang].footer

  return (
    <footer className="bg-[#1a1024] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <Image src="/logo-transparent.png" alt="DocuAmiga" width={160} height={48} className="object-contain brightness-0 invert mb-4" />
            <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">{tx.tagline}</p>
            <a href="mailto:hello@docuamiga.com" className="text-gray-400 hover:text-white text-sm transition-colors mt-2 inline-block">hello@docuamiga.com</a>
            <p className="text-gray-500 text-xs mt-3">📍 Miami · New York · Worldwide</p>
          </div>
          <div>
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-wide text-gray-300">{tx.services}</h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-400">
              {[0,1,2].map(i => (
                <li key={i}><a href="#services" className="hover:text-white transition-colors">{t[lang].pricing.plans[i].name}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-wide text-gray-300">{tx.resources}</h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-400">
              <li><a href="#blog" className="hover:text-white transition-colors">{tx.links.blog}</a></li>
              <li><a href="#questions" className="hover:text-white transition-colors">{tx.links.questions}</a></li>
              <li><a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{tx.links.contact}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-5 text-sm uppercase tracking-wide text-gray-300">{tx.connect}</h4>
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/edithteorienta/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>{tx.rights}</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gray-300 transition-colors">{tx.privacy}</a>
            <a href="#" className="hover:text-gray-300 transition-colors">{tx.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ══════════════════════════════════════ ROOT ══ */
function LandingPage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ChallengeSection />
      <CinematicStrip />
      <DifferentiatorSection />
      <HowItWorksSection />
      <PricingSection />
      <BlogSection />
      <FaqSection />
      <Footer />
      <a
        href="https://wa.me/19082281580?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20consulta%20gratuita%20con%20DocuAmiga."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-xl hover:bg-green-600 transition-colors"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </main>
  )
}

export default function Page() {
  return (
    <LanguageProvider>
      <LandingPage />
    </LanguageProvider>
  )
}
