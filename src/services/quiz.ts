import { Quiz } from "./types";
import { MOCK_QUIZ } from "./mocks";

export const getQuiz = (): Promise<Quiz> => {
  return new Promise(function (resolve) {
    setTimeout(() => resolve(MOCK_QUIZ), 500);
  });
};
