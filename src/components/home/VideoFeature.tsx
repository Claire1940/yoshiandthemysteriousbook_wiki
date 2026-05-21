"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";

interface VideoFeatureProps {
  videoId: string;
  title: string;
}

export function VideoFeature({ videoId, title }: VideoFeatureProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [shouldAutoplay, setShouldAutoplay] = useState(false);

  useEffect(() => {
    const target = sectionRef.current;
    if (!target || typeof IntersectionObserver === "undefined") {
      setShouldAutoplay(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShouldAutoplay(entry.isIntersecting);
      },
      { threshold: 0.45 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const watchUrl = useMemo(
    () => `https://www.youtube.com/watch?v=${videoId}`,
    [videoId],
  );

  const embedUrl = useMemo(
    () =>
      `https://www.youtube.com/embed/${videoId}?autoplay=${shouldAutoplay ? 1 : 0}&mute=1&loop=1&playlist=${videoId}&playsinline=1&rel=0`,
    [videoId, shouldAutoplay],
  );

  return (
    <div ref={sectionRef} className="space-y-4">
      <div
        className="relative w-full overflow-hidden rounded-lg"
        style={{ paddingBottom: "56.25%" }}
      >
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />

        {!shouldAutoplay && (
          <button
            type="button"
            onClick={() => setShouldAutoplay(true)}
            className="absolute inset-x-0 bottom-4 mx-auto w-fit rounded-full bg-[hsl(var(--nav-theme))] px-4 py-2 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[hsl(var(--nav-theme)/0.9)]"
          >
            Play Trailer
          </button>
        )}
      </div>

      <div className="flex justify-center">
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors"
        >
          Watch on YouTube
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
