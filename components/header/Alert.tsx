import Text from "$store/components/ui/Text.tsx";
import SliderControllerJS from "$store/islands/SliderJS.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import { useId } from "preact/hooks";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";

export interface Props {
  alerts: string[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function Alert({ alerts = [], interval = 5 }: Props) {
  const id = useId();

  return (
    <div class="bg-alert order-2 sm:order-[0]">
      <div className="max-w-[1200px] mx-auto flex items-center px-3">
        <div id={id} class="relative w-2/5 flex-grow w-[470px]">
          <Slider class="bg-alert gap-6 scrollbar-none">
            {alerts.map((alert) => (
              <Text
                class="flex justify-center items-center h-[38px] min-w-[470px]"
                variant="caption"
                tone="primary"
              >
                {alert}
              </Text>
            ))}
          </Slider>
          <div class="absolute top-0 left-0  ">
            <Button
              variant="icon"
              data-slide="prev"
              aria-label="Previous item"
            >
              <Icon
                size={20}
                class="text-[#aeaeae]"
                id="ChevronLeft"
                strokeWidth={4}
              />
            </Button>
          </div>
          <div class="absolute top-0 right-0 ">
            <Button variant="icon" data-slide="next" aria-label="Next item">
              <Icon
                size={20}
                class="text-[#aeaeae]"
                id="ChevronRight"
                strokeWidth={4}
              />
            </Button>
          </div>
        </div>
        <SliderControllerJS rootId={id} interval={interval && interval * 1e3} />
        <div className="hidden sm:block  w-3/5">
          <ul className="flex justify-end items-center">
            <li className="text-sm px-4 flex items-center">
              <Icon id="WhatsApp" width={22} height={20} className="mr-2" />
              Whatsapp
            </li>
            <li className="text-sm px-4 flex border-r-1 border-black">
              Minha Conta
            </li>
            <li className="text-sm px-4 flex border-r-1 border-black">
              Meus Pedidos
            </li>
            <li className="text-sm px-4 flex">
              Fale Conosco
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Alert;
