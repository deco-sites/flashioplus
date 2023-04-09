import Text from "$store/components/ui/Text.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderControllerJS from "$store/islands/SliderJS.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import { useId } from "preact/hooks";
import { animation, keyframes, tw } from "twind/css";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";

export interface Item {
  image: string;
}

export interface Props {
  images?: string[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
}

function MobileItem({ image }: Item) {
  return (
    <div class="relative min-w-[100%] overflow-y-hidden">
      <Image
        width={480}
        height={480}
        src={image}
        alt="Detalhe visual do produto"
        class="!max-w-none"
      />
    </div>
  );
}

function Dots({ images }: Props) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @property --dot-progress {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }`,
        }}
      >
      </style>
      <ol class="flex items-center justify-center col-span-full gap-2 z-10 row-start-4">
        {images?.map((_, index) => (
          <li class="h-full">
            <button
              data-dot={index}
              aria-label={`go to slider item ${index}`}
              class="h-full rounded focus:outline-none group"
            >
              <div
                class={tw`group-disabled:(bg-[#ff5a11])  bg-[#CACBCC] w-3 h-3 rounded-full`}
              />
            </button>
          </li>
        ))}
      </ol>
    </>
  );
}

function Controls() {
  return (
    <>
      <div class="flex items-center justify-center justify-self-start z-10 col-start-1 row-start-2">
        <Button
          class="h-12 w-12 "
          variant="icon"
          data-slide="prev"
          aria-label="Previous item"
        >
          <Icon
            class=""
            size={30}
            id="ChevronLeft"
            strokeWidth={2}
          />
        </Button>
      </div>
      <div class="flex items-center justify-center justify-self-end z-10 col-start-3 row-start-2">
        <Button
          class="h-12 w-12"
          variant="icon"
          data-slide="next"
          aria-label="Next item"
        >
          <Icon
            class=""
            size={30}
            id="ChevronRight"
            strokeWidth={2}
          />
        </Button>
      </div>
    </>
  );
}

function MobileCarousel({ images }: Props) {
  const id = useId() + "" + (Math.floor(Math.random() * (10001 - 1 + 1)) + 1);

  return (
    <>
      <div
        id={id}
        class="relative my-8 grid grid-cols-[48px_1fr_48px] items-start sm:grid-cols-[120px_1fr_120px_120px] grid-rows-[auto_auto_auto]"
      >
        <Slider class="col-span-full row-span-full scrollbar-none gap-6 w-full">
          {images?.map((image, index) => <MobileItem image={image} />)}
        </Slider>
        <Controls />
        <div class="w-full flex justify-center absolute col-start-1 col-end-4 bottom-[-40px] py-2">
          <Dots images={images} />
        </div>
        <SliderControllerJS rootId={id} />
      </div>
    </>
  );
}

export default MobileCarousel;
