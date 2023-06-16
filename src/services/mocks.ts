import { Quiz } from "./types";

const VALUES_TO_5 = [1, 2, 3, 4, 5];

export const MOCK_QUIZ: Quiz = {
  preguntas: [
    {
      id: 1,
      texto: "¿Qué tan satisfecho estás con el producto?",
      options: VALUES_TO_5,
    },
    {
      id: 2,
      texto: "¿Cuál es tu opinión sobre el servicio al cliente?",
      options: VALUES_TO_5,
    },
    {
      id: 3,
      texto: "¿Cómo calificarías la usabilidad del sitio web?",
      options: VALUES_TO_5,
    },
    {
      id: 4,
      texto: "¿Recomendarías nuestro producto a otros?",
      options: VALUES_TO_5,
    },
    {
      id: 5,
      texto: "¿Cómo evaluarías la calidad del producto?",
      options: VALUES_TO_5,
    },
  ],
};