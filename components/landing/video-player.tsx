"use client";

import { useState, useCallback, useEffect, useRef } from "react";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  /** Other video URLs to prefetch after this one loads */
  prefetchSrcs?: string[];
  /** Called when the video finishes playing */
  onEnded?: () => void;
}

export function VideoPlayer({
  src,
  poster,
  className,
  autoPlay,
  loop,
  muted,
  prefetchSrcs,
  onEnded,
}: VideoPlayerProps) {
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefetchedRef = useRef<Set<string>>(new Set());

  // Lazy load — only set the src when the container scrolls into view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Reset ready state when src changes (tab switch)
  useEffect(() => setReady(false), [src]);

  const handleCanPlay = useCallback(() => setReady(true), []);

  // After the active video is ready, prefetch sibling videos via hidden <link>
  useEffect(() => {
    if (!ready || !prefetchSrcs) return;
    for (const url of prefetchSrcs) {
      if (url === src || prefetchedRef.current.has(url)) continue;
      prefetchedRef.current.add(url);
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.as = "video";
      link.href = url;
      document.head.appendChild(link);
    }
  }, [ready, prefetchSrcs, src]);

  return (
    <div ref={containerRef} className="relative aspect-video bg-[#1a2a2a]">
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white/60 animate-spin" />
        </div>
      )}
      {inView && (
        <video
          src={src}
          poster={poster}
          controls={!autoPlay}
          preload="auto"
          playsInline
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          onCanPlay={handleCanPlay}
          onEnded={onEnded}
          className={`w-full h-full object-contain transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"} ${className ?? ""}`}
        >
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}
