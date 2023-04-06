import Button from "$store/components/ui/Button.tsx";
import { useAddToCart } from "$store/sdk/useAddToCart.ts";
import Counter from "./Counter.tsx";

interface Props {
  skuId: string;
  sellerId: string;
}

function AddToCartButton({ skuId, sellerId }: Props) {
  const props = useAddToCart({
    skuId,
    sellerId,
  });

  return (
    <div class="relative w-min h-[50px] px-[25px] py-[5px] justify-center rounded-[25px]  flex items-center bg-interactive">
      <Counter />
      <Button
        data-deco="add-to-cart"
        {...props}
        class="!bg-transparent hover:!border-0 !font-medium text-base hover:!text-white"
      >
        COMPRAR
      </Button>
    </div>
  );
}

export default AddToCartButton;
