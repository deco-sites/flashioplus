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
  return (
    <div
      data-deco="view-product"
      id={`product-card-${productID}`}
      class={`group ${
        direction === "row" ? "flex items-center" : "flex flex-col"
      } gap-3`}
    >
      <a href={url} aria-label="product link">
        <div class="relative ">
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={width}
            height={heigth}
            class={`rounded `}
            preload={preload}
            loading={preload ? "eager" : "lazy"}
          />
        </div>
      </a>
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
      </div>
    </div>
  );
}

export default ProductCard;
