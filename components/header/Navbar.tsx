import HeaderButton from "$store/islands/HeaderButton.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";

import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import type { INavItem } from "./NavItem.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import HeaderSearchMenu from "$store/islands/HeaderSearchMenu.tsx";

function Navbar({ items, searchbar }: {
  items: INavItem[];
  searchbar: SearchbarProps;
}) {
  return (
    <>
      {/* Mobile Version */}
      <div
        class={`md:hidden flex flex-row justify-between items-center h-[${navbarHeight}] w-full px-2 gap-2`}
      >
        <HeaderButton variant="menu" />

        <a
          href="/"
          class={`flex-grow inline-flex items-center min-h-[${navbarHeight}]`}
          aria-label="Store logo"
        >
          <Icon id="Logo" width={126} height={16} />
        </a>

        <div class="flex gap-1">
          <HeaderButton variant="search" />
          <HeaderButton variant="cart" />
        </div>
      </div>

      {/* Desktop Version */}
      <div class="w-full">
        <div className="max-w-[1200px] mx-auto hidden md:flex flex-row justify-between items-center px-3">
          <div class="flex-none w-44">
            <a
              href="/"
              aria-label="Store logo"
              class="block px-4 py-4"
            >
              <Icon id="Logo" width={130} height={25} />
            </a>
          </div>
          <div class="flex-none w-44 flex items-center justify-end gap-2">
            <HeaderButton variant="search" />
            <HeaderSearchMenu searchbar={searchbar} />
            <Button
              as="a"
              variant="icon"
              href="https://flashioplus.frncomunicacao.com.br/account/#/wishlist"
              aria-label="Favorite"
            >
              <Icon id="Heart" width={20} height={20} strokeWidth={0.4} />
            </Button>
            <Button
              as="a"
              variant="icon"
              href="/login"
              aria-label="Log in"
            >
              <Icon id="User" width={20} height={20} strokeWidth={0.4} />
            </Button>
            <HeaderButton variant="cart" />
          </div>
        </div>
        <div className="bg-black">
          <div class="max-w-[1200px] mx-auto hidden md:flex flex-row justify-between items-center w-full px-3">
            <div class="flex justify-center">
              {items.map((item) => <NavItem item={item} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
