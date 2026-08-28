"use client"

import { useEffect, useRef, useState } from "react"

export interface MetroHeroProps {
  videoSrc?: string
  title?: string
  scrollHint?: string
  tagline?: string
  signature?: { name: string; url: string } | false
  className?: string
  style?: React.CSSProperties
}

const DEFAULT_VIDEO = "https://raw.githubusercontent.com/gughigug/metro-hero-assets/main/Subway_doors_open_to_city_202608242331.mp4"

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}

export default function MetroHero({
  videoSrc = DEFAULT_VIDEO,
  title = "MARCAS FORTES NÃO DISPUTAM ATENÇÃO.",
  scrollHint = "ROLE PARA EXPLORAR",
  tagline = "ELAS ATRAEM.",
  className,
  style,
}: MetroHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    let duration = 0
    let rafId = 0
    let currentProgress = 0
    let targetProgress = 0

    const onLoadedData = () => {
      duration = video.duration || 0
      setReady(true)
    }
    video.addEventListener("loadeddata", onLoadedData)

    // Native scroll calculation: 100% fluid, 60fps, zero JS event locks or wheel traps!
    const onScroll = () => {
      if (!container) return
      const rect = container.getBoundingClientRect()
      const totalScrollable = container.offsetHeight - window.innerHeight
      if (totalScrollable <= 0) return

      const scrolled = -rect.top
      const progress = clamp(scrolled / totalScrollable, 0, 1)
      targetProgress = progress
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    function frame() {
      // Smooth lerp for liquid-like scrubbing
      currentProgress += (targetProgress - currentProgress) * 0.18

      // 1. Video Scrubbing: Reaches 100% OPEN by progress = 0.35 (first 35% of container scroll)!
      if (video && duration > 0) {
        const videoProgress = clamp(currentProgress / 0.35, 0, 1)
        const targetTime = videoProgress * duration
        if (Math.abs(video.currentTime - targetTime) > 0.015) {
          video.currentTime = targetTime
        }
      }

      // 2. Initial Title ("MARCAS FORTES NÃO DISPUTAM ATENÇÃO."): Fades out from 0.0 to 0.20 progress
      if (titleRef.current) {
        const t = 1 - clamp(currentProgress / 0.20, 0, 1)
        titleRef.current.style.opacity = String(t)
        titleRef.current.style.transform = `translateY(${(1 - t) * -30}px)`
        titleRef.current.style.filter = `blur(${(1 - t) * 8}px)`
      }

      // 3. Scroll Hint: Fades out immediately upon scrolling
      if (hintRef.current) {
        hintRef.current.style.opacity = currentProgress > 0.05 ? "0" : "1"
      }

      // 4. Tagline ("ELAS ATRAEM."): Fades in between 0.22 and 0.38 progress
      if (taglineRef.current) {
        const t = clamp((currentProgress - 0.22) / 0.16, 0, 1)
        taglineRef.current.style.opacity = String(t)
        taglineRef.current.style.transform = `translateY(${(1 - t) * 24}px)`
        taglineRef.current.style.filter = `blur(${(1 - t) * 8}px)`
      }

      // 5. Progress bar at bottom: Fills up completely by 0.35 progress
      if (progressBarRef.current) {
        const barProgress = clamp(currentProgress / 0.35, 0, 1)
        progressBarRef.current.style.transform = `scaleX(${barProgress})`
      }

      rafId = requestAnimationFrame(frame)
    }

    rafId = requestAnimationFrame(frame)

    return () => {
      video.removeEventListener("loadeddata", onLoadedData)
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-[#05070d]">
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Video Canvas Container */}
        <div className="absolute inset-0 w-full h-full bg-[#05070d]">
          <video
            ref={videoRef}
            src={videoSrc}
            playsInline
            muted
            preload="auto"
            className="w-full h-full object-cover opacity-90 transition-transform duration-100 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#05070d]/60 via-transparent to-[#0a0a0f]" />
        </div>

        {/* Content Overlays */}
        {/* TEXTO INICIAL: MARCAS FORTES NÃO DISPUTAM ATENÇÃO. */}
        <div ref={titleRef} className="relative z-10 text-center px-4 max-w-5xl mx-auto pointer-events-none">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white drop-shadow-2xl font-sans leading-tight">
            {title}
          </h1>
        </div>

        {/* SEGUNDO TEXTO GIGANTE: ELAS ATRAEM. (IGUAL AO TAMANHO DO TEXTO INICIAL) */}
        <div ref={taglineRef} className="absolute z-10 text-center px-4 max-w-5xl mx-auto opacity-0 pointer-events-none">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[#FF6B35] drop-shadow-2xl font-sans leading-tight">
            {tagline}
          </h2>
        </div>

        <div ref={hintRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-center transition-opacity duration-300 pointer-events-none">
          <span className="text-xs font-extrabold tracking-widest text-white/70 uppercase">
            {scrollHint}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
          <div
            ref={progressBarRef}
            className="h-full bg-[#FF6B35] origin-left transition-transform duration-75"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </div>
  )
}
