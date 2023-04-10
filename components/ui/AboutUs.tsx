import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";

export type Item = {
  icon: LiveImage;
  title: string;
  text: string;
  href: string;
  linkText: string;
};

export interface Props {
  image: LiveImage;
  title: string;
  itens: Item[];
}

function Item({ href, icon, linkText, text, title }: Item) {
  return (
    <div class="flex items-start gap-3">
      <div class="rounded-full bg-orange p-3">
        <Image src={icon} width={36} height={36} alt="icone" />
      </div>
      <div class="w-[305px] text-white flex flex-col flex-grow h-full justify-between items-start gap-4">
        <div class="flex flex-col gap-2">
          <h3 class="font-bold">{title}</h3>
          <p>{text}</p>
        </div>
        <a
          class="bg-white rounded-full text-xs font-bold py-3 px-6 text-black flex-grow-0"
          href={href}
        >
          {linkText}
        </a>
      </div>
    </div>
  );
}

function AboutUs({ image, title, itens }: Props) {
  return (
    <section
      class="h-[525px] bg-cover mt-8 flex flex-col gap-6 items-center justify-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div class="flex flex-col items-center">
        <h2 class="text-2xl text-white">Quem somos?</h2>
        <p class="text-7xl text-white font-medium">{title}</p>
      </div>
      <div class="flex gap-3 overflow-scroll max-w-full px-4 scrollbar-none">
        {itens.map((item) => <Item {...item} />)}
      </div>
    </section>
  );
}

export default AboutUs;
