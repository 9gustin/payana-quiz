import Box from "@mui/material/Box";
import { FC, useState } from "react";
import { StepIcon } from "./StepIcon";
import Step from "@mui/material/Step";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stepper from "@mui/material/Stepper";
import { QuizSkeleton } from "./QuizSkeleton";
import StepLabel from "@mui/material/StepLabel";
import { QuizLabelInfo } from "./QuizLabelInfo";
import Typography from "@mui/material/Typography";
import StepContent from "@mui/material/StepContent";
import { QuestionValue, useQuiz } from "../hooks/useQuiz";

export const QuizStepper: FC<{
  onSuccess: () => void;
}> = ({ onSuccess }) => {
  const [activeStep, setActiveStep] = useState(0);
  const {
    quiz,
    retry,
    isError,
    getValue,
    onSubmit,
    isLoading,
    isCompleted,
    responseQuestion,
  } = useQuiz();

  if (isLoading) return <QuizSkeleton />;

  if (isError || !quiz)
    return (
      <>
        <Typography component="h1" variant="h1">
          Ocurrio un error cargando la encuesta
          <Button onClick={() => retry()}>Reintentar</Button>
        </Typography>
      </>
    );

  const handleGoTo = (id: number, step: number) => {
    if (!getValue(id)) {
      return;
    }
    setActiveStep(step);
  };

  const handleNext = (id: number, value: QuestionValue) => {
    responseQuestion(id, value);
    if (isCompleted()) {
      setActiveStep(quiz.preguntas.length + 1);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const buildGoTo = (id: number, index: number) => () => handleGoTo(id, index);

  const { preguntas } = quiz;

  const saveValues = () => {
    onSubmit();
    onSuccess();
  };

  return (
    <Box>
      <Stepper activeStep={activeStep} orientation="vertical">
        {preguntas.map(({ id, texto, options }, index) => (
          <Step key={id}>
            <StepLabel
              StepIconComponent={StepIcon}
              optional={
                <QuizLabelInfo
                  current={index}
                  value={getValue(id)}
                  activeStep={activeStep}
                  onClick={buildGoTo(id, index)}
                  total={preguntas.length - 1}
                />
              }
            >
              <Button disabled={!getValue(id)} onClick={buildGoTo(id, index)}>
                <Typography
                  textAlign="left"
                  color="text.primary"
                  textTransform="none"
                  variant={activeStep === index ? "subtitle1" : "subtitle2"}
                >
                  {texto}
                </Typography>
              </Button>
            </StepLabel>
            <StepContent>
              <Box sx={{ mb: 2 }}>
                <div>
                  {options.map((value) => (
                    <Button
                      key={value}
                      variant="contained"
                      onClick={() => handleNext(id, value)}
                      sx={{ mt: 1, mr: 1 }}
                      fullWidth
                    >
                      <Typography color="secondary" fontWeight="bold">
                        {value}
                      </Typography>
                    </Button>
                  ))}
                  {!(index === 0) && (
                    <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                      Volver
                    </Button>
                  )}
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {isCompleted() && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Button
            onClick={saveValues}
            sx={{ mt: 1, mr: 1 }}
            variant="contained"
          >
            <Typography
              color="text.secondary"
              fontWeight="bold"
              textTransform="none"
            >
              Guardar mis respuestas
            </Typography>
          </Button>
        </Paper>
      )}
    </Box>
  );
};
