import { Review } from "deco-sites/std/commerce/types.ts";
import Container from "./Container.tsx";
import mock from "./mockReview.json" assert { type: "json" };

interface Props {
  reviews: Review[];
  average: number;
}

const ratingAverage = Math.floor(
  mock.reduce(
    (prev, curr) => prev + curr.reviewRating.ratingValue,
    0,
  ) / mock.length,
);

export function StarRating({ range = 0 }) {
  return (
    <div>
      {[...Array(5)].map((star, index) => {
        return (
          <span
            style={{ filter: "drop-shadow(0.5px 0.5px 0.5px #FF7017)" }}
            class={`${
              index + 1 <= range ? "text-orange" : "text-white"
            } text-2xl`}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
}

function ReviewArea() {
  return (
    <Container>
      <section class="flex flex-col gap-4 mb-8 mx-2">
        <h2 class="text-2xl font-bold border-b">Avaliações</h2>
        <StarRating range={ratingAverage} />
        <p>
          Classificação média: {ratingAverage}
          {` (${mock.length} avaliações)`}
        </p>
        <a href="#" class="text-orange px-4">
          Faça login para escrever uma avaliação.
        </a>
        {mock.map((review) => (
          <div>
            <div class="flex items-center gap-2">
              <StarRating range={review.reviewRating?.ratingValue} />
              <p>{review.name}</p>
            </div>
            <p>
              Enviado <strong>3 meses</strong> atrás por <strong>Teste</strong>
            </p>
            <p>{review.reviewBody}</p>
          </div>
        ))}
      </section>
    </Container>
  );
}

export default ReviewArea;
