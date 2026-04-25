"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster: string;
  posterAlt: string;
};

export function HeroVideo({ src, poster, posterAlt }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onCanPlay = () => setReady(true);
    const onProgress = () => {
      if (!video.duration) return;
      const buffered = video.buffered;
      if (buffered.length === 0) return;
      const end = buffered.end(buffered.length - 1);
      setProgress(Math.min(1, end / video.duration));
    };

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("progress", onProgress);
    video.addEventListener("loadeddata", onProgress);

    if (video.readyState >= 3) setReady(true);

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("progress", onProgress);
      video.removeEventListener("loadeddata", onProgress);
    };
  }, []);

  return (
    <>
      <img
        src={poster}
        alt={posterAlt}
        className="hero-poster"
        aria-hidden={ready ? "true" : undefined}
      />
      <video
        ref={videoRef}
        className="hero-video"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{ opacity: ready ? 1 : 0 }}
      />
      <div
        className={`hero-loader ${ready ? "hero-loader-done" : ""}`}
        aria-hidden="true"
      >
        <div className="hero-loader-bar" style={{ width: `${progress * 100}%` }} />
      </div>

      <style jsx>{`
        .hero-poster,
        .hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .hero-poster {
          z-index: 1;
        }
        .hero-video {
          z-index: 2;
          transition: opacity 800ms var(--ease);
        }
        .hero-loader {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          z-index: 4;
          background: rgba(247, 244, 238, 0.08);
          opacity: 1;
          transition: opacity 600ms var(--ease) 200ms;
        }
        .hero-loader-bar {
          height: 100%;
          background: var(--terracotta);
          transition: width 240ms var(--ease);
        }
        .hero-loader-done {
          opacity: 0;
        }
      `}</style>
    </>
  );
}
