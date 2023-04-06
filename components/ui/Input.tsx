interface Input {
  label: string;
  placeholder?: string;
  buttonText: string;
  link?: {
    href: string;
    text: string;
  };
}

function Input(
  { label, placeholder, buttonText, link }: Input,
) {
  return (
    <form class="flex flex-col items-center gap-[4px]">
      <label class="text-[12px] font-medium items-center  ">
        {label}
      </label>
      <div class="flex">
        <input class="p-2 border border-black"></input>
        <button
          class=" uppercase font-bold text-white p-2"
          onClick={(e) => e.preventDefault()}
        >
          {buttonText}
        </button>
      </div>
      {link
        ? (
          <a class="text-[12px] self-start font-medium" href={link.href}>
            {link.text}
          </a>
        )
        : ""}
    </form>
  );
}

export default Input;
