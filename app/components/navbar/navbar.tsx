import Image from "next/image";
import { SearchIcon } from "./utils/icons/search-icon";
import { BellIcon } from "./utils/icons/bell-icon";
import { CartIcon } from "./utils/icons/cart-icon";
import { TagIcon } from "./utils/icons/tag-icon";
import { LocationIcon } from "./utils/icons/location-icon";
import { ChevronDownIcon } from "./utils/icons/chevron-down-icon";

const NAV_LINKS = [
  { label: "Categorías", hasDropdown: true },
  { label: "Ofertas" },
  { label: "Cupones" },
  { label: "Supermercado" },
  { label: "Moda" },
  { label: "Mercado Play", badge: "GRATIS" },
  { label: "Vender" },
  { label: "Ayuda" },
] as const;

export function Navbar() {
  return (
    <header className="bg-ml-yellow">
      {/* Desktop Navbar */}
      <DesktopNavbar />
      {/* Mobile Navbar */}
      <MobileNavbar />
    </header>
  );
}

function DesktopNavbar() {
  return (
    <div className="hidden md:block">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Top row: logo, search, promo */}
        <div className="flex h-16 items-center justify-start">
          <LeftSection />
          <SearchBar />
          <PromoSection />
        </div>

        {/* Bottom row: nav links + user actions */}
        <div className="flex items-center justify-between pb-2">
          <nav className="flex items-center gap-3">
            <LocationInfo />
            {NAV_LINKS.map((link) => (
              <NavLink key={link.label} {...link} />
            ))}
          </nav>
          <UserActions />
        </div>
      </div>
    </div>
  );
}

function MobileNavbar() {
  return (
    <div className="flex h-14 items-center justify-between px-3 md:hidden">
      {/* Logo icon only */}
      <Logo />
      {/* Search input */}
      <div className="relative mx-2 flex flex-1">
        <SearchIcon className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-ml-hint" />
        <input
          type="text"
          placeholder="Estoy buscando..."
          className="h-9 w-full rounded-full bg-white py-0 pl-9 pr-3 text-sm shadow-sm outline-none"
        />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2.5">
        <button className="relative cursor-pointer" aria-label="Notificaciones">
          <BellIcon className="size-6" />
          <NotificationBadge count={8} />
        </button>
        <button className="cursor-pointer" aria-label="Carrito">
          <CartIcon className="size-6" />
        </button>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <Image
      src="/logo.png"
      alt="Mercado Libre"
      width={134}
      height={34}
      className="cursor-pointer object-contain"
    />
    
  )
}

function LeftSection() {
  return (
    <div className="flex items-center gap-4">
      <Logo />
    </div>
  );
}

function LocationInfo() {
  return (
    <div className="flex items-center gap-1 text-xs">
      <LocationIcon className="size-4 text-ml-text" />
      <div className="flex flex-col leading-tight">
        <span className="text-ml-text">Enviar a Andres</span>
        <span className="font-semibold text-ml-text">Calle Santa Elena 661</span>
      </div>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="mx-6 flex max-w-150 flex-1">
      <input
        type="text"
        placeholder="Buscar productos, marcas y más..."
        className="h-9 flex-1 rounded-l bg-white px-3 text-sm outline-none"
      />
      <button
        className="flex h-9 w-10 cursor-pointer items-center justify-center rounded-r bg-ml-search-button"
        aria-label="Buscar"
      >
        <SearchIcon className="size-4 text-ml-text" />
      </button>
    </div>
  );
}

function PromoSection() {
  return (
    <div className="flex items-center gap-1.5 ml-auto">
      <TagIcon className="size-5" />
      <span className="text-sm font-medium">Ofertas por tiempo limitado</span>
    </div>
  );
}

function NavLink({
  label,
  hasDropdown,
  badge,
}: {
  label: string;
  hasDropdown?: boolean;
  badge?: string;
}) {
  return (
    <a
      href="#"
      className="flex items-center gap-0.5 text-[13px] text-ml-text hover:text-black"
    >
      {label}
      {badge && (
        <span className="ml-0.5 rounded bg-green-600 px-1 py-px text-[10px] font-bold text-white">
          {badge}
        </span>
      )}
      {hasDropdown && <ChevronDownIcon className="size-3" />}
    </a>
  );
}

function UserActions() {
  return (
    <div className="flex items-center gap-3">
      {/* Avatar + name */}
      <div className="flex cursor-pointer items-center gap-1.5">
        <div className="flex size-7 items-center justify-center rounded-full bg-ml-search-button text-xs font-semibold text-ml-text">
          MJ
        </div>
        <span className="flex items-center gap-0.5 text-[13px] text-ml-text">
          Mariano ...
          <ChevronDownIcon className="size-3" />
        </span>
      </div>

      <a href="#" className="text-[13px] text-ml-text hover:text-black">
        Mis compras
      </a>

      <a
        href="#"
        className="flex items-center gap-0.5 text-[13px] text-ml-text hover:text-black"
      >
        Favoritos
        <ChevronDownIcon className="size-3" />
      </a>

      <button className="relative cursor-pointer" aria-label="Notificaciones">
        <BellIcon className="size-5" />
        <NotificationBadge count={6} />
      </button>

      <button className="cursor-pointer" aria-label="Carrito">
        <CartIcon className="size-5" />
      </button>
    </div>
  );
}

function NotificationBadge({ count }: { count: number }) {
  return (
    <span className="absolute -right-1.5 -top-1 min-w-4 rounded-full bg-ml-badge-red px-1 text-center text-[10px] font-semibold text-white">
      {count}
    </span>
  );
}
