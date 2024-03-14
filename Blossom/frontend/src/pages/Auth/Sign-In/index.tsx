import { useLoginService } from "@/api/authServices";
import Input from "@/components/Input";
import { signInUser } from "@/utils/authUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, CircularProgress, Typography } from "@mui/material";
import { AxiosError } from "axios";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AuthLayout from "../AuthLayout";
import { SignInSchemaType, signInZodSchema } from "../typesAndData";

type SignInPageProps = {
  vendor?: boolean;
};

const SignInPage: React.FC<SignInPageProps> = ({ vendor }) => {
  const { mutate, isPending } = useLoginService();
  const { control, handleSubmit, setError } = useForm<SignInSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInZodSchema),
  });

  const handleLogin = useCallback(
    (data: SignInSchemaType) => {
      mutate(data, {
        onSuccess: (d) => signInUser(d),
        onError: (e) => {
          if (e instanceof AxiosError) {
            setError("email", { message: e?.response?.data });
          }
        },
      });
    },
    [mutate, setError]
  );

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
      <Button
        type="submit"
        variant="contained"
        size="large"
        color="secondary"
        disabled={isPending}
        endIcon={
          isPending && <CircularProgress size="1rem" color="secondary" />
        }
      >
        Login
      </Button>

      <Typography
        textAlign="center"
        component={Link}
        to={vendor ? "/auth/vendor/sign-up" : "/auth/customer/sign-up"}
        mt="0.5rem"
      >
        Don't have an account?
      </Typography>
    </AuthLayout>
  );
};

export default SignInPage;
