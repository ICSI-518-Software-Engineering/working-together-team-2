import { TextField, TextFieldProps } from "@mui/material";
import React from "react";
import { Control, Controller } from "react-hook-form";

type InputProps = {
  control: Control;
} & Omit<TextFieldProps, "id"> &
  Required<Pick<TextFieldProps, "id">>;

const Input: React.FC<InputProps> = ({ control, ...props }) => {
  return (
    <Controller
      name={props.id}
      control={control}
      render={({ field }) => <TextField {...field} {...props} />}
    />
  );
};

export default Input;
