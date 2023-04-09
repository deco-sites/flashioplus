import Text from "$store/components/ui/Text.tsx";

function Newsletter() {
  return (
    <div class="flex flex-col sm:flex-row items-center w-full">
      <div className="border-gray-300 border-t-1 mx-5">
      </div>
      <div class="flex flex-col gap-2 max-w-[365px] mx-2.5 my-2.5">
        <Text variant="heading-2" tone="default">
          CADASTRE-SE E RECEBA OFERTAS COM PREÇOS EXCLUSIVOS
        </Text>
        <Text variant="caption" tone="default">
          Utilizamos seus dados conforme previsto em nossos avisos de
          privacidade. Você pode cancelar nossa comunicação a qualquer momento.
        </Text>
      </div>
      <form class="flex flex-row mx-2.5 flex-grow max-w-[670px]">
        <input
          class="py-2 px-3 flex-grow bg-white w-[50%] rounded-l-full overflow-hidden rounded-tl-full text-default"
          placeholder="Endereço de e-mail"
        />
        <button
          class="py-2 px-3 bg-interactive p-6 rounded-r-full w-[147px] rounded-tr-full text-white text-xs font-bold"
          type="bgutton"
        >
          Inscrever-se
        </button>
      </form>
    </div>
  );
}

export default Newsletter;
