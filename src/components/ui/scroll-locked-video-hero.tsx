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
  title = "CREATORII STUDIO",
  scrollHint = "ROLE PARA EXPLORAR",
  tagline = "Design & Social Media que transformam sua marca.",
  className,
  style,
}: MetroHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
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

    const onScroll = () => {
      if (!container) return
      const rect = container.getBoundingClientRect()
      // Use window.scrollY / window.innerHeight to calculate hero scroll progress smoothly
      const progress = clamp(-rect.top / (window.innerHeight * 0.8), 0, 1)
      targetProgress = progress
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    function frame() {
      currentProgress += (targetProgress - currentProgress) * 0.2

      if (video && duration > 0) {
        const targetTime = currentProgress * duration
        if (Math.abs(video.currentTime - targetTime) > 0.02) {
          video.currentTime = targetTime
        }
      }

      if (videoRef.current) {
        const scale = 1 + currentProgress * 0.05
        videoRef.current.style.transform = `scale(${scale})`
      }
      if (titleRef.current) {
        const t = 1 - clamp(currentProgress / 0.4, 0, 1)
        titleRef.current.style.opacity = String(t)
        titleRef.current.style.transform = `translateY(${(1 - t) * -24}px)`
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = currentProgress > 0.1 ? "0" : "1"
      }
      if (taglineRef.current) {
        const t = clamp((currentProgress - 0.4) / 0.6, 0, 1)
        taglineRef.current.style.opacity = String(t)
        taglineRef.current.style.transform = `translateY(${(1 - t) * 20}px)`
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
    <div ref={containerRef} className="relative w-full h-screen bg-[#05070d] overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center">
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
        <div ref={titleRef} className="relative z-10 text-center px-4 max-w-4xl mx-auto pointer-events-none">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white drop-shadow-2xl font-sans">
            {title}
          </h1>
        </div>

        <div ref={taglineRef} className="absolute z-10 text-center px-6 max-w-2xl mx-auto opacity-0 pointer-events-none">
          <p className="text-xl md:text-3xl font-bold text-white drop-shadow-lg leading-snug font-sans">
            {tagline}
          </p>
        </div>

        <div ref={hintRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-center transition-opacity duration-300 pointer-events-none">
          <span className="text-xs font-extrabold tracking-widest text-white/70 uppercase">
            {scrollHint}
          </span>
        </div>
      </div>
    </div>
  )
}
