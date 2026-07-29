"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

export default function Parallax({
  src,
  alt,
  priority = false,
  distance = 60,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);

  return (
    <div ref={ref} className="absolute inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute inset-x-0 -inset-y-[12%]"
        style={reduced ? undefined : { y }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
