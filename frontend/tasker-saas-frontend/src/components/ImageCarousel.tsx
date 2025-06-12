// src/components/ui/ImageCarousel.tsx
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/assets/onesf.png",
  "/assets/taskssf.png",
  "/assets/teamssf.png",
];

export const ImageCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="relative max-w-5xl mx-auto overflow-hidden">
      <div className="overflow-hidden rounded-xl shadow-lg" ref={emblaRef}>
        <div className="flex">
          {images.map((src, index) => (
            <div className="min-w-full" key={index}>
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Indicators */}
      <div className="flex justify-center mt-3 gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === selectedIndex ? "bg-indigo-500" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
