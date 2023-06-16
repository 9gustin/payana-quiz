import { useState } from "react";
import { useQuery } from "react-query";
import { getQuiz } from "../services/quiz";

export type QuestionValue = string | number | null;

export const useQuiz = () => {
  const { data, isLoading, isError, refetch } = useQuery("quiz", getQuiz);
  const [values, setValues] = useState<Record<number, QuestionValue>>({});

  const responseQuestion = (id: number, response: QuestionValue) => {
    setValues({
      ...values,
      [id]: response,
    });
  };

  const getValue = (id: number) => {
    return values[id] || null;
  };

  const isCompleted = () => {
    return data?.preguntas.every(({ id }) => Boolean(values[id]));
  };

  const onSubmit = () => {
    if (!isCompleted()) {
      return;
    }
    const result = data?.preguntas.map(({ id, texto }) => ({
      id,
      texto,
      valoracion: getValue(id),
    }));
    console.log("Submitted successfully", result);
  };

  return {
    values,
    isError,
    onSubmit,
    getValue,
    isLoading,
    quiz: data,
    isCompleted,
    retry: refetch,
    responseQuestion,
  };
};
