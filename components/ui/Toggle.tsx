import Button from "$store/components/ui/Button.tsx";
import { useAddToCart } from "$store/sdk/useAddToCart.ts";
import { useUI } from "../../sdk/useUI.ts";

function Toggle() {
  const { detailsToggle } = useUI();

  return (
    <div class=" flex gap-[1px] w-full justify-center">
      <Button
        variant="toggle"
        onClick={() => {
          detailsToggle.value = "Descrição";
        }}
        class={`${
          detailsToggle.value === "Descrição" ? "text-black" : "!text-gray-400"
        }`}
      >
        Descrição
        <div class="block h-1 w-[30px] group-hover:bg-[#ff5a11]" />
      </Button>
      <Button
        variant="toggle"
        onClick={() => {
          detailsToggle.value = "Especificações";
        }}
        class={`${
          detailsToggle.value === "Especificações"
            ? "text-black"
            : "!text-gray-400 "
        } focus:outline-none`}
      >
        Especificações
        <div class="block h-1 w-[30px] group-hover:bg-[#ff5a11]" />
      </Button>
    </div>
  );
}

export default Toggle;
