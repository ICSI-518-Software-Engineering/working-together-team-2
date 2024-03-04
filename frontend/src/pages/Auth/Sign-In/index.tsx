import Input from "@/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AuthLayout from "../AuthLayout";
import { SignInSchemaType, signInZodSchema } from "../typesAndData";

type SignInPageProps = {
  vendor?: boolean;
};

const SignInPage: React.FC<SignInPageProps> = ({ vendor }) => {
  const { control, handleSubmit } = useForm<SignInSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInZodSchema),
  });

  const handleLogin = (data: SignInSchemaType) => {
    console.log(data);
  };

  return (
    <AuthLayout
      pageTitle={`${vendor ? "Vendor" : "Customer"} Sign In`}
      submitHandler={handleSubmit(handleLogin)}
    >
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
      <Button type="submit" variant="contained" size="large" color="secondary">
        Login
      </Button>

      {!vendor && (
        <Typography
          textAlign="center"
          component={Link}
          to="/customer/sign-up"
          mt="0.5rem"
        >
          Don't have an account?
        </Typography>
      )}
    </AuthLayout>
  );
};

export default SignInPage;
