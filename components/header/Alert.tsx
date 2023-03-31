import Text from "$store/components/ui/Text.tsx";
import SliderControllerJS from "$store/islands/SliderJS.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import { useId } from "preact/hooks";
import Icon from "$store/components/ui/Icon.tsx";

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
    <div id={id}>
      <Slider class="bg-alert gap-6 scrollbar-none">
        <div className="max-w-[1200px] mx-auto flex items-center px-3">
          <div className="w-2/5">
            {alerts.map((alert) => (
              <Text
                class="flex justify-center items-center h-[38px]"
                variant="caption"
                tone="primary"
              >
                {alert}
              </Text>
            ))}
          </div>
          <div className="w-3/5">
            <ul className="flex justify-end items-center">
              <li className="text-sm px-4 flex items-center">
                <Icon id="WhatsApp" width={22} height={20} className="mr-2" />
                {" "}
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
      </Slider>

      <SliderControllerJS rootId={id} interval={interval && interval * 1e3} />
    </div>
  );
}

export default Alert;
