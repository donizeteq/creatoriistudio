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
  const progressBarRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let duration = 0
    let rafId = 0
    let currentProgress = 0
    let targetProgress = 0
    let isLocked = true // Initial state: scroll locked at top until opening animation completes

    const onLoadedData = () => {
      duration = video.duration || 0
      setReady(true)
    }
    video.addEventListener("loadeddata", onLoadedData)

    // Wheel event handler: locks page scroll and scrubs video until opening animation is 100% complete
    const handleWheel = (e: WheelEvent) => {
      const atTop = window.scrollY <= 5

      if (atTop && isLocked) {
        if (e.deltaY > 0) {
          // Scrolling down: advance opening animation
          if (targetProgress < 0.99) {
            e.preventDefault()
            const deltaProgress = (e.deltaY / 650) // smooth scrub speed
            targetProgress = clamp(targetProgress + deltaProgress, 0, 1)

            if (targetProgress >= 0.99) {
              targetProgress = 1
              isLocked = false // Unlock scroll once 100% complete!
            }
          } else {
            isLocked = false
          }
        } else if (e.deltaY < 0 && targetProgress > 0) {
          // Scrolling up at top: scrub animation backward
          e.preventDefault()
          const deltaProgress = (e.deltaY / 650)
          targetProgress = clamp(targetProgress + deltaProgress, 0, 1)
          isLocked = true
        }
      }
    }

    // Touch event handlers for mobile
    let touchStartY = 0
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      const atTop = window.scrollY <= 5
      const currentY = e.touches[0].clientY
      const deltaY = touchStartY - currentY

      if (atTop && isLocked) {
        if (deltaY > 0) {
          if (targetProgress < 0.99) {
            if (e.cancelable) e.preventDefault()
            targetProgress = clamp(targetProgress + (deltaY / 450), 0, 1)
            touchStartY = currentY
            if (targetProgress >= 0.99) {
              targetProgress = 1
              isLocked = false
            }
          } else {
            isLocked = false
          }
        } else if (deltaY < 0 && targetProgress > 0) {
          if (e.cancelable) e.preventDefault()
          targetProgress = clamp(targetProgress + (deltaY / 450), 0, 1)
          touchStartY = currentY
          isLocked = true
        }
      }
    }

    // Re-lock when returning to top of page
    const handleScroll = () => {
      if (window.scrollY <= 2) {
        if (targetProgress < 0.99) {
          isLocked = true
        }
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchmove", handleTouchMove, { passive: false })
    window.addEventListener("scroll", handleScroll, { passive: true })

    function frame() {
      currentProgress += (targetProgress - currentProgress) * 0.18

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
        const t = 1 - clamp(currentProgress / 0.35, 0, 1)
        titleRef.current.style.opacity = String(t)
        titleRef.current.style.transform = `translateY(${(1 - t) * -28}px)`
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = currentProgress > 0.08 ? "0" : "1"
      }
      if (taglineRef.current) {
        const t = clamp((currentProgress - 0.65) / 0.35, 0, 1)
        taglineRef.current.style.opacity = String(t)
        taglineRef.current.style.transform = `translateY(${(1 - t) * 20}px)`
      }
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${currentProgress})`
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
