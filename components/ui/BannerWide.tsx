import { LiveImage } from "../../sections/Highlights.tsx";
import Image from "deco-sites/std/components/Image.tsx";

export interface Props {
  image: LiveImage;
  text?: string;
  width?: number;
  height?: number;
}

function BannerWide({ image, text, width = 1100, height = 50 }: Props) {
  return (
    <div class="relative">
      <Image src={image} width={width} height={height} class="w-full" />
      <p class="absolute top-[50%]  left-8 text-[32px] text-white uppercase font-bold">
        {text}
      </p>
    </div>
  );
}

export default BannerWide;
