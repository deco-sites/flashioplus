import Text from "$store/components/ui/Text.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import { headerHeightDesktop } from "./constants.ts";

export interface INavItem {
  label: string;
  href: string;
  children?: INavItem[];
  image?: { src?: string; alt?: string };
}

function NavItem({ item }: { item: INavItem }) {
  const { href, label, children, image } = item;

  return (
    <li class="group flex items-center">
      <a href={href} class="px-4 py-3">
        <Text
          class="group-hover:text-gray-300 uppercase"
          variant="menu"
          tone="default-inverse"
        >
          {label}
        </Text>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class={`fixed bg-default invisible hover:visible group-hover:visible z-50 border-t-1 border-b-2 border-default w-screen mt-[${headerHeightDesktop}]`}
            style={{ top: "0px", left: "0px" }}
          >
            <div className="max-w-[1200px] flex items-start justify-between mx-auto gap-6">
              <ul class="flex items-start justify-center gap-6">
                {children.map((node) => (
                  <li class="p-6">
                    <a class="hover:underline" href={node.href}>
                      <Text variant="menu">
                        {node.label}
                      </Text>
                    </a>

                    <ul class="flex flex-col gap-1 mt-4">
                      {node.children?.map((leaf) => (
                        <li>
                          <a class="hover:underline" href={leaf.href}>
                            <Text variant="caption">{leaf.label}</Text>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
              {image?.src && (
                <Image
                  class="p-6"
                  src={image.src}
                  alt={image.alt}
                  width={300}
                  height={332}
                  loading="lazy"
                />
              )}
            </div>
          </div>
        )}
    </li>
  );
}

export default NavItem;
