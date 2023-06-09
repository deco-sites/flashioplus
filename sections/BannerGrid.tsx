import Container from "$store/components/ui/Container.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import MobileCarousel from "../components/ui/MobileCarousel.tsx";
import Carousel from "./Carousel.tsx";

export interface Banner {
  srcMobile: LiveImage;
  srcDesktop?: LiveImage;
  /**
   * @description Image alt text
   */
  alt: string;
  /**
   * @description When you click you go to
   */
  href: string;
}

export interface Props {
  title?: string;
  /**
   * @description Default is 2 for mobile and all for desktop
   */
  itemsPerLine: {
    mobile?: number;
    desktop?: number;
  };
  /**
   * @description Item's border radius in px
   */
  borderRadius: {
    mobile?: number;
    desktop?: number;
  };
  banners: Banner[];
}

export default function BannnerGrid({
  title,
  itemsPerLine,
  borderRadius,
  banners = [],
}: Props) {
  const images = banners.map((item) => item.srcMobile);
  return (
    <Container>
      {/* Mobile */}
      <section class="sm:hidden">
        <MobileCarousel images={images} />
      </section>
      {/* Desktop */}
      <section class="hidden sm:block w-full px-5 md:px-0 mx-auto py-10">
        {title &&
          (
            <div class="py-6 md:py-0 md:pb-[40px] flex items-center mt-6">
              <h2 class={"text-lg leading-5 font-semibold uppercase "}>
                {title}
              </h2>

              <div class="bg-[#e5e5ea] h-[1px] w-full ml-4"></div>
            </div>
          )}
        <div
          class={`grid gap-4 md:gap-6 grid-cols-${
            itemsPerLine && itemsPerLine.mobile ? itemsPerLine.mobile : "2"
          } md:grid-cols-${
            itemsPerLine && itemsPerLine.desktop !== 2
              ? itemsPerLine.desktop
              : 3
          }`}
        >
          {banners.map(({ href, srcMobile, srcDesktop, alt }, index) => (
            <a
              href={href}
              class={`overflow-hidden h-[360px] ${
                itemsPerLine &&
                  (itemsPerLine.desktop === 2 && (index === 1 || index === 2))
                  ? "col-span-2"
                  : "col-span-1"
              } ${
                borderRadius?.mobile && `rounded-[${borderRadius.mobile}px]`
              } ${
                borderRadius?.desktop
                  ? `sm:rounded-[${borderRadius.desktop}px]`
                  : `sm:rounded-none`
              }`}
            >
              <Picture>
                <Source
                  media="(max-width: 767px)"
                  src={srcMobile}
                  width={100}
                  height={100}
                />
                <Source
                  media="(min-width: 768px)"
                  src={srcDesktop ? srcDesktop : srcMobile}
                  width={(itemsPerLine.desktop === 1 ||
                      itemsPerLine.desktop === 2 &&
                        (index === 1 || index === 2))
                    ? 1200
                    : 400}
                  height={(itemsPerLine.desktop === 1 ||
                      itemsPerLine.desktop === 2 && index === 1)
                    ? 400
                    : 400}
                />
                <img
                  class="w-full h-[335px]"
                  sizes="(max-width: 640px) 100vw, 30vw"
                  src={srcMobile}
                  alt={alt}
                  decoding="async"
                  loading="lazy"
                />
              </Picture>
            </a>
          ))}
        </div>
      </section>
    </Container>
  );
}
