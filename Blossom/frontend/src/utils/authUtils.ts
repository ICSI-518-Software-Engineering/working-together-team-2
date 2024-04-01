import { UserSessionType } from "@/pages/Auth/typesAndData";
import { jwtDecode } from "jwt-decode";

const AUTH_TOKEN_KEY = "auth_token";

export const signInUser = (token: string) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  window.location.reload();
};

export const signOutUser = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  window.location.href = "/";
};

export const getSignedInUserDetails = () => {
  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) return null;
    return jwtDecode<UserSessionType>(token);
  } catch (error) {
    return null;
  }
};
