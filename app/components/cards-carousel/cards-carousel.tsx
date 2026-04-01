"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { FavoriteProductCard } from "./favorite-product-card";
import { PromoBannerCard } from "./promo-banner-card";
import { InfoCard } from "./info-card";
import { ChevronLeftIcon } from "../icons/chevron-left-icon";
import { ChevronRightIcon } from "../icons/chevron-right-icon";

const INFO_CARDS = [
  {
    title: "Medios de pago",
    description: "Pagá tus compras de forma rápida y segura.",
    cta: "Conocer medios de pago",
    imageSrc: "/cards/card-2.png",
    imageAlt: "Medios de pago",
  },
  {
    title: "Menos de $20.000",
    description: "Descubrí productos con precios bajos.",
    cta: "Mostrar productos",
    imageSrc: "/cards/card-3.png",
    imageAlt: "Menos de $20.000",
  },
  {
    title: "Más vendidos",
    description: "Explorá los productos que son tendencia.",
    cta: "Ir a Más vendidos",
    imageSrc: "/cards/card-5.png",
    imageAlt: "Más vendidos",
  },
  {
    title: "Compra protegida",
    description: "Podés devolver tu compra gratis.",
    cta: "Cómo funciona",
    imageSrc: "/cards/card-4.png",
    imageAlt: "Compra protegida",
  },
  {
    title: "Tiendas oficiales",
    description: "Encontrá tus marcas preferidas.",
    cta: "Mostrar tiendas",
    imageSrc: "/cards/card-6.png",
    imageAlt: "Tiendas oficiales",
  },
  {
    title: "Nuestras categorías",
    description: "Encontrá celulares, ropa, inmuebles y más.",
    cta: "Ir a Categorías",
    imageSrc: "/cards/card-1.png",
    imageAlt: "Nuestras categorías",
  },
] as const;

const SCROLL_AMOUNT = 400;

export function CardsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [updateScrollState]);

  const scrollLeft = useCallback(() => {
    scrollRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
  }, []);

  const scrollRight = useCallback(() => {
    scrollRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
  }, []);

  return (
    <section className="group/cards relative mx-auto w-full max-w-300 px-2 py-2">
      {/* Left arrow */}
      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 z-10 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white shadow-md opacity-0 transition-opacity group-hover/cards:opacity-100"
          aria-label="Anterior"
        >
          <ChevronLeftIcon className="size-5 text-ml-text" />
        </button>
      )}

      {/* Scrollable track */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 scrollbar-hide"
      >
        <FavoriteProductCard />
        <PromoBannerCard />
        {INFO_CARDS.map((card) => (
          <InfoCard key={card.title} {...card} />
        ))}
      </div>

      {/* Right arrow */}
      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 z-10 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white shadow-md opacity-0 transition-opacity group-hover/cards:opacity-100"
          aria-label="Siguiente"
        >
          <ChevronRightIcon className="size-5 text-ml-text" />
        </button>
      )}
    </section>
  );
}
