import Input from "@/components/Input";
import { Button, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AuthLayout from "../AuthLayout";

const SignInPage: React.FC = () => {
  const { control } = useForm({});

  return (
    <AuthLayout pageTitle="Sign In">
      <Input label="Email" control={control} id="email" variant="standard" />
      <Input
        label="Password"
        control={control}
        id="password"
        variant="standard"
      />
      <Button variant="contained" size="large" color="secondary">
        Login
      </Button>
      <Typography textAlign="center" component={Link} to="/customer">
        Don't have an account. Click here to sign up?
      </Typography>
    </AuthLayout>
  );
};

export default SignInPage;
