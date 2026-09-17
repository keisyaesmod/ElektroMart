"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductImage from "./ProductImage";

type ProductGalleryProps = {
  images: string[];
  alt: string;
};

const thumbnailsPerPage = 3;

export default function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);

  const visibleImages = images.slice(
    startIndex,
    startIndex + thumbnailsPerPage,
  );
  const canGoPrevious = startIndex > 0;
  const canGoNext = startIndex + thumbnailsPerPage < images.length;

  function selectImage(index: number) {
    setActiveIndex(index);
  }

  function moveThumbnails(direction: "previous" | "next") {
    const nextStartIndex =
      direction === "next" ? startIndex + 1 : startIndex - 1;

    if (nextStartIndex >= 0 && nextStartIndex <= images.length - thumbnailsPerPage) {
      setStartIndex(nextStartIndex);
    }
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-50">
        <ProductImage
          src={images[activeIndex]}
          alt={`${alt} - gambar ${activeIndex + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => moveThumbnails("previous")}
          disabled={!canGoPrevious}
          aria-label="Gambar sebelumnya"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-navy-900 transition hover:border-brand-blue hover:text-brand-blue disabled:cursor-not-allowed disabled:opacity-35"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="grid min-w-0 flex-1 grid-cols-3 gap-1.5">
          {visibleImages.map((src, visibleIndex) => {
            const imageIndex = startIndex + visibleIndex;
            const isActive = imageIndex === activeIndex;

            return (
              <button
                type="button"
                key={`${src}-${imageIndex}`}
                onClick={() => selectImage(imageIndex)}
                aria-label={`Pilih gambar ${imageIndex + 1}`}
                aria-pressed={isActive}
                className={`relative aspect-square overflow-hidden rounded-lg border-2 bg-slate-50 transition ${
                  isActive
                    ? "border-brand-blue"
                    : "border-transparent hover:border-slate-300"
                }`}
              >
                <ProductImage
                  src={src}
                  alt={`${alt} thumbnail ${imageIndex + 1}`}
                  fill
                  sizes="(max-width: 1024px) 25vw, 10vw"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => moveThumbnails("next")}
          disabled={!canGoNext}
          aria-label="Gambar berikutnya"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-navy-900 transition hover:border-brand-blue hover:text-brand-blue disabled:cursor-not-allowed disabled:opacity-35"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}