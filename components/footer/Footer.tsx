import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import Text from "$store/components/ui/Text.tsx";
import Container from "$store/components/ui/Container.tsx";

import Newsletter from "./Newsletter.tsx";
import type { ComponentChildren } from "preact";

export type IconItem = { icon: AvailableIcons };
export type StringItem = {
  label: string;
  href: string;
};

export type Item = StringItem | IconItem;

export type Section = {
  label: string;
  children: Item[];
};

const isIcon = (item: Item): item is IconItem =>
  // deno-lint-ignore no-explicit-any
  typeof (item as any)?.icon === "string";

function SectionItem({ item }: { item: Item }) {
  return (
    <Text variant="caption" tone="footer">
      {isIcon(item)
        ? (
          <div class="border-default border-1 py-1.5 px-2.5">
            <Icon
              id={item.icon}
              width={25}
              height={20}
              strokeWidth={0.01}
            />
          </div>
        )
        : (
          <a href={item.href}>
            {item.label}
          </a>
        )}
    </Text>
  );
}

function FooterContainer(
  { children, class: _class = "" }: {
    class?: string;
    children: ComponentChildren;
  },
) {
  return <div class={`py-6 px-4 sm:py-12 sm:px-0 ${_class}`}>{children}</div>;
}

export interface Props {
  sections?: Section[];
}

function Footer({ sections = [] }: Props) {
  return (
    <>
      <div className="bg-[#efefef]">
        <div className="max-w-[1200px] mx-auto min-h-[340px] flex items-center">
          <Newsletter />
        </div>
      </div>

      <footer class="w-full px-4 bg-footer flex flex-col divide-y-1 divide-default">
        <div>
          <Container class="w-full flex flex-col divide-y-1 divide-default">
            <FooterContainer>
              {/* Desktop view */}
              <ul class="hidden sm:flex flex-row gap-20 justify-between">
                {sections.map((section) => (
                  <li>
                    <div>
                      {section.label === "Sobre"
                        ? (
                          <Icon
                            id="Logo"
                            width={126}
                            height={46}
                          />
                        )
                        : (
                          <Text variant="heading-3" tone="default">
                            {section.label}
                          </Text>
                        )}

                      <ul
                        class={`flex ${
                          isIcon(section.children[0]) ? "flex-row" : "flex-col"
                        } gap-2 pt-2`}
                      >
                        {section.children.map((item) => (
                          <li>
                            <SectionItem item={item} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Mobile view */}
              <ul class="flex flex-col sm:hidden sm:flex-row gap-4">
                {sections.map((section) => (
                  <li>
                    <Text variant="body" tone="footer">
                      <details>
                        <summary>
                          {section.label}
                        </summary>

                        <ul
                          class={`flex ${
                            isIcon(section.children[0])
                              ? "flex-row"
                              : "flex-col"
                          } gap-2 px-2 pt-2`}
                        >
                          {section.children.map((item) => (
                            <li>
                              <SectionItem item={item} />
                            </li>
                          ))}
                        </ul>
                      </details>
                    </Text>
                  </li>
                ))}
              </ul>
            </FooterContainer>
          </Container>
        </div>

        <div>
          <Container class="w-full py-5">
            <FooterContainer class="flex justify-center text-center w-full">
              <Text
                class="flex items-center gap-1"
                variant="body"
                tone="footer"
              >
                © 2023 Nome da Loja - CNPJ 00.000.000/0001-00. Todos os direitos
                reservados. <br />
                Avenida Lins de Vasconcelos, 1060 - Cambuci - São Paulo/SP
              </Text>
            </FooterContainer>
          </Container>
        </div>
      </footer>
    </>
  );
}

export default Footer;
