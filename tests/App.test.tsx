import React from "react";
import App from "../src/App";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MOCK_QUIZ } from "../src/services/mocks";

const saveBtn = /Guardar mis respuestas/i;

describe("App", () => {
  it("renders correctly", () => {
    render(<App />);

    const findQuestions = MOCK_QUIZ.preguntas;
    findQuestions.forEach((question) => {
      expect(screen.getByText(question.texto)).toBeInTheDocument();
    });
    expect(screen.queryByRole("button", { name: saveBtn })).toBeNull();

    const currentQuestion = findQuestions[0];
    currentQuestion.options.forEach((option) => {
      expect(
        screen.getByRole("button", { name: option.toString() })
      ).toBeInTheDocument();
    });
  });
  it("should can move foward into the form and see my answers", () => {
    render(<App />);

    const currentQuestion = MOCK_QUIZ.preguntas[0];
    act(() => {
      fireEvent.click(
        screen.getByRole("button", {
          name: currentQuestion.options[0].toString(),
        })
      );
    });

    expect(screen.getByText(MOCK_QUIZ.preguntas[1].texto)).toBeInTheDocument();
    MOCK_QUIZ.preguntas[1].options.forEach((option) => {
      expect(
        screen.getAllByRole("button", { name: option.toString() })[0]
      ).toBeInTheDocument();
    });
    expect(screen.getByRole("button", { name: /volver/i })).toBeInTheDocument();
    expect(
      screen.getByText(`Respondiste ${currentQuestion.options[0].toString()}`)
    ).toBeInTheDocument();
  });

  it("should can i go back to the previous question", () => {
    render(<App />);
    const currentQuestion = MOCK_QUIZ.preguntas[0];
    expect(
      screen.getByRole("button", { name: currentQuestion.texto })
    ).toHaveAttribute("data-currentFocus", "true");

    act(() => {
      fireEvent.click(
        screen.getByRole("button", {
          name: currentQuestion.options[0].toString(),
        })
      );
    });

    expect(
      screen.getByRole("button", { name: MOCK_QUIZ.preguntas[1].texto })
    ).toHaveAttribute("data-currentFocus", "true");
    expect(screen.getByRole("button", { name: /volver/i })).toBeInTheDocument();

    act(() => {
      fireEvent.click(screen.getByRole("button", { name: /volver/i }));
    });

    expect(
      screen.getByRole("button", { name: currentQuestion.texto })
    ).toHaveAttribute("data-currentFocus", "true");
  });
  it("shouldnt can move to question avoiding the previous one", () => {
    render(<App />);
    const currentQuestion = MOCK_QUIZ.preguntas[0];

    act(() => {
      fireEvent.click(
        screen.getByRole("button", {
          name: currentQuestion.options[0].toString(),
        })
      );
    });

    expect(
      screen.getByRole("button", { name: MOCK_QUIZ.preguntas[1].texto })
    ).toHaveAttribute("data-currentFocus", "true");

    expect(
      screen.getByRole("button", { name: MOCK_QUIZ.preguntas[2].texto })
    ).toBeDisabled();

    expect(
      screen.getByRole("button", { name: MOCK_QUIZ.preguntas[0].texto })
    ).toBeEnabled();

    act(() => {
      fireEvent.click(
        screen.getByRole("button", { name: MOCK_QUIZ.preguntas[0].texto })
      );
    });
    expect(
      screen.getByRole("button", { name: currentQuestion.texto })
    ).toHaveAttribute("data-currentFocus", "true");
  });
  it("should can save my answers", () => {
    render(<App />);
    MOCK_QUIZ.preguntas.forEach(({ texto, options }) => {
      expect(screen.getByText(texto)).toBeInTheDocument();
      const matchingOptions = screen.getAllByRole("button", {
        name: options[0].toString(),
      });
      act(() => {
        fireEvent.click(matchingOptions[matchingOptions.length - 1]);
      });
    });

    expect(screen.getByRole("button", { name: saveBtn })).toBeInTheDocument();

    act(() => {
      fireEvent.click(screen.getByRole("button", { name: saveBtn }));
    });
    expect(screen.getByText(/Registramos tu respuesta/i)).toBeInTheDocument();
  });
});
