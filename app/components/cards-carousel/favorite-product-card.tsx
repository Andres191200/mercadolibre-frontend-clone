import Image from "next/image";

export function FavoriteProductCard() {
  return (
    <div className="flex w-[180px] shrink-0 snap-start flex-col rounded-lg bg-white p-3 shadow-sm">
      <h3 className="mb-2 text-sm font-semibold text-ml-text">
        Llevate tu favorito
      </h3>

      {/* Product image placeholder */}
      <div className="relative mb-2 aspect-square w-full overflow-hidden rounded bg-zinc-100">
        <Image
          src="/cards/favorite_article.webp"
          alt="Camisa De Vestir Lisa Celeste Macowens"
          fill
          className="object-contain"
        />
      </div>

      <p className="mb-1 line-clamp-2 text-xs text-ml-text">
        Camisa De Vestir Lisa Celeste Macowens...
      </p>

      <div className="mb-1">
        <span className="text-[11px] text-ml-hint line-through">$ 85.990</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-sm font-medium text-ml-text">$ 77.391</span>
        <span className="text-xs font-medium text-green-600">10% OFF</span>
      </div>

      <span className="mt-1 text-xs font-semibold text-green-600">
        Envío gratis
      </span>
    </div>
  );
}
