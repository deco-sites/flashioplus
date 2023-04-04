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
}

function ProductCard({ product, preload }: Props) {
  const {
    url,
    productID,
    name,
    description,
    isVariantOf,
    image: images,
    offers,
  } = product;
  const [front, back] = images ?? [];
  const { listPrice, price, seller } = useOffer(offers);

  return (
    <div
      data-deco="view-product"
      id={`product-card-${productID}`}
      class="w-full group max-w-[178px]"
    >
      <a href={url} aria-label="product link">
        <div class="relative w-full">
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={164}
            height={178}
            class="rounded w-full h-[165px] object-contain"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
          />
        </div>
      </a>
      <div class="flex flex-col gap-1 py-2">
        <a href={url} aria-label="product link">
          <Text class="uppercase text-sm font-bold text-card-title text-center flex justify-center">
            {isVariantOf?.name}
          </Text>
        </a>
        <div class="w-full flex justify-center">
          <Counter />
        </div>
        <a href={url} aria-label="product link">
          <div class="flex justify-between text-sm gap-2">
            <Text class="line-through text-card-title">
              {formatPrice(listPrice, offers!.priceCurrency!)}
            </Text>
            <Text class="flex flex-col items-center font-semibold text-footer">
              <p class="text-card-title">Por</p>{" "}
              {formatPrice(price, offers!.priceCurrency!)}
            </Text>
          </div>
          <Text class="font-bold text-[14px] text-center flex">
            {description && textShortner(description, 120)}
          </Text>
        </a>
      </div>
    </div>
  );
}

export default ProductCard;
