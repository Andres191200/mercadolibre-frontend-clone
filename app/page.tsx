import { Slider } from "./components/slider/slider";
import { CardsCarousel } from "./components/cards-carousel/cards-carousel";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50">
      <Slider />
      <CardsCarousel />
    </div>
  );
}
