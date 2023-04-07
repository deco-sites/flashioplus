import Icon from "$store/components/ui/Icon.tsx";

interface Input {
  label: string;
  buttonText: string;
  link?: {
    href: string;
    text: string;
  };
}

function Input(
  { label, buttonText, link }: Input,
) {
  return (
    <form class="flex flex-col items-start gap-[4px]">
      <label class="text-[12px] flex gap-1.5 font-normal items-end">
        <Icon
          id={"Truck"}
          width={25}
          height={20}
          strokeWidth={1}
          class="text-black"
        />
        {label}
      </label>
      <div class="flex gap-4">
        <input class="p-2 border border-black"></input>
        <button
          class=" uppercase font-bold text-white bg-[#979899] rounded-[25px] py-[5px] px-[25px]"
          onClick={(e) => e.preventDefault()}
        >
          {buttonText}
        </button>
      </div>
      {link
        ? (
          <a
            class="text-[12px] text-orange self-start font-medium"
            href={link.href}
          >
            {link.text}
          </a>
        )
        : ""}
    </form>
  );
}

export default Input;
