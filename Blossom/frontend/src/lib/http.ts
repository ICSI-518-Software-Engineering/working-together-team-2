import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const queryClient = new QueryClient();

// axios.interceptors.response.use((err) => {
//     err.status.
// })

export const http = axios.create({
  baseURL: "http://localhost:8086/api",
});
