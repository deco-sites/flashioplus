import Text from "$store/components/ui/Text.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import type {
  Filter,
  FilterToggle,
  ProductListingPage,
} from "deco-sites/std/commerce/types.ts";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";

  return (
    <ul
      class={`flex flex-col items-end gap-2 ${flexDirection}`}
    >
      {values.map(({ label, value, url, selected, quantity }) => {
        return (
          <a
            href={url}
            class="flex mt-1 gap-0.5 border p-3 p-4 w-full max-w-[166px]"
          >
            <input type="checkbox" checked={selected} class="hidden" />
            <Text variant="caption">{label}</Text>
            <Text tone="subdued" variant="caption">
              ({quantity})
            </Text>
          </a>
        );
      })}
    </ul>
  );
}

export default function Filters({ filters }: Props) {
  return (
    <ul class="flex gap-0.5 h-[250px] justify-center flex-grow">
      {filters
        .filter(isToggle)
        .map((filter) => (
          <details class="flex flex-col group flex-grow gap-4 overflow-scroll first-child:flex-grow last-child:flex-grow max-w-[166px] last-child:max-w-full first-child:max-w-full relative scrollbar-none">
            <summary class="details-arrow-none font-semibold text-gray-dark py-4 px-8 bg-filter-bg text-center sticky top-0 list-none hover:cursor-pointer focus:outline-none">
              {filter.label}
            </summary>
            <FilterValues {...filter} />
          </details>
        ))}
    </ul>
  );
}
