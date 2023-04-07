import Image from "deco-sites/std/components/Image.tsx";
import AddToCartButton from "$store/islands/AddToCartButton.tsx";
import Container from "$store/components/ui/Container.tsx";
import Text from "$store/components/ui/Text.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductDetailsPage } from "deco-sites/std/commerce/types.ts";

import ProductSelector from "./ProductVariantSelector.tsx";
import Toggle from "../ui/Toggle.tsx";
import { useUI } from "../../sdk/useUI.ts";
import Input from "../ui/Input.tsx";
import { useSignal } from "@preact/signals";
import Icon from "$store/components/ui/Icon.tsx";
import DetailCarousel from "../ui/DetailCarousel.tsx";

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-28">
      <div class="flex flex-col items-center justify-center gap-6">
        <Text variant="heading-2">Página não encontrada</Text>
        <a href="/">
          <Button>Voltar à página inicial</Button>
        </a>
      </div>
    </div>
  );
}

function Details({ page }: { page: ProductDetailsPage }) {
  const {
    breadcrumbList,
    product,
  } = page;
  const {
    description,
    productID,
    offers,
    image: images,
    name,
    gtin,
    additionalProperty,
    isVariantOf,
  } = product;
  const { price, listPrice, seller, installments } = useOffer(offers);
  const [front, back] = images ?? [];
  const { detailsToggle } = useUI();
  const currentImage = useSignal(0);
  const especifications = isVariantOf?.additionalProperty?.filter((item) =>
    item.name === "Estampa" || item.name === "Material"
  );
  return (
    <Container class="py-10">
      <div class="flex flex-col gap-4 ">
        {/* Image Gallery */}
        <div class="flex flex-col overflow-auto snap-x snap-mandatory p-8 scroll-smooth sm:gap-8">
          <div class="flex flex-col items-center lg:flex-row lg:gap-2 lg:items-start">
            <div class="flex gap-2 max-w-full lg:max-w-[450px] flex-col lg:flex-row justify-center items-center">
              <DetailCarousel images={[front.url!, back.url!]} />
            </div>
            {/* Product Info */}
            <div class=" flex flex-col gap-4 h-full px-4 sm:px-0">
              {/* Code and name */}
              <div class="mt-4 flex  flex-col sm:mt-0">
                <Text variant="heading-1" class="text-4xl !font-normal mb-2">
                  {isVariantOf?.name}
                </Text>
                <div class="w-[30px] h-[3px] bg-gray-200" />
              </div>
              {/* Sku Selector */}
              <div class="w-full">
                <ProductSelector product={product} />
              </div>
              <div class="flex w-full justify-between gap-5">
                {/* Prices */}
                <div class="mt-4">
                  <div class="flex flex-row gap-2 items-end mb-4">
                    <Text
                      variant="heading-3"
                      class="!text-[30px] text-orange"
                    >
                      {formatPrice(price, offers!.priceCurrency!)}
                    </Text>
                    <Text
                      class="line-through !text-sm"
                      tone="subdued"
                      variant="list-price"
                    >
                      {formatPrice(listPrice, offers!.priceCurrency!)}
                    </Text>
                  </div>
                  <div class="flex flex-col">
                    <Text tone="subdued" variant="caption" class="!font-italic">
                      ou {installments}
                    </Text>
                    <Text tone="subdued" class="!text-sm flex">
                      Economize:{" "}
                      <p class="text-orange font-semibold">
                        {formatPrice(
                          listPrice !== undefined && price !== undefined
                            ? listPrice - price
                            : 0,
                          offers!.priceCurrency!,
                        )}
                      </p>
                    </Text>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  {seller && (
                    <AddToCartButton
                      skuId={productID}
                      sellerId={seller}
                    />
                  )}
                  <Button
                    variant="icon"
                    aria-label="Favorite"
                    class="text-white !bg-orange w-[50px] h-[50px]"
                  >
                    <Icon id="Heart" width={30} height={30} strokeWidth={0.2} />
                  </Button>
                </div>
              </div>
              <div class="w-[30px] h-[2px] bg-gray-200" />
              <Input
                buttonText="Calcular"
                label="Calcule o frete:"
                link={{ href: "#", text: "Não sei meu CEP" }}
              />
            </div>
          </div>
          {/* Description card */}
          <div class="w-full lg:self-start">
            <Toggle />
            {detailsToggle.value === "Descrição" &&
              (
                <div class="mt-4 sm:mt-6">
                  <Text variant="caption">
                    {description && (
                      <div class="ml-2 mt-2 text-gray-400 leading-5">
                        {description}
                      </div>
                    )}
                  </Text>
                </div>
              )}
            {detailsToggle.value === "Especificações" &&
              (
                <div class="mt-4 sm:mt-6">
                  <Text variant="caption">
                    {especifications &&
                      (
                        <table class="w-full">
                          <thead class="w-full">
                            <tr class="w-full flex gap-0.5">
                              <td class="w-[50%] border-y p-4 uppercase bg-gray-100">
                                Propriedade
                              </td>
                              <td class="w-[50%] border-y p-4 uppercase bg-gray-100">
                                Especificação
                              </td>
                            </tr>
                          </thead>
                          {especifications.map((item) => (
                            <tbody>
                              <tr class="w-full flex gap-0.5">
                                <td class="w-[50%] border-y p-4 ">
                                  {item.name}
                                </td>
                                <td class="w-[50%] border-y p-4 ">
                                  {item.value}
                                </td>
                              </tr>
                            </tbody>
                          ))}
                        </table>
                      )}
                  </Text>
                </div>
              )}
          </div>
        </div>
      </div>
    </Container>
  );
}

function ProductDetails({ page }: Props) {
  if (page) {
    return <Details page={page} />;
  }

  return <NotFound />;
}

export default ProductDetails;
