import Image from "next/image";

interface InfoCardProps {
  title: string;
  description: string;
  cta: string;
  imageSrc: string;
  imageAlt: string;
}

export function InfoCard({
  title,
  description,
  cta,
  imageSrc,
  imageAlt,
}: InfoCardProps) {
  return (
    <div className="flex w-[180px] shrink-0 snap-start flex-col items-center rounded-lg bg-white px-3 py-4 text-center shadow-sm">
      <h3 className="mb-3 text-sm font-semibold text-ml-text">{title}</h3>

      {/* Illustration placeholder */}
      <div className="relative mb-3 size-16">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-contain"
        />
      </div>

      <p className="mb-3 text-xs leading-relaxed text-ml-hint">
        {description}
      </p>

      <a
        href="#"
        className="mt-auto text-xs font-medium text-blue-500 hover:text-blue-600"
      >
        {cta}
      </a>
    </div>
  );
}
