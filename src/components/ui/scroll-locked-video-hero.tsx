"use client"

import { useEffect, useRef, useState } from "react"

export interface MetroHeroProps {
  videoSrc?: string
  title?: string
  scrollHint?: string
  tagline?: string
  signature?: { name: string; url: string } | false
  scrubDistance?: number
  className?: string
  style?: React.CSSProperties
}

const DEFAULT_VIDEO = "/metro-hero-video.mp4"
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

const COL_BG = "#05070d"
const COL_TEXT = "#f2f4f8"

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}

export default function MetroHero({
  videoSrc = DEFAULT_VIDEO,
  title = "MARCAS FORTES NÃO DISPUTAM ATENÇÃO.",
  scrollHint = "ROLE PARA EXPLORAR",
  tagline = "ELAS ATRAEM.",
  signature = false,
  scrubDistance = 3200,
  className,
  style,
}: MetroHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)

  const [ready, setReady] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)

  // Web Audio API para som de ar comprimido / portas 3D se abrindo
  const initAudio = () => {
    if (audioCtxRef.current) return
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      audioCtxRef.current = ctx

      const gain = ctx.createGain()
      gain.gain.value = 0
      gain.connect(ctx.destination)
      gainNodeRef.current = gain
    } catch (e) {}
  }

  const playDoorSound = (intensity: number) => {
    if (!audioCtxRef.current || !gainNodeRef.current) return
    try {
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume()
      }
      gainNodeRef.current.gain.setTargetAtTime(clamp(intensity * 0.12, 0, 0.15), audioCtxRef.current.currentTime, 0.05)
    } catch (e) {}
  }

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

    let duration = 8.0
    let rafId = 0
    let targetProgress = 0
    let currentProgress = 0
    let lastProgress = 0
    let hasStartedScrolling = false
    let locked = false
    let lockedScrollY = 0
    let touchStartY = 0

    const onLoadedData = () => {
      duration = video.duration || 8.0
      setReady(true)
      if (reduceMotion) {
        video.currentTime = duration * 0.92
      }
    }
    
    video.addEventListener("loadeddata", onLoadedData)
    video.addEventListener("canplaythrough", onLoadedData)
    if (video.readyState >= 2) {
      onLoadedData()
    }

    function seekTo(t: number) {
      if (!video) return
      try {
        if (Math.abs(video.currentTime - t) > 0.012) {
          video.currentTime = t
        }
      } catch (e) {}
    }

    function engageLock() {
      if (locked || typeof document === "undefined") return
      locked = true
      lockedScrollY = window.scrollY
      const b = document.body.style
      b.position = "fixed"
      b.top = `-${lockedScrollY}px`
      b.left = "0"
      b.right = "0"
      b.width = "100%"
    }

    function releaseLock() {
      if (!locked || typeof document === "undefined") return
      locked = false
      const y = lockedScrollY
      const b = document.body.style
      b.position = ""
      b.top = ""
      b.left = ""
      b.right = ""
      b.width = ""
      window.scrollTo(0, y)
    }

    if (window.scrollY <= 20) {
      engageLock()
    }

    function addDelta(deltaY: number) {
      initAudio()
      const next = clamp(targetProgress + deltaY / scrubDistance, 0, 1)
      targetProgress = next
      if (targetProgress > 0.001) hasStartedScrolling = true

      if (next >= 0.999 && deltaY > 0 && locked) {
        releaseLock()
        setTimeout(() => {
          const sec2 = document.getElementById("transforme")
          if (sec2) {
            sec2.scrollIntoView({ behavior: "smooth" })
          } else {
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
        }, 30)
      }

      if (window.scrollY <= 15 && next < 0.999 && !locked) {
        engageLock()
      }

      return true
    }

    const onWheel = (e: WheelEvent) => {
      if (locked) {
        addDelta(e.deltaY)
        e.preventDefault()
      } else if (window.scrollY <= 15 && e.deltaY < 0) {
        engageLock()
        addDelta(e.deltaY)
        e.preventDefault()
      }
    }

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0
    }
    const onTouchMove = (e: TouchEvent) => {
      if (locked) {
        const y = e.touches[0]?.clientY ?? touchStartY
        const deltaY = touchStartY - y
        touchStartY = y
        addDelta(deltaY)
        if (e.cancelable) e.preventDefault()
      }
    }

    const onScroll = () => {
      if (window.scrollY <= 10 && !locked && targetProgress < 0.95) {
        engageLock()
      }
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: false })
    window.addEventListener("scroll", onScroll, { passive: true })

    function frame() {
      // Lerp ultra-fluido (0.16) igual ao 21st.dev
      currentProgress += (targetProgress - currentProgress) * 0.16

      const deltaSpeed = Math.abs(currentProgress - lastProgress)
      lastProgress = currentProgress
      playDoorSound(deltaSpeed * 10)

      const dur = (video.duration && !isNaN(video.duration) && video.duration > 0) ? video.duration : duration
      if (dur > 0) {
        seekTo(currentProgress * dur)
      }

      if (videoRef.current) {
        const scale = 1 + currentProgress * 0.06
        videoRef.current.style.transform = `translateZ(0) scale(${scale})`
      }
      if (titleRef.current) {
        const t = 1 - clamp(currentProgress / 0.30, 0, 1)
        titleRef.current.style.opacity = String(t)
        titleRef.current.style.transform = `translate3d(0, ${(1 - t) * -25}px, 0) scale(${0.96 + t * 0.04})`
        titleRef.current.style.filter = `blur(${(1 - t) * 10}px)`
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = hasStartedScrolling ? "0" : "1"
      }
      if (taglineRef.current) {
        // Subtítulo ("ELAS ATRAEM.") surge nos 22% finais (0.78 -> 1.00) em BRANCO puro
        const t = clamp((currentProgress - 0.78) / 0.22, 0, 1)
        taglineRef.current.style.opacity = String(t)
        taglineRef.current.style.transform = `translate3d(0, ${(1 - t) * 20}px, 0) scale(${0.96 + t * 0.04})`
        taglineRef.current.style.filter = `blur(${(1 - t) * 8}px)`
      }
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${currentProgress})`
      }

      rafId = requestAnimationFrame(frame)
    }

    if (!reduceMotion) {
      rafId = requestAnimationFrame(frame)
    }

    return () => {
      video.removeEventListener("loadeddata", onLoadedData)
      video.removeEventListener("canplaythrough", onLoadedData)
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(rafId)
      releaseLock()
    }
  }, [scrubDistance])

  return (
    <div
      ref={sectionRef}
      className={className}
      style={{
        position: "relative",
        height: "100dvh",
        width: "100%",
        overflow: "hidden",
        background: COL_BG,
        ...style,
      }}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: ready ? 1 : 0,
          transformOrigin: "center center",
          willChange: "transform",
          transform: "translateZ(0)",
          transition: "opacity 0.6s ease",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(5,7,13,0.4), rgba(5,7,13,0) 30%, rgba(5,7,13,0.15) 70%, rgba(5,7,13,0.6))",
          pointerEvents: "none",
        }}
      />

      {/* Título Inicial ("MARCAS FORTES NÃO DISPUTAM ATENÇÃO.") */}
      <div
        ref={titleRef}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 6%",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: SANS,
            fontWeight: 800,
            fontSize: "clamp(28px, 6.5vw, 84px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: COL_TEXT,
            textShadow: "0 4px 30px rgba(0,0,0,0.6)",
            display: "inline-block",
            willChange: "transform, filter, opacity",
          }}
        >
          {title}
        </span>
      </div>

      {/* Subtítulo ("ELAS ATRAEM.") — Em BRANCO (#f2f4f8) igual ao título principal */}
      {tagline && (
        <div
          ref={taglineRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 8%",
            textAlign: "center",
            opacity: 0,
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontFamily: SANS,
              fontWeight: 800,
              fontSize: "clamp(36px, 8.5vw, 110px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: COL_TEXT,
              textShadow: "0 4px 35px rgba(0,0,0,0.8), 0 0 40px rgba(255,255,255,0.25)",
              display: "inline-block",
              willChange: "transform, filter, opacity",
            }}
          >
            {tagline}
          </span>
        </div>
      )}

      {/* Indicador de Scroll */}
      <div
        ref={hintRef}
        style={{
          position: "absolute",
          left: "50%",
          bottom: "clamp(20px, 6vh, 48px)",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          color: "rgba(240,244,248,0.75)",
          fontFamily: SANS,
          fontSize: "clamp(10px, 1.4vw, 12px)",
          fontWeight: 600,
          letterSpacing: "0.3em",
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }}
      >
        <span>{scrollHint}</span>
        <svg width="14" height="18" viewBox="0 0 14 18" style={{ animation: "metro-hero-bounce 1.6s ease-in-out infinite" }}>
          <style>{`
            @keyframes metro-hero-bounce {
              0%, 100% { transform: translateY(0); opacity: 0.5; }
              50% { transform: translateY(5px); opacity: 1; }
            }
          `}</style>
          <path d="M7 1 L7 17 M2 12 L7 17 L12 12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Barra de Progresso */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 3,
          background: "rgba(255,255,255,0.12)",
        }}
      >
        <div
          ref={progressBarRef}
          style={{
            height: "100%",
            width: "100%",
            background: "linear-gradient(90deg, rgba(242,244,248,0.6), rgba(242,244,248,0.95))",
            transform: "scaleX(0)",
            transformOrigin: "left center",
          }}
        />
      </div>
    </div>
  )
}
