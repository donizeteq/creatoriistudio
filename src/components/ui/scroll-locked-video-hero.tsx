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

const DEFAULT_VIDEO = "/metro-hero-video.mp4"

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

    let duration = 2.4 // Fallback video duration
    let rafId = 0
    let currentProgress = 0
    let targetProgress = 0
    let isFinished = false

    // Initialize decoder engine for 100% reliable 60fps scrubbing
    const initVideoDecoder = () => {
      if (video.duration && !isNaN(video.duration)) {
        duration = video.duration
      }
      setReady(true)
      video.play().then(() => {
        video.pause()
        video.currentTime = 0.001
      }).catch(() => {
        try {
          video.currentTime = 0.001
        } catch (e) {}
      })
    }

    if (video.readyState >= 2) {
      initVideoDecoder()
    } else {
      video.addEventListener("loadeddata", initVideoDecoder)
      video.addEventListener("loadedmetadata", initVideoDecoder)
      video.addEventListener("canplaythrough", initVideoDecoder)
    }

    // Wheel event handler: unhurried cinematic walk-in (1600 divisor)
    const handleWheel = (e: WheelEvent) => {
      const atTop = window.scrollY <= 10

      if (atTop && !isFinished) {
        if (e.deltaY > 0) {
          if (targetProgress < 0.99) {
            e.preventDefault()
            const delta = e.deltaY / 1600
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
          e.preventDefault()
          const delta = e.deltaY / 1600
          targetProgress = clamp(targetProgress + delta, 0, 1)
          isFinished = false
          setCompleted(false)
        }
      } else if (atTop && isFinished && e.deltaY < 0) {
        e.preventDefault()
        const delta = e.deltaY / 1600
        targetProgress = clamp(targetProgress + delta, 0, 1)
        isFinished = false
        setCompleted(false)
      }
    }

    // Touch event handlers for mobile devices (1100 divisor)
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
            targetProgress = clamp(targetProgress + (deltaY / 1100), 0, 1)
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
          targetProgress = clamp(targetProgress + (deltaY / 1100), 0, 1)
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
      // Cadenced momentum lerp (0.09 factor) for 100% continuous fluid progression
      currentProgress += (targetProgress - currentProgress) * 0.09

      const dur = (video && video.duration && !isNaN(video.duration)) ? video.duration : duration

      // ETAPA 1: Título Inicial ("MARCAS FORTES NÃO DISPUTAM ATENÇÃO.") [0.00 -> 0.25]
      if (titleRef.current) {
        const t = 1 - clamp(currentProgress / 0.25, 0, 1)
        const translateY = (1 - t) * -50
        const scale = 1.0 + (1 - t) * 0.14
        const blur = (1 - t) * 16
        titleRef.current.style.opacity = String(t)
        titleRef.current.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`
        titleRef.current.style.filter = `blur(${blur}px)`
      }

      // ETAPA 2: Abertura das Portas & Avanço 3D de Câmera [0.10 -> 0.70]
      if (video && dur > 0) {
        const videoProgress = clamp((currentProgress - 0.10) / 0.60, 0, 1)
        const targetTime = videoProgress * dur
        
        try {
          video.currentTime = targetTime
        } catch (e) {}

        const cameraPushScale = 1.0 + videoProgress * 0.18
        video.style.transform = `scale3d(${cameraPushScale}, ${cameraPushScale}, 1)`
      }

      // ETAPA 3 & 4: Subtítulo ("ELAS ATRAEM.") [Emergência: 0.70 -> 0.90 | Saída: 0.90 -> 1.00]
      if (taglineRef.current) {
        const physicalDoorRatio = video && dur > 0 ? clamp(video.currentTime / dur, 0, 1) : 0
        const doorIsOpen = physicalDoorRatio >= 0.60 ? clamp((physicalDoorRatio - 0.60) / 0.40, 0, 1) : 0
        
        // Emergência do fundo das portas abertas (0.70 -> 0.90)
        const fadeIn = Math.min(clamp((currentProgress - 0.70) / 0.20, 0, 1), doorIsOpen)
        
        // Dissolve cinematográfico para Seção 2 (0.90 -> 1.00)
        const fadeOut = 1 - clamp((currentProgress - 0.90) / 0.10, 0, 1)
        
        const opacity = fadeIn * fadeOut
        const translateY = (1 - fadeIn) * 45 + (1 - fadeOut) * -40
        const scale = 0.86 + fadeIn * 0.14 + (1 - fadeOut) * 0.12
        const blur = (1 - fadeIn) * 16 + (1 - fadeOut) * 16

        taglineRef.current.style.opacity = String(opacity)
        taglineRef.current.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`
        taglineRef.current.style.filter = `blur(${blur}px)`
      }

      // Scroll Hint
      if (hintRef.current) {
        hintRef.current.style.opacity = currentProgress > 0.05 ? "0" : "1"
      }

      // Progress bar at bottom
      if (progressBarRef.current) {
        const barProgress = clamp(currentProgress / 0.70, 0, 1)
        progressBarRef.current.style.transform = `scaleX(${barProgress})`
      }

      rafId = requestAnimationFrame(frame)
    }

    rafId = requestAnimationFrame(frame)

    return () => {
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
            className="w-full h-full object-cover opacity-90 transition-transform duration-75 ease-out will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#05070d]/60 via-transparent to-[#0a0a0f]" />
        </div>

        {/* Content Overlays */}
        {/* TEXTO INICIAL: MARCAS FORTES NÃO DISPUTAM ATENÇÃO. */}
        <div ref={titleRef} className="relative z-10 text-center px-4 max-w-5xl mx-auto pointer-events-none transition-transform duration-75 will-change-transform">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white drop-shadow-2xl font-sans leading-tight">
            {title}
          </h1>
        </div>

        {/* SEGUNDO TEXTO GIGANTE: ELAS ATRAEM. */}
        <div ref={taglineRef} className="absolute z-10 text-center px-4 max-w-5xl mx-auto opacity-0 pointer-events-none transition-transform duration-75 will-change-transform">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white drop-shadow-2xl font-sans leading-tight">
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
