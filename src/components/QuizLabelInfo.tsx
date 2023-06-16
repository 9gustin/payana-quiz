import { Button, Typography } from "@mui/material";
import { FC } from "react";
import { QuestionValue } from "../hooks/useQuiz";
import EditIcon from "@mui/icons-material/ModeEdit";

export const QuizLabelInfo: FC<{
  total: number;
  current: number;
  activeStep: number;
  onClick?: () => void;
  value: QuestionValue;
}> = ({ total, current, activeStep, value, onClick }) => {
  if (value) {
    return (
      <Button onClick={onClick}>
        <Typography
          color="primary"
          variant="caption"
          fontWeight="bold"
          textTransform="none"
          marginRight="0.5rem"
        >
          Respondiste {value}
        </Typography>
        <EditIcon fontSize="small" />
      </Button>
    );
  }
  if (current === total && activeStep === total) {
    return (
      <Typography variant="caption" color="primary.contrastText">
        Ultima pregunta!
      </Typography>
    );
  }

  return null;
};
