import { useSignal } from "@preact/signals";

const Counter = () => {
  const quantity = useSignal(0);

  const increaseQuantity = () => {
    quantity.value++;
  };

  const decreaseQuantity = () => {
    quantity.value--;
  };

  return (
    <div class="flex font-semibold items-center border-2 border-gray-200 rounded-[4px] overflow-hidden">
      <button
        class="disabled:(bg-gray-100 text-gray-400) bg-white px-0.5 font-semibold text-sm text-orange"
        disabled={quantity.value === 0}
        onClick={decreaseQuantity}
      >
        －
      </button>
      <p class="px-2 bg-white border-x-2 h-full text-sm border-gray-200 leading-5">
        {quantity}
      </p>
      <button class="text-sm bg-white px-0.5" onClick={increaseQuantity}>
        ＋
      </button>
    </div>
  );
};

export default Counter;
