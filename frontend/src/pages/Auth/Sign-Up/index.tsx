import Input from "@/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AuthLayout from "../AuthLayout";
import {
  SignInSchemaType,
  SignUpSchemaType,
  signUpZodSchema,
} from "../typesAndData";

const SignUpPage: React.FC = () => {
  const { control, handleSubmit } = useForm<SignUpSchemaType>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    },
    resolver: zodResolver(signUpZodSchema),
  });

  const handleLogin = (data: SignInSchemaType) => {
    console.log(data);
  };

  return (
    <AuthLayout
      pageTitle="Customer Sign Up"
      submitHandler={handleSubmit(handleLogin)}
    >
      <Input
        label="Name"
        control={control}
        id="name"
        variant="standard"
        required
      />
      <Input
        label="Email"
        control={control}
        id="email"
        variant="standard"
        required
      />
      <Input
        label="Password"
        control={control}
        id="password"
        variant="standard"
        type="password"
        required
      />
      <Input
        label="Confirm Password"
        control={control}
        id="confirmPassword"
        variant="standard"
        type="password"
        required
      />
      <Button type="submit" variant="contained" size="large" color="secondary">
        Register
      </Button>

      <Typography
        textAlign="center"
        component={Link}
        to="/customer"
        mt="0.5rem"
      >
        Already have an account?
      </Typography>
    </AuthLayout>
  );
};

export default SignUpPage;
