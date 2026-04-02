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
    <div className="flex w-50 h-70 shrink-0 snap-start flex-col justify-between rounded-lg bg-white px-3 py-4 text-center shadow-sm">
      <div className="flex flex-col items-center">
        <h3 className="mb-3 text-sm font-semibold text-ml-text self-start px-2">{title}</h3>

        {/* Illustration placeholder */}
        <div className="relative mb-3 size-16 h-25">
          <Image
            src={imageSrc}
            alt={imageAlt}
            className="object-contain"
            fill
          />
        </div>

        <p className="mb-3 text-xs leading-relaxed text-gray-800">
          {description}
        </p>
      </div>

      <div
        className=" 
"
      >
        <a
          href="#"
          className="text-xs text-blue-500 hover:text-blue-600 bg-blue-500/20 px-2 py-1 rounded-md font-semibold "
        >
          {cta}
        </a>
      </div>
    </div>
  );
}
