"use client";

import axios from "axios";
import { signOut } from "next-auth/react";
import { useAuthStore } from "@/store/authStore";
import { handleLogout } from "./signOutCustom";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("masuk interceptors axiosClient", error);
    // console.log("error.response", error.response.data.status);
    const originalRequest = error.config;

    if (error.response.data.status === 401 && !originalRequest._retry) {
      console.log("masuk 401");
      originalRequest._retry = true;

      try {
        const sessionRes = await fetch("/api/auth/session");
        const session = await sessionRes.json();
        const newToken = session?.user?.accessToken;
        // console.log(newToken);

        if (newToken) {
          const authHeader = `Bearer ${newToken}`;
          useAuthStore.getState().setToken(newToken);
          axiosClient.defaults.headers.common["Authorization"] =
            `${authHeader}`;
          originalRequest.headers["Authorization"] = `${authHeader}`;
          return axiosClient(originalRequest);
        } else {
          handleLogout();
          return Promise.reject(error);
        }
      } catch (refreshError) {
        handleLogout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
