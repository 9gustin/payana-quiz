import "./App.css";
import { useState } from "react";
import { Typography } from "@mui/material";
import { QuizStepper } from "./components/QuizStepper";

function App() {
  const [isSuccess, setIsSuccess] = useState(false);

  const success = () => setIsSuccess(true);
  return (
    <>
      <Typography component="h1" variant="h1" marginBottom="2rem">
        Encuesta de Satisfacción
      </Typography>
      {isSuccess ? (
        <Typography component="h2" variant="subtitle2">
          Registramos tu respuesta correctamente. Gracias por participar!
        </Typography>
      ) : (
        <QuizStepper onSuccess={success} />
      )}
    </>
  );
}

export default App;
