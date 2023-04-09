import Text from "$store/components/ui/Text.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useEffect, useRef } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";

import Icon from "./Icon.tsx";

// Lazy load a <dialog> polyfill.
if (IS_BROWSER && typeof window.HTMLDialogElement === "undefined") {
  await import(
    "https://raw.githubusercontent.com/GoogleChrome/dialog-polyfill/5033aac1b74c44f36cde47be3d11f4756f3f8fda/dist/dialog-polyfill.esm.js"
  );
}

export type Props = JSX.IntrinsicElements["dialog"] & {
  title?: string;
  mode?: "sidebar-right" | "sidebar-left" | "center";
  onClose?: () => Promise<void> | void;
  loading?: "lazy" | "eager";
};

const styles = {
  "sidebar-right": "animate-slide-left sm:ml-auto",
  "sidebar-left": "animate-slide-right",
  center: "",
};

const Modal = ({
  open,
  type,
  title,
  mode = "sidebar-right",
  onClose,
  children,
  loading,
  ...props
}: Props) => {
  const lazy = useSignal(false);
  const ref = useRef<HTMLDialogElement>(null);
  const variant = styles[mode];

  useEffect(() => {
    if (ref.current?.open === true && open === false) {
      document.getElementsByTagName("body").item(0)?.removeAttribute(
        "no-scroll",
      );
      ref.current.close();
    } else if (ref.current?.open === false && open === true) {
      document.getElementsByTagName("body").item(0)?.setAttribute(
        "no-scroll",
        "",
      );
      ref.current.showModal();
      lazy.value = true;
    }
  }, [open]);

  if (type === "Filter") {
    return (
      <dialog
        {...props}
        ref={ref}
        class={`bg-transparent top-[0%] w-full max-h-full p-0 backdrop max-w-full ${
          props.class ?? ""
        }`}
        onClick={(e) =>
          (e.target as HTMLDialogElement).tagName === "DIALOG" && onClose?.()}
      >
        <section class=" w-full bg-default flex">
          <div class="h-full flex flex-grow flex-row">
            {loading === "lazy" ? lazy.value && children : children}
          </div>
        </section>
      </dialog>
    );
  }

  return (
    <dialog
      {...props}
      ref={ref}
      class={`bg-transparent p-0 m-0 max-w-full sm:max-w-lg w-full max-h-full h-full backdrop ${variant} ${
        props.class ?? ""
      }`}
      onClick={(e) =>
        (e.target as HTMLDialogElement).tagName === "DIALOG" && onClose?.()}
    >
      <section class=" h-full bg-default flex flex-col">
        <header class="flex px-4 justify-between items-center py-2 bg-black ">
          <h1>
            <Text variant="heading-2" class="text-white font-normal">
              {title}
            </Text>
          </h1>
          <Button variant="icon" onClick={onClose}>
            <Icon
              id="XMark"
              class="text-white"
              width={30}
              height={30}
              strokeWidth={2}
            />
          </Button>
        </header>
        <div class="overflow-y-auto h-full flex flex-col">
          {loading === "lazy" ? lazy.value && children : children}
        </div>
      </section>
    </dialog>
  );
};

export default Modal;
