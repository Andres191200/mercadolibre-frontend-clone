import Image from "next/image";

export function PromoBannerCard() {
  return (
    <div className="relative flex w-[180px] shrink-0 snap-start flex-col overflow-hidden rounded-lg">
      {/* Banner image placeholder */}
      <div className="relative aspect-[180/240] w-full bg-zinc-100">
        <Image
          src="/cards/promo-banner.png"
          alt="Promoción"
          fill
          className="object-cover"
        />
      </div>

      {/* CTA overlay at bottom */}
      <button className="absolute inset-x-3 bottom-3 cursor-pointer rounded-md bg-blue-500 py-2 text-center text-sm font-medium text-white">
        Seguí viendo
      </button>
    </div>
  );
}
