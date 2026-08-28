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
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let duration = 0
    let rafId = 0
    let currentProgress = 0
    let targetProgress = 0
    let isFinished = false

    const onLoadedData = () => {
      duration = video.duration || 0
      setReady(true)
    }
    video.addEventListener("loadeddata", onLoadedData)

    // Wheel event handler: locks page scroll while scrubbing video opening transition
    const handleWheel = (e: WheelEvent) => {
      const atTop = window.scrollY <= 10

      if (atTop && !isFinished) {
        if (e.deltaY > 0) {
          // Scrolling down: scrub animation forward
          if (targetProgress < 0.99) {
            e.preventDefault()
            const delta = e.deltaY / 700
            targetProgress = clamp(targetProgress + delta, 0, 1)

            if (targetProgress >= 0.99) {
              targetProgress = 1
              isFinished = true
              setCompleted(true)
            }
          } else {
            isFinished = true
            setCompleted(true)
          }
        } else if (e.deltaY < 0 && targetProgress > 0) {
          // Scrolling up at top: scrub animation backward
          e.preventDefault()
          const delta = e.deltaY / 700
          targetProgress = clamp(targetProgress + delta, 0, 1)
          isFinished = false
          setCompleted(false)
        }
      } else if (atTop && isFinished && e.deltaY < 0) {
        // At top and scrolling up after finish: re-engage scrub backward
        e.preventDefault()
        const delta = e.deltaY / 700
        targetProgress = clamp(targetProgress + delta, 0, 1)
        isFinished = false
        setCompleted(false)
      }
    }

    // Touch event handlers for mobile devices
    let touchStartY = 0
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      const atTop = window.scrollY <= 10
      const currentY = e.touches[0].clientY
      const deltaY = touchStartY - currentY

      if (atTop && !isFinished) {
        if (deltaY > 0) {
          if (targetProgress < 0.99) {
            if (e.cancelable) e.preventDefault()
            targetProgress = clamp(targetProgress + (deltaY / 500), 0, 1)
            touchStartY = currentY
            if (targetProgress >= 0.99) {
              targetProgress = 1
              isFinished = true
              setCompleted(true)
            }
          } else {
            isFinished = true
            setCompleted(true)
          }
        } else if (deltaY < 0 && targetProgress > 0) {
          if (e.cancelable) e.preventDefault()
          targetProgress = clamp(targetProgress + (deltaY / 500), 0, 1)
          touchStartY = currentY
          isFinished = false
          setCompleted(false)
        }
      }
    }

    // Re-lock if scrolled back to top
    const handleScroll = () => {
      if (window.scrollY <= 2) {
        if (targetProgress < 0.99) {
          isFinished = false
          setCompleted(false)
        }
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchmove", handleTouchMove, { passive: false })
    window.addEventListener("scroll", handleScroll, { passive: true })

    function frame() {
      currentProgress += (targetProgress - currentProgress) * 0.18

      // 1. Video Scrubbing: Reaches 100% OPEN by progress = 0.58 (doors open FIRST)
      if (video && duration > 0) {
        const videoProgress = clamp(currentProgress / 0.58, 0, 1)
        const targetTime = videoProgress * duration
        if (Math.abs(video.currentTime - targetTime) > 0.015) {
          video.currentTime = targetTime
        }
      }

      // 2. Initial Title ("MARCAS FORTES NÃO DISPUTAM ATENÇÃO."): Fades out from 0.0 to 0.22 progress
      if (titleRef.current) {
        const t = 1 - clamp(currentProgress / 0.22, 0, 1)
        titleRef.current.style.opacity = String(t)
        titleRef.current.style.transform = `translateY(${(1 - t) * -30}px)`
        titleRef.current.style.filter = `blur(${(1 - t) * 8}px)`
      }

      // 3. Scroll Hint
      if (hintRef.current) {
        hintRef.current.style.opacity = currentProgress > 0.05 ? "0" : "1"
      }

      // 4. Tagline ("ELAS ATRAEM."): Fades in ONLY AFTER doors finish opening (0.60 to 0.85 progress)
      if (taglineRef.current) {
        const t = clamp((currentProgress - 0.60) / 0.25, 0, 1)
        taglineRef.current.style.opacity = String(t)
        taglineRef.current.style.transform = `translateY(${(1 - t) * 24}px)`
        taglineRef.current.style.filter = `blur(${(1 - t) * 8}px)`
      }

      // 5. Progress bar at bottom
      if (progressBarRef.current) {
        const barProgress = clamp(currentProgress / 0.60, 0, 1)
        progressBarRef.current.style.transform = `scaleX(${barProgress})`
      }

      rafId = requestAnimationFrame(frame)
    }

    rafId = requestAnimationFrame(frame)

    return () => {
      video.removeEventListener("loadeddata", onLoadedData)
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("scroll", handleScroll)
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
        {/* TEXTO INICIAL: MARCAS FORTES NÃO DISPUTAM ATENÇÃO. */}
        <div ref={titleRef} className="relative z-10 text-center px-4 max-w-5xl mx-auto pointer-events-none">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white drop-shadow-2xl font-sans leading-tight">
            {title}
          </h1>
        </div>

        {/* SEGUNDO TEXTO GIGANTE: ELAS ATRAEM. (SURGE SOMENTE APÓS A PORTA ABRIR 100%) */}
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
