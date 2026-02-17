"use client";

import Image from "next/image";
import { parallaxMarqueeImages } from "./parallax-marquee-data";

function MarqueeRow({
  images,
  direction,
}: {
  images: readonly string[];
  direction: "left" | "right";
}) {
  return (
    <div className="relative flex w-full overflow-hidden">
      <div
        className="flex shrink-0 gap-4 pr-4 will-change-transform"
        style={{
          animation: `marquee-${direction} 60s linear infinite`,
        }}
      >
        {/* Duplicamos el set para scroll infinito */}
        {[1, 2].map((copy) => (
          <div key={copy} className="flex shrink-0 gap-4">
            {images.map((src, i) => (
              <div
                key={`${copy}-${i}`}
                className="relative h-[200px] w-[300px] shrink-0 overflow-hidden rounded-lg bg-muted md:h-[240px] md:w-[360px]"
              >
                <Image
                  src={src}
                  alt=""
                  width={1080}
                  height={720}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 768px) 300px, 360px"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ParallaxImageMarquee() {
  return (
    <section className="w-full overflow-hidden py-12 md:py-16">
      <div className="flex flex-col gap-4">
        <MarqueeRow images={parallaxMarqueeImages.row1} direction="left" />
        <MarqueeRow images={parallaxMarqueeImages.row2} direction="right" />
      </div>
    </section>
  );
}
