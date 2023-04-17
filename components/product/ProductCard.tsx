import Image from "deco-sites/std/components/Image.tsx";
import Text from "$store/components/ui/Text.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import { textShortner } from "../../helpers/textShortner.ts";
import Counter from "./Counter.tsx";
import { useUI } from "../../sdk/useUI.ts";
import Modal from "../ui/Modal.tsx";
import { useSignal } from "@preact/signals";
import AddToCartButton from "./AddToCartButton.tsx";
import Icon from "../ui/Icon.tsx";
import Input from "../ui/Input.tsx";
import DetailCarousel from "../ui/DetailCarousel.tsx";
import ProductSelector from "./ProductVariantSelector.tsx";

/**
 * A simple, inplace sku selector to be displayed once the user hovers the product card
 * It takes the user to the pdp once the user clicks on a given sku. This is interesting to
 * remove JS from the frontend
 */
function Sizes(product: Product) {
  const possibilities = useVariantPossibilities(product);
  const options = Object.entries(
    possibilities["TAMANHO"] ?? possibilities["Tamanho"] ?? {},
  );

  return (
    <ul class="flex justify-center items-center gap-2">
      {options.map(([value, urls]) => {
        const url = urls.find((url) => url === product.url) || urls[0];

        return (
          <a href={url}>
            <Avatar
              class="bg-default"
              variant="abbreviation"
              content={value}
              disabled={url === product.url}
            />
          </a>
        );
      })}
    </ul>
  );
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;
  width?: number;
  heigth?: number;
  direction?: string;
}

function ProductCard(
  { product, preload, width = 164, heigth = 178, direction = "col" }: Props,
) {
  const {
    url,
    productID,
    isVariantOf,
    image: images,
    offers,
  } = product;
  const [front, back] = images ?? [];
  const { listPrice, price, seller } = useOffer(offers);
  const { listingType } = useUI();
  const outOfStock = price === undefined || price === 0;
  const open = useSignal(false);
  return (
    <>
      <div
        data-deco="view-product"
        id={`product-card-${productID}`}
        class={`group ${
          listingType.value === "list" ? "flex items-center" : "flex flex-col"
        } gap-3`}
      >
        <div class="relative flex flex-col items-center">
          <a href={url} aria-label="product link">
            <Image
              src={front.url!}
              alt={front.alternateName}
              width={width}
              height={heigth}
              class={`rounded object-contain`}
              preload={preload}
              loading={preload ? "eager" : "lazy"}
            />
          </a>
          {listPrice! > 0 &&
            (
              <p class="absolute top-0 right-0 text-xs bg-[#f71963] text-white px-1 py-0.5">
                -{Math.floor(((listPrice! - price!) * 100) / listPrice!)}%
              </p>
            )}
          <a
            href={url}
            class={`hidden  items-center gap-1 justify-center sm:group-hover:flex absolute top-0 w-[${width}px] h-[${heigth}px] bg-[#dcdcdc50]`}
          >
            <Button
              onClick={(e) => e.preventDefault()}
              class="!rounded-full h-[50px] w-[50px] !bg-default"
            >
              <Icon
                class="text-black"
                id="Heart"
                width={20}
                height={20}
              />
            </Button>
            {!outOfStock &&
              (
                <Button
                  class="!rounded-full h-[50px] w-[50px] !bg-default"
                  onClick={(e) => {
                    e.preventDefault();
                    open.value = true;
                  }}
                >
                  <Icon
                    class="text-black hover:text-orange"
                    id="ShoppingCart"
                    width={20}
                    height={20}
                  />
                </Button>
              )}
          </a>
        </div>
        <div
          class={`flex flex-col gap-1 py-2 ${
            listingType.value === "list" ? "items-start" : "items-center"
          }`}
        >
          <a href={url} aria-label="product link">
            <Text class="uppercase mb-4 text-sm font-bold text-card-title text-center flex justify-center">
              {isVariantOf?.name}
            </Text>
          </a>
          {outOfStock
            ? (
              <div class="transition hover:cursor-pointer duration-200 flex justify-center border items-center rounded-[10px] bg-white hover:bg-black  w-[5.8rem] h-[2.4rem] top-0 right-0  w-[93px]">
                <Text class="text-primary transition duration-200 w-full h-full text-center leading-9 hover:text-white  tracking-wider text-sm">
                  Avise-me
                </Text>
              </div>
            )
            : (
              <>
                <Counter />
                <a href={url} aria-label="product link">
                  <div class="flex justify-between text-sm gap-2">
                    <Text class="line-through text-card-title">
                      {formatPrice(listPrice, offers!.priceCurrency!)}
                    </Text>
                    <Text class="flex items-center font-semibold text-footer">
                      <p class="text-card-title">Por</p>{" "}
                      {formatPrice(price, offers!.priceCurrency!)}
                    </Text>
                  </div>
                </a>
              </>
            )}
        </div>
      </div>
      <Modal
        title=""
        type="Product"
        open={open.value}
        onClose={() => {
          open.value = false;
        }}
      >
        <div class="flex flex-col items-center lg:flex-row lg:gap-2 lg:items-start">
          <div class="flex gap-2 max-w-full lg:max-w-[450px] flex-col lg:flex-row justify-center items-center">
            <Image
              width={424}
              height={415}
              src={front.url!}
              alt="Detalhe visual do produto"
              class="!max-w-none"
            />
          </div>
          {/* Product Info */}
          <div class=" flex flex-col relative gap-4 h-[415px] px-4 sm:px-0">
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
            <Button
              class="uppercase absolute w-full bottom-0 hover:bg-interactive hover:text-white"
              as={"a"}
              href={url}
            >
              Ver detalhes
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ProductCard;
