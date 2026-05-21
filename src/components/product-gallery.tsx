import Link from "next/link";
import type { Product } from "@/data/products";
import { TryOnLauncher } from "@/components/try-on-launcher";

type ProductGalleryProps = {
  product: Product;
  selectedImageIndex?: number;
  selectedColor?: string;
  selectedSize?: string;
};

export function ProductGallery({
  product,
  selectedImageIndex = 0,
  selectedColor,
  selectedSize,
}: ProductGalleryProps) {
  const images = product.galleryImages;
  const safeIndex =
    selectedImageIndex >= 0 && selectedImageIndex < images.length ? selectedImageIndex : 0;
  const selectedImage = images[safeIndex] ?? images[0] ?? "";
  const isLifestyleImage = safeIndex === images.length - 1;

  return (
    <div>
      <div className="relative overflow-hidden rounded-[1.8rem] border border-[rgba(23,19,16,0.08)] bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={selectedImage}
          alt={product.name}
          className={`aspect-[1.35/1] w-full bg-white ${
            isLifestyleImage ? "object-cover p-0" : "object-contain p-10 sm:p-14"
          }`}
        />
        <div className="absolute left-5 top-5 rounded-md bg-white/92 px-4 py-2 text-[11px] text-[#171310] shadow-[0_10px_18px_rgba(0,0,0,0.05)]">
          {isLifestyleImage
            ? `Lifestyle reference for ${product.name}.`
            : `Frame preview: ${product.name} in ${selectedColor ?? product.colors[0]}.`}
        </div>
        <TryOnLauncher
          className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#171310] shadow-[0_12px_24px_rgba(0,0,0,0.08)]"
          label="Try-On"
        />
      </div>

      <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
        {images.map((image, index) => {
          const query = new URLSearchParams();
          query.set("image", String(index));
          if (selectedColor) query.set("color", selectedColor);
          if (selectedSize) query.set("size", selectedSize);

          return (
            <Link
              key={`${image}-${index}`}
              href={`/products/${product.slug}?${query.toString()}`}
              className={`overflow-hidden rounded-[1rem] border transition-all ${
                safeIndex === index
                  ? "border-[#171310] bg-white shadow-[inset_0_0_0_1px_#171310]"
                  : "border-[rgba(23,19,16,0.08)] bg-[#f8f4ed]"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={`${product.name} thumbnail ${index + 1}`}
                className={`aspect-square w-full ${
                  index === images.length - 1
                    ? "bg-white object-cover p-0"
                    : "bg-white object-contain p-4"
                }`}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
