type Variant = "mountain" | "river" | "sea" | "forest" | "city";

const SOURCES: Record<Variant, { video: string; poster: string }> = {
  mountain: {
    video: "https://videos.pexels.com/video-files/35058289/14850953_1080_1920_60fps.mp4",
    poster: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80",
  },
  river: {
    video: "https://cdn.pixabay.com/video/2023/01/15/146606-789534239.mp4?download",
    poster: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1920&q=80",
  },
  sea: {
    video: "https://cdn.pixabay.com/video/2025/02/16/258658.mp4?download",
    poster: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80",
  },
  forest: {
    video: "https://cdn.pixabay.com/video/2024/08/30/228847.mp4?download", //
    poster: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80",
  },
  city: {
    video: "https://cdn.pixabay.com/video/2023/10/07/183880-872226465.mp4?download", //
    poster: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1920&q=80",
  },
};

export function BackgroundVideo({
  variant = "mountain",
  intensity = "medium",
}: {
  variant?: Variant;
  intensity?: "soft" | "medium" | "strong";
}) {
  const { video, poster } = SOURCES[variant];
  const overlay =
    intensity === "soft"
      ? "from-background/30 via-background/45 to-background"
      : intensity === "strong"
      ? "from-background/65 via-background/75 to-background"
      : "from-background/45 via-background/60 to-background";

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
      >
        <source src={video} type="video/mp4" />
      </video>
      <div className={`absolute inset-0 bg-gradient-to-b ${overlay}`} />
      <div className="absolute inset-0 gradient-hero opacity-40 mix-blend-soft-light" />
    </div>
  );
}
