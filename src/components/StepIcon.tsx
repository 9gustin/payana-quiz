import { Typography } from "@mui/material";
import { FC, ReactNode } from "react";

export const StepIcon: FC<{ icon: ReactNode }> = (props) => {
  return (
    <Typography color="primary" variant="subtitle1" marginRight="1rem">
      {props.icon}
    </Typography>
  );
};
