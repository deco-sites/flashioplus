import Text from "$store/components/ui/Text.tsx";
import SliderControllerJS from "$store/islands/SliderJS.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import { useId } from "preact/hooks";

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
              <li>Whatsapp</li>
              <li>Minha Conta</li>
              <li>Meus Pedidos</li>
              <li>Fale Conosco</li>
            </ul>
          </div>
        </div>
      </Slider>

      <SliderControllerJS rootId={id} interval={interval && interval * 1e3} />
    </div>
  );
}

export default Alert;
