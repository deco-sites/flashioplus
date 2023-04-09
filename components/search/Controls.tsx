import Container from "$store/components/ui/Container.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Sort from "$store/components/search/Sort.tsx";
import Modal from "$store/components/ui/Modal.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";
import type { LoaderReturnType } from "$live/types.ts";
import Text from "$store/components/ui/Text.tsx";
import { useUI } from "../../sdk/useUI.ts";

export interface Props {
  page: LoaderReturnType<ProductListingPage | null>;
}

function NotFound() {
  return <div />;
}

function Controls({ page }: { page: ProductListingPage }) {
  const open = useSignal(false);
  const { listingType } = useUI();
  const filters = page?.filters;
  const breadcrumb = page?.breadcrumb;

  return (
    <Container class="flex flex-col justify-between mb-4 md:mb-0 p-4 md:p-0 sm:gap-4 md:border-b-1">
      <div class="flex flex-col sm:gap-4 items-start justify-between border-b-1 border-default md:border-none">
        <div class="flex items-center justify-between self-center w-full">
          <p class="text-gray-dark font-semibold text-sm flex-shrink">
            Resultaso de busca: {page.products.length} Produtos
          </p>
          <div class="flex flex-col sm:flex-row items-center">
            <p class="text-gray-dark font-semibold text-sm">Organizar por</p>
            <Sort />
          </div>
          <div class="flex gap-2">
            <button
              class="focus:outline-none"
              onClick={() => listingType.value = "grid"}
            >
              <img
                src={listingType.value === "grid"
                  ? "/images/grid-selected.svg"
                  : "/images/grid.svg"}
              />
            </button>
            <button
              class="focus:outline-none"
              onClick={() => listingType.value = "list"}
            >
              <img
                src={listingType.value === "list"
                  ? "/images/list-selected.svg"
                  : "/images/list.svg"}
              />
            </button>
          </div>
        </div>
        <div class="flex items-center gap-4 w-full">
          <Text class="text-4xl ">
            <p class="text-xl text-orange">Refine sua busca</p>
            Filtre aqui
          </Text>
          <ul class="flex flex-grow gap-1 overflow-x-scroll scrollbar-black">
            {filters.map((filter) => (
              <li
                onClick={() => {
                  open.value = true;
                }}
                class="w-[150px] cursor-pointer text-gray-dark font-semibold bg-filter-bg text-[13px] py-4 px-8"
              >
                {filter.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Modal
        title="Filtrar"
        type="Filter"
        open={open.value}
        onClose={() => {
          open.value = false;
        }}
      >
        <Filters filters={filters} />
      </Modal>
    </Container>
  );
}

function SearchControls({ page }: Props) {
  if (!page || !page.filters || page.filters.length === 0) {
    return <NotFound />;
  }

  return <Controls page={page} />;
}

export default SearchControls;
