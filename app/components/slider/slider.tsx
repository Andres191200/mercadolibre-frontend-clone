"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon } from "../icons/chevron-left-icon";
import { ChevronRightIcon } from "../icons/chevron-right-icon";

const SLIDE_COUNT = 8;
const AUTO_PLAY_MS = 3000;
const TRANSITION_MS = 500;

const slides = Array.from({ length: SLIDE_COUNT }, (_, i) => ({
  src: `/slider/${i + 1}.png`,
  alt: `Slide ${i + 1}`,
}));

// Extended slides: [last, ...originals, first] for infinite loop illusion
const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

export function Slider() {
  // index into extendedSlides; 1 = first real slide
  const [current, setCurrent] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentRef = useRef(current);
  const isTransitioningRef = useRef(isTransitioning);

  // Keep refs in sync inside an effect to avoid side effects during render
  useEffect(() => {
    currentRef.current = current;
    isTransitioningRef.current = isTransitioning;
  }, [current, isTransitioning]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioningRef.current) return;
      setIsTransitioning(true);
      setCurrent(index);
    },
    [],
  );

  const startTimer = useCallback(() => {
    clearTimer();
    timerRef.current = setTimeout(() => {
      goTo(currentRef.current + 1);
    }, AUTO_PLAY_MS);
  }, [clearTimer, goTo]);

  const goNext = useCallback(() => {
    goTo(currentRef.current + 1);
    startTimer();
  }, [goTo, startTimer]);

  const goPrev = useCallback(() => {
    goTo(currentRef.current - 1);
    startTimer();
  }, [goTo, startTimer]);

  const goToDot = useCallback(
    (dotIndex: number) => {
      goTo(dotIndex + 1);
      startTimer();
    },
    [goTo, startTimer],
  );

  // After transition ends, snap to real position if on a clone
  const handleTransitionEnd = useCallback(() => {
    setIsTransitioning(false);
    const cur = currentRef.current;
    if (cur === 0) {
      if (trackRef.current) trackRef.current.style.transition = "none";
      setCurrent(SLIDE_COUNT);
      requestAnimationFrame(() => {
        if (trackRef.current) trackRef.current.style.transition = "";
      });
    } else if (cur === SLIDE_COUNT + 1) {
      if (trackRef.current) trackRef.current.style.transition = "none";
      setCurrent(1);
      requestAnimationFrame(() => {
        if (trackRef.current) trackRef.current.style.transition = "";
      });
    }
  }, []);

  // Auto-play
  useEffect(() => {
    startTimer();
    return clearTimer;
  }, [startTimer, clearTimer]);

  // Restart timer after each transition completes
  useEffect(() => {
    if (!isTransitioning) {
      startTimer();
    }
    return clearTimer;
  }, [isTransitioning, startTimer, clearTimer]);

  // Real slide index (0-based) for dot indicators
  const realIndex =
    current === 0
      ? SLIDE_COUNT - 1
      : current === SLIDE_COUNT + 1
        ? 0
        : current - 1;

  return (
    <div className="group relative w-full overflow-hidden bg-black/5">
      {/* Track */}
      <div
        ref={trackRef}
        className="flex"
        style={{
          transform: `translateX(-${current * 100}%)`,
          transition: isTransitioning
            ? `transform ${TRANSITION_MS}ms ease-in-out`
            : undefined,
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {extendedSlides.map((slide, i) => (
          <div key={i} className="relative aspect-1440/420 w-full shrink-0">
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={i >= 1 && i <= 2}
            />
          </div>
        ))}
      </div>

      {/* Left arrow */}
      <button
        onClick={goPrev}
        className="absolute left-0 top-0 flex h-full w-12 cursor-pointer items-center justify-center bg-transparent opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/10"
        aria-label="Slide anterior"
      >
        <ChevronLeftIcon className="size-8 text-white drop-shadow-md" />
      </button>

      {/* Right arrow */}
      <button
        onClick={goNext}
        className="absolute right-0 top-0 flex h-full w-12 cursor-pointer items-center justify-center bg-transparent opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/10"
        aria-label="Siguiente slide"
      >
        <ChevronRightIcon className="size-8 text-white drop-shadow-md" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToDot(i)}
            className={`size-2 cursor-pointer rounded-full transition-colors ${
              i === realIndex ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Ir a slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
