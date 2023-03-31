import Text from "$store/components/ui/Text.tsx";

function Newsletter() {
  return (
    <div class="flex flex-col sm:flex-row items-center flex-1">
      <div className="w-[200px] h-[125px] border-gray-300 border-t-1 mx-5">
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
      <form class="flex flex-row items-center w-full sm:w-full mx-2.5">
        <input
          class="py-2 px-3 flex-grow bg-white rounded-l-full rounded-tl-full text-default h-[60px]"
          placeholder="Endereço de e-mail"
        />
        <button
          class="py-2 px-3 bg-interactive rounded-r-full rounded-tr-full h-[60px] w-[150px] text-white text-xs font-bold"
          type="bgutton"
        >
          Inscrever-se
        </button>
      </form>
    </div>
  );
}

export default Newsletter;
