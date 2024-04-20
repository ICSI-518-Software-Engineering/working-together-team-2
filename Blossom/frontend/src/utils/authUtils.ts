import { UserSessionType } from "@/pages/Auth/typesAndData";
import { jwtDecode } from "jwt-decode";

const AUTH_TOKEN_KEY = "auth_token";

export const signInUser = (token: string, redirectTo = "/") => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  window.location.href = redirectTo
};

export const signOutUser = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  window.location.href = "/";
};

export const decodeJWT = (jwt: string) => {
  if (!jwt) return null;
  try {
    return jwtDecode<UserSessionType>(jwt);
  } catch (error) {
    return null;
  }

}

export const getSignedInUserDetails = () => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (!token) return null;
  return decodeJWT(token);
};
